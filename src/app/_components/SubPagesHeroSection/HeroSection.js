"use client";
import React, { useState, useEffect } from "react";
import generateKey from "@/utils/generateKeys";
import Link from "next/link";

// /images/breadcrumb/contact-breadcrumb.jpg
function HeroSection({ breadcrumsArr, headingText, bgImagePath }) {
  const [hydrationLoad, setHydrationLoad] = useState(true);
  useEffect(() => {
    setHydrationLoad(false);
  }, []);
  return (
    <>
      {!hydrationLoad && (
        <>
          <section
            className="asset-listing-breadcrumb breadcrumb mb-0"
            style={{ backgroundImage: `url("${bgImagePath}")` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="bread-content">
                    <ul>
                      {breadcrumsArr &&
                        breadcrumsArr.map((breadcrum) => (
                          <li key={generateKey(breadcrum.text)}>
                            <Link
                              className={breadcrum.isActive ? "active" : ""}
                              href={breadcrum.link}
                            >
                              {breadcrum.text}
                            </Link>
                          </li>
                        ))}
                    </ul>
                    <h1>{headingText}</h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default HeroSection;
