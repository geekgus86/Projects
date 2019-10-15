import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const FullScreenLoader = (props) => {
  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <div style={containerStyle}>
      <CircularProgress />
    </div>
  );
}

export default FullScreenLoader;