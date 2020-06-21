import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

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
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentSong(song.title));
  };

  return (
    <div className="single-song-card">
      <Card className={classes.root}>
        <CardActionArea>
          <div className="song-img-area">
            <CardMedia
              className={classes.media}
              image={img1}
              title="Contemplative Reptile"
            />
            <IconButton
              className="song-play-button"
              style={{ backgroundColor: "blue" }}
              onClick={handleClick}
            >
              <PlayArrowIcon />
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
