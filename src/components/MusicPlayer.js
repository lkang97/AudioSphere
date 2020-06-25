import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../store/state";
import "../styles/music-player.css";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slider from "@material-ui/core/Slider";
import VolumeDown from "@material-ui/icons/VolumeDown";
import VolumeUp from "@material-ui/icons/VolumeUp";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import { api } from "../config";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: "gray",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const MusicPlayer = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.currentSong);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [mute, setMute] = useState(false);

  const handleVolChange = (event, newValue) => {
    setVolume(newValue);
  };

  return (
    <div className="song-bar-container">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div className="song-info"></div>
          <div className="song-actions">
            <IconButton>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton>
              {currentSong ? (
                <PlayCircleOutlineIcon />
              ) : (
                <PauseCircleOutlineIcon />
              )}
            </IconButton>
            <IconButton>
              <SkipNextIcon />
            </IconButton>
          </div>
          <div id="song-volume">
            <Grid container spacing={2}>
              <Grid item>
                <VolumeDown />
              </Grid>
              <Grid item xs>
                <Slider
                  value={volume}
                  onChange={handleVolChange}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
              <Grid item>
                <VolumeUp />
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MusicPlayer;
