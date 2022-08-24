import React from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";
import { setDoc } from "firebase/firestore";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import AddCircleIcon from "@mui/icons-material/AddCircle";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
});

const auth = firebase.auth();

export default function Header(props) {
  const [user] = useAuthState(auth);

  function handleUser(value) {
    props.onChange(value);
  }

  return (
    <header className="App-header">
      <NavLink className="title" to="/">
        BlasterDB
      </NavLink>

      <div className="sideHead">
        <NavLink className="navLink" to="/add">
        <AddCircleIcon /> Add
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
        <Avatar
          src={
            photoURL ||
            "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
          }
        />
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
  const { uid } = auth.currentUser;

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
        setDoc(docRef, { collected: [], wishlist: [] });
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}
