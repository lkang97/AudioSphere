import { api } from "../config";

// Defines the initial state of the application
const initialState = {
    user = null,
    songs = [],
};

// Defines all the actions

const SET_USER = 'SET_USER';
const SET_SONGS = 'SET_SONGS';

export const setUser = user => ({type: SET_USER, user});
export const setSongs = songs => ({type: SET_SONGS, songs});

export default function reducer(state = initialState, action) {
    let newState = {...state};
    switch(action.type) {
        case SET_USER: {
            newState.user = action.user;
            return newState;
        }
        case SET_SONGS: {
            newState.songs = action.songs;
            return newState;
        }
    }
};
