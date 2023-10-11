import ReactPannellum from "react-pannellum";

function ProjectPanorama({ panoramaUrl, id, sceneId, height }) {
  const config = {
    autoLoad: true,
  };

  return (
    <>
      {panoramaUrl && (
        <ReactPannellum
          id={id}
          sceneId={sceneId}
          imageSource={panoramaUrl}
          config={config}
          style={{
            width: "100%",
            height: height,
            background: "transparent",
          }}
        />
      )}
    </>
  );
}

export default ProjectPanorama;
