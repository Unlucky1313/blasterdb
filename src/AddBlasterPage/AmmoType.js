import React from "react";
import "../App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

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

export default function AmmoType({ ammo, onChange }) {
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
                      sx={{padding: "4px"}}
                    />
                  }
                  
                  label={<h5 style={{fontSize:"13px", fontWeight: 500, margin: "0px"}}>Half Length Darts</h5>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ammo.full}
                      onChange={dataChange}
                      name="full"
                      sx={{padding: "4px"}}
                    />
                  }
                  label={<h5 style={{fontSize:"15px", fontWeight: 500, margin: "0px"}}>Full Length Darts</h5>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ammo.rival}
                      onChange={dataChange}
                      name="rival"
                      sx={{padding: "4px"}}
                    />
                  }
                  label={<h5 style={{fontSize:"13px", fontWeight: 500, margin: "0px"}}>Rival</h5>}
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
                      sx={{padding: "4px"}}
                    />
                  }
                  label={<h5 style={{fontSize:"13px", fontWeight: 500, margin: "0px"}}>Mega Darts</h5>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ammo.megaXL}
                      onChange={dataChange}
                      name="megaXL"
                      sx={{padding: "4px"}}
                    />
                  }
                  label={<h5 style={{fontSize:"13px", fontWeight: 500, margin: "0px"}}>MegaXL Darts</h5>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ammo.rockets}
                      onChange={dataChange}
                      name="rockets"
                      sx={{padding: "4px"}}
                    />
                  }
                  label={<h5 style={{fontSize:"13px", fontWeight: 500, margin: "0px"}}>Rockets</h5>}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormGroup>
    </FormControl>
  );
}
