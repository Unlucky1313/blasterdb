import React, { useState } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { setDoc } from "firebase/firestore";

import SearchIcon from "@mui/icons-material/Search";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";

import AddCircleIcon from "@mui/icons-material/AddCircle";

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

export default function Header(props) {
  const [user] = useAuthState(auth);
  const [userRole, setUserRole] = useState("User");

  function changeRole(role) {
    setUserRole(role);
  }

  function handleUser(value) {
    props.onChange(value);
  }

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <header className="App-header" style={{display:"flex", justifyContent: "center"}}>
      <div className="footerContainer">
        <NavLink className="title" to="/">
          BlasterBrowser
        </NavLink>
        <p style={{ fontSize: "12px", margin: "4px" }}>BlasterBrowser uses affliate links to support itself. Links for blasters may give us a small kick back, at no cost to sellers or you.</p>

        <div style={{ display: "flex", flexDirection:"row" }}>
          <a href="/search" style={{ color: "inherit" }} ><h6 style={{ color: "white", margin: "4px" }}>Search</h6></a>
          <h6 style={{color:"grey", fontWeight: "400", margin: "4px 20px"}}>|</h6>
          <a href="/add" style={{ color: "inherit" }} ><h6 style={{ color: "white", margin: "4px" }}>Add Blaster</h6></a>
          <h6 style={{color:"grey", fontWeight: "400", margin: "4px 20px"}}>|</h6>
          <a href="/features" style={{ color: "inherit" }} ><h6 style={{ color: "white", margin: "4px" }}>Request a Feature</h6></a>
        </div>
      </div>
    </header>
  );
}

