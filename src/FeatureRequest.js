import React, { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CheckIcon from '@mui/icons-material/Check';

import { Button } from "@mui/material";

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default function FeatureRequest(props) {
  const [featureText, setFeatureText] = useState("");
  const [saveCheck, setSaveCheck] = useState(false);
  
  const delay = ms => new Promise(res => setTimeout(res, ms));

  function changeText(newValue) {
    setFeatureText(newValue.target.value);
  };

  // console.log(firebase.database.ServerValue.TIMESTAMP)

  const updateText = async (e) => {
    const firestore = firebase.firestore();
    await firestore.collection("features").add({ "feature": featureText, "completed": false, "ignored": false, "createdAt": firebase.firestore.Timestamp.fromDate(new Date()) });
    setFeatureText("");
    setSaveCheck(true);
    await delay(2000);
    setSaveCheck(false);
  }


  return (
    <div className="App featureContainer">
      <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "80%", margin: "-50px 5% 0px 5%", padding: "0px 5%", textAlign:"center" }}>
        <h1>BlasterBrowser is always looking to grow and improve!</h1>
        <h3 style={{margin:"2px"}}>If you have an idea for a feature could be added or changed on this website please leave your feedback below!</h3>
        <h3 style={{margin:"2px"}}>I am a 1 man development team, so there is only so much I can build into the site, but new ideas and perspectives are always valuable!</h3>
        <h4 style={{margin:"2px 0px 24px 0px"}}>Bugs reports are always welcome too!</h4>
        <TextField
          placeholder="Add your Feature Request here!"
          multiline
          maxRows={10}
          sx={{ width: "100%", maxWidth: "800px"}}
          value={featureText}
          onChange={changeText}
        />
        <Button size="large" variant="contained" style={{margin: "24px"}} onClick={updateText} color={saveCheck ? "success" : "primary"} endIcon={saveCheck ? <CheckIcon /> : "" }>Submit</Button>
      </Card>
    </div>
  );
}
