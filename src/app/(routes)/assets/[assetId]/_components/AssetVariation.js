"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function AssetVariation({
  data: assetData,
  modelViewerForwordedRef,
  materialId,
}) {
  // console.log("materialId", materialId);
  const swapDiffuseTexture = async () => {
    const diffuse = await modelViewerForwordedRef.current.createTexture(
      process.env.NEXT_PUBLIC_SERVER_BASE_URL + query.data.data.data.thumbnail
    );
    const material = modelViewerForwordedRef.current.model.materials[1];

    material.pbrMetallicRoughness["baseColorTexture"].setTexture(diffuse);
  };

  const getMaterialById = async () => {
    try {
      // console.log("id", materialId);
      const responseData = await axios.get(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          process.env.NEXT_PUBLIC_GET_MATERIAL_BY_ID_API_URL +
          materialId
        // `https://localhost:8080/api/v1/public/get/${params.projectId}`
      );
      return responseData;
    } catch (error) {
      // console.error(error);
      return error;
    }
  };
  const query = useQuery({
    queryKey: ["getMaterialsById" + materialId],
    queryFn: getMaterialById,
  });

  return (
    <>
      {query.data && (
        <div
          className="material-image asset-image"
          onClick={() => {
            swapDiffuseTexture();
          }}
        >
          <img
            className="w-100"
            src={process.env.NEXT_PUBLIC_SERVER_BASE_URL + assetData.thumbnail}
            alt="chair"
          />
        </div>
      )}
    </>
  );
}

export default AssetVariation;
