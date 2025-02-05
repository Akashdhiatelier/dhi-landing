"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Spinner } from "react-bootstrap";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

function NewsLetterSection() {
  const [email, setEmail] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const subscribeNewsLetter = async () => {
    const username = process.env.NEXT_PUBLIC_WP_NEWSLETTER_AUTH_USERNAME;
    const password = process.env.NEXT_PUBLIC_WP_NEWSLETTER_AUTH_PASSWORD;
    const credentials = btoa(`${username}:${password}`);

    let config = {
      method: "post",
      url:
        process.env.NEXT_PUBLIC_WP_API_BASE_URL +
        process.env.NEXT_PUBLIC_WP_NEWSLETTER_SUB_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      data: JSON.stringify({
        email,
      }),
    };

    console.log("email", email);
    const responseData = await axios.request(config);
    return responseData;
  };

  const {
    isLoading,
    isError,
    error,
    data: subscribtionData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["subscribeNewsLetter"],
    queryFn: () => subscribeNewsLetter(),
    enabled: false,
  });

  const onSubmit = (data) => {
    setEmail(data.email);
  };
  useEffect(() => {
    if (!email) return;
    refetch();
  }, [email]);

  const renderData = () => {
    if (isLoading || isFetching) {
      return (
        <>
          <div className="w-100 d-flex justify-content-center align-items-center text-white">
            <Spinner
              animation="border"
              role="status"
              size="lg"
              variant="success"
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </>
      );
    } else if (isError) {
      return (
        <>
          <Alert variant="danger">
            Error loading asset data{error?.message}
          </Alert>
        </>
      );
    } else if (
      subscribtionData?.status === 200 ||
      subscribtionData?.status === 201
    ) {
      return (
        <>
          <h3 className="text-white">
            Please confirm you email to get our newsletter
          </h3>
        </>
      );
    } else {
      return (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="form-control"
              placeholder="Your email"
              {...register("email", {
                required: true,
                pattern: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
              })}
            />
            {errors.email && (
              <p className="text-danger mt-2">Please enter valid email!</p>
            )}

            <button type="submit" className="subscribe-btn">
              subscribe
            </button>
          </form>
        </>
      );
    }
  };

  return (
    <>
      <section className="newsletter">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="section-title-content">
                <span>Newsletter</span>
                <h2>Lorem Ipsum is dummy text of the printing</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum is simply dummy text.
                </p>
              </div>
              {renderData()}
            </div>
          </div>
        </div>
        <img src="/images/newsletter.svg" />
      </section>
    </>
  );
}

export default NewsLetterSection;
