import { useState, useEffect } from "react";
import "./App.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardContent";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import {
  updateDoc,
  arrayUnion,
  arrayRemove,
  doc,
  getDoc,
} from "firebase/firestore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function BlasterCard(props) {
  const db = firebase.firestore();

  const [wishClicked, setWishClicked] = useState(false);
  const [collClicked, setCollClicked] = useState(false);
  const [blasterData, setBlasterData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(firebase.firestore(), "blasters", props.blaster);
      const docSnap = await getDoc(docRef);
      setBlasterData({ ...docSnap.data(), id: props.blaster });
    };
    getData();
  });

  if (props.user.length > 0) {
    db.collection("users")
      .doc(props.user)
      .get()
      .then((value) => {
        setWishClicked(value.data()["wishlist"].includes(blasterData.id));
        setCollClicked(value.data()["collected"].includes(blasterData.id));
      });
  }

  function wishlistAdd() {
    var docWish = db.collection("users").doc(props.user);
    if (!wishClicked) {
      updateDoc(docWish, {
        wishlist: arrayUnion(blasterData.id),
      });
      setWishClicked(true);
    } else {
      docWish.update({
        wishlist: arrayRemove(blasterData.id),
      });
      setWishClicked(false);
    }
  }

  function collectedAdd() {
    var docColl = db.collection("users").doc(props.user);
    if (!collClicked) {
      updateDoc(docColl, {
        collected: arrayUnion(blasterData.id),
      });
      setCollClicked(true);
    } else {
      docColl.update({
        collected: arrayRemove(blasterData.id),
      });
      setCollClicked(false);
    }
  }

  const blasterURL = "./blaster?blaster=" + blasterData.id

  return (
    <>
      <Card className="blasterCardWrapper">
        <CardActionArea href={blasterURL}>
          <CardMedia
            component="img"
            alt="Blaster Icon"
            image={blasterData.image}
            sx={{ height: "225px" }}
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
          <Button
            color={wishClicked ? "success" : "primary"}
            variant="contained"
            startIcon={wishClicked ? <CheckCircleIcon /> : <AddCircleIcon />}
            onClick={wishlistAdd}
            id="wButton"
          >
            Wishlist
          </Button>
          <Button
            color={collClicked ? "success" : "secondary"}
            variant="contained"
            startIcon={collClicked ? <CheckCircleIcon /> : <AddCircleIcon />}
            onClick={collectedAdd}
          >
            Collect
          </Button>
        </CardActions>
      </Card>
    </>
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
  if (props.blasterData.fpsHigh) {
    fpsStr += "-" + props.blasterData.fpsHigh + " ";
  }

  return (
    <>
      {halfFull}
      <br />
      {fpsStr}
      FPS
    </>
  );
}
