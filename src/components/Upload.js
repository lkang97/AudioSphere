import React, { useState } from "react";
import { api } from "../config";
import { useAuth0 } from "../react-auth0-spa";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ImageIcon from "@material-ui/icons/Image";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

import "../styles/upload.css";

const Upload = () => {
  const { user, getTokenSilently } = useAuth0();
  const [songUrl, setSongUrl] = useState(null);
  const [songTitle, setSongTitle] = useState(null);
  const [songGenre, setSongGenre] = useState(null);
  const [songDesc, setSongDesc] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState();

  const uploadAudio = async (e) => {
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

  const handleImage = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    setFile(e.target.files[0]);

    // const token = await getTokenSilently();

    // const response = await fetch(`${api}/upload`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: formData,
    // });
    // if (response.ok) {
    //   const imgUrl = await response.json();
    //   setImageUrl(imgUrl);
    // }
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
        <form className="upload-form">
          <FormControl>
            <Button className="upload-button" variant="contained">
              <input
                accept="audio/*"
                style={{ display: "none" }}
                type="file"
                id="raised-button-audio"
                onChange={uploadAudio}
              ></input>
              <label htmlFor="raised-button-audio">
                or click here to upload.
              </label>
            </Button>
          </FormControl>
          <div>
            <Card>
              {file ? (
                <CardMedia>
                  <img src={URL.createObjectURL(file)} alt="preview" />
                </CardMedia>
              ) : (
                <ImageIcon color="primary" />
              )}
            </Card>
            <IconButton>
              <input
                accept="image/*"
                style={{ display: "none" }}
                type="file"
                id="raised-button-file"
                onChange={handleImage}
              ></input>
              <label htmlFor="raised-button-file">
                <AddAPhotoIcon variant="raised"></AddAPhotoIcon>
              </label>
            </IconButton>
          </div>
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
