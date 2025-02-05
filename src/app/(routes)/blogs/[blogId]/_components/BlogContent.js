import convertToCustomFormat from "@/utils/convertDate";
import React from "react";
import parse from "html-react-parser";
import BlogShareBar from "./BlogShareBar";
import BlogFooter from "./BlogFooter";

function BlogContent({ data }) {
  console.log("blogData", data);
  return (
    <>
      {data && (
        <section className="blog-list py-100">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="blog-details">
                  <span>{convertToCustomFormat(data.date)}</span>
                  <h2>Lorem Ipsum is simply dummy text of the printing</h2>
                  <img
                    src="/images/blog-details.jpg"
                    alt="blog"
                    className="img-fluid"
                  />
                  <div className="blog-content-wrapper">
                    <div className="blog-content">
                      {parse(data.content.rendered)}
                    </div>
                    <BlogShareBar />
                  </div>
                  <BlogFooter
                    next={data.next_post_id}
                    prev={data.previous_post_id}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="light-pattern-box left">
            <img src="/images/light-pattern-left.svg" alt="light" />
          </div>
        </section>
      )}
    </>
  );
}

export default BlogContent;
