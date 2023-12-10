import React from "react";
import "../App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AmmoType from "./AmmoType";

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
//   measurementId: process.env.REACT_APP_measurementId,
// });

function AddSidebar({ blasterData, onChange, ammoChange, dateChange }) {
  const dataChange = (event) => {
    console.log(event.target.value);
    onChange(event);
  };

  const sideAmmoChange = (ammo) => {
    ammoChange(ammo);
  };

  const handleDate = (val) => {
    dateChange(val);
  };

  //JSX

  return (
    <Card className="sidebar" sx={{ marginBottom: "30vh" }}>
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
          label="Short Description (40 Characters)"
          onChange={dataChange}
          name="shortDesc"
          value={blasterData.shortDesc}
          inputProps={{ maxLength: 40 }}
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

        {/* Propulsion */}

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
            <MenuItem value="">None</MenuItem>
            <MenuItem value={"Springer"}>Springer</MenuItem>
            <MenuItem value={"Flywheeler"}>Flywheeler</MenuItem>
            <MenuItem value={"Stringer"}>Stringer</MenuItem>
            <MenuItem value={"HPA"}>HPA
              <Tooltip title="Blasters that use a high pressure airtank to refuel a secondary firing tank" placement="right">
                <HelpOutlineIcon sx={{ marginLeft: "6px" }} />
              </Tooltip>
            </MenuItem>
            <MenuItem value={"LPA"}>LPA
              <Tooltip title="Blasters that use an airtank that is refilled on each fire" placement="right">
                <HelpOutlineIcon sx={{ marginLeft: "6px" }} />
              </Tooltip>
            </MenuItem>
          </Select>
        </FormControl>

        {/* Rate of Fire */}

        <FormControl>
          <InputLabel id="demo-simple-select-label">Rate of Fire</InputLabel>
          <Select
            value={blasterData.rof}
            label="Rate of Fire"
            onChange={dataChange}
            name="rof"
            sx={{ textAlign: "left" }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={"Prime to Fire"}>Prime to Fire</MenuItem>
            <MenuItem value={"Slamfire"}>Slamfire</MenuItem>
            <MenuItem value={"Semi Auto"}>Semi Auto</MenuItem>
            <MenuItem value={"Full Auto"}>Full Auto</MenuItem>
            <MenuItem value={"Select Fire"}>Select Fire</MenuItem>
          </Select>
        </FormControl>

        {/* Feed Type */}

        <FormControl>
          <InputLabel id="demo-simple-select-label">Feed Type</InputLabel>
          <Select
            value={blasterData.feed}
            label="Feed Type"
            onChange={dataChange}
            name="feed"
            sx={{ textAlign: "left" }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={"Magazine"}>Magazine</MenuItem>
            <MenuItem value={"Cylinder"}>Cylinder</MenuItem>
            <MenuItem value={"Internal Clip"}>Internal Clip</MenuItem>
            <MenuItem value={"Hopper"}>Hopper</MenuItem>
            <MenuItem value={"Front Load"}>Front Load</MenuItem>
          </Select>
        </FormControl>

        {/* Construction Type */}

        <FormControl>
          <InputLabel id="diffSelectLabel">Construction Type</InputLabel>
          <Select
            labelId="diffSelectLabel"
            id="constructionSelect"
            value={blasterData.construction}
            label="Construction Type"
            onChange={dataChange}
            name="construction"
            sx={{ textAlign: "left" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"3D Printed"}>3D Printed</MenuItem>
            <MenuItem value={"Injection Molded"}>Injection Molded</MenuItem>
            <MenuItem value={"Nylon"}>Nylon</MenuItem>
            <MenuItem value={"Metal"}>Metal</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>

        {/* Difficulty of Build */}

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
            <MenuItem value={"No Build Needed"}>No Build Needed</MenuItem>
            <MenuItem value={"Very Easy"}>Very Easy</MenuItem>
            <MenuItem value={"Easy"}>Easy</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Difficult"}>Difficult</MenuItem>
            <MenuItem value={"Very Difficult"}>Very Difficult</MenuItem>
          </Select>
        </FormControl>

        {/* Position in Hobby */}

        <FormControl>
          <InputLabel id="demo-simple-select-label">Position in the Hobby</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={blasterData.position}
            label="Position in the Hobby"
            onChange={dataChange}
            name="position"
            sx={{ textAlign: "left" }}
          >
            <MenuItem value={"Entry level/Stock"}>Entry level/Stock
              <Tooltip title="Blasters that shoot around standard Elite velocities, typically aimed at a mass market. Little mod potential." placement="right">
                <HelpOutlineIcon sx={{ marginLeft: "6px" }} />
              </Tooltip>
            </MenuItem>
            <MenuItem value={"Upper-End Stock"}>Upper-End Stock
              <Tooltip title="Blasters that perform above Elite velocities, but still around 100 fps. Rival, Hyper, Ultra, etc.." placement="right">
                <HelpOutlineIcon sx={{ marginLeft: "6px" }} />
              </Tooltip>
            </MenuItem>
            <MenuItem value={"Modding Platform"}>Modding Platform
              <Tooltip title="Blasters that may perform like stock blasters, but have been adopted by the community for a variety of major modifications." placement="right">
                <HelpOutlineIcon sx={{ marginLeft: "6px" }} />
              </Tooltip>
            </MenuItem>
            <MenuItem value={"High-End"}>High-End
              <Tooltip title="Company made blasters that focus on 150+ fps targets." placement="right">
                <HelpOutlineIcon sx={{ marginLeft: "6px" }} />
              </Tooltip>
            </MenuItem>
            <MenuItem value={"Community Developed"}>Community Developed
              <Tooltip title="Blasters designed and released by community members." placement="right">
                <HelpOutlineIcon sx={{ marginLeft: "6px" }} />
              </Tooltip>
            </MenuItem>
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
                  type="number"
                  onChange={dataChange}
                  name="fpsLow"
                  value={blasterData.fpsLow}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="outlined-helperText"
                  label="Max FPS"
                  type="number"
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

        <Box sx={{ display: "flex" }}>
          <TextField
            id="outlined-required"
            label="Store"
            size="small"
            onChange={dataChange}
            name="store"
            value={blasterData.store}
            sx={{ flexGrow: "3", marginRight: "20px" }}
          />
          <TextField
            id="outlined-helperText"
            label="Store Price"
            type="number"
            size="small"
            onChange={dataChange}
            name="storePrice"
            value={blasterData.storePrice}
            sx={{ width: "112px" }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            id="outlined-required"
            label="Kit"
            size="small"
            onChange={dataChange}
            name="kit"
            value={blasterData.kit}
            sx={{ flexGrow: "3", marginRight: "20px" }}
          />
          <TextField
            id="outlined-helperText"
            label="Kit Price"
            type="number"
            size="small"
            onChange={dataChange}
            name="kitPrice"
            value={blasterData.kitPrice}
            sx={{ width: "112px" }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <TextField
            id="outlined-required"
            label="Files"
            size="small"
            onChange={dataChange}
            name="files"
            value={blasterData.files}
            sx={{ flexGrow: "3", marginRight: "20px" }}
          />
          <TextField
            id="outlined-helperText"
            label="File Price"
            type="number"
            size="small"
            onChange={dataChange}
            name="filesPrice"
            value={blasterData.filesPrice}
            sx={{ width: "112px" }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Box>

        <Divider />
      </div>
    </Card>
  );
}

export default React.memo(AddSidebar);
