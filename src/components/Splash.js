import React from "react";
import "../styles/splash.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import img1 from "../images/splash-img1.jpg";
import img2 from "../images/splash-img2.jpg";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

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
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
    </div>
  );
};

export default Splash;
