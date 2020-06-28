const system = require("../helper/systemInfoGetter");
const request = require("request");

// url: /temp/push
const postRequest = async (data, token, url) => {
  const headers = { Authorization: token };
  await request.post(
    {
      headers: headers,
      url: "http://[IP]:1205" + url,
      json: data,
    },

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
};

module.exports = { postRequest };
