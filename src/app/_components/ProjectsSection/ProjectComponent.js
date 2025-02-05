import Link from "next/link";
import React from "react";

function ProjectComponent({ data }) {
  return (
    <>
      <div className="col-md-4 mb-5 project-card">
        <Link href={`/projects/${data.id}`} className="text-decoration-none">
          <div className="project-wrapper">
            <div className="project-img">
              <img
                // src={"/images/projects/project_06.jpg"}
                src={process.env.NEXT_PUBLIC_SERVER_BASE_URL + data.thumbnail}
                alt="project"
                className="img-fluid"
              />
              <span>{data.tags && data.tags.split(",")[0]}</span>
            </div>
            <div className="project-content">
              {/* <span>company name</span> */}
              <h5>{data.name}</h5>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ProjectComponent;
