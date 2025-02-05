"use client";
import React, { useRef } from "react";
import ProjectComponent from "./ProjectComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import generateKey from "@/utils/generateKeys";
import { Spinner, Alert } from "react-bootstrap";
import Link from "next/link";

function ProjectSection() {
  const getAllProjects = async () => {
    // showing only 3 projects here   here

    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        process.env.NEXT_PUBLIC_GET_ALL_PROJECTS_API_URL +
        `?_page=${1}&_limit=3`
    );
    return responseData;
  };

  const {
    isLoading,
    isError,
    error,
    data: allProjectsData,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["getallprojects"],
    queryFn: () => getAllProjects(),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <section className="project py-100">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title-content">
                <span>Projects</span>
                <h2>Lorem Ipsum is dummy text of the printing</h2>
              </div>
            </div>
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
            {allProjectsData &&
              allProjectsData.data.data.data.length > 0 &&
              allProjectsData.data.data.data.map((projectInfo) => (
                <React.Fragment key={generateKey(projectInfo.id)}>
                  <ProjectComponent data={projectInfo} />
                </React.Fragment>
              ))}
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12"></div>
          </div>
        </div>
        {/* <div className="col-md-4">
          <div className="project-wrapper">
            <div className="project-img">
              <img
                src="/images/projects/project_01.jpg"
                alt="project"
                className="img-fluid"
              />
              <span>home interior</span>
            </div>
            <div className="project-content">
              <span>company name</span>
              <h5>project name</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="project-wrapper">
            <div className="project-img">
              <img
                src="/images/projects/project_02.jpg"
                alt="project"
                className="img-fluid"
              />
              <span>home interior</span>
            </div>
            <div className="project-content">
              <span>company name</span>
              <h5>project name</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="project-wrapper">
            <div className="project-img">
              <img
                src="/images/projects/project_03.jpg"
                alt="project"
                className="img-fluid"
              />
              <span>home interior</span>
            </div>
            <div className="project-content">
              <span>company name</span>
              <h5>project name</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="project-wrapper">
            <div className="project-img">
              <img
                src="/images/projects/project_04.jpg"
                alt="project"
                className="img-fluid"
              />
              <span>home interior</span>
            </div>
            <div className="project-content">
              <span>company name</span>
              <h5>project name</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="project-wrapper">
            <div className="project-img">
              <img
                src="/images/projects/project_05.jpg"
                alt="project"
                className="img-fluid"
              />
              <span>home interior</span>
            </div>
            <div className="project-content">
              <span>company name</span>
              <h5>project name</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="project-wrapper">
            <div className="project-img">
              <img
                src="/images/projects/project_06.jpg"
                alt="project"
                className="img-fluid"
              />
              <span>home interior</span>
            </div>
            <div className="project-content">
              <span>company name</span>
              <h5>project name</h5>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-md-12">
            <div className="button-block text-center">
              <Link href={"/projects"} className="text-decoration-none">
                <button className="view-btn">view all project</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProjectSection;
