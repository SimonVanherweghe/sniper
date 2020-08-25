let arc = require("@architect/functions");
let data = require("@begin/data");

exports.handler = async function post(req) {
  let listing = arc.http.helpers.bodyParser(req); // Base64 decodes + parses body
  listing.created = listing.created || Date.now();

  await data.set({
    table: "listings",
    ...listing,
  });
  return {
    statusCode: 302,
    headers: {
      location: "/",
      "cache-control":
        "no-cache, no-store, must-revalidate, max-age=0, s-maxage=0",
    },
  };
};
