"use client";
import React, { useState, useRef } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ShareModal({ show, setShow }) {
  const SHARING_URL = typeof window !== "undefined" && window.location.href;
  const SHARING_TITLE = "DHI ATELIER";
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef(null);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    console.log("copy text to clipboard", inputRef.current.value);
    copyTextToClipboard(inputRef.current.value)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div>
            <div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                <img src="/images/modal-close.svg" />
              </button>
              <div className="modal-header d-none">
                <h1 className="modal-title fs-5" id="signUpLabel">
                  Share
                </h1>
              </div>
              <div className="modal-body p-0">
                <div className="row g-0">
                  <div className="col-lg-12">
                    <div className="login-wrapper">
                      <div className="welcome-content">
                        <h5>Share</h5>
                      </div>
                      <form autoComplete="off" autofill="off">
                        <div className="form-block">
                          <label className="active">Copy Link</label>
                          <div className="copy-form position-relative">
                            <input
                              type="text"
                              className="form-control"
                              value={SHARING_URL}
                              disabled
                              ref={inputRef}
                            />
                            <img
                              onClick={(e) => handleCopyClick(e.target.value)}
                              src="/images/copy-icon.svg"
                              className="copy-icon"
                            />
                          </div>
                        </div>
                      </form>
                      <p>Or</p>
                      <span>Share On</span>
                      <ul>
                        <li>
                          <FacebookShareButton url={SHARING_URL}>
                            <a>
                              <i className="fa-brands fa-facebook"></i>
                            </a>
                          </FacebookShareButton>
                        </li>
                        <li>
                          <LinkedinShareButton url={SHARING_URL}>
                            <a>
                              <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                          </LinkedinShareButton>
                        </li>
                        <li>
                          <WhatsappShareButton
                            url={SHARING_URL}
                            title={SHARING_TITLE}
                            separator=":: "
                          >
                            <a>
                              <i className="fa-brands fa-whatsapp"></i>
                            </a>
                          </WhatsappShareButton>
                        </li>
                        <li>
                          <TwitterShareButton
                            url={SHARING_URL}
                            title={SHARING_TITLE}
                          >
                            <a>
                              <i className="fa-brands fa-twitter"></i>
                            </a>
                          </TwitterShareButton>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-none">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <div>
        <div
          className="modal fade profile-modal"
          id="ShareModal"
          tabIndex="-1"
          aria-labelledby="ShareLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered w-auto modal-fullscreen-md-down">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <img src="/images/modal-close.svg" />
              </button>
              <div className="modal-header d-none">
                <h1 className="modal-title fs-5" id="signUpLabel">
                  Share
                </h1>
              </div>
              <div className="modal-body p-0">
                <div className="row g-0">
                  <div className="col-lg-12">
                    <div className="login-wrapper">
                      <div className="welcome-content">
                        <h5>Share</h5>
                      </div>
                      <form autoComplete="off" autofill="off">
                        <div className="form-block">
                          <label className="active">Copy Link</label>
                          <div className="copy-form position-relative">
                            <input
                              type="text"
                              className="form-control"
                              value={SHARING_URL}
                              disabled
                              ref={inputRef}
                            />
                            <img
                              onClick={(e) => handleCopyClick(e.target.value)}
                              src="/images/copy-icon.svg"
                              className="copy-icon"
                            />
                          </div>
                        </div>
                      </form>
                      <p>Or</p>
                      <span>Share On</span>
                      <ul>
                        <li>
                          <FacebookShareButton url={SHARING_URL}>
                            <a>
                              <i className="fa-brands fa-facebook"></i>
                            </a>
                          </FacebookShareButton>
                        </li>
                        <li>
                          <LinkedinShareButton url={SHARING_URL}>
                            <a>
                              <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                          </LinkedinShareButton>
                        </li>
                        <li>
                          <WhatsappShareButton
                            url={SHARING_URL}
                            title={SHARING_TITLE}
                            separator=":: "
                          >
                            <a>
                              <i className="fa-brands fa-whatsapp"></i>
                            </a>
                          </WhatsappShareButton>
                        </li>
                        <li>
                          <TwitterShareButton
                            url={SHARING_URL}
                            title={SHARING_TITLE}
                          >
                            <a>
                              <i className="fa-brands fa-twitter"></i>
                            </a>
                          </TwitterShareButton>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer d-none">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default ShareModal;
