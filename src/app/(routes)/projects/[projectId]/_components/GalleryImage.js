import React from "react";

function GalleryImage({ path }) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  return (
    // /images/projects/project-gallery.jpg
    <div className="project-gallery-image">
      <img src={baseUrl + path} alt="gallery" className="img-fluid" />
    </div>
  );
}

export default GalleryImage;
