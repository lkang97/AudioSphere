import React, { useState, useEffect } from "react";
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
import Button from "@material-ui/core/Button";
import "../styles/song-card.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { api } from "../config";

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
  const [isFavorited, setIsFavorited] = useState(false);
  const { user, loading, getTokenSilently } = useAuth0();

  const handlePlay = () => {
    dispatch(setCurrentSong(song));
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const getFavorites = () => {
      if (user) {
        song.favorites.forEach((favorite) => {
          favorite.id === user.userId
            ? setIsFavorited(true)
            : setIsFavorited(false);
        });
      }
    };
    getFavorites();
  }, [user, song.favorites]);

  const handleFavorite = async (e) => {
    if (user) {
      //updates isFavorite state
      setIsFavorited(isFavorited ? false : true);

      const token = await getTokenSilently();

      await fetch(`${api}/songs/${song.id}/favorites`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
            <div className="song-action-area">
              <div className="song-details-container">
                <IconButton
                  id="play-btn"
                  style={{ backgroundColor: "#003059" }}
                  onClick={handlePlay}
                >
                  <PlayArrowIcon />
                </IconButton>
                <div>
                  <Typography variant="h6" component="h2">
                    {song.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {song.user.nickname}
                  </Typography>
                </div>
              </div>
              <div>
                <IconButton onClick={handleFavorite}>
                  {isFavorited ? (
                    <FavoriteIcon id="song-favorited" />
                  ) : (
                    <FavoriteBorderIcon id="song-not-favorited" />
                  )}
                </IconButton>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default SingleSong;
