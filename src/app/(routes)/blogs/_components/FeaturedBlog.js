import convertToCustomFormat from "@/utils/convertDate";
import React from "react";
import parse from "html-react-parser";
import Link from "next/link";
function FeaturedBlog({ data }) {
  return (
    <>
      <div className="col-md-12 col-lg-8">
        <Link href={`/blogs/${data.id}`}>
          <div className="project-wrapper">
            <div className="project-img">
              <img
                src={"/images/blog/blog-main.jpg" || data.featured_image}
                alt="project"
                className="w-100"
              />
              <span>{convertToCustomFormat(data.date)}</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-md-12 col-lg-4">
        <Link href={`/blogs/${data.id}`} className="text-decoration-none">
          <div className="project-wrapper">
            <div className="project-content">
              <h5>{data.title.rendered}</h5>
              {parse(data.excerpt.rendered)}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default FeaturedBlog;
