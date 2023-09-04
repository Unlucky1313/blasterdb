import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { storage } from "./useFirebase";
import { getDownloadURL, ref as storageRef, } from "firebase/storage";
import Divider from "@mui/material/Divider";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import RedeemIcon from "@mui/icons-material/Redeem";
import BlasterActions from "./BlasterActions";
import { doc, getDoc } from "firebase/firestore";
import { Redeem } from "@mui/icons-material";

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
  return (
    <Card className="searchHolder" sx={{ margin: "30px 48px", display: "flex", flexDirection: "column" }}>

      <BlasterDetail user={props.user} blaster={"D0i9KOyqL8fnCFKbcXcq"} />
      <Divider variant="middle" />
      <BlasterDetail user={props.user} blaster={"nbPw3IRskYq08w4sxU44"} />
      <Divider variant="middle" />
      <BlasterDetail user={props.user} blaster={"5GiHVMHTlcFp6MEbt9EQ"} />
      <Divider variant="middle" />
      <BlasterDetail user={props.user} blaster={"J9k2v2vm3gSTpHYyFFzt"} />
      <Divider variant="middle" />
      <BlasterDetail user={props.user} blaster={"BCV9lIU2Tk00377fH0A7"} />
      <Divider variant="middle" />
      <BlasterDetail user={props.user} blaster={"JTbAIHFbdpS58LB4VxRL"} />
    </Card>
  );
}

function BlasterDetail(props) {
  const [blasterData, setBlasterData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(firebase.firestore(), "blasters", props.blaster);
      const docSnap = await getDoc(docRef);

      const resizedRef = storageRef(storage, `images/${docSnap.data().imageArray[0]}_256x144`);
      getDownloadURL(resizedRef).then((url) => {
        setBlasterData({
          ...docSnap.data(),
          id: props.blaster,
          cardImg: url,
        });

      });

      setBlasterData({
        ...docSnap.data(),
        id: props.blaster,
        cardImg: docSnap.data().imageArray[0],
      });
    };
    getData();
  }, [props.blaster]);

  const blasterURL = "./blaster?blaster=" + blasterData.id;

  var fpsStr = "";
  if (blasterData.fpsLow) {
    fpsStr += blasterData.fpsLow;
  }
  if (blasterData.fpsHigh) {
    fpsStr += "-" + blasterData.fpsHigh;
  }
  fpsStr += " FPS";

  return (
    <Box className="detailGrid">
      <a href={blasterURL}><img style={{ width: "128px", aspectRatio: "16/9", objectFit: "cover", gridColumn: "image" }} src={blasterData.cardImg} alt="Blaster Image" /></a>
      <Link href={blasterURL} underline="hover" color="black"><h2 style={{ marginLeft: "12px", gridColumn: "name" }}>{blasterData.blasterName}</h2></Link>

      <h3 style={{ marginLeft: "12px", gridColumn: "creator", paddingTop: "5px" }}>{blasterData.creator}</h3>

      <h5 style={{ marginLeft: "12px", gridColumn: "propulsion", textAlign: "center", paddingTop: "5px" }}>{blasterData.propulsion}</h5>

      <h5 style={{ marginLeft: "12px", gridColumn: "fps", textAlign: "center", paddingTop: "5px" }}>{fpsStr}</h5>

      <div style={{ gridColumn: "links", display: "flex", justifyContent: "center", alignItems: "center" }}>
        {blasterData.store ? <Link href={blasterData.store}><Avatar sx={{ width: 30, height: 30, bgcolor: "#3064ad", margin:"4px" }}>
          <Redeem sx={{width:"22px"}} />
        </Avatar></Link>
          : ""}

        {blasterData.kit ? <Link href={blasterData.kit}><Avatar sx={{ width: 30, height: 30, bgcolor: "#3064ad", margin:"4px" }}>
          <HomeRepairServiceIcon sx={{width:"22px"}} />
        </Avatar></Link>
          : ""}

        {blasterData.files ? <Link href={blasterData.files}><Avatar sx={{ width: 30, height: 30, bgcolor: "#3064ad", margin:"4px" }}>
          <InsertDriveFileIcon sx={{width:"22px"}} />
        </Avatar></Link>
          : ""}
      </div>

      <div style={{ gridColumn: "actions", display: "flex", alignItems: "center" }}>
        <BlasterActions blasterData={blasterData} />
      </div>
    </Box>
  );
}
