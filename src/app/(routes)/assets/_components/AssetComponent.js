import Link from "next/link";
import React from "react";

function AssetComponent({ data }) {
  const PATH = process.env.NEXT_PUBLIC_SERVER_BASE_URL + data.thumbnail;
  return (
    <>
      <div className="col-md-6 col-lg-4">
        <Link href={`/assets/${data.id}`} className="text-decoration-none">
          <div className="asset-wrapper">
            <div className="asset-img-block">
              <img src={PATH} alt="asset" />
            </div>
            <span>{data.name}</span>
          </div>
        </Link>
      </div>
    </>
  );
}

export default AssetComponent;
