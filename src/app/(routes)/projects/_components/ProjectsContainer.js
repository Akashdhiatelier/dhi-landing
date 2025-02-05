"use client";
import React from "react";
import ProjectComponent from "@/app/_components/ProjectsSection/ProjectComponent";
import Spinner from "react-bootstrap/Spinner";
import generateKey from "@/utils/generateKeys";

function ProjectsContainer({ allProjects, isFetching, isLoading, isError }) {
  return (
    <>
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
      {allProjects.length > 0 &&
        allProjects.map((project) => (
          <React.Fragment key={generateKey(project.name)}>
            <ProjectComponent data={project} />
          </React.Fragment>
        ))}
    </>
  );
}

export default ProjectsContainer;
