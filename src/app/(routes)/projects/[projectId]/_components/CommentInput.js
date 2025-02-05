"use client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../../../_store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import ProfilePicture from "@/app/_components/commons/ProfilePicture";

function CommentInput({ projectId }) {
  const textareaRef = useRef();
  const queryClient = useQueryClient();

  const { token, userInfo } = useAuthStore();
  const userData = JSON.parse(userInfo);
  const addComment = async (commentData) => {
    // Your login logic here, e.g., making an API request
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    const responseData = await axios.post(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        process.env.NEXT_PUBLIC_ADD_COMMENT_TO_PROJECT_BY_ID_API_URL +
        projectId,
      { comment: commentData.comment },
      config
    );
    return responseData;
  };
  const { isError, error, isPending, isSuccess, success, mutateAsync } =
    useMutation({
      mutationFn: addComment,
      onSuccess: async () => {
        queryClient.refetchQueries(["getAllComments"]);
        console.log("textArea", textareaRef);
        // textareaRef.current.value = "";
        reset();
      },
    });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    handleAddComment(data);
  };

  const handleAddComment = async (data) => {
    try {
      // Call the mutation function with the login credentials
      const commentResult = await mutateAsync(data);
      // Handle successful login (e.g., update state, redirect, etc.)
      console.log("Successful comment!", commentResult);
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  return (
    <>
      <div className="project-comment-wrapepr">
        <ProfilePicture
          avatarUrl={userData.avatarUrl}
          name={userData.firstName + " " + userData.lastName}
        />
        <div className="project-comment-input w-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              ref={textareaRef}
              placeholder="Enter message"
              cols="10"
              rows="3"
              className="form-control"
              {...register("comment", { required: true })}
            />
            {errors.comment && (
              <p className="text-danger">
                Please enter comment in valid format
              </p>
            )}
            {isError && (
              <p className="text-danger">
                opps! some error occured : {error.message}
              </p>
            )}
            <input type="submit" className="post-btn" value={"Post"} />
          </form>
          {/* 
            <textarea></textarea>
            <button className="post-btn">Post</button> */}
        </div>
      </div>
    </>
  );
}

export default CommentInput;
