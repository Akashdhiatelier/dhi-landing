"use client";
import React, { useState } from "react";
import MaterialContainer from "./MaterialContainer";
import generateKey from "@/utils/generateKeys";

function MaterialSelectionContainer({
  availbleMaterials,
  modelViewerForwordedRef,
}) {
  const [selected, setSelected] = useState(null);

  // Function to remove duplicates based on the 'id' property
  const removeDuplicates = (arr) => {
    const uniqueMaterials = [];
    const uniqueIds = new Set();

    for (const material of arr) {
      if (!uniqueIds.has(material.id)) {
        uniqueIds.add(material.id);
        uniqueMaterials.push(material);
      }
    }

    return uniqueMaterials;
  };

  // Remove duplicates from availableMaterials
  const uniqueAvailableMaterials = removeDuplicates(availbleMaterials);

  //cases
  // asset with no material
  // api error (could be handled in parent component)
  // unable to change texture ()

  return (
    <div className="asset-blocks pattern">
      <h6>Available Materials</h6>
      <div className="asset-grid">
        {availbleMaterials.length > 0 ? (
          uniqueAvailableMaterials.map((material) => (
            <React.Fragment key={generateKey(material.name)}>
              <MaterialContainer
                id={material.id}
                modelViewerForwordedRef={modelViewerForwordedRef}
                selected={selected === material.id}
                setSelected={setSelected}
                thumbnail={material.thumbnail}
              />
            </React.Fragment>
          ))
        ) : (
          <>
            <p className="text-white">No available materials!</p>
          </>
        )}
      </div>
    </div>
  );
}

export default MaterialSelectionContainer;
