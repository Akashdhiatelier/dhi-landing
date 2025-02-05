"use client";
import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import ModelViewer3d from "@/app/_components/commons/ModelViewer3d";
import AssetsVariationContainer from "./_components/AssetsVariationContainer";
import AssetShareBar from "./_components/AssetShareBar";
import MaterialSelectionContainer from "./_components/MaterialSelectionContainer";
import HeroSection from "@/app/_components/SubPagesHeroSection/HeroSection";

const BG_IMAGE = "/images/breadcrumb/asset-detail-breadcrumb.jpg";
function Page({ params }) {
  const modelViewerForwordedRef = useRef(null);

  // Fetching function
  const getAssetById = async () => {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        process.env.NEXT_PUBLIC_GET_MODEL_BY_ID_API_URL +
        params.assetId
    );

    return response.data;
  };

  // React Query hook

  const {
    isLoading,
    isError,
    data: assetData,
  } = useQuery({
    queryKey: ["getAssetById"],
    queryFn: getAssetById,
  });

  //to capitalize the string
  const capitalizeString = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  return (
    <>
      <HeroSection
        breadcrumsArr={[
          { text: "Home", link: "/", isActive: false },
          { text: "Assets", link: "/assets", isActive: false },
          {
            text: "Asset Details",
            link: `/assets/${params.assetId}`,
            isActive: true,
          },
        ]}
        headingText={"Assets Details"}
        bgImagePath={BG_IMAGE}
      />
      <section className="asset-listing-breadcrumb py-100">
        <div className="container">
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
          {isError && <Alert variant="danger">Error loading asset data</Alert>}
          {assetData && assetData.data && (
            <>
              <div className="row g-5">
                <div className="col-lg-3 col-md-12">
                  <div className="section-title-content">
                    <span>
                      {capitalizeString(assetData.data.category.name)}
                    </span>
                    <h2>{capitalizeString(assetData.data.name)}</h2>
                    <p>{capitalizeString(assetData.data.description)}</p>
                  </div>
                  <div className="price">
                    <span>Price</span>
                    <h5>$ {assetData.data.price}</h5>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="asset-preview position-relative">
                    <div className="text-center my-5 preview-image">
                      <ModelViewer3d
                        modelPath={
                          process.env.NEXT_PUBLIC_SERVER_BASE_URL +
                          assetData.data.model_file
                        }
                        modelViewerRef={modelViewerForwordedRef}
                      />
                    </div>
                    <AssetsVariationContainer
                      data={assetData.data}
                      modelViewerForwordedRef={modelViewerForwordedRef}
                    />
                  </div>
                </div>
                <div className="col-lg-3 col-md-12">
                  <MaterialSelectionContainer
                    modelViewerForwordedRef={modelViewerForwordedRef}
                    availbleMaterials={assetData.data.config.map(
                      (data) => data.material
                    )}
                  />
                  <AssetShareBar />
                </div>
              </div>
            </>
          )}
        </div>
        <div className="light-pattern-box left">
          <img src="/images/light-pattern-left.svg" alt="light" />
        </div>
      </section>
    </>
  );
}

export default Page;
