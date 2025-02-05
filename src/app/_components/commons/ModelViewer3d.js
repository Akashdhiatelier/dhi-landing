"use client";
import { useRef, useEffect } from "react";

function ModelViewer3d({ modelPath, modelViewerRef = null }) {
  // show ar button  code commented as we dont need it

  // useEffect(() => {
  //   console.log("modelViewerRef", modelViewerRef);
  //   if (modelViewerRef && modelViewerRef.current) {
  //     console.log("modelViewerRef", modelViewerRef);
  //     if (!isAr) {
  //       modelViewerRef.current.removeAttribute("ar");
  //     } else {
  //       modelViewerRef.current.setAttribute("ar", "");
  //     }
  //   }
  // }, [isAr]);

  return (
    <>
      <div className="model-viewer-wrapper">
        <model-viewer
          ref={modelViewerRef}
          alt="isometric home"
          src={modelPath || "/glbs/isometric_room.glb"}
          auto-rotate
          disable-zoom
          disable-pan
          max-camera-orbit="auto 60deg auto"
          min-camera-orbit="auto 60deg auto"
          shadow-intensity="1"
          camera-controls
          ar-scale="fixed"
        ></model-viewer>
      </div>
    </>
  );
}

export default ModelViewer3d;
