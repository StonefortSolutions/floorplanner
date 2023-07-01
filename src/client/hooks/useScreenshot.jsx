import React, { useEffect, useCallback, useState } from "react";
import { useThree } from "@react-three/fiber";

function saveImageAtIntervals(time) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { gl } = useThree();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoading(true);
      const canvas = gl.domElement;
      const img = canvas.toDataURL("image/png");
      const testimg = new Image();
      testimg.src = img;
      testimg.onload = () => {
        setImage(img);
        setIsLoading(false);
      };
      testimg.onerror = (error) => {
        setError(error);
        setIsLoading(false);
      };
    }, time);
    return () => clearInterval(interval);
  }, []);

  return { image, error, isLoading };
}

function takeScreenshot() {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);
  const { gl } = useThree();

  const takeScreenshot = useCallback(() => {
    setIsTakingScreenshot(true);
  }, []);

  useEffect(() => {
    if (!isTakingScreenshot) return;
    setIsLoading(true);

    const canvas = gl.domElement;
    const img = canvas.toDataURL("image/png");

    const testimg = new Image();
    testimg.src = img;
    testimg.onload = () => {
      setImage(img);
      setIsLoading(false);
      setIsTakingScreenshot(false);
    };
    testimg.onerror = (error) => {
      setError(error);
      setIsLoading(false);
      setIsTakingScreenshot(false);
    };
  }, [isTakingScreenshot]);

  return { image, error, isLoading, takeScreenshot };
}

export { saveImageAtIntervals, takeScreenshot };
