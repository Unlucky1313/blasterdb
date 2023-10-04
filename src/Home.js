import React from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { InstantSearch, Hits, Configure } from "react-instantsearch";
import algoliasearch from 'algoliasearch/lite';
// import { TrendingItems } from '@algolia/recommend-react';

import BlasterCardHit from "./BlasterCardHit";

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

export default function Home(props) {

  const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_SEARCH_KEY);

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

      {/* <TrendingItems
        recommendClient={searchClient}
        indexName={"blasters"}
        itemComponent={BlasterCardHit}
      /> */}


      <InstantSearch searchClient={searchClient} indexName="blasters" insights={true} className="cardHolder">

        <Hits hitComponent={BlasterCardHit} className="searchHome" />
        <Configure clickAnalytics />
      </InstantSearch>
    </>

  );
}
