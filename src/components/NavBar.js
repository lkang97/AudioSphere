import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles, fade } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import logo from "../images/logo.gif";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: 50,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "#003059",
  },
  appBar: {
    backgroundColor: "black",
    borderBottom: "1px solid #003059",
    padding: 0,
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
      color: "#003059",
    },
    fontSize: 16,
  },
  logo: {
    height: "17",
  },
  divider: {
    backgroundColor: "#003059",
  },
}));

const NavBar = () => {
  const classes = useStyles();

  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => logout()}>Log out</MenuItem>
    </Menu>
  );
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar style={{ justifyContent: "space-between" }}>
          <Link style={{ textDecoration: "none" }} to="/">
            <div id="logo-container">
              <img src={logo} alt="logo" id="audiosphere-logo" />
              <Typography className={classes.title} variant="h6" noWrap>
                AudioSphere
              </Typography>
            </div>
          </Link>
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
            <div className="nav-actions">
              <div className="nav-button">
                <Link style={{ textDecoration: "none" }} to="/upload">
                  <Button className={classes.navText}>Upload</Button>
                </Link>
              </div>
              {/* <Divider
                className={classes.divider}
                orientation="vertical"
                flexItem
              /> */}
              <div className="nav-button">
                <Link style={{ textDecoration: "none" }} to="/profile">
                  <Button className={classes.navText}>{user.nickname}</Button>
                </Link>
              </div>
              {/* <Divider
                className={classes.divider}
                orientation="vertical"
                flexItem
              /> */}
              <IconButton
                color="inherit"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
              >
                <SettingsIcon style={{ color: "#003059" }} />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {renderMenu}
    </div>
  );
};

export default NavBar;
