import "../App.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from '@mui/icons-material/Check';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import { v4 as uuidv4 } from 'uuid';
import Box from "@mui/material/Box";

import { getDownloadURL, ref as storageRef, uploadBytes, } from "firebase/storage";
import React, { useState } from "react";
import { storage } from "../useFirebase";

export default function AddImage(props) {

  const [imageUpload, setImageUpload] = useState(null);
  const [fileCheck, setFileCheck] = useState(false);

  const uploadImage = () => {
    if (imageUpload == null) return;

    const imgName = uuidv4();
    const imageRef = storageRef(storage, `images/${imgName}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {

      setFileCheck(false);

      props.addURL(imgName);

      alert("Image Uploaded");
    })
  }

  return (<Card className="addImageCard">
    <h1 style={{ textAlign: "center" }}>Image Upload:</h1>

    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "10px"
    }}>

      <Button
        variant="contained"
        component="label"
        endIcon={fileCheck ? <CheckIcon /> : ""}
      >
        1. Choose File
        <input
          type="file"
          hidden
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImageUpload(e.target.files[0]);
              props.changeHero(URL.createObjectURL(e.target.files[0]));
              setFileCheck(true);
              console.log(e.target.files[0]);
              console.log(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
      </Button>

      <Button variant="contained" component="label" onClick={uploadImage} size="small" >2. Add Image</Button>

      <Tooltip title="Images will have a 16/9 aspect ratio and will be scaled to 1440x810 pixels" placement="right">
        <HelpOutlineIcon sx={{ marginTop: "6px" }} />
      </Tooltip>

    </div>



    <Box style={{ display: "flex", flexWrap: "wrap" }}>
      {props.imageArray.map(url => <URLItem key={url} url={url} onChange={props.handleChange} />)}
    </Box>
  </Card>);
}


function URLItem(props) {
  const [imageURL, setImageURL] = useState("");

  function removeURL(event) {
    // Here, we invoke the callback with the new value
    props.onChange(props.url);
    return <></>;
  }

  const resizedRef = storageRef(storage, `images/${props.url}_256x144`);
  getDownloadURL(resizedRef).then((url) => {
    setImageURL(url);
  });

  return (
    <Card
      style={{
        margin: "12px",
        textAlign: "left",
        // overflow: "auto",
        width: "140px",
        aspectRatio: 16 / 9,
        objectFit: "cover",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundImage: `url(${imageURL})`,
        backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}
    >
      <Button variant="contained" onClick={removeURL} sx={{ position: "absolute", minWidth: "28px", margin: "4px", padding: "2px" }}><CloseIcon /></Button>
      {/* <img style={{
        top: 0,
        right: 0,
        minHeight: "100%",
        minWidth: "100%"
      }} src={imageURL} alt="Fetching..." /> */}
    </Card>
  );
}
