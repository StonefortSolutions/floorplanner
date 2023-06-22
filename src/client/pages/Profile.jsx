import React, { Suspense, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchExamples } from "../store";
import { useAuth } from "@clerk/clerk-react";

function Profile() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  if (!isLoaded || !userId) {
    return null;
  }
  const { examples } = useSelector((state) => state.examples);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchExamples());
  }, []);

  return (
    <div>
      Hello, {userId} your current active session is {sessionId}
      <h3>Examples from Database</h3>
      <ul className="list-disc list-inside">
        {examples.map((example) => (
          <li className="" key={example.id}>
            {example.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
