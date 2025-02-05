import React from "react";

function VideoContainer({ url }) {
  return (
    <>
      <video
        width="100%"
        height="100%"
        autoPlay
        muted
        src={url}
        type="video/mp4"
      />
    </>
  );
}

export default VideoContainer;
