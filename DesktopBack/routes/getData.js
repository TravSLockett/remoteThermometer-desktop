var express = require("express");
var router = express.Router();
const request = require("request");
const si = require("systeminformation");

//Battery Information
router.get("/bat", (req, res) => {
  si.battery()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => console.log(error));
});

//CPU Specs -> Does not include temperature
router.get("/cpuSpec", (req, res) => {
  si.cpu()
    .then((data) => {
      res.send(data);
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

//Drive Information (Displays infor for each drive)
router.get("/disk", (req, res) => {
  si.fsSize()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => console.log(error));
});

module.exports = router;