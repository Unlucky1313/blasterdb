import "./App.css";
import { useState } from "react";
import firebase from "firebase/compat/app";
import {
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function BlasterActions(props) {
  const db = firebase.firestore();

  var userid = ""
  const [wishClicked, setWishClicked] = useState(false);
  const [collClicked, setCollClicked] = useState(false);

  var unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User logged in already or has just logged in.
      db.collection("users")
      .doc(user.uid)
      .get()
      .then((value) => {
        setWishClicked(value.data()["wishlist"].includes(props.blasterData.id));
        setCollClicked(value.data()["collected"].includes(props.blasterData.id));
      });
      userid = user.uid
      console.log("Getting Value")
    } else {
      console.log("User not logged in or has just logged out.")
    }
  });
  
  unsubscribe();

  const wishlistAdd = (e) => {
    var docWish = db.collection("users").doc(userid);
    if (!wishClicked) {
      updateDoc(docWish, {
        wishlist: arrayUnion(props.blasterData.id),
      });
      setWishClicked(true);
    } else {
      docWish.update({
        wishlist: arrayRemove(props.blasterData.id),
      });
      setWishClicked(false);
    }
}

const collectedAdd = (e) => {
  var docColl = db.collection("users").doc(userid);
  if (!collClicked) {
    console.log(props.blasterData.id)
    updateDoc(docColl, {
      collected: arrayUnion(props.blasterData.id),
    });
    setCollClicked(true);
  } else {
    docColl.update({
      collected: arrayRemove(props.blasterData.id),
    });
    setCollClicked(false);
  }
}

  return (
    <div className="blasterActions">
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
    </div>
  );
}