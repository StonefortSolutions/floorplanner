import React from "react";
import { useThree } from "@react-three/fiber";

function screenShotAtIntervals(time) {
  const [image, setImage] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const { gl } = useThree();
  React.useEffect(() => {
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
  const [image, setImage] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTakingScreenshot, setIsTakingScreenshot] = React.useState(false);
  const { gl } = useThree();

  const takeScreenshot = React.useCallback(() => {
    setIsTakingScreenshot(true);
  }, []);

  React.useEffect(() => {
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

export { screenShotAtIntervals, takeScreenshot };
