import { useState, useEffect } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardContent";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { doc, getDoc } from "firebase/firestore";
import BlasterActions from "./BlasterActions";
import { storage } from "./useFirebase";
import { getDownloadURL, ref as storageRef, } from "firebase/storage";

export default function BlasterCard(props) {
  const [blasterData, setBlasterData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(firebase.firestore(), "blasters", props.blaster);
      const docSnap = await getDoc(docRef);

      const resizedRef = storageRef(storage, `images/${docSnap.data().imageArray[0]}_1440x810`);
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
  console.log(blasterData.id);

  return (
    <Card className="blasterCardWrapper">
      <CardActionArea href={blasterURL}>
        <CardMedia
          component="img"
          alt="Blaster Icon"
          image={blasterData.cardImg}
          sx={{ height: "183px" }}
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ marginBottom: "-5px", fontWeight: "bold" }}
          >
            {blasterData.blasterName}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ marginLeft: "15px" }}
          >
            By: {blasterData.creator}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ marginTop: "15px" }}
          >
            <DescriptionGenerator blasterData={blasterData} />
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <BlasterActions blasterData={blasterData} />
      </CardActions>
    </Card>
  );
}

function DescriptionGenerator(props) {
  // Half and Full Lenght Formating
  var halfFull = "";
  if (props.blasterData.half) {
    halfFull += "Half";
  }
  if (props.blasterData.half && props.blasterData.full) {
    halfFull += " and ";
  }
  if (props.blasterData.full) {
    halfFull += "Full";
  }
  halfFull += " Length " + props.blasterData.propulsion;

  var fpsStr = "";
  if (props.blasterData.fpsLow) {
    fpsStr += props.blasterData.fpsLow;
  }
  if (props.blasterData.fpsHigh && props.blasterData.fpsHigh !== props.blasterData.fpsLow) {
    fpsStr += "-" + props.blasterData.fpsHigh;
  }
  fpsStr += " ";

  return (
    <>
      {halfFull}
      <br />
      {fpsStr}
      FPS
    </>
  );
}
