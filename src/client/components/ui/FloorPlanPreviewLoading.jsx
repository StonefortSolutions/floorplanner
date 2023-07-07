import React from "react";
import { Skeleton } from "./Skeleton";

function FloorPlanPreviewLoading() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="p-4 h-72 w-full rounded-lg" />
      ))}
    </>
  );
}

export default FloorPlanPreviewLoading;
