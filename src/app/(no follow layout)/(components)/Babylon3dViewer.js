"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  Engine,
  Scene,
  HemisphericLight,
  ArcRotateCamera,
  HighlightLayer,
  PositionGizmo,
  RotationGizmo,
  ScaleGizmo,
  UtilityLayerRenderer,
} from "react-babylonjs";

import {
  ActionManager,
  ExecuteCodeAction,
  Vector3,
  Color3,
  Color4,
  SceneLoader,
  Tools,
} from "@babylonjs/core";
import ScaledModelWithProgress from "./ScaledModelWithProgress";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
function Babylon3dViewer({
  modelPath,
  setPickedMeshId,
  pickedMeshId,
  currentSelection,
  setShowOptions,
  showOptions,
}) {
  const HIGHLIGHT_COLOR = new Color3(0.01, 0.37, 0.36); //green
  const [userSelectedMesh, setUserSelectedMesh] = useState(null);
  const meshRefs = useRef([]);
  const highlightLayerRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const [focusTo, setFocusTo] = useState(null);

  const positionGizmoRef = useRef(null);
  const rotationGizmoRef = useRef(null);
  const scaleGizmoRef = useRef(null);
  const [isRotate, setIsRotate] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [isScale, setIsScale] = useState(false);
  const [transformToGlobal, setTransformToGlobal] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

  const handlePointerUp = (event, pickInfo) => {
    if (pickInfo.pickedMesh) {
      setUserSelectedMesh(pickInfo.pickedMesh);
      setFocusTo(pickInfo.pickedMesh._absolutePosition);
    }

    // setShowOptions(false);
    if (pickInfo.pickedMesh === null) {
      resetSelected();
    }
  };

  const resetSelected = () => {
    if (userSelectedMesh) {
      setUserSelectedMesh(null);
      setPickedMeshId(null);
      setShowOptions(false);
      removeHighlightedMesh();
      setIsMove(false);
      setIsRotate(false);
      setIsScale(false);
    }
  };

  const selectMesh = (mesh) => {
    setPickedMeshId(mesh);
    setUserSelectedMesh(mesh);
  };

  const highlightMesh = (mesh) => {
    const highlightLayer = highlightLayerRef.current;

    const highlightChildren = (children) => {
      children.forEach((child) => {
        highlightLayer.addMesh(child, HIGHLIGHT_COLOR);
      });
    };

    const childrenMeshes = mesh.getChildMeshes();

    //check if mesh is empty or not
    if (!mesh.material) {
      // console.log(
      //   "The mesh is empty (no vertices). Highlighting its children."
      // );
      highlightChildren(childrenMeshes);
    } else {
      highlightLayer.addMesh(mesh, HIGHLIGHT_COLOR);
      if (childrenMeshes.length > 0) {
        highlightChildren(childrenMeshes);
      }
    }
  };

  const removeHighlightedMesh = () => {
    const highlightLayer = highlightLayerRef.current;
    highlightLayer.removeAllMeshes();
  };

  const handleModelChange = async () => {
    const importedMesh = await SceneLoader.ImportMeshAsync(
      null,
      baseUrl +
        currentSelection.model_file.split("/")[0] +
        "/" +
        currentSelection.model_file.split("/")[1] +
        "/",
      currentSelection.model_file.split("/")[2],
      userSelectedMesh._scene
    );

    let newMesh = new Mesh(userSelectedMesh.id, userSelectedMesh._scene);

    newMesh._position = userSelectedMesh._position;
    newMesh._rotation = userSelectedMesh._rotation;
    newMesh._scaling = userSelectedMesh._scaling;
    newMesh.parent = userSelectedMesh.parent;

    importedMesh.meshes[0].parent = newMesh;
    importedMesh.meshes[0].id = newMesh.id;
    importedMesh.meshes[0].metadata = currentSelection.name;
    userSelectedMesh.dispose();

    resetSelected();

    setShowOptions(false);
    setIsMove(false);
    setIsRotate(false);
    setIsScale(false);
  };

  useEffect(() => {
    if (userSelectedMesh) {
      if (userSelectedMesh.parent.id === "__root__") {
        selectMesh(userSelectedMesh);
        removeHighlightedMesh();
        highlightMesh(userSelectedMesh);
      } else {
        selectMesh(userSelectedMesh.parent);
      }

      setIsMove(false);
      setIsScale(false);
      setIsRotate(false);
    }
  }, [userSelectedMesh]);

  useEffect(() => {
    if (!currentSelection) return;
    const getModelChange = setTimeout(() => {
      handleModelChange();
    }, 100);
    return () => clearTimeout(getModelChange);
  }, [currentSelection]);

  const handleGizmoMove = () => {};
  useEffect(() => {
    if (positionGizmoRef.current) {
      positionGizmoRef.current.attachedMesh = isMove ? userSelectedMesh : null;
      positionGizmoRef.current.updateGizmoRotationToMatchAttachedMesh =
        transformToGlobal;
    }
    if (rotationGizmoRef.current) {
      rotationGizmoRef.current.attachedMesh = isRotate
        ? userSelectedMesh
        : null;
      rotationGizmoRef.current.updateGizmoRotationToMatchAttachedMesh =
        transformToGlobal;
    }
    if (scaleGizmoRef.current) {
      scaleGizmoRef.current.attachedMesh = isScale ? userSelectedMesh : null;
      scaleGizmoRef.current.updateGizmoRotationToMatchAttachedMesh =
        transformToGlobal;
    }
  }, [isMove, isRotate, isScale]);

  return (
    <>
      <div>
        {showOptions && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "25%",
              height: "auto",
            }}
          >
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="flexSwitchCheckChecked"
                checked={transformToGlobal}
                onChange={(e) => setTransformToGlobal(e.target.checked)}
              />
              <label class="form-check-label" for="flexSwitchCheckChecked">
                {transformToGlobal ? "local" : "global"}
              </label>
            </div>
            <button
              className={`btn btn-primary me-2  ${isMove ? "active" : ""}`}
              onClick={() => setIsMove(!isMove)}
              disabled={isRotate || isScale}
            >
              Move
            </button>
            <button
              className={`btn btn-primary me-2 ${isRotate ? "active" : ""}`}
              onClick={() => setIsRotate(!isRotate)}
              disabled={isMove || isScale}
            >
              Rotate
            </button>
            <button
              className={`btn btn-primary  me-2 ${isMove ? "active" : ""}`}
              onClick={() => setIsScale(!isScale)}
              disabled={isRotate || isMove}
            >
              Scale
            </button>
          </div>
        )}

        <Engine
          antialias
          adaptToDeviceRatio={true}
          canvasId="project-viewer-canvas"
        >
          <Scene
            onPointerUp={handlePointerUp}
            clearColor={new Color4(1, 1, 1, 0)}
            ref={sceneRef}
          >
            <ArcRotateCamera
              ref={cameraRef}
              name="camera1"
              alpha={Math.PI / 2}
              beta={Math.PI / 2}
              radius={9.0}
              target={focusTo !== null ? focusTo : Vector3.Zero()}
              minZ={0.001}
              upperBetaLimit={Math.PI / 2.8}
              wheelDeltaPercentage={0.01}
              lowerRadiusLimit={1.5}
              upperRadiusLimit={25}
            />
            <HemisphericLight
              name="light1"
              intensity={2}
              direction={Vector3.Up()}
            />

            <ScaledModelWithProgress
              rootUrl={baseUrl}
              sceneFilename={modelPath}
              scaleTo={4}
              progressBarColor={Color3.Green()}
              center={Vector3.Zero()}
            />

            <HighlightLayer name="highlight" ref={highlightLayerRef} />
            <UtilityLayerRenderer>
              <PositionGizmo
                ref={positionGizmoRef}
                onDragEndObservable={handleGizmoMove}
              />
              <RotationGizmo
                thickness={1.5}
                ref={rotationGizmoRef}
                onDragEndObservable={handleGizmoMove}
              />
              <ScaleGizmo
                thickness={1.5}
                ref={scaleGizmoRef}
                onDragEndObservable={handleGizmoMove}
              />
            </UtilityLayerRenderer>
          </Scene>
        </Engine>
      </div>
    </>
  );
}

export default Babylon3dViewer;
