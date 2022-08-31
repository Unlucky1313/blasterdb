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

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
});

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
