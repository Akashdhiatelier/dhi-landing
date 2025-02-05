import convertToCustomFormat from "@/utils/convertDate";
import React from "react";
import Link from "next/link";

function BlogPost({ data }) {
  return (
    <div className="col-md-6 col-lg-4">
      <Link href={`/blogs/${data.id}`} className="text-decoration-none">
        <div className="project-wrapper">
          <div className="project-img">
            <img
              src={
                data.featured_media_url
                  ? data.featured_media_url
                  : "/images/blog/blog_09.jpg"
              }
              alt="project"
              className="img-fluid"
            />
            {/* <span>23rd OCT, 2023</span> */}
            {}
            <span>{convertToCustomFormat(data.date)}</span>
          </div>
          <div className="project-content">
            {/* <h5>Lorem Ipsum is simply dummy text of the printing.</h5> */}
            <h5>{data.title.rendered}</h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogPost;
