import React, { useState, useReducer, useEffect } from "react";
import "../App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import caliburnIcon from "../img/caliburnIcon.png";

import HeroImg from "../HeroImg.js";

import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Link from "@mui/material/Link";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import AddSidebar from "./AddSidebar";

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
const formReducer = (state, event) => {
  switch (event.type) {
    case "updateAll":
      return { ...state, ...event.object, id: event.id };
    default:
      return {
        ...state,
        [event.name]: event.value,
      };
  }
};

export default function UpdateBlaster(props) {
  const dayjs = require("dayjs");

  const [blasterData, setBlasterData] = useState([]);

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
    released: dayjs().format("MM/DD/YYYY"),
    store: "",
    videoReviews: [
      // "QACMgWdX3F0",
      // "KM0dlJgzKDU",
      // "sHJ-V7fBj9Y",
      // "r4talAJ0Hvc",
      // "Sda41hBQYQ0",
      // "PoXcMbweu7o",
      // "6AXgDoRcPlM",
    ],
  };

  const [blasterHero, setBlasterHero] = useState(caliburnIcon);
  const [imageURL, setImageURL] = useState("");
  const [formData, setFormData] = useReducer(formReducer, initialData);
  const [currTab, setCurrTab] = React.useState(0);
  const [videoKey, setVideoKey] = React.useState("");
  const firestore = firebase.firestore();

  const [searchParams] = useSearchParams();
  const blaster = searchParams.get("blaster");
  console.log(blaster);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(firebase.firestore(), "blasters", blaster);
      const docSnap = await getDoc(docRef);
      setFormData({ type: 'updateAll', object: docSnap.data(), id: blaster });
      setBlasterHero(docSnap.data().imageArray[0]);

      console.log(docSnap.data())
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

  const addURL = () => {
    if (imageURL !== "") {
      setImageURL("");

      setFormData({
        name: "imageArray",
        value: [...formData.imageArray, imageURL],
      });
    }
  };

  const addVideoUrl = () => {
    if (videoKey !== "") {
      setVideoKey("");
      setFormData({
        name: "videoReviews",
        value: [...formData.videoReviews, youtubeParser(videoKey)],
      });
    }
  };

  function handleChange(newValue) {
    setFormData({
      name: "imageArray",
      value: formData.imageArray.filter((item) => item !== newValue),
    });
  }

  function handleVideoRemove(newValue) {
    console.timeLog(formData);
    setFormData({
      name: "videoReviews",
      value: formData.videoReviews.filter((item) => item !== newValue),
    });
    console.log(newValue, formData);
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
      value: dateVal.format("MM/DD/YYYY"),
    });
  };

  function changeHero(newValue) {
    setBlasterHero(newValue);
  }

  const submitBlaster = async (e) => {
    await firestore.collection("blasters").doc(formData.id).update({...formData}).then(function () {
      console.log("Document successfully updated!");
    }).then(function () {
      console.log("Document successfully updated!");
    });



  };

  console.log(formData);

  return (
    <div className="App">
      <div className="main">
        <AddSidebar
          blasterData={formData}
          onChange={handleChangeForm}
          ammoChange={ammoChange}
          dateChange={dateChange}
        />
        <div className="imageContainer">
          <div className="addImage">
            <AddImageSelector
              imageArray={formData.imageArray}
              onChange={changeHero}
            />
            <HeroImg blasterImage={blasterHero} />
          </div>
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
              {/* <Tab label="Other Files/Links" /> */}
              {/* <Tab label="Images" /> */}
              <Tab label="Video Reviews" />
              {/* <Tab label="Reviews" /> */}
            </Tabs>
          </Box>
          {currTab === 0 && (
            <AddDescription value={currTab} index={0}>
              Item One
            </AddDescription>
          )}
          {currTab === 3 && (
            <AddDescription value={currTab} index={1}>
              Item Two
            </AddDescription>
          )}
          {currTab === 2 && <HeroImg index={2}>Item Three</HeroImg>}
          {currTab === 1 && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "15px",
                }}
              >
                <TextField
                  id="outlined-required"
                  label="Youtube Key"
                  sx={{ width: "90%" }}
                  value={videoKey}
                  onChange={(e) => setVideoKey(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={addVideoUrl}
                  size="large"
                  className="addImageButton"
                >
                  <AddCircleIcon sx={{ paddingRight: "8px" }} />
                  Add
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  maxHeight: "650px",
                  overflow: "auto",
                }}
              >
                {formData.videoReviews.map((url) => (
                  <VideoEmbed
                    key={url}
                    url={url}
                    onChange={handleVideoRemove}
                  />
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="large"
          variant="contained"
          style={{}}
          onClick={submitBlaster}
        >
          Update
        </Button>
      </div>
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
    <div
      style={{
        margin: "12px",
        textAlign: "left",
        display: "flex",
        overflow: "auto",
      }}
    >
      <CloseIcon sx={{ paddingRight: "8px" }} onClick={removeURL} />
      <Link href={props.url} target="_blank">
        {props.url.substring(0, 35) + " •••"}
      </Link>
    </div>
  );
}

function VideoEmbed(props) {
  function removeURL(event) {
    // Here, we invoke the callback with the new value
    props.onChange(props.url);
    return <></>;
  }
  return (
    <div
      style={{
        margin: "12px",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <iframe
        width="336"
        height="188"
        src={"https://www.youtube.com/embed/" + props.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen"
        msallowfullscreen="msallowfullscreen"
        oallowfullscreen="oallowfullscreen"
        webkitallowfullscreen="webkitallowfullscreen"
      ></iframe>
      <Button variant="contained" sx={{ margin: "8px" }} onClick={removeURL}>
        <CloseIcon sx={{ paddingRight: "8px" }} />
        Remove
      </Button>
    </div>
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
