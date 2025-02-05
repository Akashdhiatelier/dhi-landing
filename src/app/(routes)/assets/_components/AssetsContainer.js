import React from "react";
import Spinner from "react-bootstrap/Spinner";
import AssetComponent from "./AssetComponent";
import generateKey from "@/utils/generateKeys";

function AssetsContainer({ allModels, isFetching, isLoading }) {
  return (
    <>
      <>
        {(isLoading || isFetching) && (
          <>
            <div className="d-flex justify-content-center align-items-center">
              <Spinner
                animation="border"
                role="status"
                size="lg"
                variant="success"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          </>
        )}
        {allModels.length > 0 &&
          allModels.map((model) => (
            <React.Fragment key={generateKey(model.name)}>
              <AssetComponent
                data={model}
                // id={model.id}
                // assetName={model.name}
                // imgPath={
                //   process.env.NEXT_PUBLIC_SERVER_BASE_URL + model.thumbnail
                // }
                // modelPath={
                //   process.env.NEXT_PUBLIC_SERVER_BASE_URL + model.model_file
                // }
              />
            </React.Fragment>
          ))}
      </>
    </>
  );
}

export default AssetsContainer;
