const si = require("systeminformation");

const getBattery = async () => {
  return si
    .battery()
    .then((data) => {
      //Filter out only the important data
      const output = {
        percent: data.percent,
        isCharging: data.ischarging,
      };
      return output;
    })
    .catch((error) => console.log(error));
};

const getCPUSpec = async () => {
  return si
    .cpu()
    .then((data) => {
      //Filter out only the important data
      const output = {
        manufacturer: data.manufacturer,
        brand: data.brand,
        speed: data.speed,
        speedmax: data.speedmax,
        speedmin: data.speedmin,
      };
      return output;
    })
    .catch((error) => console.log(error));
};

//CPU Temperature -> Does not include specs
const getCPUTemp = async () => {
  return si
    .cpuTemperature()
    .then((data) => {
      return data;
    })
    .catch((error) => console.log(error));
};

//Process Information -> Returns as a JSON array
const getProcesses = async () => {
  return si
    .processes()
    .then((data) => {
      var output = [];
      for (let process of data.list) {
        current = {};
        current.pid = process.pid;
        current.name = process.name;
        output.push(current);
      }
      return output;
    })
    .catch((error) => console.log(error));
};

//Drive Information (Displays info for each drive)
const getDisk = async () => {
  return si
    .fsSize()
    .then((data) => {
      var output = [];
      for (let disk of data) {
        current = {};
        current.use = disk.use;
        current.mount = disk.mount;
        output.push(current);
      }
      return output;
    })
    .catch((error) => console.log(error));
};

module.exports = { getBattery, getCPUSpec, getCPUTemp, getProcesses, getDisk };
