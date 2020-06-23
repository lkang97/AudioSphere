import React, { useState } from "react";
import { api } from "../config";
import { useAuth0 } from "../react-auth0-spa";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import "../styles/upload.css";

const Upload = () => {
  const { user, getTokenSilently } = useAuth0();
  const [songUrl, setSongUrl] = useState(null);

  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const file = formData.get("file");

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

  console.log(songUrl);
  return (
    <div className="upload-container">
      <div className="dnd-container">
        <h2>Drag and drop your audio file here</h2>
      </div>
      <form>
        <Button className="upload-button" variant="contained">
          <input
            accept="audio/*"
            style={{ display: "none" }}
            type="file"
            id="raised-button-file"
            onChange={uploadImage}
          ></input>
          <label htmlFor="raised-button-file">or click to upload.</label>
        </Button>
      </form>
    </div>
  );
};

export default Upload;
