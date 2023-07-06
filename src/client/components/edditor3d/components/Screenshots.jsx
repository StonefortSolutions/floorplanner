import React, { useEffect } from "react";
import { saveImageAtIntervals } from "../../../hooks/useScreenshot";
import { useDispatch, useSelector } from "react-redux";
import { updateFloorplanData } from "../../../store/floorplan";

//This component is used to save the floorplan scene and preview image to the redux store every x seconds
function Screenshots() {
  const { image, error, isLoading } = saveImageAtIntervals(4000);
  const scene = useSelector((state) => state.scene);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateFloorplanData({ scene, previewImage: image }));
  }, [image, error, isLoading]);

  return null;
}

export default Screenshots;
