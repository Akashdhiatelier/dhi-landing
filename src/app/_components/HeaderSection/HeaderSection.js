"use client";
import React, { useEffect, useState, useRef } from "react";
import ProfileModal from "./ProfileModal";
import Link from "next/link";
import LoginModal from "../Modals/LoginModal";
import useAuthStore from "../../_store/store";
import UserDetails from "./components/UserDetails";
import { useSearchParams } from "next/navigation";

function HeaderSection() {
  const { userInfo } = useAuthStore();
  const [hydrationLoad, setHydrationLoad] = useState(true);
  const [user, setUser] = useState(null);

  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get("login");
    if (search === "true") {
      setShowLogin(true);
    }
  }, [searchParams]);

  useEffect(() => {
    setHydrationLoad(false);
  }, []);

  useEffect(() => {
    setUser(JSON.parse(userInfo));
  }, [userInfo]);

  return (
    <>
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <nav className="navbar navbar-expand-lg custom-navbar">
                <Link className="navbar-brand custom-navbar-brand" href="/">
                  <img src="/images/logo.png" alt="logo" />
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <div className="menu btn12" data-menu="12">
                    <div className="icon"></div>
                  </div>
                </button>
                <div
                  className="collapse navbar-collapse custom-collapse"
                  id="navbarNav"
                >
                  <ul className="navbar-nav nav">
                    <li className="nav-item">
                      <Link className="nav-link" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/assets">
                        Assets
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/projects">
                        Projects
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/#our-clients">
                        Our Clients
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/contact">
                        Contact
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <a className="nav-link" href="/blogs">
                        Blog
                      </a>
                    </li> */}
                  </ul>
                  <div className="d-block d-lg-none  mt-3 mt-lg-0">
                    <a
                      className="primary-btn contact-btn nav-link"
                      data-bs-toggle="modal"
                      data-bs-target="#signUpModal"
                    >
                      Sign Up
                    </a>
                    <a
                      className="primary-btn contact-btn nav-link"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Login
                    </a>
                  </div>
                </div>
                {!hydrationLoad && (
                  <>
                    {!userInfo ? (
                      <div className="d-none d-lg-block">
                        <button
                          // ref={loginRef}
                          onClick={() => setShowLogin(true)}
                          className="primary-btn contact-btn nav-link"
                          data-bs-toggle="modal"
                          data-bs-target="#loginModal"
                        >
                          Login
                        </button>
                      </div>
                    ) : (
                      <UserDetails
                        user={user}
                        setShowProfile={setShowProfile}
                      />
                    )}
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      </header>
      <LoginModal show={showLogin} setShow={setShowLogin} />
      <ProfileModal showProfile={showProfile} setShowProfile={setShowProfile} />
    </>
  );
}

export default HeaderSection;
