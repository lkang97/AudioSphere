import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import "../styles/profile.css";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div>
        <img className="profile-image" src={user.picture} alt="Profile" />
        <h2>{user.nickname}</h2>
      </div>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </div>
  );
};

export default Profile;
