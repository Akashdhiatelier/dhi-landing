import React from "react";

function SignupModal() {
  return (
    <>
      <div
        className="modal fade"
        id="signUpModal"
        tabIndex="-1"
        aria-labelledby="signUpLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-md-down">
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
                Modal title
              </h1>
            </div>
            <div className="modal-body p-0">
              <div className="row g-0">
                <div className="col-sm-12 col-lg-6">
                  <div className="modal-img">
                    <img
                      src="/images/modal-login.jpg"
                      alt="login"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                  <div className="login-wrapper">
                    <div className="welcome-content">
                      <h5>Sign Up</h5>
                    </div>
                    <form autoComplete="off" autofill="off">
                      <div className="form-block">
                        <label className="active">Full Name*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter full name"
                        />
                      </div>

                      <div className="form-block">
                        <label>Email*</label>
                        <div className="pwd-form">
                          <input
                            type="email"
                            className="form-control default-form"
                            placeholder="Enter email"
                            required
                          />
                          <img
                            src="/images/eye-icon.svg"
                            alt="eye"
                            className="eye-icon"
                          />
                        </div>
                      </div>

                      <div className="form-block">
                        <label>password*</label>
                        <div className="pwd-form">
                          <input
                            type="password"
                            className="form-control default-form"
                            placeholder="Enter password"
                            required
                          />
                          <img
                            src="/images/eye-icon.svg"
                            alt="eye"
                            className="eye-icon"
                          />
                        </div>
                      </div>

                      <div className="form-block">
                        <label>confirm password*</label>
                        <div className="pwd-form">
                          <input
                            type="password"
                            className="form-control default-form"
                            placeholder="Enter confirm password"
                            required
                          />
                          <img
                            src="/images/eye-icon.svg"
                            alt="eye"
                            className="eye-icon"
                          />
                        </div>
                      </div>

                      <div className="remember-me-block">
                        <label className="checkbox checkbox-outline-primary mb-0">
                          <input type="checkbox" />
                          <span>I accept the Terms and Privacy Policy.</span>
                          <span className="checkmark"></span>
                        </label>
                      </div>

                      <button className="sign-btn">Login</button>

                      <div className="text-center signup-block">
                        <p>
                          Already have an account?
                          <a href="">Login</a>
                        </p>
                      </div>
                    </form>
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
    </>
  );
}

export default SignupModal;
