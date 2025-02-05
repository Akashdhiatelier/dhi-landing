"use client";
import React, { useState, useEffect } from "react";
import SideBar from "../../(components)/SideBar";
import Babylon3dViewer from "../../(components)/Babylon3dViewer";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/app/_store/store";

function Page({ params }) {
  const { token } = useAuthStore();
  const router = useRouter();

  const [allModels, setAllModels] = useState(null); //to store all model from api
  const [modelToShow, setModelsToShow] = useState(null); // to store filtered models in sidebar
  const [pickedMeshId, setPickedMeshId] = useState(null); // shared state between viewer and sidebar
  const [currentSelection, setCurrentSelection] = useState(null); //to store the current selection from sidebar
  const [showOptions, setShowOptions] = useState(false); // to hide show gizmo options

  useEffect(() => {
    if (!token) {
      router.replace("/?login=true");
    }
  }, []);

  const getProjectById = async () => {
    // `https://localhost:8080/api/v1/public/get/${params.projectId}`
    const URL =
      process.env.NEXT_PUBLIC_API_BASE_URL +
      process.env.NEXT_PUBLIC_GET_PROJECT_BY_ID_API_URL_PROTECTED +
      params.projectId;
    const responseData = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    return responseData;
  };

  const {
    isLoading,
    isError,
    data: projectData,
    isFetching,
  } = useQuery({
    queryKey: ["getProjectById"],
    queryFn: getProjectById,
  });

  useEffect(() => {
    if (projectData?.status !== 200) return;
    if (projectData.data.data) {
      // filter out models which are allowed to change
      setAllModels(
        projectData.data.data.models.filter(
          (model) => model.allow_change === true
        )
      );
    }
    console.log("Project data changed", projectData);
  }, [projectData]);

  useEffect(() => {
    if (!allModels) return;
    if (!pickedMeshId) {
      setModelsToShow(null);
      return;
    }
    const showModels = allModels.filter(
      (model) => model.object_id === pickedMeshId.id
    );
    setModelsToShow(showModels);

    const refineModel = allModels.find(
      (item) => item.object_id === pickedMeshId.id && item.allow_move === true
    );
    setShowOptions(refineModel ? true : false);
  }, [pickedMeshId]);

  return (
    <>
      <section className="project-listing">
        <div className="canvas-block">
          {projectData && (
            <Babylon3dViewer
              modelPath={projectData.data.data.project_file}
              setPickedMeshId={setPickedMeshId}
              pickedMeshId={pickedMeshId}
              currentSelection={currentSelection}
              showOptions={showOptions}
              setShowOptions={setShowOptions}
            />
          )}
        </div>

        <SideBar
          pickedMeshId={pickedMeshId}
          modelToShow={modelToShow}
          setCurrentSelection={setCurrentSelection}
        />

        <div className="back-button">
          <Link href={`/projects/${params.projectId}`}>
            <button>
              <img src="/images/left-arrow-white.svg" alt="left" />
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Page;
