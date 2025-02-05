"use client";
import React from "react";
import {
  useQuery,
  keepPreviousData,
  useQueryClient,
} from "@tanstack/react-query";
import { Alert, Spinner } from "react-bootstrap";
import BlogPost from "@/app/(routes)/blogs/_components/BlogPost";
import axios from "axios";
import generateKey from "@/utils/generateKeys";
import Link from "next/link";

function BlogSection() {
  //   https://dhiatelier.wingsts.com/wp-json/wp/v2/posts?_fields=id,slug,title,excerpt,date,featured_media&page=1&per_page=2 geta all blogs
  const getAllProjects = async () => {
    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_WP_API_BASE_URL +
      process.env.NEXT_PUBLIC_WP_GET_BLOGS_URL +
      `&page=${1}&per_page=3`
    );
    return responseData;
  };

  const {
    isLoading,
    isError,
    error,
    data: allBlogsData,
    isFetching,
    refetch,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["getAllBlogs"],
    queryFn: () => getAllProjects(),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <section className="blogs py-100 position-relative">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title-content">
                <span>Blogs</span>
                <h2>Lorem Ipsum is dummy text of the printing</h2>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <h3 className="text-center" style={{ color: "#d5bb97" }}>Comming soon...</h3>

            {/* {(isLoading || isFetching) && (
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
            )} */}

            {/* {isError && (
              <Alert variant="danger">
                Error loading project data {error.message}
              </Alert>
            )} */}

            {allBlogsData &&
              allBlogsData.data.map((blogData, i) => (
                <React.Fragment key={generateKey(blogData.id)}>
                  <BlogPost data={blogData} />
                </React.Fragment>
              ))}
          </div>
          {/* <div className="row">
            <div className="col-md-12">
              <div className="button-block text-center">
                <Link href={"/blogs"} className="text-decoration-none">
                  <button className="view-btn">view all blogs</button>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
        <div className="light-pattern-box left">
          <img src="/images/light-pattern-left.svg" alt="light" />
        </div>
      </section>
    </>
  );
}

export default BlogSection;
