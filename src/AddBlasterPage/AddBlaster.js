import React, { useState, useReducer } from "react";
import "../App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import Button from "@mui/material/Button";

import AddSidebar from "./AddSidebar";
import ImageSelector from "../ImageSelector.js";
import AddImage from "./AddImage.js";
import AddTabs from "./AddTabs.js";
import HeroImg from "../HeroImg.js";
import Box from "@mui/material/Box";

import caliburnIcon from "../img/caliburnIcon.png";

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

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export default function AddBlaster(props) {

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
    construction: "",
    creator: "",
    desc: "",
    diff: "",
    feed: "",
    files: "",
    fpsHigh: 0,
    fpsLow: 0,
    imageArray: [],
    kit: "",
    postition: "",
    propulsion: "",
    released: new Date(),
    rof: "",
    shortDesc: "",
    store: "",
    videoReviews: [
    ],
  };

  const [blasterHero, setBlasterHero] = useState(caliburnIcon);
  const [imageURL, setImageURL] = useState("");
  const [blasterData, setBlasterData] = useReducer(formReducer, initialData);
  const [currTab, setCurrTab] = React.useState(0);
  const [videoKey, setVideoKey] = React.useState("");
  const firestore = firebase.firestore();

  const changeTab = (event, newValue) => {
    setCurrTab(newValue);
  };

  function youtubeParser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    console.log(regExp);
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  const addURL = (url) => {

    console.log(url);

    if (url !== "") {
      setImageURL("");

      setBlasterData({
        name: "imageArray",
        value: [...blasterData.imageArray, url],
      });
    }
  };

  const addVideoUrl = () => {
    if (videoKey !== "") {
      setVideoKey("");
      setBlasterData({
        name: "videoReviews",
        value: [...blasterData.videoReviews, youtubeParser(videoKey)],
      });
    }
  };

  function handleChange(newValue) {
    setBlasterData({
      name: "imageArray",
      value: blasterData.imageArray.filter((item) => item !== newValue),
    });
  }

  function handleVideoRemove(newValue) {
    console.timeLog(blasterData);
    setBlasterData({
      name: "videoReviews",
      value: blasterData.videoReviews.filter((item) => item !== newValue),
    });
    console.log(newValue, blasterData);
  }

  const handleChangeForm = (event) => {
    setBlasterData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const ammoChange = (ammoVal) => {
    setBlasterData({
      name: "ammo",
      value: ammoVal,
    });
  };

  const dateChange = (dateVal) => {
    setBlasterData({
      name: "released",
      value: dateVal.format("MM/DD/YYYY"),
    });
  };

  function changeHero(newValue) {
    setBlasterHero(newValue);
  }

  const changeDesc = (desc) => {
    setBlasterData({
      name: "desc",
      value: desc,
    });

  };

  const submitBlaster = async (e) => {

    if(blasterData.fpsHigh === 0){
      blasterData.fpsHigh = blasterData.fpsLow;
    }

    blasterData.fpsHigh = Number(blasterData.fpsHigh);
    blasterData.fpsLow = Number(blasterData.fpsLow);

    if(blasterData.kit){blasterData.kitBool=true}else{blasterData.kitBool=false}
    if(blasterData.store){blasterData.storeBool=true}else{blasterData.storeBool=false}
    if(blasterData.files){blasterData.filesBool=true}else{blasterData.filesBool=false}

    const dateData = new Date(blasterData.released);
    blasterData.released = firebase.firestore.Timestamp.fromDate(dateData);

    delete blasterData.undefined;

    console.log(blasterData);

    await firestore.collection("blasters").add(blasterData);

    setBlasterData(initialData);
  
    alert("Blaster Added!");
  };

  return (
    <div className="App">
      <Box className='gridMain' sx={{ justifyContent: 'center' }}>

        <Box className="imgBox">
          {/* Main Image */}

          <div className="imageContainer">
            <div className="addImage">
              <ImageSelector
                imageArray={blasterData.imageArray}
                onChange={changeHero}
              />
              <HeroImg blasterImage={blasterHero} />
            </div>
          </div>

          {/* Image Add Box */}

          <AddImage changeHero={changeHero} imageURL={imageURL} setImageURL={setImageURL} imageArray={blasterData.imageArray} addURL={addURL} handleChange={handleChange}></AddImage>

        </Box>
        
        {/* Tab Box */}

        <AddTabs desc={blasterData.desc} changeDesc={changeDesc} videoReviews={blasterData.videoReviews} currTab={currTab} videoKey={videoKey} setVideoKey={setVideoKey} changeTab={changeTab} addVideoUrl={addVideoUrl} handleVideoRemove={handleVideoRemove}></AddTabs>

        {/* Sidebar */}

        <AddSidebar blasterData={blasterData} onChange={handleChangeForm} ammoChange={ammoChange} dateChange={dateChange} />

      </Box>


      {/* Submit Button */}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" variant="contained" style={{}} onClick={submitBlaster} >Update</Button>
      </div>
    </div >
  );
}

