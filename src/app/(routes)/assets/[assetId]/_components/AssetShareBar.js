import React from "react";

function AssetShareBar() {
  return (
    <div className="asset-blocks mb-0">
      <h6 className="text-white">Share on Social Media</h6>
      <ul className="social-list">
        <li>
          <a href="">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </li>
        <li>
          <a href="">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
        </li>
        <li>
          <a href="">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </li>
        <li>
          <a href="">
            <i className="fa-brands fa-twitter"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AssetShareBar;
