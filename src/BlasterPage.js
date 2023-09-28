import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import caliburnIcon from "./img/caliburnIcon.png";
import { doc, getDoc } from "firebase/firestore";
import { storage } from "./useFirebase";
import { getDownloadURL, ref as storageRef, } from "firebase/storage";

import ImageSelector from "./ImageSelector.js";
import HeroImg from "./HeroImg.js";
import Sidebar from "./Sidebar.js";
import Description from "./Description";

import { useSearchParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";

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


function BlasterPage(props) {
  const [blasterHero, setBlasterHero] = useState(caliburnIcon);
  const [blasterData, setBlasterData] = useState([]);
  const [currTab, setCurrTab] = React.useState(0);

  console.log(blasterData)

  const changeTab = (event, newValue) => {
    setCurrTab(newValue);
  };

  const [searchParams] = useSearchParams();
  const blaster = searchParams.get("blaster");

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(firebase.firestore(), "blasters", blaster);
      const docSnap = await getDoc(docRef);
      const dateData = new Date(docSnap.data().released.seconds * 1000);  //Convert Timestamp to String
      setBlasterData({ ...docSnap.data(), id: blaster, released: dateData });
      if (docSnap.data().imageArray) {
        const resizedRef = storageRef(storage, `images/${docSnap.data().imageArray[0]}_1440x810`);
        getDownloadURL(resizedRef).then((url) => {
          setBlasterHero(url);
          console.log(url);
        });
      }
    };
    getData();
  }, [blaster]);

  function handleChange(newValue) {
    setBlasterHero(newValue.replace('_256x144', '_1440x810'));
  }

  return (
    <div className="App">
      <Box className='gridMain' sx={{ justifyContent: 'center' }}>
        <Sidebar blasterData={blasterData} />


        <Box className="imgBox">
          <div className="imageContainer">
            <div className="addImage">
              <ImageSelector
                imageArray={blasterData.imageArray}
                onChange={handleChange}
              />
              <HeroImg blasterImage={blasterHero} />
            </div>
          </div>
        </Box>

        <Card className="tabBox">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={currTab}
              onChange={changeTab}
              aria-label="basic tabs example"
              scrollButtons="auto"
              variant="scrollable"
            >
              <Tab label="Description" />
              <Tab label="Other Files/Links" />
              <Tab label="Images" />
              <Tab label="Video Reviews" />
              <Tab label="Reviews" />
            </Tabs>
          </Box>
          {currTab === 0 && (
            <Description
              value={currTab}
              index={1}
              descText={blasterData.desc}
            />
          )}
          {currTab === 1 && <div />}
          {currTab === 2 && <div />}
        </Card>
      </Box>
    </div>
  );
}

export default BlasterPage;
