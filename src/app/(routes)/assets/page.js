"use client";
import React, { useCallback, useState, useEffect } from "react";
import HeroSection from "@/app/_components/SubPagesHeroSection/HeroSection";
import Search from "@/app/_components/commons/Search";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import Filter from "@/app/_components/commons/Filter";
import AssetsContainer from "./_components/AssetsContainer";
import Pagination from "@/app/_components/commons/Pagination";
import { Alert, Spinner } from "react-bootstrap";

const BG_IMAGE = "/images/breadcrumb/asset-breadcrumb.jpg";
const LIMIT = 3;
function Page() {
  const [models, setModels] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const getAllModels = async (pageIndex) => {
    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        process.env.NEXT_PUBLIC_GET_ALL_MODELS_API_URL +
        `?_page=${pageIndex}&_limit=${LIMIT}&status=All&category=All`
    );
    return responseData;
  };

  const {
    isLoading,
    isError,
    error,
    data: allModelsData,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["getallmodels", currentPageIndex],
    queryFn: () => getAllModels(currentPageIndex),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (allModelsData) {
      setModels(allModelsData.data.data.data);
      setAllModels(allModelsData.data.data.data);
    }
  }, [allModelsData]);

  const updateModels = useCallback((data) => {
    setModels(data);
  }, []);

  return (
    <>
      <HeroSection
        breadcrumsArr={[
          { text: "Home", link: "/", isActive: false },
          { text: "Assets", link: "/assets", isActive: true },
        ]}
        headingText={"Assets"}
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
        {allModelsData && allModelsData.data && (
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="section-title-content">
                  <span>Assets</span>
                  <h2> Lorem Ipsum is dummy text of the printing</h2>
                </div>
              </div>
              <div className="col-md-7">
                <div className="section-title-content">
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book.
                  </p>
                </div>
              </div>
            </div>
            <div className="blog-search">
              <Filter data={allModels} setData={updateModels} />

              <Search data={models} setData={setModels} allData={allModels} />
            </div>
            <div className="row g-4">
              <AssetsContainer
                allModels={models}
                isFetching={isFetching}
                isLoading={isLoading}
                isError={isError}
              />
            </div>
            <Pagination
              isPlaceholderData={isPlaceholderData}
              setCurrentPageIndex={setCurrentPageIndex}
              totalPage={allModelsData.data.data.totalPages}
              currentPage={allModelsData.data.data.currentPage}
            />
          </div>
        )}
        <div className="light-pattern-box left">
          <img src="/images/light-pattern-left.svg" alt="light" />
        </div>
      </section>
    </>
  );
}

export default Page;
