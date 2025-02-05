"use client";
import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import generateKey from "@/utils/generateKeys";
import ImageContainer from "./ImageContainer";
import VideoContainer from "./VideoContainer";

function MediaViewer({ media, videos }) {
  const BASE_PATH = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  return (
    <>
      <div className="module-image-block">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        >
          {videos ? (
            <>
              {media.videos.map((media) => (
                <React.Fragment key={generateKey(media.id)}>
                  <SwiperSlide className="asset-wrapper">
                    <VideoContainer url={BASE_PATH + media.media} />
                  </SwiperSlide>
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              {media.images.map((media, i) => (
                <React.Fragment key={generateKey(media.id)}>
                  <SwiperSlide className="asset-wrapper">
                    <ImageContainer url={BASE_PATH + media.media} />
                  </SwiperSlide>
                </React.Fragment>
              ))}
            </>
          )}
        </Swiper>
      </div>
    </>
  );
}

export default MediaViewer;
