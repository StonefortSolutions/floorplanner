import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
//set local storage at an interval
function useSaveSceneAtInterval(time) {
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const scene = useSelector((state) => state.scene);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSaving(true);
      console.log(scene);
      if (scene.length > 0) {
        window.localStorage.setItem("scene", JSON.stringify(scene));
      }
      setIsSaving(false);
    }, time);
    return () => clearInterval(interval);
  }, []);

  return { error, isSaving };
}

export { useSaveSceneAtInterval };
