const { schedule } = require("@netlify/functions");
const Axios = require("axios");
const Webflow = require("webflow-api");
let token = "80a56e479ccf514f73136b8ba7cee4a60eda31282b0c42a3ff46974e598713be";
let presale = "a11c30f51c9513e981c789855d95aadf"
let premarketing = "03047f81538f39913e74b08374d2f344"
let openlocation = "be118a3cb31f7e7ca424b2dbcb98461a"
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};

// To learn about scheduled functions and supported cron extensions,
// see: https://ntl.fyi/sched-func
module.exports.handler = schedule("* * * * *", async (event) => {
  // const eventBody = JSON.parse(event.body);
  // console.log(`Next function run at ${eventBody.next_run}.`);
  let data_id = "61ffe6dd32d8317e817c834f"
  const webflow = new Webflow({ token: token });
  const info = await webflow.updateItem({collectionId: data_id, itemId: "61fff2a53387fe00f4549204", fields: {
    "status": presale
  }});
  console.log(info);

  return {
    statusCode: 200,
  };
});
