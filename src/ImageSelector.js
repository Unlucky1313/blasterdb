import React, { useState } from "react";
import { storage } from "./useFirebase";
import { getDownloadURL, ref as storageRef, } from "firebase/storage";

import "./App.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";

export default function ImageSelector(props) {
  const onChange = url => {
    // Here, we invoke the callback with the new value
    props.onChange(url);
  }
  return (
    <Card className="imagesMain coolScroll" sx={{ overflow: 'auto' }}>
      <List className="flexList coolScroll"
        sx={{
          width: "100%",
        }}
      >
        {props.imageArray &&
          props.imageArray
            .map((image) => <ImageSelectorGen imageSrc={image} key={image} onChange={onChange} />)}
      </List>
    </Card>
  );
}

function ImageSelectorGen(props) {

  const [imageURL, setImageURL] = useState("");

  function handleImgClick(event) {
    // Here, we invoke the callback with the new value
    props.onChange(event.target.src);
  }

  const resizedRef = storageRef(storage, `images/${props.imageSrc}_256x144`);
  console.log(getDownloadURL(resizedRef).then((url) => {
    setImageURL(url);
    console.log(url);
  }));

  return (
    <ListItem>
      <img src={imageURL} className="imageSmall" onClick={handleImgClick} alt="Blaster Selector" />
    </ListItem>
  );
}

// const handleImgClick = event => {
//   console.log(event.target.src);
//   setBlasterHero(event.target.src)
//   console.log('Image clicked');
// };
