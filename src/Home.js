import React from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import BlasterCard from "./BlasterCard";

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

// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
//   measurementId: process.env.REACT_APP_measurementId,
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//   },
// });

export default function Home(props) {
  return (
    <div className="cardHolder">
      <BlasterCard user={props.user} blaster={"D0i9KOyqL8fnCFKbcXcq"} />
      <BlasterCard user={props.user} blaster={"nbPw3IRskYq08w4sxU44"} />
      <BlasterCard user={props.user} blaster={"5GiHVMHTlcFp6MEbt9EQ"} />
      <BlasterCard user={props.user} blaster={"J9k2v2vm3gSTpHYyFFzt"} />
      <BlasterCard user={props.user} blaster={"BCV9lIU2Tk00377fH0A7"} />
      <BlasterCard user={props.user} blaster={"JTbAIHFbdpS58LB4VxRL"} />
    </div>
  );
}
