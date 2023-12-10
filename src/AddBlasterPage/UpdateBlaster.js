import React, { useState, useReducer, useEffect } from "react";
import "../App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { storage } from "../useFirebase";
import { getDownloadURL, ref as storageRef, } from "firebase/storage";

import caliburnIcon from "../img/caliburnIcon.png";

import HeroImg from "../HeroImg.js";

import Button from "@mui/material/Button";

import AddSidebar from "./AddSidebar";
import ImageSelector from "../ImageSelector.js";
import AddImage from "./AddImage.js";
import AddTabs from "./AddTabs.js";
import Box from "@mui/material/Box";

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
  switch (event.type) {
    case "updateAll":
      return { ...state, ...event.object, id: event.id, released: event.released };
    default:
      return {
        ...state,
        [event.name]: event.value,
      };
  }
};


export default function UpdateBlaster(props) {

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
    filesPrice: 0,
    fpsHigh: 0,
    fpsLow: 0,
    imageArray: [],
    kit: "",
    kitPrice: 0,
    postition: "",
    propulsion: "",
    released: firebase.firestore.Timestamp.fromDate(new Date()),
    rof: "",
    shortDesc: "",
    store: "",
    storePrice: 0,
    videoReviews: [
    ],
  };

  const [blasterHero, setBlasterHero] = useState(caliburnIcon);
  const [imageURL, setImageURL] = useState("");
  const [blasterData, setBlasterData] = useReducer(formReducer, initialData);
  const [currTab, setCurrTab] = React.useState(0);
  const [videoKey, setVideoKey] = React.useState("");
  const firestore = firebase.firestore();

  const [searchParams] = useSearchParams();
  const blaster = searchParams.get("blaster");

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(firebase.firestore(), "blasters", blaster);
      const docSnap = await getDoc(docRef);
      const dateData = new Date(docSnap.data().released.seconds * 1000);  //Convert Timestamp to Date

      setBlasterData({ type: 'updateAll', object: docSnap.data(), released: dateData, id: blaster});
      // setBlasterHero(docSnap.data().imageArray[0]);

      const resizedRef = storageRef(storage, `images/${docSnap.data().imageArray[0]}_1440x810`);
      console.log(getDownloadURL(resizedRef).then((url) => {
        setBlasterHero(url);
        console.log(url);
      }));

      console.log(docSnap.data(), dateData);
    };
    getData();
  }, [blaster]);

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

  function handleChange(newValue) {
    setBlasterData({
      name: "imageArray",
      value: blasterData.imageArray.filter((item) => item !== newValue),
    });
  }

  const addVideoUrl = () => {
    if (videoKey !== "") {
      setVideoKey("");
      setBlasterData({
        name: "videoReviews",
        value: [...blasterData.videoReviews, youtubeParser(videoKey)],
      });
    }
  };

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

  const changeDesc = (desc) => {
    setBlasterData({
      name: "desc",
      value: desc,
    });

  };

  function changeHero(newValue) {
    setBlasterHero(newValue.replace('_256x144','_1440x810'));
  }

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


    await firestore.collection("blasters").doc(blasterData.id).update({ ...blasterData, released: firebase.firestore.Timestamp.fromDate(dateData) }).then(function () {
      console.log("Document successfully updated!");
    }).then(function () {
      console.log("Document successfully updated!");
    });

    alert("Blaster Updated!");

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

        <AddTabs desc={blasterData.desc} changeDesc={changeDesc} blasterId = {blasterData.id} videoReviews={blasterData.videoReviews} currTab={currTab} videoKey={videoKey} setVideoKey={setVideoKey} changeTab={changeTab} addVideoUrl={addVideoUrl} handleVideoRemove={handleVideoRemove}></AddTabs>

        {/* Sidebar */}

        <AddSidebar blasterData={blasterData} onChange={handleChangeForm} ammoChange={ammoChange} dateChange={dateChange} />

      </Box>


      {/* Submit Button */}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" variant="contained" style={{}} onClick={submitBlaster} sx={{margin:"8px"}} >Update</Button>
        <Button size="large" variant="contained" style={{}} href={"./blaster?blaster=" + blasterData.id} sx={{margin:"8px"}} >Return</Button>
      </div>
    </div >

  );
}




