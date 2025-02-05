"use client";
import { useState, useEffect } from "react";
import FollowUs from "@/app/_components/commons/FollowUs";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function ContactForm() {
  const [formData, setFormData] = useState(null);
  console.log("key", process.env.NEXT_PUBLIC_EMAIL_KEY);
  const sendEmail = async () => {
    console.log("send email function");
    try {
      let res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.firstName + " " + formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      res = await res.json();
      console.log("res from api", res);
      return res;
    } catch (error) {
      console.error("Error in sendEmail:", error.message);
      throw error;
    }
  };

  const { isLoading, isError, data, refetch, isFetching } = useQuery({
    queryKey: ["postsData"],
    queryFn: sendEmail,
    enabled: false,
  });

  const onSubmit = async (data) => {
    console.log("data", data);
    setFormData(data);
  };
  useEffect(() => {
    if (!formData) return;
    refetch();
  }, [formData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(
    "isLoading",
    isLoading,
    "isError",
    isError,
    "isFetching",
    isFetching,
    "data",
    data
  );
  return (
    <div className="contact-from">
      <div className="row g-5">
        <div className="col-md-8">
          <div className="col-md-12">
            <div className="section-title-content">
              <span>Contact</span>
              <h2>Get in Touch!</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industrys standard dummy text
                ever since the 1500s, when an unknown printer took a gallery.
              </p>
            </div>
          </div>
          <div className="row">
            {data ? (
              <>
                <Alert variant={"success"}>
                  our team will contact you soon!
                </Alert>
              </>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="form-block">
                      <label>first name</label>
                      <input
                        type="text"
                        className="form"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && (
                        <p className="text-danger">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-block">
                      <label>last name</label>
                      <input
                        type="text"
                        className="form"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && (
                        <p className="text-danger">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-block">
                      <label>email</label>
                      <input
                        type="text"
                        className="form"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="Enter email"
                      />
                      {errors.email && (
                        <p className="text-danger">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-block">
                      <label>phone</label>
                      <input
                        type="text"
                        className="form"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9\b]+$/,
                            message: "Invalid phone number",
                          },
                        })}
                        placeholder="Enter phone"
                      />
                      {errors.phone && (
                        <p className="text-danger">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-block">
                      <label>message</label>
                      <input
                        type="text"
                        className="form"
                        {...register("message", {
                          required: "Message is required",
                        })}
                        placeholder="Enter message"
                      />
                      {errors.message && (
                        <p className="text-danger">{errors.message.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="button-block">
                      <button className="submit-btn">submit</button>
                    </div>
                  </div>
                </div>
              </form>
            )}

            {isError && (
              <>
                <Alert variant={"danger"}>
                  some error occured while sending data!
                </Alert>
              </>
            )}
            {(isLoading || isFetching) && (
              <>
                <div className="d-flex justify-content-center align-items-center">
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
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="footer-block address-block">
            <h5>Contact Now!</h5>
            <div className="address-line">
              <div className="mb-3 mb-md-4">
                <span className="footer-subtitle">Address</span>
                <p>Lorem Ipsum is dummy, text of the printing.</p>
              </div>
              <div className="mb-3 mb-md-4">
                <span className="footer-subtitle">Call</span>
                <a href="tel:+12 123 456 8989">+12 123 456 8989</a>
              </div>
              <div>
                <span className="footer-subtitle">Email</span>
                <a href="mailto:info@companymail.com">info@companymail.com</a>
              </div>
            </div>
            <FollowUs />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
