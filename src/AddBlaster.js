import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import caliburnIcon from "./img/caliburnIcon.png";
import { doc, getDoc } from "firebase/firestore";

import HeroImg from "./HeroImg.js";
import Sidebar from "./Sidebar.js";
import Description from "./Description";

import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RedeemIcon from "@mui/icons-material/Redeem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

import fps from "./img/FPS.png";
import btype from "./img/btype.png";
import darts from "./img/darts.png";
import { margin } from "@mui/system";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
});

export default function AddBlaster(props) {
  const [blasterHero, setBlasterHero] = useState(caliburnIcon);
  const [blasterData, setBlasterData] = useState({
    propulsion: ""
  });
  const [blasterURLs, setBlasterURLs] = useState([]);
  const [imageURL, setImageURL] = useState("");

  console.log(blasterURLs);

  const addURL = () => {
    if (imageURL != "") {
      setBlasterURLs([...blasterURLs, imageURL]);
      setImageURL("");
    }
  };

  function handleChange(newValue) {
    console.log(newValue);
    setBlasterURLs(blasterURLs.filter((item) => item != newValue));
  }

  function sidebarChange(newValue) {
    console.log(newValue);
    setBlasterURLs(newValue);
  }

  function changeHero(newValue) {
    setBlasterHero(newValue);
  }

  return (
    <div className="App">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="flex-start"
        direction="row-reverse"
        sx={{ marginTop: "25px" }}
      >
        <Grid item lg={3}>
          <AddSidebar blasterData={blasterData} onChange={sidebarChange} />
        </Grid>
        <Grid item lg={7.5}>
          <div className="addImage">
            <AddImageSelector imageArray={blasterURLs} onChange={changeHero}/>
            <HeroImg blasterImage={blasterHero} />
          </div>
          <Card sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "15px",
              }}
            >
              <TextField
                id="outlined-required"
                label="Blaster Image URL"
                sx={{ width: "90%" }}
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={addURL}
                size="large"
                sx={{ width: "10%", height: "54px" }}
              >
                <AddCircleIcon sx={{ paddingRight: "8px" }} />
                Add
              </Button>
            </div>

            {blasterURLs.map((url) => (
              <URLItem key={url} url={url} />
            ))}
          </Card>
          <AddDescription descText={blasterData.desc} />
        </Grid>
      </Grid>
    </div>
  );
}

function AddDescription(props) {
  return (
    <>
      <Card className="description">
        <h2>Description:</h2>
        <TextField multiline sx={{padding:"16px"}}/>
      </Card>
    </>
  );
}

function URLItem(props) {
  function removeURL(event) {
    // Here, we invoke the callback with the new value
    props.onChange(props.url);
    return <></>;
  }
  return (
    <div style={{ margin: "12px", textAlign: "left", display: "flex" }}>
      <CloseIcon sx={{ paddingRight: "8px" }} onClick={removeURL} />
      <Link href={props.url} sx={{ verticalAlign: "center" }} target="_blank">
        {props.url}
      </Link>
    </div>
  );
}

function AddSidebar(props) {
  function removeURL(event) {
    // Here, we invoke the callback with the new value
    console.log(props.blasterData)
    props.onChange(props.blasterData);
    return <></>;
  }

  return (
    <Card className="sidebar">
      <div className="addSideBar">
        <TextField id="outlined-required" label="Blaster Name" />
        <TextField id="outlined-required" label="Creator" />
        <Divider />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Propulsion</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.blasterData.propulsion}
            label="Propulsion"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Springer"}>Springer</MenuItem>
            <MenuItem value={"Flywheeler"}>Flywheeler</MenuItem>
            <MenuItem value={"Stringer"}>Stringer</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="diffSelectLabel">Difficulty of Build</InputLabel>
          <Select
            labelId="diffSelectLabel"
            id="diffSelect"
            value={""}
            label="Difficulty of Build"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Very Easy"}>Very Easy</MenuItem>
            <MenuItem value={"Easy"}>Easy</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Difficult"}>Difficult</MenuItem>
            <MenuItem value={"Very Difficult"}>Very Difficult</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormLabel component="legend" sx={{ padding: "10px" }}>
            FPS Range
          </FormLabel>
          <FormGroup>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="flex-start"
            >
              <Grid item xs>
                <TextField id="outlined-helperText" label="Min FPS" />
              </Grid>
              <Grid item xs>
                <TextField
                  id="outlined-helperText"
                  label="Max FPS"
                  helperText="Only if FPS is variable"
                />
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>

        <AmmoType />

        <Divider />

        <TextField id="outlined-required" label="Store" size="small" />
        <TextField id="outlined-required" label="Kit" size="small" />
        <TextField id="outlined-required" label="Files" size="small" />

        <Divider />
      </div>
    </Card>
  );
}

function AmmoType(props) {
  return (
    <FormControl
      sx={{ m: 3, marginTop: 0 }}
      component="fieldset"
      variant="standard"
    >
      <FormLabel component="legend">Ammo Type</FormLabel>
      <FormGroup>
        <Grid container direction="row" alignItems="flex-start">
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox checked={props.half} />}
                  label="Half Length Darts"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox checked={props.full} />}
                  label="Full length Darts"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox checked={props.rival} />}
                  label="Rival"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox checked={props.mega} />}
                  label="Mega Darts"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox checked={props.megaXL} />}
                  label="MegaXL Darts"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={<Checkbox checked={props.rocket} />}
                  label="Rockets"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormGroup>
    </FormControl>
  );
}

function AddImageSelector(props) {
  const onChange = (url) => {
    // Here, we invoke the callback with the new value
    props.onChange(url);
  };
  return (
    <Card className="addImagesMain coolScroll" sx={{ overflow: "auto" }}>
      <List
        className="flexList coolScroll"
        sx={{
          width: "100%",
        }}
      >
        {props.imageArray &&
          props.imageArray.map((image) => (
            <ImageSelectorGen
              imageSrc={image}
              key={image}
              onChange={onChange}
            />
          ))}
      </List>
    </Card>
  );
}

function ImageSelectorGen(props) {
  function handleImgClick(event) {
    // Here, we invoke the callback with the new value
    props.onChange(event.target.src);
  }
  return (
    <ListItem>
      <img
        src={props.imageSrc}
        className="imageSmall"
        onClick={handleImgClick}
        alt="Blaster Selector"
      />
    </ListItem>
  );
}
