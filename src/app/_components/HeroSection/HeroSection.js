import React from "react";

function HeroSection() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title-content text-center">
                <h1>Lorem Ipsum is dummy text of the printing</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <button>
                  <svg
                    width="22"
                    height="24"
                    viewBox="0 0 22 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11 24C10.6161 24 10.2322 23.8627 9.93931 23.5881L0.939343 15.1506C0.353552 14.6015 0.353552 13.711 0.939343 13.1618C1.52513 12.6127 2.47487 12.6127 3.06067 13.1618L9.5 19.1987L9.5 1.44C9.5 0.644737 10.1716 0 11 0C11.8284 0 12.5 0.644736 12.5 1.44L12.5 19.1987L18.9393 13.1618C19.5251 12.6127 20.4749 12.6127 21.0607 13.1618C21.6464 13.711 21.6464 14.6014 21.0607 15.1506L12.0607 23.5881C11.7678 23.8627 11.3839 24 11 24Z"
                      fill="#D5BA98"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
