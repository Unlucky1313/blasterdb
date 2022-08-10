import React from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

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



function Navigation() {
  const [user] = useAuthState(auth);

  return (
    <header className="App-header">
    <section className="title">BlasterDB</section>
    <section className="profile">
      {user ? <Profile /> : <SignIn />}
    </section>
  </header>
  );
}

export default Navigation;

function SignIn() {
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
