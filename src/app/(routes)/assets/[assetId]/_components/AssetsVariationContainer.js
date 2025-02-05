import React from "react";
import AssetVariation from "./AssetVariation";
import generateKey from "@/utils/generateKeys";

function AssetsVariationContainer({ data, modelViewerForwordedRef }) {
  return (
    <>
      <div className="preview-list">
        {data.variation.length > 0 &&
          data.variation.map((variation) => (
            <React.Fragment key={generateKey(variation.name)}>
              <AssetVariation
                data={variation}
                modelViewerForwordedRef={modelViewerForwordedRef}
                materialId={variation.details[0].material_id}
              />
            </React.Fragment>
          ))}
      </div>
    </>
  );
}

export default AssetsVariationContainer;
