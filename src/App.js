import React from "react";
import "./App.css";
import Page from "./components/Page";
import AddSearch from "./components/AddSearch";
import Listings from "./components/Listings";
import SearchesList from "./components/SearchesList";

function App() {
  return (
    <Page>
      <Listings />
      <AddSearch />
      <SearchesList />
    </Page>
  );
}

export default App;
