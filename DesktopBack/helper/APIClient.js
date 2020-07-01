const system = require("../helper/systemInfoGetter");
const request = require("request");

let IP = "localhost"; //"68.105.129.128";

// url: /temp/push
const postRequest = async (data, token, url) => {
  console.log(await data);
  const headers = { Authorization: token };
  await request.post(
    {
      headers: headers,
      url: "http://" + IP + ":1205" + url,
      json: await data,
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

const signin = async (id, pass) => {
  url = IP + "/user/signin";

  return await request.post(
    {
      url: "http://" + IP + ":1205/user/signin",
      json: { username: id, password: pass },
    },

    async (err, res, body) => {
      if (err) {
        console.log("im in the err");
        return "FAILED";
      }
      //console.log("im in the body");
      //console.log(body);
      //console.log(res.statusCode);
      //console.log(body.token);
      return body.token;
    }
  );
};

module.exports = { postRequest, signin };
