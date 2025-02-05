"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../_store/store";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Modal } from "react-bootstrap";
const login = async (credentials) => {
  // Your login logic here, e.g., making an API request
  const responseData = await axios.post(
    process.env.NEXT_PUBLIC_API_BASE_URL + process.env.NEXT_PUBLIC_LOGIN_API,
    credentials
  );
  return responseData;
};

function LoginModal({ show, setShow }) {
  // const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { setUserInfo, setToken } = useAuthStore();
  const closeRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const { isError, error, isPending, isSuccess, mutateAsync } = useMutation({
    mutationFn: login,
  });
  const handleLogin = async (credentials) => {
    try {
      // Call the mutation function with the login credentials
      const userData = await mutateAsync(credentials);
      // Handle successful login (e.g., update state, redirect, etc.)
      console.log("Successful login!", userData);
      setUserInfo(
        JSON.stringify({
          firstName: userData.data.data.first_name,
          lastName: userData.data.data.last_name,
          email: userData.data.data.email,
          token: userData.data.data.token,
          avatarUrl: userData.data.data.avatar_url,
        })
      );
      setToken(userData.data.data.token);
      // closeRef.current.click();
      handleClose();
    } catch (error) {
      // Handle login failure (e.g., show error message)
      console.error("Login failed", error);
    }
  };
  const onSubmit = async (formData) => {
    // console.log("data: ", formData);
    handleLogin(formData);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <button
            type="button"
            onClick={handleClose}
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <img src="/images/modal-close.svg" />
          </button>{" "}
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
                    <h5>Login</h5>
                  </div>
                  {isError && <p>{error?.message}</p>}
                  {isPending && <p className="text-white">Loading</p>}
                  <form
                    autoComplete="off"
                    autofill="off"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="form-block">
                      <label className="active">email*</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        {...register("email")}
                      />
                    </div>

                    <div className="form-block">
                      <label>password*</label>
                      <div className="pwd-form">
                        <input
                          type={!showPassword ? "password" : "text"}
                          className="form-control default-form"
                          placeholder="Enter password"
                          required
                          {...register("password")}
                        />
                        {/* todo cursor pointer here */}
                        <img
                          onClick={() => setShowPassword(!showPassword)}
                          src="/images/eye-icon.svg"
                          alt="eye"
                          className="eye-icon cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* <div className="remember-me-block">
                        <label className="checkbox checkbox-outline-primary mb-0">
                          <input type="checkbox" />
                          <span>Remember Me</span>
                          <span className="checkmark"></span>
                        </label>
                        <a href="forgot-password.html">forgot password?</a>
                      </div> */}

                    <button className="sign-btn">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginModal;
