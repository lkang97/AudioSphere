import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "../react-auth0-spa";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import Typography from "@material-ui/core/Typography";
import "../styles/song-card.css";

import { setCurrentSong } from "../store/state";

const useStyles = makeStyles({
  root: {
    height: "250px",
    display: "flex",
    flexDirection: "row",
  },
  media: {
    height: 250,
    width: 250,
    padding: 0,
  },
});

const SingleSong = ({ song }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isClicked, setIsClicked] = useState(false);
  const { user, loading } = useAuth0();

  const handleClick = () => {
    if (user) {
      dispatch(setCurrentSong(song));
      setIsClicked(!isClicked);
    } else {
      alert("Please sign in to listen to song.");
    }
  };

  return (
    <div id="single-container">
      <Card className={classes.root}>
        <div id="image-container">
          <CardMedia className={classes.media} image={song.image_url} />
        </div>
        <div>
          <CardContent>
            <Typography id="song-card-title" variant="h6" component="h2">
              {song.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {song.user.nickname}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default SingleSong;
