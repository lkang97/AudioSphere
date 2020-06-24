import React, { useState } from "react";
import { api } from "../config";
import { useAuth0 } from "../react-auth0-spa";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import "../styles/upload.css";

const Upload = () => {
  const { user, getTokenSilently } = useAuth0();
  const [songUrl, setSongUrl] = useState(null);
  const [songTitle, setSongTitle] = useState(null);
  const [songGenre, setSongGenre] = useState(null);
  const [songDesc, setSongDesc] = useState(null);

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const token = await getTokenSilently();

    const response = await fetch(`${api}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (response.ok) {
      const songUrl = await response.json();
      setSongUrl(songUrl);
    }
  };

  const handleTitle = async (e) => {
    setSongTitle(e.target.value);
  };

  const handleGenre = async (e) => {
    setSongGenre(e.target.value);
  };

  const handleDesc = async (e) => {
    setSongDesc(e.target.value);
  };

  return (
    <div className="upload-container">
      <div className="dnd-container">
        <h2>Drag and drop your audio file here</h2>
        <form>
          <FormControl>
            <Button className="upload-button" variant="contained">
              <input
                accept="audio/*"
                style={{ display: "none" }}
                type="file"
                id="raised-button-file"
                onChange={uploadFile}
              ></input>
              <label htmlFor="raised-button-file">
                or click here to upload.
              </label>
            </Button>
          </FormControl>
          {/* {songUrl ? ( */}
          <div className="upload-song-details">
            <FormControl>
              <TextField
                label="Song Title"
                type="text"
                onChange={handleTitle}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Song Genre"
                type="text"
                onChange={handleGenre}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Song Description"
                type="text"
                onChange={handleDesc}
              />
            </FormControl>
          </div>
          {/* ) : (
            <div></div>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default Upload;
