const cron = require("node-cron");
const scrapeListings = require("./scrapeListings");
const scrape2deHands = require("./scrape2dehands");
const scrapeFacebookListings = require("./scrapeFacebook");

// every 3 mins
cron.schedule("*/3 * * * *", async () => {
  scrape2deHands();
  //scrapeListings();
  //scrapeFacebookListings();
  console.log("Done scrapes!");
});
