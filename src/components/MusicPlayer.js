import React, { useState, useRef } from "react";
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
    backgroundColor: "black",
    borderTop: "1px solid #101010",
  },
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttons: {
    color: "lightgray",
    margin: "8px 10px 0px",
    padding: 0,
  },
  playBtn: {
    fontSize: 35,
  },
}));

const MusicPlayer = () => {
  const classes = useStyles();
  const interval = useRef(null);
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.song);
  const [duration, setDuration] = useState(0);
  const [currTime, setCurrTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [mute, setMute] = useState(false);

  const handleVolChange = (event, newValue) => {
    let audio = document.getElementById("audio");
    audio.volume = newValue;
    setVolume(newValue);
  };

  const handleMetadata = (e) => {
    let audio = document.getElementById("audio");
    setDuration(audio.duration);
  };

  const handleOnPlaying = (e) => {
    let audio = document.getElementById("audio");
    if (!audio.paused) {
      interval.current = setInterval(() => {
        setCurrTime(audio.currentTime);
      }, 50);
    }
  };
  const handlePlayPause = () => {
    let audio = document.getElementById("audio");

    if (isPlaying) {
      audio.pause();
      clearInterval(interval.current);
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleSongSlide = (e, newValue) => {
    clearInterval(interval.current);
    let audio = document.getElementById("audio");
    audio.currentTime = newValue;
    setCurrTime(newValue);
  };

  const handleOnEnded = () => {
    dispatch(setCurrentSong(null));
  };

  const convertTime = () => {};
  const musicPlayer = (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <div>
            {currentSong ? (
              <div className="song-info">
                <div className="song-title">{currentSong.title}</div>
                <div className="song-user">{currentSong.user.nickname}</div>
              </div>
            ) : (
              <div className="song-info"></div>
            )}
          </div>
          <div className="song-actions">
            <div>
              <IconButton className={classes.buttons}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton className={classes.buttons} onClick={handlePlayPause}>
                {isPlaying ? (
                  <PauseCircleOutlineIcon className={classes.playBtn} />
                ) : (
                  <PlayCircleOutlineIcon className={classes.playBtn} />
                )}
              </IconButton>
              <IconButton className={classes.buttons}>
                <SkipNextIcon />
              </IconButton>
            </div>
            <div className="song-slider">
              {/* {currentSong ? (
                <div className="song-duration">{currTime}</div>
              ) : (
                <div className="song-duration">--.--</div>
              )} */}
              <Slider
                value={currTime}
                onChange={handleSongSlide}
                max={duration}
              />
              {/* {currentSong ? (
                <div className="song-duration">{duration}</div>
              ) : (
                <div className="song-duration">--.--</div>
              )} */}
            </div>
          </div>
          <div id="song-volume">
            <Grid container spacing={2}>
              <Grid item>
                <VolumeDown />
              </Grid>
              <Grid item xs>
                <Slider
                  min={0.0}
                  step={0.1}
                  max={1.0}
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
      <Toolbar />
    </div>
  );

  return (
    <div className="song-bar-container">
      {currentSong ? (
        <>
          <audio
            id="audio"
            src={currentSong.song_url}
            // src="https://audiosphere-project.s3.us-east-2.amazonaws.com/01_Gallery.mp3"
            onLoadedMetadata={handleMetadata}
            onPlaying={handleOnPlaying}
            onEnded={handleOnEnded}
            autoPlay
          />
          {musicPlayer}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MusicPlayer;
