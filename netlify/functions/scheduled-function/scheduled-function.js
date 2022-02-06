const { schedule } = require("@netlify/functions");
const Axios = require("axios");
const Webflow = require("webflow-api");
let token = "80a56e479ccf514f73136b8ba7cee4a60eda31282b0c42a3ff46974e598713be";
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

// To learn about scheduled functions and supported cron extensions,
// see: https://ntl.fyi/sched-func
module.exports.handler = schedule("* * * * *", async (event) => {
  const eventBody = JSON.parse(event.body);
  const webflow = new Webflow({ token: token });
  const info = await webflow.info();
  console.log(info);
  console.log(`Next function run at ${eventBody.next_run}.`);

  return {
    statusCode: 200,
  };
});
