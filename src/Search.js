import React from "react";
import { useState, useEffect } from "react";
import 'instantsearch.css/themes/satellite.css';
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { InstantSearch, SearchBox, Hits, Highlight, SortBy, RefinementList } from "react-instantsearch";
import algoliasearch from 'algoliasearch/lite';


import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { storage } from "./useFirebase";
import { getDownloadURL, ref as storageRef, } from "firebase/storage";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import RedeemIcon from "@mui/icons-material/Redeem";
import BlasterActions from "./BlasterActions";

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

export default function Search(props) {

  const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);

  return (
    <Card className="searchHolder" sx={{ margin: "24px 36px", display: "flex", flexDirection: "row" }}>

      <InstantSearch searchClient={searchClient} indexName="blasters" insights className="searchMain">

        <Card className="searchBox">
          <header className="searchHeader">
            <h2>Search:</h2>
            <SearchBox translations={{ placeholder: 'Search for Blasters' }} />
          </header>
          <div className="sortContainer">
            <h2>Sort By:</h2>
            <SortBy
              items={[
                { label: 'Name', value: 'blasters' },
                { label: 'Min Fps', value: 'blasters_min_fps' },
                { label: 'Max Fps', value: 'blasters_max_fps' },
                { label: 'Release Date', value: 'blasters_released' },
              ]}
            />
          </div>

          <h3>Propulsion</h3>
          <RefinementList attribute="propulsion" />
          <h3>Rate of Fire</h3>
          <RefinementList attribute="rof" />
          <h3>Feed Type</h3>
          <RefinementList attribute="feed" />          
          <h3>Construction Type</h3>
          <RefinementList attribute="construction" />
          <h3>Difficulty of Build</h3>
          <RefinementList attribute="diff" />

        </Card>

        <Hits hitComponent={BlasterDetail} className="hitsContainer"/>

      </InstantSearch>

    </Card>
  );
}

function BlasterDetail({ hit }) {
  const [blasterHero, setBlasterHero] = useState();

  console.log(hit);

  useEffect(() => {
    const getData = async () => {
      const resizedRef = storageRef(storage, `images/${hit.imageArray[0]}_256x144`);
      getDownloadURL(resizedRef).then((url) => {
        setBlasterHero(url);
      });
    };
    getData();
  });

  const blasterURL = "./blaster?blaster=" + hit.id;

  var fpsStr = "";
  if (hit.fpsLow) {
    fpsStr += hit.fpsLow;
  }
  if (hit.fpsHigh && hit.fpsHigh !== hit.fpsLow) {
    fpsStr += "-" + hit.fpsHigh;
  }
  fpsStr += " FPS";

  return (
    <Box className="detailGrid">
      <a href={blasterURL}><img style={{ width: "128px", aspectRatio: "16/9", objectFit: "cover", gridColumn: "image" }} src={blasterHero} alt="Blaster" /></a>
      <Link href={blasterURL} underline="hover" color="black"><h2 style={{ marginLeft: "12px", gridColumn: "name" }}><Highlight attribute="blasterName" hit={hit} /></h2></Link>

      <h3 style={{ marginLeft: "12px", gridColumn: "creator", paddingTop: "5px" }}><Highlight attribute="creator" hit={hit} /></h3>

      <h5 style={{ marginLeft: "12px", gridColumn: "propulsion", textAlign: "center", paddingTop: "5px" }}>{hit.propulsion}</h5>

      <h5 style={{ marginLeft: "12px", gridColumn: "fps", textAlign: "center", paddingTop: "5px" }}>{fpsStr}</h5>

      <div style={{ gridColumn: "links", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {hit.store ? <Link href={hit.store}><Avatar sx={{ width: 30, height: 30, bgcolor: "#3064ad", margin: "4px" }}>
          <RedeemIcon sx={{ width: "22px" }} />
        </Avatar></Link>
          : ""}

        {hit.kit ? <Link href={hit.kit}><Avatar sx={{ width: 30, height: 30, bgcolor: "#3064ad", margin: "4px" }}>
          <HomeRepairServiceIcon sx={{ width: "22px" }} />
        </Avatar></Link>
          : ""}

        {hit.files ? <Link href={hit.files}><Avatar sx={{ width: 30, height: 30, bgcolor: "#3064ad", margin: "4px" }}>
          <InsertDriveFileIcon sx={{ width: "22px" }} />
        </Avatar></Link>
          : ""}
      </div>

      <div style={{ gridColumn: "actions", display: "flex", alignItems: "center" }}>
        <BlasterActions blasterData={hit} />
      </div>
    </Box>
  );
}
