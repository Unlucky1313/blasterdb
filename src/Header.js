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

  function changeRole(role){
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
    <header className="App-header">
      <NavLink className="title" to="/">
        BlasterBrowser
      </NavLink>

      <div className="sideHead">
        <section className="profile">
          {user ? (
            <>
              <Profile />
              <CheckForUser onChange={handleUser} changeRole={changeRole} />
            </>
          ) : (
            <SignIn />
          )}
        </section>
        <div className="menu">
          <Button
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            variant="contained"
            className="menuIcon"
          >
            <MenuIcon />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            sx={{zIndex: 100}}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "right top",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem className="menuItem">
                        <Button
                          href="/search"
                          onClick={handleClose}
                          size="small"
                          className="menuButton"
                        >
                          <SearchIcon />
                          Search
                        </Button>
                      </MenuItem>
                      {(userRole === "Admin" || userRole === "Moderator") ? 
                      <MenuItem className="menuItem">
                        <Button
                          href="/add"
                          onClick={handleClose}
                          size="small"
                          className="menuButton"
                        >
                          <AddCircleIcon />
                          Add a Blaster
                        </Button>
                      </MenuItem>
                      : ""}
                      <MenuItem className="menuItem">
                        <Button
                          href="/features"
                          onClick={handleClose}
                          size="small"
                          className="menuButton"
                        >
                          <FeedbackIcon />
                          Request a Feature!
                        </Button>
                      </MenuItem>
                      {auth.currentUser ? (
                        <MenuItem className="menuItem">
                          <Button
                            onClick={() => {
                              auth.signOut(); 
                              window.location.reload();
                            }}
                            className="menuButton"
                          >
                            <LogoutIcon />
                            Sign Out
                          </Button>
                        </MenuItem>
                      ) : (
                        ""
                      )}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
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
        props.changeRole(doc.data()["role"]);
      } else {
        // doc.data() will be undefined in this case
        props.onChange(uid);
        setDoc(docRef, {
          collected: [],
          wishlist: [],
          username: email,
          role: "User",
        });
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}
