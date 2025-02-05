import React from "react";
import ShareModal from "./ShareModal";
import useAuthStore from "../../../../_store/store";

function ShareBar({ noOfComments, noOfLikes, setShow }) {
  const { userInfo } = useAuthStore();
  const saveProject = () => {
    if (userInfo) {
    }
  };
  return (
    <>
      <ul className="project-status">
        <li>
          <span
            onClick={saveProject}
            data-bs-toggle={!userInfo ? "modal" : ""}
            data-bs-target="#loginModal"
          >
            <small>{noOfLikes}</small>
            <img src="/images/save.svg" alt="save" />
          </span>
          <div>save</div>
        </li>

        <li>
          <span>
            <small>{noOfComments}</small>
            <img src="/images/comment.svg" alt="comments" />
          </span>
          <div>Comments</div>
        </li>
        <li>
          <span
            data-bs-toggle="modal"
            data-bs-target="#ShareModal"
            onClick={() => setShow(true)}
          >
            {/* <small>150</small> */}
            <img src="/images/share.svg" alt="share" />
          </span>
          <div>Share</div>
        </li>
      </ul>
    </>
  );
}

export default ShareBar;
