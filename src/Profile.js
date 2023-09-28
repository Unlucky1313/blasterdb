import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import Card from "@mui/material/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import BlasterCard from "./BlasterCard";

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

  const db = firebase.firestore();

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
          });

        console.log("Getting Value");
      } else {
        console.log("User not logged in or has just logged out.");
      }
    });

    unsubscribe();
  }, [db]);

  return (
    <div className="App">
      <Card className="profileCardHolder">
        <h1 style={{ margin: "8px 0px 8px 24px" }}>Wishlist:</h1>

        <Carousel responsive={responsive} showDots={true}>
          {wishlist.map((id) => (
            <BlasterCard blaster={id} />
          ))}
        </Carousel>
      </Card>

      <Card className="profileCardHolder">
      <h1 style={{ margin: "8px 0px 8px 24px" }}>Collected:</h1>
        <Carousel responsive={responsive} showDots={true}>
          {collected.map((id) => (
            <BlasterCard blaster={id} />
          ))}
        </Carousel>
      </Card>
    </div>
  );
}
