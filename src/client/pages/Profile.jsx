import React, { Suspense, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExamples } from "../store";

function Profile() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently();
      dispatch(fetchExamples(token));
    })();
  }, []);

  const { examples } = useSelector((state) => state.examples);

  if (!isAuthenticated) return <div>Loading...</div>;
  const { name, picture, email } = user;
  return (
    <div>
      <h2>Profile</h2>
      <img src={picture} alt={name} className="rounded-full h-10 w-10" />
      <h2>{name}</h2>
      <p>{email}</p>
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
