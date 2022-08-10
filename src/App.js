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
import Description from "./Description.js";
import Header from "./Header.js";
import BlasterPage from "./BlasterPage.js";

import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';

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

function App() {
  return (
      <Router>
      <Header />
      <Routes>
          {/* <Route exact path='/' exact element={<Home />} /> */}
          <Route path='/blaster' element={<BlasterPage/>} />
          {/* <Route path='/contact' element={<Contact/>} />
          <Route path='/blogs' element={<Blogs/>} />
          <Route path='/sign-up' element={<SignUp/>} /> */}
      </Routes>
      </Router>
  );
  }

export default App;
