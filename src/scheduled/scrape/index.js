const data = require("@begin/data");
const axios = require("axios");

const table = "listings";

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
  items.forEach(async (item) => {
    // see if we already have it
    const existingItem = await data.get({ table, adId: item.adId });
    if (existingItem) {
      console.log(`Item ${item.adId} already in DB`);
      return;
    }
    const geg = data.set(item);
    console.log(`Saved: ${geg.key}`);
  });

  return items;
}

exports.handler = async function scheduled(event) {
  console.log(JSON.stringify(event, null, 2));

  const searches = await data.get({
    table: "searches",
  });

  const scrapeSearches = searches.map((search) => scrapeSearch(search.feed));
  await Promise.all(scrapeSearches);
  return "2dehands Search Finished";
};
