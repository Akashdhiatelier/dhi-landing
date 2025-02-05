"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import HeroSection from "@/app/_components/SubPagesHeroSection/HeroSection";
import BlogContent from "./_components/BlogContent";
import NewsLetterSection from "@/app/_components/NewsletterSection/NewsLetterSection";
import BlogFooter from "./_components/BlogFooter";

const BG_IMAGE = "/images/breadcrumb/blog-breadcrumb.jpg";

function Page({ params }) {
  // Fetching function
  const getPostById = async () => {
    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_WP_API_BASE_URL +
        process.env.NEXT_PUBLIC_WP_GET_BLOGS_BY_ID +
        `${params.blogId}`
    );
    return responseData;
  };

  // React Query hook

  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: blogData,
  } = useQuery({
    queryKey: ["getPostById"],
    queryFn: getPostById,
    // retry: 500,
  });

  console.log("blogData", blogData);
  return (
    <>
      <HeroSection
        breadcrumsArr={[
          { text: "Home", link: "/", isActive: false },
          { text: "Blog", link: "/blogs", isActive: false },
          {
            text: "Blog Details",
            link: `/blogs/${params.blogId}`,
            isActive: true,
          },
        ]}
        headingText={"Blog Details"}
        bgImagePath={BG_IMAGE}
      />
      <div className="blog-list">
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
      </div>
      {blogData && blogData?.data && <BlogContent data={blogData.data} />}

      <NewsLetterSection />
    </>
  );
}

export default Page;
