import React from "react";
import { useState, useEffect } from "react";

import { endpoint } from "../config";

function useSearches() {
  const [searches, setSearches] = useState([]);
  useEffect(() => {
    (async () => {
      const { searches: data } = await (
        await fetch(`${endpoint}/searches`)
      ).json();
      setSearches(data);
    })();
  }, []);
  return { searches };
}

export default function SearchesList() {
  const { searches } = useSearches();
  return (
    <div>
      <h3>Currently Tracking:</h3>
      {searches.map((search) => (
        <div key={search.key}>
          <a href={search.feed}>{search.name}</a>
        </div>
      ))}
    </div>
  );
}
