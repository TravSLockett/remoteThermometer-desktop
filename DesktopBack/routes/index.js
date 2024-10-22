var express = require("express");
var router = express.Router();
const request = require("request");
const si = require("systeminformation");

//USING SI LIBRARY TO GET SYSTEM INFO
//PLAY W IT

router.get("/post", (req, res) => {
  //whatever you wnat it to happen
  var battery = si
    .battery()
    .then((data) => {
      console.log(data);
      //res.send(data);
      returnData = data;
    })
    .catch((error) => console.error(error));
  returnData.BattPct = battery.percent;
  console.log("returnData.BattPct");
  res.send(returnData);
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });

  //TESTING GET CPU AND GPU TEMPS TO HOME SERVER
  /*
  request(
    "http://192.168.1.12:1205/temp/list",
    { json: true },
    (err, res, body) => {
      if (err) {
        console.log("im in the err");
        return console.log(err);
      }
      console.log("im in the body");
      console.log(body);
      console.log(res.statusCode);
    }
  );
*/
  //TESTING POST CPU AND GPU TEMPS TO HOME SERVER
  /*
  request.post(
    "http://192.168.1.12:1205/temp/push",
    { json: { cpu: 12, gpu: 12 } },
    (err, res, body) => {
      if (err) {
        console.log("im in the err");
        return console.log(err);
      }
      console.log("im in the body");
      console.log(body);
      console.log(res.statusCode);
    }
  );
  */
});

module.exports = router;
