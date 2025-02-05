"use client";
import HeroSection from "@/app/_components/SubPagesHeroSection/HeroSection";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import ModelViewer3d from "@/app/_components/commons/ModelViewer3d";
import Link from "next/link";
import ShareBar from "./_components/ShareBar";
import ShareModal from "./_components/ShareModal";
import ProjectGallery from "./_components/ProjectGallery";
import useAuthStore from "../../../_store/store";
import CommentInput from "./_components/CommentInput";
import Comment from "./_components/Comment";
import generateKey from "@/utils/generateKeys";

const BG_IMAGE = "/images/breadcrumb/asset-breadcrumb.jpg";
function Page({ params }) {
  const [show, setShow] = useState(false);

  // `https://localhost:8080/api/v1/public/get/${params.projectId}`
  const { userInfo, token } = useAuthStore();

  const getProjectById = async () => {
    const url =
      process.env.NEXT_PUBLIC_API_BASE_URL +
      (token
        ? process.env.NEXT_PUBLIC_GET_PROJECT_BY_ID_PRIVATE_API_URL
        : process.env.NEXT_PUBLIC_GET_PROJECT_BY_ID_PUBLIC_API_URL) +
      params.projectId;
    const config = token
      ? {
          headers: { Authorization: "Bearer " + token },
        }
      : null;
    const responseData = await axios.get(url, config);
    // console.log(response);
    return responseData;
  };
  const getAllComments = async () => {
    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        process.env.NEXT_PUBLIC_GET__ALL_PROJECT_COMMENTS_BY_ID_API_URL +
        params.projectId
    );
    // console.log(response);
    return responseData;
  };
  const getAllLikes = async () => {
    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        process.env.NEXT_PUBLIC_GET__ALL_PROJECT_LIKES_BY_ID_API_URL +
        params.projectId
    );
    // console.log(response);
    return responseData;
  };

  const {
    isLoading,
    isError,
    error,
    data: projectData,
    isFetching,
  } = useQuery({
    queryKey: ["getProjectById"],
    queryFn: getProjectById,
  });
  const {
    isLoading: isCommentLoading,
    isError: isCommentError,
    error: commenrError,
    data: commentData,
    isFetching: isCommentFetching,
    refetching: isCommentRefetching,
  } = useQuery({
    queryKey: ["getAllComments"],
    queryFn: getAllComments,
  });
  const {
    isLoading: isLikesLoading,
    isError: isLikesError,
    error: likesError,
    data: likesData,
    isFetching: isLikesFetching,
  } = useQuery({
    queryKey: ["getAllLikes"],
    queryFn: getAllLikes,
  });

  return (
    <>
      <HeroSection
        breadcrumsArr={[
          { text: "Home", link: "/", isActive: false },
          { text: "Projects", link: "/project", isActive: false },
          {
            text: "Projects Details",
            link: `/projects/${params.projectId}`,
            isActive: true,
          },
        ]}
        headingText={"Project Details"}
        bgImagePath={BG_IMAGE}
      />
      <section className="blog-list py-100">
        <div className="container">
          <div className="row align-items-center">
            {(isLoading || isFetching) && (
              <div className="w-100 d-flex justify-content-center aligh-item-center">
                <Spinner
                  animation="border"
                  role="status"
                  size="lg"
                  variant="success"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
          </div>
          {isError && (
            <Alert variant="danger">
              Error loading project data {error.message}
            </Alert>
          )}
          {projectData && (
            <>
              <div className="col-md-12">
                <div className="section-title-content">
                  <h2>{projectData.data.data.name}</h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-10">
                  <div className="project-module">
                    <div className="project-module-image">
                      {/* <img
                        src="/images/projects/project-gallery.jpg"
                        alt="project-module"
                        className="img-fluid"
                      /> */}
                      <ModelViewer3d
                        modelPath={
                          process.env.NEXT_PUBLIC_SERVER_BASE_URL +
                          projectData.data.data.project_file
                        }
                      />
                    </div>
                  </div>
                  <div className="module-customize-project">
                    <h6>Lorem Ipsum is simply dummy text of printing</h6>

                    <Link
                      href={userInfo ? `/customiser/${params.projectId}` : ""}
                    >
                      <button className="disabled">Customize Project</button>
                    </Link>
                  </div>

                  <div className="project-description">
                    <h6>Description</h6>
                    <p>{projectData.data.data.description}</p>
                  </div>
                  <ProjectGallery media={projectData.data.data.media} />

                  <div className="project-comment-wrapper">
                    <div className="project-comment-box">
                      <h6>Comments</h6>

                      {userInfo && (
                        <CommentInput projectId={params.projectId} />
                      )}
                      {commentData &&
                        commentData.data?.data?.length > 0 &&
                        commentData.data.data.map((comment) => (
                          <React.Fragment key={generateKey(comment)}>
                            <Comment data={comment} />
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-2">
                  {commentData && likesData && (
                    <ShareBar
                      setShow={setShow}
                      noOfComments={
                        commentData.data.data ? commentData.data.data.length : 0
                      }
                      noOfLikes={
                        likesData.data.data ? likesData.data.data.likes : 0
                      }
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="light-pattern-box left">
          <img src="/images/light-pattern-left.svg" alt="light" />
        </div>
      </section>
      <ShareModal show={show} setShow={setShow} />
    </>
  );
}

export default Page;
