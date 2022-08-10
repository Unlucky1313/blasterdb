import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import caliburnIcon from "./img/caliburnIcon.png";
import { doc, getDoc } from "firebase/firestore";

import ImageSelector from './ImageSelector.js'
import HeroImg from './HeroImg.js'
import Sidebar from './Sidebar.js'
import Description from "./Description";
import Header from "./Header.js";

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


// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

function BlasterPage() {
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
          <div className="main">
            
            <HeroImg blasterImage={blasterHero} />
            <ImageSelector imageArray={blasterData.imageArray} onChange={handleChange}/>
            <Sidebar blasterData={blasterData} />
            <Description descText = {blasterData.desc}/>
          </div>
    </div>
  );
}

export default BlasterPage;
