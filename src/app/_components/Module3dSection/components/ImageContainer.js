import React from "react";

function ImageContainer({ url }) {
  return (
    <>
      <img src={url} alt="3d-image" className="img-fluid" />
    </>
  );
}

export default ImageContainer;
