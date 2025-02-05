import generateKey from "@/utils/generateKeys";
import React, { memo } from "react";

function Filter({ data, setData }) {
  let allTags = [];
  data.map((d) => {
    let tags = d.tags.split(",");
    tags.forEach((element) => {
      allTags.push(element);
    });
  });
  allTags = [...new Set(allTags)];
  return (
    <>
      <select
        className="form-select filter-dropdown"
        onChange={(e) => {
          if (e.target.value === "All") {
            setData(data);
          } else {
            setData(
              data.filter((project) => project.tags.includes(e.target.value))
            );
          }
        }}
      >
        <option defaultValue="">All</option>

        {allTags.map((tag) => (
          <option key={generateKey(tag)} value={tag}>
            {tag[0].toUpperCase() + tag.slice(1)}
          </option>
        ))}
      </select>
    </>
  );
}

{
  /* <select className="form-select nice-select-form">
              <option selected="">Select</option>
              <option value="1">California</option>
              <option value="2">Texas</option>
              <option value="3">Florida</option>
            </select> */
}
{
  /* <div className="search">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <img src="images/search.svg" alt="search" />
            </div> */
}

export default memo(Filter);
