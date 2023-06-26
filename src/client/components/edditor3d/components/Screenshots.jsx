import React, { useEffect } from "react";
import { screenShotAtIntervals } from "../../../hooks/useScreenshot";

function Screenshots() {
  const { image, error, isLoading } = screenShotAtIntervals(10000);

  useEffect(() => {
    console.log("NEW SCREENSHOT AVAILABLE");
    //TODO: Save to redux store for Floorplan or direct to server
  }, [image, error, isLoading]);

  return <></>;
}

export default Screenshots;
