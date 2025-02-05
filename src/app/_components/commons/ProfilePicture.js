import {
  createImageFromInitials,
  getRandomColor,
} from "@/utils/profilePhotoMaker";
import React from "react";

function ProfilePicture({ avatarUrl, name }) {
  const PATH = process.env.NEXT_PUBLIC_SERVER_BASE_URL + avatarUrl;
  const generatedImage = createImageFromInitials(40, name, getRandomColor());

  return (
    <>
      <img className="user-name" src={avatarUrl ? PATH : generatedImage} />

      {/* <span className="user-name">MJ</span> */}
    </>
  );
}

export default ProfilePicture;
