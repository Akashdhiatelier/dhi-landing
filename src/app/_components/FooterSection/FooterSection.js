"use client";
import React, { useEffect, useState } from "react";
import CopyrightSection from "../CopyrightSection/CopyrightSection";
import FollowUs from "../commons/FollowUs";
import Link from "next/link";

function FooterSection() {
  // todo high light active one

  // const [isMounted, setMounted] = useState(false);

  // useEffect(() => {
  //   if (window) {
  //     const currentPath = window.location.hash
  //       ? window.location.hash.split("#")[1]
  //       : window.location.href.split("/")[3];
  //     console.log("current path", currentPath);
  //   }
  // }, []);

  return (
    <>
      <footer>
        <div className="container">
          <div className="row g-4 g-md-5">
            <div className="col-md-6 col-xl-4">
              <div className="footer-block">
                <img src="/images/logo.png" alt="logo" />
                <p>
                For inquiries, collaborations, or consultations, please reach out through the following
                channels:
                </p>
                <FollowUs />
              </div>
            </div>
            <div className="col-md-6 col-xl-2">
              <div className="footer-block">
                <h5>Company</h5>
                <ul>
                  <li>
                    <Link href="/#our-clients">Our Clients</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link href="/blogs" className="active">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-xl-2">
              <div className="footer-block">
                <h5>Quick Links</h5>
                <ul>
                  <li>
                    <Link href="/projects">Projects</Link>
                  </li>
                  <li>
                    <Link href="/assets">Assets</Link>
                  </li>
                  <li>
                    <Link href="">Login</Link>
                  </li>
                  <li>
                    <Link href="">Sign Up</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-xl-4">
              <div className="footer-block address-block">
                <h5>Contact</h5>
                <div className="mb-2 mb-md-3 md-lg-4">
                  <span className="footer-subtitle">Address</span>
                  <p>806, Nandan Pro Biz, 1501, Sai Chowk Rd,</br>
                  Laxman Nagar, Balewadi, Pune, Maharashtra, India 411045</p>
                </div>
                <div className="mb-2 mb-md-3 md-lg-4">
                  <span className="footer-subtitle">Call</span>
                  <a href="tel:+91 78755 27848">+91 78755 27848</a>
                </div>
                <div>
                  <span className="footer-subtitle">Email</span>
                  <a href="mailto:akash.jadhav@dhiatelier.com">akash.jadhav@dhiatelier.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <CopyrightSection />
    </>
  );
}

export default FooterSection;
