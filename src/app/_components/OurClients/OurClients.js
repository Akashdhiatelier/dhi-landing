import React from "react";

function OurClients() {
  return (
    <>
      <section className="client py-100 position-relative" id="our-clients">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <div className="section-title-content">
                <span>Our Clients</span>
                <h2>Lorem Ipsum is dummy text of the printing</h2>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-md-6">
              <div className="client-content">
                <div className="client-review">
                  <img src="/images/quote.svg" alt="quote" />
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </div>

                <div className="client-detail">
                  <img src="/images/client-logo.svg" alt="client" />
                  <h5>Person Name</h5>
                  <p>Person Designation</p>
                </div>

                <button className="btn client-btn">view all clients</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="client-image">
                <img
                  src="/images/client.png"
                  className="img-fluid"
                  alt="client"
                />
              </div>
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

export default OurClients;
