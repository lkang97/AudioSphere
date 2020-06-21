import { api } from "../config";
import { useAuth0 } from "../react-auth0-spa";
// const { user, getTokenSilently } = useAuth0();

// Defines the initial state of the application
const initialState = {
  user: null,
  songs: [],
  song: null,
};

// Defines all the actions

const SET_USER = "SET_USER";
const SET_SONGS = "SET_SONGS";
const SET_CURRENT_SONG = "SET_CURRENT_SONG";

export const setUserId = (user) => ({ type: SET_USER, user });
export const setSongs = (songs) => ({ type: SET_SONGS, songs });
export const setCurrentSong = (song) => ({ type: SET_CURRENT_SONG, song });

export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case SET_USER: {
      newState.user = action.user;
      return newState;
    }
    case SET_SONGS: {
      newState.songs = action.songs;
      return newState;
    }
    case SET_CURRENT_SONG: {
      newState.song = action.song;
      return newState;
    }
    default: {
      return state;
    }
  }
}
