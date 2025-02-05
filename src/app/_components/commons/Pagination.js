import React from "react";

function Pagination({ totalPage, currentPage, setCurrentPageIndex }) {
  totalPage = Number(totalPage);
  currentPage = Number(currentPage);
  const renderList = () => {
    let container = [];
    let arr = Array(totalPage)
      .fill()
      .map((_, index) => index + 1);
    arr.forEach((val, index) => {
      container.push(
        <li
          key={index}
          onClick={() => {
            setCurrentPageIndex(index + 1);
          }}
        >
          <a className={currentPage === index + 1 ? "active" : ""}>
            {arr[index]}
          </a>
        </li>
      );
    });
    return container;
  };
  return (
    <>
      {totalPage > 1 && (
        <>
          <div className="row">
            <div className="col-md-12">
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => {
                    setCurrentPageIndex(currentPage - 1);
                  }}
                  disabled={currentPage === 1}
                >
                  <img src="/images/left-arrow.svg" alt="left-arrow" />
                </button>
                <ul>{renderList()}</ul>
                <button
                  disabled={currentPage === totalPage}
                  className="pagination-btn"
                  onClick={() => {
                    setCurrentPageIndex(currentPage + 1);
                  }}
                >
                  <img src="/images/right-arrow.svg" alt="right-arrow" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Pagination;
