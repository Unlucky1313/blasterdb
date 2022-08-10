import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import caliburnIcon from "./img/caliburnIcon.png";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { doc, getDoc } from "firebase/firestore";

import ImageSelector from './ImageSelector.js'
import HeroImg from './HeroImg.js'
import Sidebar from './Sidebar.js'

console.log(process.env.REACT_APP_apiKey)

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

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

function App() {
  const [user] = useAuthState(auth);
  const [blasterHero, setBlasterHero] = useState(caliburnIcon);
  const [blasterData, setBlasterData] = useState([]);

  const blaster = "D0i9KOyqL8fnCFKbcXcq";

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(firebase.firestore(), "blasters", blaster);
      const docSnap = await getDoc(docRef);
      setBlasterData({ ...docSnap.data() });
      setBlasterHero(docSnap.data().imageArray[0])
    };
    getData();
  }, []);

  function handleChange(newValue) {
    setBlasterHero(newValue);
  }

  return (
    <div className="App">
        <header className="App-header">
          <section className="title">BlasterDB</section>
          <section className="profile">
            {user ? <Profile /> : <SignIn />}
          </section>
        </header>

        
          <div className="main">
            
            <HeroImg blasterImage={blasterHero} />
            <ImageSelector imageArray={blasterData.imageArray} onChange={handleChange}/>
            <Sidebar blasterData={blasterData} />
          </div>
    </div>
  );
}

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

export default App;
