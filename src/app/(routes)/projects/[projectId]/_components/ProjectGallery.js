import React from "react";
import GalleryImage from "./GalleryImage";
import generateKey from "@/utils/generateKeys";
function ProjectGallery({ media }) {
  const allMedia = JSON.parse(media);
  return (
    <div className="project-gallery-wrapper">
      <h6>Gallery</h6>
      {allMedia &&
        allMedia.map((image) => (
          <React.Fragment key={generateKey(image)}>
            <GalleryImage path={image} />
          </React.Fragment>
        ))}
    </div>
  );
}

export default ProjectGallery;
