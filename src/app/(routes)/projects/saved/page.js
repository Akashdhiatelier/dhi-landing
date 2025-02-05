"use client";
import HeroSection from "@/app/_components/SubPagesHeroSection/HeroSection";
import React, { useState, useEffect, useCallback } from "react";
import ProjectsContainer from "../_components/ProjectsContainer";
import Search from "@/app/_components/commons/Search";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import Filter from "@/app/_components/commons/Filter";
import Pagination from "@/app/_components/commons/Pagination";
import { Alert, Spinner } from "react-bootstrap";
import useAuthStore from "@/app/_store/store";
import { useRouter } from "next/navigation";

const BG_IMAGE = "/images/breadcrumb/project-breadcrumb.jpg";
function Page() {
  const [hydrationLoad, setHydrationLoad] = useState(true);
  useEffect(() => {
    setHydrationLoad(false);
  }, []);
  const { token } = useAuthStore();
  const [projects, setProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/?login=true");
    }
  }, []);

  const getAllProjects = async () => {
    const config = {
      headers: { Authorization: "Bearer " + token },
    };
    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        process.env.NEXT_PUBLIC_GET_ALL_LIKED_PROJECT_PRIVATE_API_URL +
        `?_page=${1}&_limit=10`,
      config
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
    queryKey: ["getallprojects", currentPageIndex],
    queryFn: () => getAllProjects(currentPageIndex),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (allProjectsData) {
      console.log("allProjectsData", allProjectsData.data);
      setProjects(allProjectsData.data.data.data);
      setAllProjects(allProjectsData.data.data.data);
    }
  }, [allProjectsData]);

  const updateProjects = useCallback((data) => {
    setProjects(data);
  }, []);

  return (
    <>
      {!hydrationLoad && (
        <>
          {token && (
            <>
              <HeroSection
                breadcrumsArr={[
                  { text: "Home", link: "/", isActive: false },
                  { text: "Projects", link: "/projects", isActive: true },
                ]}
                headingText={"Projects"}
                bgImagePath={BG_IMAGE}
              />
              <section className="blog-list py-100">
                {isLoading && (
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
                )}
                {isError && (
                  <Alert variant="danger">
                    Error loading asset data{error?.message}
                  </Alert>
                )}
                {allProjectsData &&
                  allProjectsData.data.data.data.length > 0 && (
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col-md-12">
                          <div className="section-title-content">
                            <span>Projects</span>
                            <h2>Lorem Ipsum is dummy text of the printing</h2>
                          </div>
                        </div>
                      </div>
                      <div className="blog-search">
                        <Filter data={allProjects} setData={updateProjects} />

                        <Search
                          data={allProjects}
                          setData={setProjects}
                          allData={allProjects}
                        />
                      </div>
                      <div className="row g-4">
                        <ProjectsContainer
                          allProjects={projects}
                          isFetching={isFetching}
                          isLoading={isLoading}
                          isError={isError}
                        />
                      </div>
                      <Pagination
                        isPlaceholderData={isPlaceholderData}
                        setCurrentPageIndex={setCurrentPageIndex}
                        totalPage={allProjectsData.data.data.totalPages}
                        currentPage={allProjectsData.data.data.currentPage}
                      />
                    </div>
                  )}
                {allProjectsData &&
                  allProjectsData.data.data.data.length === 0 && (
                    <>
                      <Alert variant="success"> no data</Alert>
                    </>
                  )}
                <div className="light-pattern-box left">
                  <img src="/images/light-pattern-left.svg" alt="light" />
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Page;
