import React from "react";

function HowItWorks() {
  return (
    <>
      <section className="work py-100 position-relative">
        <div className="container-fluid p-0">
          <div className="row g-0">
            <div className="col-xl-7 col-md-12">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="step1-tab-pane"
                  role="tabpanel"
                  aria-labelledby="step1-tab"
                  tabIndex="0"
                >
                  <div className="work-image position-relative">
                    <img
                      src="/images/works.jpg"
                      alt="work"
                      className="img-fluid"
                    />
                    <div className="rotate-block">
                      <img src="/images/rotate.png" alt="roate" />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="step2-tab-pane"
                  role="tabpanel"
                  aria-labelledby="step2-tab"
                  tabIndex="0"
                >
                  <div className="work-image">
                    <img
                      src="/images/works.jpg"
                      alt="work"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="step3-tab-pane"
                  role="tabpanel"
                  aria-labelledby="step3-tab"
                  tabIndex="0"
                >
                  <div className="work-image">
                    <img
                      src="/images/works.jpg"
                      alt="work"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="step4-tab-pane"
                  role="tabpanel"
                  aria-labelledby="step4-tab"
                  tabIndex="0"
                >
                  <div className="work-image">
                    <img
                      src="/images/works.jpg"
                      alt="work"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-12">
              <div className="work-content">
                <div className="section-title-content">
                  <span>How it Works</span>
                  <h2>Lorem Ipsum is dummy text of the printing</h2>
                </div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="step1-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#step1-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="step1-tab-pane"
                      aria-selected="true"
                    >
                      <span>Step 1</span>
                      <h5>Lorem is dummy text.</h5>
                      <p>
                        Lorem Ipsum has been the industrys standard dummy text
                        ever since the 1500s, when an unknown printer took a
                        galley of type and scrambled it to make a type specimen
                        book.
                      </p>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="step2-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#step2-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="step2-tab-pane"
                      aria-selected="false"
                    >
                      <span>Step 2</span>
                      <h5>Lorem is dummy text.</h5>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="step3-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#step3-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="step3-tab-pane"
                      aria-selected="false"
                    >
                      <span>Step 3</span>
                      <h5>Lorem is dummy text.</h5>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="step4-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#step4-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="step4-tab-pane"
                      aria-selected="false"
                    >
                      <span>Step 4</span>
                      <h5>Lorem is dummy text.</h5>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="light-pattern-box right">
          <img src="/images/light-pattern-right.svg" alt="light" />
        </div>
      </section>
    </>
  );
}

export default HowItWorks;
