@app
begin-app

@static
folder build

@http
get /api
get /listings
post /listings
get /searches
post /searches

@tables
data
  scopeID *String
  dataID **String

@scheduled
scrape rate(6 hours)