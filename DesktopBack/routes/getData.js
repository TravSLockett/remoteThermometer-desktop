var express = require("express");
var router = express.Router();
const request = require("request");
const getMAC = require("getMac");
const crypto = require("crypto");
var bodyParser = require("body-parser");
const system = require("../helper/systemInfoGetter");
const APIServer = require("../helper/APIClient");
const { VariantAlsoNegotiates } = require("http-errors");
const systemInfoGetter = require("../helper/systemInfoGetter");

//Battery Information
router.get("/bat", async (req, res) => {
  const battery = await system.getBattery();
  res.send(battery);
});

//CPU Specs -> Does not include temperature
router.get("/cpuSpec", async (req, res) => {
  const specs = await system.getCPUSpec();
  res.send(specs);
});

//CPU Temperature -> Does not include specs
router.get("/cpuTemp", async (req, res) => {
  const temperature = await system.getCPUTemp();
  res.send(temperature);
});

//Process Information -> Returns as a JSON array
router.get("/processes", async (req, res) => {
  const process = await system.getProcesses();
  res.send(process);
});

//Drive Information (Displays info for each drive)
router.get("/disk", async (req, res) => {
  const disk = await system.getDisk();
  res.send(disk);
});

//Send a request with a token, it will send one update to the server
router.post("/start", async (req, res) => {
  const token = await req.headers.authorization;
  res.send({ Start: "Received", Token: token });
  updateServer(await token); //Run
});

router.get("/all", async (req, res) => {
  const allData = await updateServer("", true);
  res.send(allData);
});

//Get everything, package it all into a single JSON object and pass it to the API function
const updateServer = async (token, returnOnly = false) => {
  //var start = new Date().getTime(); //~234ms to run everything
  var output = {};
  output.Name = crypto
    .createHmac("sha256", "secret")
    .update(getMAC.default())
    .digest("hex"); //This is a SHA256 hash of the computer's mac address
  output.Battery = await system.getBattery(); //~58ms to only post the battery info
  output.CPUSpec = await system.getCPUSpec(); //~37ms for CPUSpec info
  output.CPUTemp = await system.getCPUTemp(); //~17ms
  output.Processes = await system.getProcesses(); //~134ms
  output.Disk = await system.getDisk(); //~26ms
  const url = "/temp/push";
  if ((returnOnly = false)) {
    APIServer.postRequest(output, token, url);
  }
  return output;

  //var end = new Date().getTime();
  //var time = end - start;
  //console.log("Execution time: " + time);
};

/*
const token = "[Token]";
const url = "/temp/push";
APIServer.postRequest({ cpu: 60, gpu: 50 }, token, url);
*/

module.exports = router;
