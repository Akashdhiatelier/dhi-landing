"use client";
import React, { useState, useEffect } from "react";
import useAuthStore from "../../../_store/store";
import ProfilePicture from "../../commons/ProfilePicture";
import Dropdown from "react-bootstrap/Dropdown";
import Link from "next/link";

function UserDetails({ user, setShowProfile }) {
  const [hydrationLoad, setHydrationLoad] = useState(true);
  useEffect(() => {
    setHydrationLoad(false);
  }, []);
  const { removeToken, userInfo } = useAuthStore();
  const userData = userInfo ? JSON.parse(userInfo) : null;
  const handleLogout = () => {
    // Remove the token from local storage and the store
    console.log("logout");
    removeToken();
  };
  console.log("userInfo", userData);
  return (
    <>
      <>
        {userData && (
          <>
            <Dropdown className="user-detail-dropdown">
              <Dropdown.Toggle>
                <div className="user-dropdown-content bg-transparent">
                  <ProfilePicture
                    avatarUrl={userData.avatarUrl}
                    name={userData.firstName + " " + userData.lastName}
                  />

                  <div className="user-title">
                    <h6>{userData.firstName + " " + userData.lastName}</h6>
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  {" "}
                  <li
                    onClick={() => {
                      setShowProfile(true);
                    }}
                  >
                    <a
                      className="dropdown-item"
                      href="my-profile.html"
                      data-bs-toggle="modal"
                      data-bs-target="#ProfileModal"
                    >
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.7339 9.9171C11.9245 8.80323 10.804 7.95839 9.49413 7.47419L9.37921 7.43194L9.47876 7.36194C10.0049 6.99129 10.4419 6.50129 10.7419 5.94516C11.0522 5.37032 11.2159 4.72226 11.2159 4.07097C11.2159 1.82613 9.32476 0 7 0C4.67524 0 2.78376 1.82613 2.78376 4.07097C2.78376 4.72226 2.94779 5.37032 3.2578 5.94516C3.55813 6.50129 3.99475 6.99129 4.52124 7.36194L4.62045 7.43194L4.50587 7.47419C3.19567 7.95839 2.07555 8.80323 1.26577 9.9171C0.437625 11.0568 0 12.3958 0 13.7897C0 15.0084 1.02658 16 2.28868 16H11.711C12.9731 16 14 15.0084 14 13.7897C14 12.3958 13.562 11.0568 12.7339 9.9171ZM3.93529 4.07097C3.93529 2.43903 5.30996 1.11161 7 1.11161C8.69004 1.11161 10.0647 2.43903 10.0647 4.07097C10.0647 5.7029 8.69004 7.03032 7 7.03032C5.30996 7.03032 3.93529 5.7029 3.93529 4.07097ZM11.711 14.8881H2.28868C1.66164 14.8881 1.15119 14.3955 1.15119 13.7897C1.15119 10.6755 3.77494 8.14194 7 8.14194C10.2251 8.14194 12.8488 10.6755 12.8488 13.7897C12.8488 14.3955 12.3384 14.8881 11.711 14.8881Z" />
                      </svg>
                      My Profile
                    </a>
                  </li>
                </Dropdown.Item>
                <Dropdown.Item>
                  {" "}
                  <li>
                    <Link className="dropdown-item " href="/projects/saved">
                      <svg
                        width="14"
                        height="12"
                        viewBox="0 0 14 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.8752 1.1418C11.3526 -0.380395 8.87563 -0.380395 7.35343 1.1418L6.99987 1.49516L6.64652 1.1418C5.12432 -0.380601 2.64714 -0.380601 1.12494 1.1418C-0.366352 2.6331 -0.376036 4.99696 1.10248 6.64051C2.45099 8.13901 6.42812 11.3765 6.59686 11.5135C6.71142 11.6066 6.84926 11.6519 6.98627 11.6519C6.99081 11.6519 6.99534 11.6519 6.99967 11.6517C7.14142 11.6583 7.2842 11.6097 7.40247 11.5135C7.57121 11.3765 11.5487 8.13902 12.8977 6.6403C14.376 4.99696 14.3663 2.6331 12.8752 1.1418ZM11.9787 5.81348C10.9273 6.9815 8.03727 9.39048 6.99967 10.2453C5.96206 9.39069 3.07261 6.98191 2.02141 5.81369C0.989987 4.6673 0.980304 3.03466 1.99895 2.01602C2.51919 1.49598 3.20241 1.23576 3.88563 1.23576C4.56884 1.23576 5.25206 1.49577 5.77231 2.01602L6.54948 2.79319C6.64199 2.8857 6.7586 2.94092 6.88099 2.96028C7.07961 3.00293 7.29512 2.94751 7.44965 2.79339L8.22723 2.01602C9.26792 0.975738 10.9607 0.975944 12.0008 2.01602C13.0194 3.03466 13.0098 4.6673 11.9787 5.81348Z"
                          fill="white"
                        />
                      </svg>
                      Saved Project
                    </Link>
                  </li>
                </Dropdown.Item>
                <Dropdown.Item>
                  <li onClick={() => handleLogout()}>
                    <a className="dropdown-item">
                      <svg
                        width="12"
                        height="14"
                        viewBox="0 0 12 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.5 9.50001C4.4 9.60001 4.3 9.70001 4.3 9.90001C4.3 10 4.4 10.2 4.5 10.3C4.6 10.4 4.7 10.5 4.9 10.5C5 10.5 5.2 10.4 5.3 10.3L8.2 7.40001C8.4 7.20001 8.4 6.90001 8.2 6.70001L5.2 3.80001C5.1 3.70001 5 3.60001 4.8 3.60001C4.7 3.60001 4.5 3.70001 4.4 3.80001C4.3 4.00001 4.3 4.30001 4.5 4.50001L6.6 6.60001H0.6C0.2 6.50001 0 6.70001 0 7.00001C0 7.30001 0.2 7.50001 0.5 7.50001H6.5L4.5 9.50001Z"
                          fill="white"
                        />
                        <path
                          d="M12 2.5C12 2.1 11.9 1.7 11.7 1.4C11.5 1 11 0.5 10.5 0.3C10.3 0.1 9.9 0.1 9.5 0C9.1 0 8.6 0 8.1 0H5C4.7 0 4.5 0.2 4.5 0.5C4.5 0.8 4.7 1 5 1H8C8.6 1 9 1 9.4 1C9.7 1 9.9 1.1 10.1 1.1C10.4 1.3 10.7 1.5 10.8 1.8C10.9 2 10.9 2.2 10.9 2.5C10.9 2.8 10.9 3.3 10.9 3.9V10C10.9 10.6 10.9 11 10.9 11.4C10.9 11.7 10.8 11.9 10.8 12.1C10.6 12.4 10.4 12.7 10.1 12.8C9.9 12.9 9.7 12.9 9.4 12.9C9.1 12.9 8.6 12.9 8 12.9H5C4.7 12.9 4.5 13.1 4.5 13.4C4.5 13.8 4.7 14 5 14H8C8.6 14 9.1 14 9.4 14C9.8 14 10.2 13.9 10.5 13.7C11 13.4 11.4 13 11.7 12.5C11.8 12.2 11.9 11.9 12 11.4C12 11 12 10.6 12 10V3.9C12 3.4 12 2.9 12 2.5Z"
                          fill="white"
                        />
                      </svg>
                      Logout
                    </a>
                  </li>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
      </>
    </>
  );
}

export default UserDetails;
