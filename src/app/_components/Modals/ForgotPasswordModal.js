import React from "react";

function ForgotPasswordModal() {
  return (
    <>
      <div
        className="modal fade"
        id="ForgotModal"
        tabIndex="-1"
        aria-labelledby="ForgotLabel"
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
                      alt="tripeasy-login"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-sm-12 col-lg-6">
                  <div className="login-wrapper">
                    <div className="welcome-content">
                      <h5>Forgot Password</h5>
                      <p>
                        Enter your email address and we’ll send you a link to
                        reset your password.
                      </p>
                    </div>
                    <form autoComplete="off" autofill="off">
                      <div className="form-block">
                        <label className="active">Email*</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter full name"
                        />
                      </div>

                      <button className="sign-btn">Submit</button>

                      <div className="text-center signup-block">
                        <p>
                          Back to
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

export default ForgotPasswordModal;
