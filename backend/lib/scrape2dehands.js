const db = require("diskdb");
const { parseString } = require("xml2js");
const { promisify } = require("util");

const parseStringAsync = promisify(parseString);

const axios = require("axios");

db.connect("./db", ["2dehands", "searches"]);
async function scrapeSearch(url) {
  const res = await axios.get(url);
  const json = res.data;
  console.log(json);
  if (!json.listings) {
    return []; // no items
  }
  const items = json.listings.map((item) => ({
    title: item.title,
    link: item.vipUrl,
    description: item.description,
    price: item.priceInfo.priceCents / 100,
    date: item.date,
    image: item.imageUrls[0],
    adId: item.itemId,
    nah: false,
    from: "2dehands",
  }));
  // save to DB
  items.forEach((item) => {
    // see if we already have it
    const existingItem = db.listings.findOne({ adId: item.adId });
    if (existingItem) {
      console.log(`Item ${item.adId} already in DB`);
      return;
    }
    const geg = db.listings.save(item);
    console.log(`Saved: ${geg._id}`);
  });

  return items;
}
async function scrape2dehands() {
  const searches = db.searches.find();
  console.log(searches);
  const scrapeSearches = searches.map((search) => scrapeSearch(search.feed));
  const allData = await Promise.all(scrapeSearches);
  return "2dehands Search Finished";
}

module.exports = scrape2dehands;
