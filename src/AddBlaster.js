import React, { useState, useReducer } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import caliburnIcon from "./img/caliburnIcon.png";

import HeroImg from "./HeroImg.js";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
});

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function AddBlaster(props) {
  const dayjs = require("dayjs");

  const initialData = {
    ammo: {
      full: false,
      half: false,
      rival: false,
      mega: false,
      megaXL: false,
      rockets: false,
    },
    blasterName: "",
    creator: "",
    desc: "",
    diff: "",
    files: "",
    fpsHigh: "",
    fpsLow: "",
    imageArray: [],
    kit: "",
    propulsion: "",
    released: dayjs().format("MM-DD-YYYY"),
    store: "",
  };

  const [blasterHero, setBlasterHero] = useState(caliburnIcon);
  const [imageURL, setImageURL] = useState("");
  const [formData, setFormData] = useReducer(formReducer, initialData);
  const [currTab, setCurrTab] = React.useState(0);

  const changeTab = (event, newValue) => {
    setCurrTab(newValue);
  };

  const addURL = () => {
    if (imageURL !== "") {
      setImageURL("");

      setFormData({
        name: "imageArray",
        value: [...formData.imageArray, imageURL],
      });
    }
  };

  function handleChange(newValue) {
    setFormData({
      name: "imageArray",
      value: formData.imageArray.filter((item) => item !== newValue),
    });
  }

  const handleChangeForm = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const ammoChange = (ammoVal) => {
    setFormData({
      name: "ammo",
      value: ammoVal,
    });
  };

  const dateChange = (dateVal) => {
    setFormData({
      name: "released",
      value: dateVal.format("MM-DD-YYYY"),
    });
  };

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
          <AddSidebar
            blasterData={formData}
            onChange={handleChangeForm}
            ammoChange={ammoChange}
            dateChange={dateChange}
          />
        </Grid>
        <Grid item lg={7.5} sx={{ width: "100%" }}>
          <div className="addImage">
            <AddImageSelector
              imageArray={formData.imageArray}
              onChange={changeHero}
            />
            <HeroImg blasterImage={blasterHero} />
          </div>
          <Card className="addImageCard">
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
                className="addImageButton"
              >
                <AddCircleIcon sx={{ paddingRight: "8px" }} />
                Add
              </Button>
            </div>

            {formData.imageArray.map((url) => (
              <URLItem key={url} url={url} onChange={handleChange} />
            ))}
          </Card>

          <Card className="tabBox">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={currTab}
                onChange={changeTab}
                aria-label="basic tabs example"
              >
                <Tab label="Description" />
                <Tab label="Other Files/Links" />
                <Tab label="Images" />
                <Tab label="Video Reviews" />
                <Tab label="Reviews" />
              </Tabs>
            </Box>
            {currTab === 0 && (
              <AddDescription value={currTab} index={0}>
                Item One
              </AddDescription>
            )}
            {currTab === 1 && (
              <AddDescription value={currTab} index={1}>
                Item Two
              </AddDescription>
            )}
            {currTab === 2 && <HeroImg index={2}>Item Three</HeroImg>}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

function AddDescription(props) {
  return (
    <>
      <h2>Description:</h2>
      <TextField multiline sx={{ padding: "16px" }} />
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

function AddSidebar({ blasterData, onChange, ammoChange, dateChange }) {
  const dataChange = (event) => {
    console.log(event.target.value);
    onChange(event);
  };

  const sideAmmoChange = (ammo) => {
    ammoChange(ammo);
  };

  const handleDate = (val) => {
    dateChange(val)
  };

  

  //JSX

  return (
    <Card className="sidebar">
      <div className="addSideBar">

        <TextField
          id="outlined-required"
          label="Blaster Name"
          onChange={dataChange}
          name="blasterName"
          value={blasterData.blasterName}
        />
        <TextField
          id="outlined-required"
          label="Creator"
          onChange={dataChange}
          name="creator"
          value={blasterData.creator}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Release Date"
            value={blasterData.released}
            name="released"
            onChange={handleDate}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Divider />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Propulsion</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={blasterData.propulsion}
            label="Propulsion"
            onChange={dataChange}
            name="propulsion"
            sx={{ textAlign: "left" }}
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
            value={blasterData.diff}
            label="Difficulty of Build"
            onChange={dataChange}
            name="diff"
            sx={{ textAlign: "left" }}
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
                <TextField
                  id="outlined-helperText"
                  label="Min FPS"
                  onChange={dataChange}
                  name="fpsLow"
                  value={blasterData.fpsLow}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="outlined-helperText"
                  label="Max FPS"
                  helperText="Only if FPS is variable"
                  onChange={dataChange}
                  name="fpsHigh"
                  value={blasterData.fpsHigh}
                />
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>

        <AmmoType ammo={blasterData.ammo} onChange={sideAmmoChange} />

        <Divider />

        <TextField
          id="outlined-required"
          label="Store"
          size="small"
          onChange={dataChange}
          name="store"
          value={blasterData.store}
        />
        <TextField
          id="outlined-required"
          label="Kit"
          size="small"
          onChange={dataChange}
          name="kit"
          value={blasterData.kit}
        />
        <TextField
          id="outlined-required"
          label="Files"
          size="small"
          onChange={dataChange}
          name="files"
          value={blasterData.files}
        />

        <Divider />
      </div>
    </Card>
  );
}

function AmmoType({ ammo, onChange }) {
  const dataChange = (event) => {
    ammo[event.target.name] = event.target.checked;
    onChange(ammo);
  };

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
                  control={
                    <Checkbox
                      checked={ammo.half}
                      onChange={dataChange}
                      name="half"
                    />
                  }
                  label="Half Length Darts"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ammo.full}
                      onChange={dataChange}
                      name="full"
                    />
                  }
                  label="Full length Darts"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ammo.rival}
                      onChange={dataChange}
                      name="rival"
                    />
                  }
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
                  control={
                    <Checkbox
                      checked={ammo.mega}
                      onChange={dataChange}
                      name="mega"
                    />
                  }
                  label="Mega Darts"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ammo.megaXL}
                      onChange={dataChange}
                      name="megaXL"
                    />
                  }
                  label="MegaXL Darts"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ammo.rockets}
                      onChange={dataChange}
                      name="rockets"
                    />
                  }
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
