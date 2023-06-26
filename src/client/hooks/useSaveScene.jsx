import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function useSaveSceneAtInterval(time) {
  const [isSaving, setIsSaving] = useState(false);
  const scene = useSelector((state) => state.scene);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSaving(true);
      if (scene.length > 0) {
        window.localStorage.setItem("scene", JSON.stringify(scene));
      }
      setIsSaving(false);
    }, time);
    return () => clearInterval(interval);
  }, []);

  return { isSaving };
}

export { useSaveSceneAtInterval };
