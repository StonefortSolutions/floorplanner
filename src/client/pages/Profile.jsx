import React, { Suspense } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const { examples } = useSelector((state) => state.examples);

  if (!isAuthenticated) return <div>Loading...</div>;
  const { name, picture, email } = user;
  return (
    <div>
      <h2>Profile</h2>
      <img src={picture} alt={name} className="rounded-full h-10 w-10" />
      <h2>{name}</h2>
      <p>{email}</p>
      <h3>Examples from Redux</h3>
      {examples.map((example) => (
        <div key={example.id}>{example.name}</div>
      ))}
    </div>
  );
}

export default Profile;
