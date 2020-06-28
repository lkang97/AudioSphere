import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import "../styles/profile.css";
import { api } from "../config";
import SingleSong from "./SingleSong";

const Profile = () => {
  const { loading, user, getTokenSilently } = useAuth0();
  const [userSongs, setUserSongs] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const loadSets = async () => {
      const token = await getTokenSilently();
      const res = await fetch(`${api}/users/songs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFetched(true);
      setUserSongs(data.userSongs);
      setFavoriteSongs(data.favoriteSongs);
    };
    loadSets();
  }, [getTokenSilently]);

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
      <div>
        {fetched &&
          userSongs.map((song) => {
            return <SingleSong song={song} key={song.id} />;
          })}
      </div>
    </div>
  );
};

export default Profile;
