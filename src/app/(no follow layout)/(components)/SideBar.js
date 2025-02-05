"use client";
import React, { useState, useEffect } from "react";
import Asset from "./Asset";
import generateKey from "@/utils/generateKeys";
import Search from "@/app/_components/commons/Search";

function SideBar({ modelToShow, setCurrentSelection, pickedMeshId }) {
  // console.log("pickedMeshId in sidebar", pickedMeshId?.parent);

  const [models, setmodels] = useState(null);
  const [allData, setAllData] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!modelToShow) return;

    setmodels(modelToShow.map((item) => item.model));
    setAllData(modelToShow.map((item) => item.model));
  }, [modelToShow]);

  useEffect(() => {
    // console.log("pickedMeshId", pickedMeshId);
    if (pickedMeshId?.parent !== "__root__") {
      if ((pickedMeshId?.id, pickedMeshId?.metadata)) {
        setSelected(pickedMeshId?.metadata);
      }
    }
  }, [pickedMeshId]);

  return (
    <>
      <div
        className="offcanvas offcanvas-end visible show"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Customize Project
          </h5>
        </div>
        <div className="offcanvas-body">
          {modelToShow && modelToShow.length > 0 ? (
            <>
              <Search allData={allData} data={models} setData={setmodels} />
              <div className="listing-wrapper">
                <div className="listing-material">
                  <h6>Choose Assets</h6>
                  <div className="material-grid">
                    {models && (
                      <>
                        {models.map((model) => (
                          <>
                            <React.Fragment
                              key={generateKey(JSON.stringify(model.id))}
                            >
                              <Asset
                                isSelected={
                                  JSON.stringify(selected) ===
                                  JSON.stringify(model.name)
                                }
                                assetData={model}
                                setSelected={setSelected}
                                setCurrentSelection={setCurrentSelection}
                              />
                            </React.Fragment>
                          </>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-white text-center mt-5">
                Please select object
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SideBar;
