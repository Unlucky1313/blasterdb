import React from "react";
import { useState, useEffect } from "react";
import "instantsearch.css/themes/satellite.css";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  SortBy,
  RefinementList,
  ToggleRefinement,
  Pagination,
  Configure
} from "react-instantsearch";
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { storage } from "./useFirebase";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import Link from "@mui/material/Link";
import BlasterActions from "./BlasterActions";
import BlasterLinks from "./BlasterLinks";

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

export default function Search(props) {
  // const searchClient = algoliasearch(
  //   process.env.REACT_APP_ALGOLIA_APP_ID,
  //   process.env.REACT_APP_ALGOLIA_SEARCH_KEY
  // );

  const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
      apiKey: process.env.REACT_APP_TYPESENSE_SEARCH_KEY, // Be sure to use the search-only-api-key
      nodes: [
        {
          host: process.env.REACT_APP_TYPESENSE_NODE,
          port: 443,
          protocol: "https"
        }
      ]
    },

    // The following parameters are directly passed to Typesense's search API endpoint.
    //  So you can pass any parameters supported by the search endpoint below.
    //  queryBy is required.
    additionalSearchParameters: {
      query_by: "blasterName"
    }
  });
  const searchClient = typesenseInstantsearchAdapter.searchClient;

  return (
    <Card
      className="searchHolder"
      sx={{ margin: "24px 36px", display: "flex", flexDirection: "row" }}
    >
      <InstantSearch
        searchClient={searchClient}
        indexName="blasters"
        insights
        className="searchMain"
      >
        <Configure
          hitsPerPage={20}
        />
        <Card className="searchBox">
          <header className="searchHeader">
            <h2 style={{ marginBottom: "0px" }}>Search:</h2>
            <SearchBox translations={{ placeholder: "Search for Blasters" }} />
          </header>
          <div className="sortContainer">
            <h2 style={{ marginBottom: "0px" }}>Sort By:</h2>
            <SortBy
              items={[
                { label: "Name", value: "blasters" },
                { label: "Min Fps", value: "blasters_min_fps" },
                { label: "Max Fps", value: "blasters_max_fps" },
                { label: "Release Date", value: "blasters_released" },
              ]}
            />
          </div>

          <h3 style={{ marginBottom: "0px" }}>Propulsion:</h3>
          <RefinementList attribute="propulsion" />
          <h3 style={{ marginBottom: "0px" }}>Rate of Fire:</h3>
          <RefinementList attribute="rof" />
          <h3 style={{ marginBottom: "0px" }}>Feed Type:</h3>
          <RefinementList attribute="feed" />
          <h3 style={{ marginBottom: "0px" }}>Construction Type:</h3>
          <RefinementList attribute="construction" />
          <h3 style={{ marginBottom: "0px" }}>Difficulty of Build:</h3>
          <RefinementList attribute="diff" />
          <h3 style={{ marginBottom: "0px" }}>Ammo Types:</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              rowGap: "2px",
            }}
          >
            <ToggleRefinement
              attribute="ammo.half"
              label="Half Length"
              style={{ width: "45%" }}
            />
            <ToggleRefinement
              attribute="ammo.mega"
              label="Mega"
              style={{ width: "45%" }}
            />
            <ToggleRefinement
              attribute="ammo.full"
              label="Full Length"
              style={{ width: "45%" }}
            />
            <ToggleRefinement
              attribute="ammo.megaXL"
              label="Mega XL"
              style={{ width: "45%" }}
            />
            <ToggleRefinement
              attribute="ammo.rival"
              label="Rival"
              style={{ width: "45%" }}
            />
            <ToggleRefinement
              attribute="ammo.rockets"
              label="Rockets"
              style={{ width: "45%" }}
            />
          </div>

          <h3 style={{ marginBottom: "0px" }}>Avalibility:</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              gap: "8px",
              rowGap: "2px",
            }}
          >
            <ToggleRefinement
              attribute="storeBool"
              label="Store"
              style={{ width: "45%" }}
            />
            <ToggleRefinement
              attribute="kitBool"
              label="Kit"
              style={{ width: "45%" }}
            />
            <ToggleRefinement
              attribute="filesBool"
              label="Files"
              style={{ width: "45%" }}
            />
          </div>
        </Card>

        <div style={{ width: "100%" }}>
          <Hits hitComponent={BlasterDetail} className="hitsContainer" />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              margin: "24px",
            }}
          >
            <Pagination />
          </div>
        </div>
      </InstantSearch>
    </Card>
  );
}

function BlasterDetail({ hit }) {
  const [blasterHero, setBlasterHero] = useState();

  console.log(hit);

  useEffect(() => {
    const getData = async () => {
      const resizedRef = storageRef(
        storage,
        `images/${hit.imageArray[0]}_256x144`
      );
      getDownloadURL(resizedRef).then((url) => {
        setBlasterHero(url);
      });
    };
    getData();
  });

  const blasterURL = "./blaster?blaster=" + hit.objectID + "&queryID=" + hit.__queryID;

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
      <a href={blasterURL}>
        <img
          style={{
            width: "128px",
            marginTop: "4px",
            aspectRatio: "16/9",
            objectFit: "cover",
            gridColumn: "image",
          }}
          src={blasterHero}
          alt="Blaster"
        />
      </a>
      <Link href={blasterURL} underline="hover" color="black">
        <h2
          style={{
            marginLeft: "12px",
            marginBottom: "0px",
            gridColumn: "name",
          }}
        >
          <Highlight attribute="blasterName" hit={hit} />
        </h2>
        <h4
          style={{
            marginLeft: "12px",
            marginTop: "4px",
            marginBottom: "0px",
            gridColumn: "name",
          }}
        >
          <Highlight attribute="shortDesc" hit={hit} />
        </h4>
      </Link>

      <h3
        style={{ marginLeft: "12px", gridColumn: "creator", paddingTop: "5px" }}
      >
        <Highlight attribute="creator" hit={hit} />
      </h3>

      <h5
        style={{
          marginLeft: "12px",
          gridColumn: "propulsion",
          textAlign: "center",
          paddingTop: "5px",
        }}
      >
        {hit.propulsion}
      </h5>

      <h5
        style={{
          marginLeft: "12px",
          gridColumn: "fps",
          textAlign: "center",
          paddingTop: "5px",
        }}
      >
        {fpsStr}
      </h5>

      <BlasterLinks hit={hit}></BlasterLinks>

      <div
        style={{ gridColumn: "actions", display: "flex", alignItems: "center" }}
      >
        <BlasterActions blasterData={hit} />
      </div>
    </Box>
  );
}
