import React, { useState, useRef, useEffect } from "react";
import useAuthStore from "../../_store/store";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import {
  createImageFromInitials,
  getRandomColor,
} from "@/utils/profilePhotoMaker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function ProfileModal({ showProfile, setShowProfile }) {
  const { userInfo, token } = useAuthStore();
  const userData = userInfo ? JSON.parse(userInfo) : null;

  const avatarSrc = userData?.avatarUrl
    ? process.env.NEXT_PUBLIC_SERVER_BASE_URL + userData?.avatarUrl
    : createImageFromInitials(
        80,
        userData?.firstName + " " + userData?.lastName,
        getRandomColor()
      );

  const [imgSrc, setImgSrc] = useState(avatarSrc); // to show avatar
  const [photoFile, setPhotoFile] = useState(null);

  const [isAvatarChanged, setIsAvatarChanged] = useState(false);

  const handleClose = () => setShowProfile(false);
  const handleShow = () => setShowProfile(true);
  const hiddenFileInput = useRef(null);

  const updateProfile = async (formData) => {
    // Your login logic here, e.g., making an API request
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    const responseData = await axios.put(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        process.env.NEXT_PUBLIC_USERDETAIL_UPDATE,
      formData,
      config
    );
    return responseData;
  };

  const handleProfileUpdate = async (data) => {
    try {
      // Call the mutation function with the login credentials
      const updatedResult = await mutateAsync(data);
      // Handle successful login (e.g., update state, redirect, etc.)
      console.log("Successful comment!", updatedResult);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const { isError, error, isPending, isSuccess, success, mutateAsync } =
    useMutation({
      mutationFn: updateProfile,
    });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);

    if (isSameAsPrevious(userData, data)) {
      console.log("need to change");
      let dataToSend = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: userData.email,
        // avatar: isAvatarChanged ? photoFile : userData.avatarUrl,
      };

      const formData = new FormData();
      Object.keys(dataToSend).forEach((key) => {
        formData.append(String(key), String(dataToSend[key]));
      });

      handleProfileUpdate(formData);
    }
  };
  // console.log(errors);
  // console.log("userdata", userData);
  const handleEditClick = () => {
    hiddenFileInput.current.click();
  };

  //compare if any of values are changed,
  //check for firstName lastName, avatarUrl
  const isSameAsPrevious = (userData, data) => {
    let isChanged = false;
    if (
      userData.firstName !== data.firstName ||
      userData.lastName !== data.lastName ||
      isAvatarChanged
    ) {
      isChanged = true;
      console.log("need to change");
    }

    return isChanged;
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setPhotoFile(fileUploaded);
    console.log("file uploaded: ", fileUploaded);
    const imgUrl = URL.createObjectURL(fileUploaded);
    setIsAvatarChanged(true);
    setImgSrc(imgUrl);
  };
  return (
    <>
      <>
        {userData && (
          <>
            <Modal
              show={showProfile}
              onHide={handleClose}
              size="xs"
              className="profile-modal"
            >
              <Modal.Body>
                <button
                  type="button"
                  className="btn-close"
                  // data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleClose()}
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
                    <div className="col-lg-12">
                      <div className="login-wrapper">
                        <div className="welcome-content">
                          <h5>My Profile</h5>
                        </div>
                        <form
                          autoComplete="off"
                          autofill="off"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="profile-picture">
                            <img
                              src={imgSrc}
                              alt="profile"
                              className="user-profile-img"
                            />
                            <input
                              type="file"
                              id="file"
                              style={{ display: "none" }}
                              ref={hiddenFileInput}
                              onChange={handleChange}
                            />

                            <button type="button" onClick={handleEditClick}>
                              <img src="/images/edit.svg" />
                            </button>
                          </div>

                          <div className="form-block">
                            <label className="active">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={userData.firstName}
                              defaultValue={userData.firstName}
                              {...register("firstName", { required: true })}
                            />
                          </div>
                          <div className="form-block">
                            <label className="active">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={userData.lastName}
                              defaultValue={userData.lastName}
                              {...register("lastName", { required: true })}
                            />
                          </div>

                          <div className="form-block">
                            <label className="active">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter email"
                              value={userData.email}
                              disabled
                            />
                          </div>

                          <button
                            className="sign-btn mb-0"
                            onClick={handleSubmit}
                          >
                            Update Profile
                          </button>
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
                    onClick={() => handleClose()}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </Modal.Body>
            </Modal>
          </>
        )}
      </>
    </>
  );
}

export default ProfileModal;
