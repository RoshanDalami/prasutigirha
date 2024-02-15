import React from "react";
import { Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rounded"
        height={30}
        sx={{ marginTop: "10px" }}
      />
    </>
  );
};

export default Loading;
