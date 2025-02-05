import Link from "next/link";
import React from "react";

function BlogFooter({ next, prev }) {
  console.log("next", next, "prev", prev);
  return (
    <div className="blog-prev-next">
      <div className="prev">
        <Link
          href={prev ? `/blogs/${prev}` : ""}
          // href={`/blogs/${prev}`}
          className={prev === null ? "disabled" : ""}
          aria-disabled={prev === null}
          disabled={prev === null}
          tabIndex={prev === null ? -1 : undefined}
        >
          <button disabled={next === null}>
            <img src="/images/left-arrow.svg" alt="left-arrow" />
          </button>
        </Link>
        <span>previous</span>
      </div>

      <div className="next">
        <Link
          href={next ? `/blogs/${next}` : ""}

          // style={{ cursor: "not-allowed" }}
        >
          <button>
            <img src="/images/right-arrow.svg" alt="right-arrow" />
          </button>
        </Link>
        <span>next</span>
      </div>
    </div>
  );
}

export default BlogFooter;
