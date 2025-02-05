"use client";
import React, { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import { Alert, Spinner } from "react-bootstrap";
import segregateImagesAndVideos from "./utils";
import MediaSelection from "./components/MediaSelection";
import MediaViewer from "./components/MediaViewer";

const IMAGES_LABEL = "Images";
const VIDEOS_LABEL = "Videos";
const PANOROMAS_LABEL = "360° Panoramas";

function Module3dSection() {
  const [media, setMedia] = useState(null);
  const [selected, setSelected] = useState(IMAGES_LABEL);

  const getCMSData = async () => {
    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        process.env.NEXT_PUBLIC_GET_CMS_DATA
    );
    return responseData;
  };

  const {
    isLoading,
    isError,
    error,
    data: cmsData,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["getCMSData"],
    queryFn: () => getCMSData(),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (cmsData) {
      let segregatedMediaData = segregateImagesAndVideos(cmsData.data.data);
      setMedia({ panoromas: [], ...segregatedMediaData });
    } else {
      // console.log("no data", cmsData);
    }
  }, [cmsData]);
  return (
    <>
      <section className="module">
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
        {media && (
          <>
            <div className="container-fluid p-0">
              <div className="row g-0">
                <div className="col-md-12">
                  <MediaViewer
                    videos={selected === VIDEOS_LABEL}
                    media={media}
                  />
                </div>
              </div>
            </div>
            <div className="module-radio">
              <div className="container">
                <div className="row justify-content-center g-3">
                  <MediaSelection
                    label={IMAGES_LABEL}
                    noOfPreview={media["images"].length}
                    selected={selected === IMAGES_LABEL}
                    setSelected={setSelected}
                    disabled={false}
                  />
                  <MediaSelection
                    label={VIDEOS_LABEL}
                    noOfPreview={media["videos"].length}
                    selected={selected === VIDEOS_LABEL}
                    setSelected={setSelected}
                    disabled={false}
                  />
                  <MediaSelection
                    label={PANOROMAS_LABEL}
                    noOfPreview={media["panoromas"].length}
                    selected={selected === PANOROMAS_LABEL}
                    setSelected={setSelected}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Module3dSection;
