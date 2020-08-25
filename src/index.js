import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { endpoint } from "./config";

const ListingsContext = React.createContext();

function useListings() {
  const [listings, setListings] = useState([]);
  async function fetchListings() {
    try {
      console.log("Re-running fetch listings");
      const { listings: data } = await (
        await fetch(`${endpoint}/listings`)
      ).json();
      setListings(data);
    } catch (err) {
      console.error("failed fetch", err);
    }
  }
  // fetch the listings on component mount
  useEffect(() => {
    fetchListings();
  }, []);
  // expose the fetch function so we can manually call it on click
  return { listings, fetchListings };
}

function Data({ children }) {
  const { listings, fetchListings } = useListings();
  // const [listings, updateListings] = useState(['hey']);
  return (
    <ListingsContext.Provider
      value={{
        listings,
        fetchListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Data>
      <App />
    </Data>
  </React.StrictMode>,
  document.getElementById("root")
);

export { ListingsContext };
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
