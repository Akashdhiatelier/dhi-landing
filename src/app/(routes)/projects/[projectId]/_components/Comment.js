import ProfilePicture from "@/app/_components/commons/ProfilePicture";
import React from "react";

function Comment({ data }) {
  return (
    <div className="project-comment">
      <ProfilePicture
        avatarUrl={data.user.avatar_url}
        name={data.user.first_name + " " + data.user.last_name}
      />
      <div className="comment-content">
        <h6>{data.user.first_name + " " + data.user.last_name}</h6>
        <p>{data.comments}</p>
        <span>20 Dec, 2023</span>
      </div>
    </div>
  );
}

export default Comment;
