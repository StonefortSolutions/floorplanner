import React, { Suspense, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExamples } from "../store";

function Profile() {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading, error } = useAuth0();
   if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  const dispatch = useDispatch();
  const fetchStuff = async () => {
      const token = await getAccessTokenSilently();
      dispatch(fetchExamples(token));
  };
  useEffect(() => {
    fetchStuff();
  }, []);
  if (!isAuthenticated) return <div>Log in to view profile</div>;
  const { examples } = useSelector((state) => state.examples);
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
