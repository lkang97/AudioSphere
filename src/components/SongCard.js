import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "../react-auth0-spa";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";

import img1 from "../images/splash-img1.jpg";
import "../styles/song-card.css";
import { setCurrentSong } from "../store/state";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 170,
    width: 170,
  },
});

const SongCard = ({ song }) => {
  const { user, loading } = useAuth0();

  const classes = useStyles();
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  // Set the current playing song in the state
  const handleClick = () => {
    if (user) {
      dispatch(setCurrentSong(song));
      setIsClicked(!isClicked);
    } else {
      alert("Please sign in to listen to song.");
    }
  };

  return (
    <div className="single-song-card">
      <Card className={classes.root}>
        <CardActionArea>
          <div className="song-img-area">
            <CardMedia className={classes.media} image={img1} />
            <IconButton
              className="song-play-button"
              style={{ backgroundColor: "blue" }}
              onClick={handleClick}
            >
              {isClicked ? <PauseCircleFilledIcon /> : <PlayArrowIcon />}
            </IconButton>
          </div>
          <CardContent>
            <Typography variant="h6" component="h2">
              {song.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {song.user.nickname}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default SongCard;
