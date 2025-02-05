import Link from "next/link";
import React from "react";

function Asset({ data }) {
  const PATH = process.env.NEXT_PUBLIC_SERVER_BASE_URL + data.thumbnail;
  return (
    <>
      <Link href={`/assets/${data.id}`} className="text-decoration-none">
        <div className="asset-img-block">
          <img src={PATH} alt="asset" />
        </div>
        <span>{data.name}</span>
      </Link>
    </>
  );
}

export default Asset;
