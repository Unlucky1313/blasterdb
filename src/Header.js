import React from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { setDoc } from "firebase/firestore";

import SearchIcon from '@mui/icons-material/Search';

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import AddCircleIcon from "@mui/icons-material/AddCircle";

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

const auth = firebase.auth();

export default function Header(props) {
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleUser(value) {
    props.onChange(value);
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="App-header">
      <NavLink className="title" to="/">
        BlasterBrowser
      </NavLink>

      <div className="sideHead">
        <NavLink className="navLink" to="/search">
          <SearchIcon />Search
        </NavLink>
        <NavLink className="navLink" to="/add">
          <AddCircleIcon /> Add
        </NavLink>
        <NavLink className="navLink" to="/features">
          Request A Feature!
        </NavLink>
        <section className="profile">
          {user ? (
            <>
              <Profile />
              <CheckForUser onChange={handleUser} />
            </>
          ) : (
            <SignIn />
          )}
        </section>
      </div>
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="contained"
        >
          Dashboard
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
            <Button href="/search" onClick={handleClose} size="small" ><SearchIcon />Search</Button>
          </MenuItem>
          <MenuItem>
            <Button href="/add" onClick={handleClose} size="small" ><AddCircleIcon />Add</Button>
          </MenuItem>
          <MenuItem>
            <Button href="/features" onClick={handleClose} size="small" >Request a Feature!</Button>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}

function SignIn(props) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <Button variant="contained" onClick={signInWithGoogle}>
      Sign in
    </Button>
  );
}

function Profile() {
  const { photoURL } = auth.currentUser;
  return (
    auth.currentUser && (
      <>
        <Link href="./profile">
          <Avatar
            src={
              photoURL ||
              "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
            }
          />
        </Link>
        <Button
          variant="contained"
          onClick={() => auth.signOut()}
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
          }}
        >
          Sign Out
        </Button>
      </>
    )
  );
}

function CheckForUser(props) {
  const { uid, email } = auth.currentUser;

  const db = firebase.firestore();
  var docRef = db.collection("users").doc(uid);

  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        props.onChange(uid);
      } else {
        // doc.data() will be undefined in this case
        props.onChange(uid);
        setDoc(docRef, { collected: [], wishlist: [], username: email, role: "User" });
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}
