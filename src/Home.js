import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { InstantSearch, Configure } from "react-instantsearch";
import algoliasearch from "algoliasearch/lite";
import Card from "@mui/material/Card";
import Carousel from "react-multi-carousel";

import BlasterCard from "./BlasterCard";
import home1 from "./img/home1.png";
import home2 from "./img/home2.png";
import home3 from "./img/home3.png";

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
  const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_KEY
  );

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

  const releasedIndex = searchClient.initIndex("blasters_released");
  const trendingIndex = searchClient.initIndex("blasters");
  const [releasedList, setReleasedList] = useState([]);
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    releasedIndex
      .search("", {
        attributesToRetrieve: ["objectID"],
        hitsPerPage: 10,
      })
      .then(({ hits }) => {
        setReleasedList(hits);
      });

    trendingIndex
      .search("", {
        attributesToRetrieve: ["objectID"],
        hitsPerPage: 10,
      })
      .then(({ hits }) => {
        setTrendingList(hits);
      });
  }, []);

  return (
    <>
      {/* <div className="cardHolder">
        <BlasterCard user={props.user} blaster={"D0i9KOyqL8fnCFKbcXcq"} />
        <BlasterCard user={props.user} blaster={"nbPw3IRskYq08w4sxU44"} />
        <BlasterCard user={props.user} blaster={"5GiHVMHTlcFp6MEbt9EQ"} />
        <BlasterCard user={props.user} blaster={"J9k2v2vm3gSTpHYyFFzt"} />
        <BlasterCard user={props.user} blaster={"BCV9lIU2Tk00377fH0A7"} />
        <BlasterCard user={props.user} blaster={"JTbAIHFbdpS58LB4VxRL"} />
        <BlasterCard user={props.user} blaster={"V76RPfOjMw9e9jwDVqXR"} />
        <BlasterCard user={props.user} blaster={"3znD86UqNYW4ACpfXgQ3"} />
        <BlasterCard user={props.user} blaster={"B58HaJnrPiISgccZscVM"} />

      </div> */}
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

      <InstantSearch
        searchClient={searchClient}
        indexName="blasters_released"
        insights
        className="cardHolder"
        hitsPerPage="10"
      >
        <Card className="profileCardHolder">
          <h1 style={{ margin: "8px 0px 8px 24px" }}>Hot Right Now:</h1>

          <Carousel responsive={responsive} showDots={true}>
            {trendingList.map((obj) => (
              <BlasterCard blaster={obj.objectID} key={obj.objectID} />
            ))}
          </Carousel>
        </Card>
        <Configure hitsPerPage={10} />
      </InstantSearch>

      <InstantSearch
        searchClient={searchClient}
        indexName="blasters_released"
        insights
        className="cardHolder"
        hitsPerPage="10"
      >
        <Card className="profileCardHolder">
          <h1 style={{ margin: "8px 0px 8px 24px" }}>New Releases: </h1>

          <Carousel responsive={responsive} showDots={true}>
            {releasedList.map((obj) => (
              <BlasterCard blaster={obj.objectID} key={obj.objectID} />
            ))}
          </Carousel>
        </Card>
        <Configure hitsPerPage={10} />
      </InstantSearch>

      {/* <InstantSearch
        searchClient={searchClient}
        indexName="blasters"
        insights
        className="cardHolder"
      >
        <Hits hitComponent={BlasterCardHit} className="searchHome" />
      </InstantSearch> */}
    </>
  );
}
