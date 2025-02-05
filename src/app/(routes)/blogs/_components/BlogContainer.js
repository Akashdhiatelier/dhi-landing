"use client";
import React, { useState, useEffect } from "react";
import BlogSearch from "./BlogSearch";
import BlogPost from "./BlogPost";
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import Pagination from "@/app/_components/commons/Pagination";
import { Alert, Spinner } from "react-bootstrap";
import FeaturedBlog from "./FeaturedBlog";
import generateKey from "@/utils/generateKeys";
import Search from "@/app/_components/commons/Search";

function BlogContainer() {
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [allPost, setAllPost] = useState([]);
  const [totalPost, setTotalPost] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchData, setSearchData] = useState(false);
  const queryClient = useQueryClient();
  const getAllProjects = async (pageIndex) => {
    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_WP_API_BASE_URL +
        process.env.NEXT_PUBLIC_WP_GET_BLOGS_URL +
        `&page=${pageIndex}&per_page=10`
    );
    return responseData;
  };

  //   https://dhiatelier.wingsts.com/wp-json/wp/v2/posts?_fields=id,slug,title,excerpt,date,featured_media&page=1&per_page=2 geta all blogs

  const {
    isLoading,
    isError,
    error,
    data: allBlogsData,
    isFetching,
    refetch,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["getAllBlogs", currentPageIndex],
    queryFn: () => getAllProjects(currentPageIndex),
    placeholderData: keepPreviousData,
    enabled: false,
  });

  useEffect(() => {
    console.log("all blog post data ", allBlogsData);
    if (!allBlogsData) return;
    setAllPost(allBlogsData.data);
    setTotalPost(allBlogsData.headers["x-wp-total"]);
    setTotalPages(allBlogsData.headers["x-wp-totalpages"]);
  }, [allBlogsData]);

  useEffect(() => {
    if (!searchData) return;
    setAllPost(searchData.data);
    setTotalPost(searchData.headers["x-wp-total"]);
    setTotalPages(searchData.headers["x-wp-totalpages"]);
  }, [searchData]);

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (!isSearching) {
      refetch();
    } else {
      queryClient.refetchQueries({
        queryKey: ["searchBlog", currentPageIndex],
        exact: true,
      });

      const data = queryClient.ensureQueryData({
        queryKey: ["searchBlog", currentPageIndex],
      });
    }
  }, [currentPageIndex]);
  useEffect(() => {
    console.log("is searching ", isSearching);
    refetch();
  }, [isSearching]);

  return (
    <>
      <section className="blog-list py-100">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="blog-search">
                <h6
                  className={
                    isError || isFetching || isLoading ? "invisible" : ""
                  }
                >
                  {allBlogsData && <>{totalPost} Blogs Listed</>}
                </h6>
                <BlogSearch
                  searchData={setSearchData}
                  setIsSearching={setIsSearching}
                  currentPageIndex={currentPageIndex}
                />
                {/* <Search data={} setData={} allData={} /> */}
              </div>
            </div>
          </div>
          <div className="row g-4">
            {(isLoading || isFetching) && (
              <div className="w-100 d-flex justify-content-center aligh-item-center">
                <Spinner
                  animation="border"
                  role="status"
                  size="lg"
                  variant="success"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            {isError && (
              <Alert variant="danger">
                Error loading project data {error.message}
              </Alert>
            )}

            {!isSearching ? (
              <>
                {console.log("allPost in render", allPost)}
                {allPost &&
                  allPost.map((blogData, i) => (
                    <React.Fragment key={generateKey(blogData.id)}>
                      {i === 0 ? (
                        <FeaturedBlog data={blogData} />
                      ) : (
                        <BlogPost data={blogData} />
                      )}
                    </React.Fragment>
                  ))}
              </>
            ) : (
              <>
                {allPost &&
                  allPost.map((blogData, i) => (
                    <React.Fragment key={generateKey(blogData.id)}>
                      <BlogPost data={blogData} />
                    </React.Fragment>
                  ))}
              </>
            )}
          </div>
          <div className="row">
            <div className="col-md-12">
              {allBlogsData && (
                <Pagination
                  totalPage={totalPages}
                  currentPage={currentPageIndex}
                  setCurrentPageIndex={setCurrentPageIndex}
                />
              )}
            </div>
          </div>
        </div>
        <div className="light-pattern-box left">
          <img src="/images/light-pattern-left.svg" alt="light" />
        </div>
      </section>
    </>
  );
}

export default BlogContainer;
