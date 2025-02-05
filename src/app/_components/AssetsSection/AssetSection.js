"use client";
import React, { useRef, useEffect } from "react";
import {} from "swiper/react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Alert, Spinner } from "react-bootstrap";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import AssetComponent from "@/app/(routes)/assets/_components/AssetComponent";
import generateKey from "@/utils/generateKeys";
import Asset from "./_components/Asset";
import Link from "next/link";
function AssetSection() {
  const getAllModels = async () => {
    const responseData = await axios.get(
      process.env.NEXT_PUBLIC_API_BASE_URL +
        process.env.NEXT_PUBLIC_GET_ALL_MODELS_API_URL +
        `?_page=${1}&_limit=10&status=All&category=All`
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
    queryKey: ["getallmodels"],
    queryFn: () => getAllModels(),
  });
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  const swiper = useSwiper();
  return (
    <>
      <section className="py-100 position-relative asset">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title-content">
                <span>Assets</span>
                <div className="d-flex">
                  <h2>Lorem Ipsum is dummy text of the printing</h2>
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
          </div>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-11 col-lg-10">
              <div className="row">
                <div className="col-md-12">
                  <Swiper slidesPerView={3} spaceBetween={30}>
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

                    {isError && (
                      <Alert variant="danger">
                        Error loading project data {error.message}
                      </Alert>
                    )}
                    {allModelsData &&
                      allModelsData.data.data.data.map((modelData, i) => (
                        <React.Fragment key={generateKey(modelData.id)}>
                          <SwiperSlide className="asset-wrapper">
                            <Asset data={modelData} />
                          </SwiperSlide>
                        </React.Fragment>
                      ))}

                    {/* <SwiperSlide className="asset-wrapper">
                      <div className="asset-img-block">
                        <img src="/images/assets/assets_01.png" alt="asset" />
                      </div>
                      <span>Dining Table</span>
                    </SwiperSlide>
                    <SwiperSlide className="asset-wrapper">
                      <div className="asset-img-block">
                        <img src="/images/assets/assets_02.png" alt="asset" />
                      </div>
                      <span>Short Sofa</span>
                    </SwiperSlide>
                    <SwiperSlide className="asset-wrapper">
                      <div className="asset-img-block">
                        <img src="/images/assets/assets_03.png" alt="asset" />
                      </div>
                      <span>Hanging Lamps</span>
                    </SwiperSlide>
                    <SwiperSlide className="asset-wrapper">
                      <div className="asset-img-block">
                        <img src="/images/assets/assets_04.png" alt="asset" />
                      </div>
                      <span>Short Sofa</span>
                    </SwiperSlide>
                    <SwiperSlide className="asset-wrapper">
                      <div className="asset-img-block">
                        <img src="/images/assets/assets_05.png" alt="asset" />
                      </div>
                      <span>Hanging Lamps</span>
                    </SwiperSlide> */}
                    <div className="hello">
                      <button onClick={() => swiper.slidePrev()}>Prev</button>
                      <button onClick={() => swiper.slideNext()}>Next</button>
                    </div>
                  </Swiper>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-2">
                  <div className="button-block text-center ">
                    <Link href={"/assets"} className="text-decoration-none">
                      <button className="view-btn">View all Assets</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="light-pattern-box right">
          <img src="images/light-pattern-right.svg" alt="light" />
        </div>
      </section>
    </>
  );
}

export default AssetSection;
