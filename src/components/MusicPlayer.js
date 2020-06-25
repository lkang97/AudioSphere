import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../store/state";
import "../styles/music-player.css";

import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import IconButton from "@material-ui/core/IconButton";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import { api } from "../config";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

const MusicPlayer = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.currentSong);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);

  return (
    <div className="song-bar-container">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
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
          <div className="song-volume"></div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MusicPlayer;
