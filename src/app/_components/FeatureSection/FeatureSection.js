"use client";
import React, { useRef } from "react";
import AssetSection from "../AssetsSection/AssetSection";
import ModelViewer3d from "../commons/ModelViewer3d";

function FeatureSection() {
  return (
    <>
      <section className="feature py-100">
        <div className="container">
          <div className="row g-5 align-items-center flex-column-reverse flex-lg-row">
            <div className="col-md-12 col-lg-6">
              <div className="section-title-content">
                <span>Features</span>
                <h2>Lorem Ipsum is dummy text</h2>
                <p>
                  Lorem Ipsum has been the industrys standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a specimen book.
                </p>
              </div>
              <div className="row g-5">
                <div className="col-md-12 col-lg-6">
                  <div className="feature-block">
                    <img src="/images/feature-cube.svg" alt="cube" />
                    <h3>Lorem Ipsum</h3>
                    <p>
                      Lorem Ipsum has been the industrys standard dummy text
                      ever since the 1500s, when an unknown printer took a
                      galley of type.
                    </p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="feature-block">
                    <img src="/images/feature-cube.svg" alt="cube" />
                    <h3>Lorem Ipsum</h3>
                    <p>
                      Lorem Ipsum has been the industrys standard dummy text
                      ever since the 1500s, when an unknown printer took a
                      galley of type.
                    </p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="feature-block">
                    <img src="/images/feature-cube.svg" alt="cube" />
                    <h3>Lorem Ipsum</h3>
                    <p>
                      Lorem Ipsum has been the industrys standard dummy text
                      ever since the 1500s, when an unknown printer took a
                      galley of type.
                    </p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="feature-block">
                    <img src="/images/feature-cube.svg" alt="cube" />
                    <h3>Lorem Ipsum</h3>
                    <p>
                      Lorem Ipsum has been the industrys standard dummy text
                      ever since the 1500s, when an unknown printer took a
                      galley of type.
                    </p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="feature-block">
                    <img src="/images/feature-cube.svg" alt="cube" />
                    <h3>Lorem Ipsum</h3>
                    <p>
                      Lorem Ipsum has been the industrys standard dummy text
                      ever since the 1500s, when an unknown printer took a
                      galley of type.
                    </p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="feature-block">
                    <img src="/images/feature-cube.svg" alt="cube" />
                    <h3>Lorem Ipsum</h3>
                    <p>
                      Lorem Ipsum has been the industrys standard dummy text
                      ever since the 1500s, when an unknown printer took a
                      galley of type.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-6">
              <div className="feature-image-block position-relative">
                {/* <img
                  src="/images/features.png"
                  alt="feature"
                  className="img-fluid"
                /> */}
                <ModelViewer3d modelPath={"/glbs/isometric_room.glb"} />
                {/* <div className="rotate-block">
                  <img src="images/rotate.png" alt="roate" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="light-pattern-box left">
          <img src="/images/light-pattern-left.svg" alt="light" />
        </div>
      </section>
      <AssetSection />
    </>
  );
}

export default FeatureSection;
