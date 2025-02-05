"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useDebounce from "../_hooks/useDebounce";

function BlogSearch({ setIsSearching, currentPageIndex, searchData }) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  const searchBlogPost = async (searchTerm) => {
    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_WP_API_BASE_URL +
        process.env.NEXT_PUBLIC_WP_SEARCH_BLOG_API_URL +
        "?_fields=id,title,date,featured_media_url" +
        `&page=${currentPageIndex}&per_page=9` +
        `&search=${searchTerm}`
    );
    return responseData;
  };

  const {
    isLoading,
    isError,
    error,
    data: searchedResult,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["searchBlog", currentPageIndex],
    queryFn: () => searchBlogPost(debouncedSearch),
    enabled: false,
  });

  useEffect(() => {
    console.log("debounced search", debouncedSearch);

    if (!debouncedSearch) return;
    refetch();
    setIsSearching(true);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!searchedResult) {
      return;
    }
    // console.log("search resukts ,", searchedResult);

    searchData(searchedResult);
  }, [searchedResult]);

  return (
    <>
      <div className="search">
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Search"
        />
        <img src="/images/search.svg" alt="search" />
      </div>
    </>
  );
}

export default BlogSearch;
