const system = require("../helper/systemInfoGetter");
const request = require("request");
var express = require("express");

let IP = "localhost";

// url: /temp/push
const postRequest = async (data, token, url) => {
  console.log(await data);
  const headers = { Authorization: token };
  return await request.post(
    {
      headers: headers,
      url: "http://" + IP + ":1205" + url,
      json: await data,
    },
    (err, res, body) => {
      if (err) {
        console.log("im in the err");
        return err;
      }
      console.log("im in the body");
      console.log(res.statusCode);
      return body;
    }
  );
};

module.exports = { postRequest };
