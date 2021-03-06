import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSongs } from "../store/state";
import { useAuth0 } from "../react-auth0-spa";

import "../styles/splash.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import img1 from "../images/splash-img1.jpg";
import img2 from "../images/splash-img2.jpg";
import { api } from "../config";
import SingleSong from "./SingleSong";

import SongCard from "./SongCard";

// Set up autoplay on carousel using React swipeable views
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// Define images used on carousel
const tutorialSteps = [
  {
    label: "Splash image 1",
    imgPath: img1,
  },
  {
    label: "Splash image 2",
    imgPath: img2,
  },
];

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    maxWidth: 1100,
    flexGrow: 1,
    alignSelf: "center",
  },
  img: {
    height: 550,
    display: "block",
    // maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
}));

const Splash = () => {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs);
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  // Changes the image on a swipe
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    const loadSongs = async () => {
      try {
        const res = await fetch(`${api}/songs`);
        if (!res.ok) throw res;
        const response = await res.json();
        dispatch(setSongs(response));
      } catch (e) {
        console.error(e);
      }
    };
    loadSongs();
  }, [dispatch]);

  if (isAuthenticated) {
    return (
      <div id="main-container">
        {songs.map((song) => {
          return <SingleSong song={song} key={song.id} />;
        })}
      </div>
    );
  } else {
    return (
      <div id="splash-container">
        <div className={classes.carouselContainer}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            interval={5000}
          >
            {tutorialSteps.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <div className="splash-img-container">
                    <img
                      className={classes.img}
                      src={step.imgPath}
                      alt={step.label}
                    />
                    <div className="splash-img-text">
                      AudioSphere is an audio sharing application. Sign up or
                      login to start listening and uploading music!
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="dots"
            activeStep={activeStep}
            id="splash-stepper"
          />
        </div>
        <div className="splash-popular">
          <div className="popular-header">
            Here's what people are listening to on AudioSphere:
          </div>
          <div className="songs-container">
            {songs.slice(0, 10).map((song) => {
              return <SongCard song={song} key={song.id} />;
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Splash;
