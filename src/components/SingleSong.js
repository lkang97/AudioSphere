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

import { setCurrentSong } from "../store/state";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
    width: 250,
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
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <div className="song-img-area">
            <CardMedia className={classes.media} image={song.image_url} />
            <IconButton
              className="song-play-button"
              style={{ backgroundColor: "#003059" }}
              onClick={handleClick}
            >
              {isClicked ? <PauseCircleFilledIcon /> : <PlayArrowIcon />}
            </IconButton>
          </div>
          <CardContent>
            <Typography id="song-card-title" variant="h6" component="h2">
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

export default SingleSong;
