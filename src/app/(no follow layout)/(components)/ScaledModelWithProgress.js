"use client";
import React, { Suspense, useState } from "react";

import { Model, Box, StandardMaterial, Mesh } from "react-babylonjs";
import { Vector3, Matrix, Color3 } from "@babylonjs/core";
import "@babylonjs/loaders";

const ProgressFallback = (props) => (
  <Mesh
    name="progressbarMesh"
    rotation={props.progressRotation}
    position={props.center}
  >
    <Box
      key="progress"
      name="boxProgress"
      height={props.scaleTo / 50}
      width={props.scaleTo}
      depth={props.scaleTo / 30}
      scaling={new Vector3(props.loadProgress, 1, 1)}
      position={new Vector3(props.scaleTo / 2, 0, props.scaleTo / 60)}
      setPivotMatrix={[Matrix.Translation(-props.scaleTo, 0, 0)]}
      setPreTransformMatrix={[Matrix.Translation(-props.scaleTo / 2, 0, 0)]}
    >
      <StandardMaterial
        name="progressbar"
        diffuseColor={props.progressBarColor}
        specularColor={Color3.Green()}
      />
    </Box>
    <Box
      key="back"
      name="boxBack"
      height={props.scaleTo / 50}
      width={props.scaleTo}
      depth={props.scaleTo / 30}
      position={new Vector3(0, 0, props.scaleTo / -60)}
    />
  </Mesh>
);

const ScaledModelWithProgress = ({
  progressRotation,
  progressBarColor,
  center,
  scaleTo,
  estimatedFileSize,
  onModelLoaded,
  rootUrl,
  sceneFilename,
  modelRotation,
  fileExtension,
}) => {
  const [loadProgress, setLoadProgress] = useState(0);
  return (
    <Suspense
      fallback={
        <ProgressFallback
          progressRotation={progressRotation}
          center={center}
          scaleTo={scaleTo}
          loadProgress={loadProgress}
          progressBarColor={progressBarColor}
        />
      }
    >
      <Model
        scaleToDimension={scaleTo}
        onLoadProgress={(evt) => {
          let modelLoadProgress = evt.lengthComputable
            ? evt.loaded / evt.total
            : evt.loaded /
              (estimatedFileSize *
                0.085); /* provided fileSize is not for 'view' manifest, a bad guess often, but generally factor ~0.085 smaller  */
          setLoadProgress(modelLoadProgress);
        }}
        onModelLoaded={(model) => {
          setLoadProgress(1);
          if (onModelLoaded) {
            onModelLoaded(model);
          }
        }}
        position={center}
        rootUrl={rootUrl}
        sceneFilename={sceneFilename}
        pluginExtension={fileExtension}
        rotation={modelRotation}
      ></Model>
    </Suspense>
  );
};

export default ScaledModelWithProgress;
