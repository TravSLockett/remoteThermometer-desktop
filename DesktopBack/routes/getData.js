var express = require("express");
var router = express.Router();
const request = require("request");
const system = require("../helper/systemInfoGetter");
const APIServer = require("../helper/APIClient");
const { VariantAlsoNegotiates } = require("http-errors");

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

//console.log(test);
//setInterval(test, 5000); //Every 5 seconds

const token = "[Token]";
const url = "/temp/push";
APIServer.postRequest({ cpu: 60, gpu: 50 }, token, url);

module.exports = router;
