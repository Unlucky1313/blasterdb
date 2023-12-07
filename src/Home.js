import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { SearchClient as TypesenseSearchClient } from "typesense";

import Card from "@mui/material/Card";
import Carousel from "react-multi-carousel";

import BlasterCard from "./BlasterCard";
import home1 from "./img/home1.png";
import home2 from "./img/home2.png";
import home3 from "./img/home3.png";
import { Button } from "@mui/material";

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

export default function Home(props) {
  // const searchClient = algoliasearch(
  //   process.env.REACT_APP_ALGOLIA_APP_ID,
  //   process.env.REACT_APP_ALGOLIA_SEARCH_KEY
  // );

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1800 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1800, min: 1500 },
      items: 4,
    },
    smalldesktop: {
      breakpoint: { max: 1500, min: 1100 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1100, min: 770 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 770, min: 0 },
      items: 1,
    },
  };

  const nonResponsive = {
    mobile: {
      breakpoint: { max: 7700, min: 0 },
      items: 1,
    },
  };

  const [releasedList, setReleasedList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);

  // Set up Typesense Searching
  useEffect(() => {

    let client = new TypesenseSearchClient({
      'nodes': [{
        'host': process.env.REACT_APP_TYPESENSE_NODE, // For Typesense Cloud use xxx.a1.typesense.net
        'port': '443',      // For Typesense Cloud use 443
        'protocol': 'https'   // For Typesense Cloud use https
      }],
      'apiKey': process.env.REACT_APP_TYPESENSE_SEARCH_KEY,
      'connectionTimeoutSeconds': 2
    })

    let releasedParameters = {
      'q': '*',
      'query_by': 'blasterName',
      'sort_by': 'released:desc'
    }
    let trendingParameters = {
      'q': '*',
      'query_by': 'blasterName',
      'sort_by': 'fpsHigh:desc'
    }

    client.collections('blasters')
      .documents()
      .search(releasedParameters)
      .then(({ hits }) => {
        setReleasedList(hits);
      });

    client.collections('blasters')
      .documents()
      .search(trendingParameters)
      .then(({ hits }) => {
        setTrendingList(hits);
      });

  }, []);


  return (
    <>
      <div
        style={{
          width: "90%",
          margin: "24px 0px 24px 5%",
        }}
      >
        <Carousel
          responsive={nonResponsive}
          showDots={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
        >
          <img
            src={home1}
            alt="Home"
            style={{ width: "100%", objectFit: "cover", height: "600px" }}
          />
          <img
            src={home2}
            alt="Home"
            style={{ width: "100%", objectFit: "cover", height: "600px" }}
          />
          <img
            src={home3}
            alt="Home"
            style={{ width: "100%", objectFit: "cover", height: "600px" }}
          />
        </Carousel>
      </div>

      {/* Hot Right Now */}
      <Card className="profileCardHolder">
        <h1 style={{ margin: "8px 0px 8px 24px" }}>Hot Right Now:</h1>
        <Carousel responsive={responsive} showDots={true}>
          {trendingList.map((obj) => (
            <BlasterCard blaster={obj.document.id} key={obj.document.id} />
          ))}
        </Carousel>
      </Card>

      {/* Trending */}
      <Card className="profileCardHolder">
        <h1 style={{ margin: "8px 0px 8px 24px" }}>New Releases: </h1>

        <Carousel responsive={responsive} showDots={true}>
          {releasedList.map((obj) => (
            <BlasterCard blaster={obj.document.id} key={obj.document.id} />
          ))}
        </Carousel>
      </Card>

      {/* Search Page Call to Action */}
      <Card className="searchCTA">
        <Card className="searchCTAText">
          <h2>
            Still didn't find what you were looking for?
          </h2>
          <h3>
            Head over to the search page to view the full database of blasters:
          </h3>

          <Button size="large" variant="contained" href="/search" className="searchCTAButton">
            Search Page
          </Button>
        </Card>
      </Card>

    </>
  );
}
