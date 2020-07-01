var express = require("express");
var router = express.Router();
const request = require("request");
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

//Get everything, package it all into a single JSON object and pass it to the API function
const updateServer = async (token) => {
  //var start = new Date().getTime(); //~234ms to run everything
  var output = {};
  output.Name = "Computer-Name"; //We will customize this later but for now it's just a placeholder string
  output.Battery = await system.getBattery(); //~58ms to only post the battery info
  output.CPUSpec = await system.getCPUSpec(); //~37ms for CPUSpec info
  output.CPUTemp = await system.getCPUTemp(); //~17ms
  output.Processes = await system.getProcesses(); //~134ms
  output.Disk = await system.getDisk(); //~26ms
  const url = "/temp/push";
  APIServer.postRequest(output, token, url);
  //var end = new Date().getTime();
  //var time = end - start;
  //console.log("Execution time: " + time);
};

const connect = async (username, password) => {
  const token = await APIServer.signin(username, password);
  if (token != "FAILED") {
    console.log(token);
    //setInterval(updateServer(await token), 2000); //Every 2 seconds
  } else {
    console.log("failed");
  }
};

//updateServer(); //<- Use this to test the function and server connection
connect("markk", "test1");

/*
const token = "[Token]";
const url = "/temp/push";
APIServer.postRequest({ cpu: 60, gpu: 50 }, token, url);
*/

module.exports = router;
