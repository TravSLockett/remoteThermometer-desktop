var express = require("express");
var router = express.Router();
const request = require("request");
const si = require("systeminformation");

//Battery Information
router.get("/bat", (req, res) => {
  si.battery()
    .then((data) => {
      //Filter out only the important data
      const output = {
        percent: data.percent,
        isCharging: data.ischarging,
      };
      res.send(output);
    })
    .catch((error) => console.log(error));
});

//CPU Specs -> Does not include temperature
router.get("/cpuSpec", (req, res) => {
  si.cpu()
    .then((data) => {
      //Filter out only the important data
      const output = {
        manufacturer: data.manufacturer,
        brand: data.brand,
        speed: data.speed,
        speedmax: data.speedmax,
        speedmin: data.speedmin,
      };
      res.send(output);
    })
    .catch((error) => console.log(error));
});

//CPU Temperature -> Does not include specs
router.get("/cpuTemp", (req, res) => {
  si.cpuTemperature()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => console.log(error));
});

//Process Information
router.get("/processes", (req, res) => {
  si.processes()
    .then((data) => {
      
      res.send(data);
    })
    .catch((error) => console.log(error));
});

//Drive Information (Displays info for each drive)
router.get("/disk", (req, res) => {
  si.fsSize()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
