import React from "react";

function MaterialContainer({
  id,
  selected,
  setSelected,
  thumbnail,
  modelViewerForwordedRef,
}) {
  // add cursor pointer

  const swapDiffuseTexture = async () => {
    const diffuse = await modelViewerForwordedRef.current.createTexture(
      process.env.NEXT_PUBLIC_SERVER_BASE_URL + thumbnail
    );
    const material = modelViewerForwordedRef.current.model.materials[1];

    material.pbrMetallicRoughness["baseColorTexture"].setTexture(diffuse);
  };

  return (
    <>
      <span
        className="pattern position-relative"
        onClick={() => {
          swapDiffuseTexture();
          setSelected(id);
        }}
      >
        <img
          src={process.env.NEXT_PUBLIC_SERVER_BASE_URL + thumbnail}
          alt="pattern"
        />
        {selected && (
          <img
            src="/images/selected.svg"
            alt="select"
            className="w-auto selected"
          />
        )}
      </span>
    </>
  );
}

export default MaterialContainer;
