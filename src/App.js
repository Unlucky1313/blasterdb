import React, { useState } from "react";
import "./App.css";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import Header from "./Header.js";
// import Footer from "./Footer.js";
import BlasterPage from "./BlasterPage.js";
import Home from "./Home.js";
import Search from "./Search.js";
import AddBlaster from "./AddBlasterPage/AddBlaster.js";
import UpdateBlaster from "./AddBlasterPage/UpdateBlaster.js";
import Profile from "./Profile.js";
import FeatureRequest from "./FeatureRequest.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [user, setUser] = useState([]);

  function gotUser(userVal) {
    setUser(userVal);
  }

  return (
    <Router>
      <Header onChange={gotUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/search" element={<Search user={user} />} />
        <Route path="/blaster" element={<BlasterPage />} />
        <Route path="/add" element={<AddBlaster />} />
        <Route path="/update" element={<UpdateBlaster />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/features" element={<FeatureRequest />} />
        {/* <Route path='/blogs' element={<Blogs/>} />
          <Route path='/sign-up' element={<SignUp/>} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
