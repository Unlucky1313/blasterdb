import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { updateDoc } from "firebase/firestore";

import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Carousel from "react-multi-carousel";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import BlasterCard from "./BlasterCard";
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

const auth = firebase.auth();

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1500 },
    items: 4,
  },
  smalldesktop: {
    breakpoint: { max: 1500, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function Profile(props) {
  const [wishlist, setWishlist] = useState([]);
  const [collected, setCollected] = useState([]);
  const [photoURL, setPhotoURL] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("User");
  const [userID, setuserID] = useState("");

  const db = firebase.firestore();

  function changeUsername(newValue) {
    setUsername(newValue.target.value);
  };

  function changeRole(newValue) {
    setRole(newValue.target.value);
  };

  const updateUsername = (e) => {
    var docColl = db.collection("users").doc(userID);
    updateDoc(docColl, {
      username: username,
    });
  }

  const updateRole = (e) => {
    var docColl = db.collection("users").doc(userID);
    updateDoc(docColl, {
      role: role,
    });
  }


  useEffect(() => {
    var unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((value) => {
            setWishlist(value.data()["wishlist"]);
            setCollected(value.data()["collected"]);
            setPhotoURL(auth.currentUser.photoURL);
            setUsername(value.data()["username"]);
            setRole(value.data()["role"]);
          });
        setuserID(user.uid);
        console.log("Getting Value");
      } else {
        console.log("User not logged in or has just logged out.");
      }
    });

    unsubscribe();
  }, [db]);

  return (
    <div className="App">
      <Card className="profileCard">
        <Avatar
          src={
            photoURL ||
            "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
          }
          sx={{ width: "100px", height: "100px", margin: "24px" }}
        />
        <div >
          <TextField
            id="outlined-required"
            label="Username"
            onChange={changeUsername}
            name="username"
            value={username}
            inputProps={{ maxLength: 30 }}
            sx={{ minWidth: "350px" }}
          />
          <Button size="large" variant="contained" sx={{ height: "55px" }} onClick={updateUsername}>Change</Button>
        </div>

        {/* Role */}

        <div>
          <FormControl sx={{ minWidth: "250px" }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              value={role}
              label="Feed Type"
              onChange={changeRole}
              name="feed"
              sx={{ textAlign: "left" }}
              disabled = {role !== "Admin"}
            >
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Moderator"}>Moderator</MenuItem>
              <MenuItem value={"User"}>User</MenuItem>
            </Select>
          </FormControl>
          {(role === "Admin") && <Button size="large" variant="contained" sx={{ height: "55px" }} onClick={updateRole}>Change</Button>}
        </div>
      </Card>

      <Card className="profileCardHolder">
        <h1 style={{ margin: "8px 0px 8px 24px" }}>Wishlist:</h1>

        <Carousel responsive={responsive} showDots={true}>
          {wishlist.map((id) => (
            <BlasterCard blaster={id} key={id} />
          ))}
        </Carousel>
      </Card>

      <Card className="profileCardHolder">
        <h1 style={{ margin: "8px 0px 8px 24px" }}>Collected:</h1>
        <Carousel responsive={responsive} showDots={true}>
          {collected.map((id) => (
            <BlasterCard blaster={id} key={id} />
          ))}
        </Carousel>
      </Card>
    </div>
  );
}
