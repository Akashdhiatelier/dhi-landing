"use client";
import React from "react";

function Search({ data, setData, allData }) {
  return (
    <div className="search">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        onChange={(e) => {
          if (e.target.value === "") {
            setData(allData);
          } else {
            setData(data.filter((d) => d.name.includes(e.target.value)));
          }
        }}
      />
      <img src="/images/search.svg" alt="search" />
    </div>
  );
}

export default Search;
