import React, { useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import "../styles/profile.css";
import { api } from "../config";
import SingleSong from "./SingleSong";

import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const { loading, user, getTokenSilently } = useAuth0();
  const [userSongs, setUserSongs] = useState([]);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [value, setValue] = useState(0);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="user-info-container">
        <img className="profile-image" src={user.picture} alt="Profile" />
        <h2 className="profile-text">{user.nickname}</h2>
        <p className="profile-text">{user.email}</p>
      </div>
      <Paper square id="profile-tabs-container">
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab
            inkBarStyle={{ background: "white" }}
            label="My Songs"
            {...a11yProps(0)}
          />
          <Tab label="Favorited Songs" {...a11yProps(1)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <div className="songs-container">
          {fetched &&
            userSongs.map((song) => <SingleSong song={song} key={song.id} />)}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="songs-container">
          {fetched &&
            favoriteSongs.map((song) => (
              <SingleSong song={song} key={song.id} />
            ))}
        </div>
      </TabPanel>
    </>
  );
};

export default Profile;
