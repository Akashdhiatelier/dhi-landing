import React from "react";

function Asset({ isSelected, setSelected, assetData, setCurrentSelection }) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  // console.log("asset data", assetData);
  return (
    <>
      {assetData && (
        <div
          className="material-wrapper position-relative"
          onClick={() => {
            setCurrentSelection(assetData);
            setSelected(assetData.name);
          }}
        >
          <div
            className={`material-image asset-image ${isSelected && "active"}`}
          >
            <img src={baseUrl + assetData.thumbnail} alt="chair" />
            {isSelected && (
              <span className="check">
                <img src="/images/check.svg" alt="check" />
              </span>
            )}
          </div>
          <span>{assetData.name}</span>
        </div>
      )}
    </>
  );
}

export default Asset;
