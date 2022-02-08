const { schedule } = require("@netlify/functions");
const Webflow = require("webflow-api");
let token = "bdb47ad338896ff91f7d7a64236a91640ecf45826e9cb24f604d69b11ed9eb87";
let premarketing = "faf5343f14cfcc39adb217cba0b6e09a";
let presale = "ea681c7f1035ae95aba5677845e3eb09";

let dateCompare = (d1) => {
  const date1 = new Date(d1);
  const date2 = new Date();
  if (date1 > date2) {
    return false;
  } else if (date1 < date2) {
    return true;
  } else {
    return true;
  }
};

// To learn about scheduled functions and supported cron extensions,
// see: https://ntl.fyi/sched-func
module.exports.handler = schedule("0 0 13 * * ?", async (event) => {
  const eventBody = JSON.parse(event.body);
  console.log(`Next function run at ${eventBody.next_run}.`);
  let data_id = "6200494f4003ab206ae2aacf";
  // let item_id = "6200494f4003ab5b28e2af5e";
  const webflow = new Webflow({ token: token });
  let queryData = async (i) => {
    console.log("OFFSET ", i);
    let queredData = await webflow.items(
      { collectionId: data_id },
      { limit: 100, offset: i }
    );
    return queredData.items;
  };
  let concatedArray = [];
  const allItems = await webflow.items(
    {
      collectionId: data_id,
    },
    { limit: 1 }
  );
 

  const allItemsCount = Math.floor(allItems.total / 100);
  console.log(allItemsCount);
  for (let i = 0; i < allItemsCount; i++) {

    let queredDataInLoop = await queryData(i * 100);
    concatedArray = concatedArray.concat(queredDataInLoop);

  }
  console.log(concatedArray.length, "FINAL LENGHT");

  let itemsToChange = concatedArray.filter((item) => {
    if (item["presale-start-date-2"]) {
      let slicedDate = item["presale-start-date-2"].slice(0, 10);
      return dateCompare(slicedDate);
    }
  });

  for (let currentItem of itemsToChange) {
    const patchedItem = await webflow.patchItem({
      collectionId: data_id,
      itemId: `${currentItem._id}`,
      fields: {
        "studio-flag": presale,
      },
    });

  }

  return {
    statusCode: 200,
  };
});
