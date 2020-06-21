import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  appBar: {
    backgroundColor: "black",
    borderBottom: "1px solid #5f2f3a",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  navText: {
    color: "white",
    "&:hover": {
      color: "#5f2f3a",
    },
    fontSize: 16,
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography className={classes.title} variant="h6" noWrap>
            AudioSphere
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          {!isAuthenticated && (
            <Button
              className={classes.navText}
              onClick={() => loginWithRedirect({})}
            >
              Login
            </Button>
          )}

          {isAuthenticated && (
            <span>
              <Link to="/">Home</Link>&nbsp;
              <Link to="/profile">Profile</Link>
              <Link to="/external-api">
                <Button className={classes.navText}>External API</Button>
              </Link>
              <Button className={classes.navText} onClick={() => logout()}>
                Logout
              </Button>
            </span>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default NavBar;
