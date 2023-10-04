import React, { useRef, useState } from 'react'
import MUIRichTextEditor from "mui-rte";

import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from '@mui/icons-material/Check';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { convertToRaw } from 'draft-js'

export default function AddTabs(props) {

  return (<Card className="tabBox">
    <Box sx={{
      borderBottom: 1,
      borderColor: "divider"
    }}>
      <Tabs value={props.currTab} onChange={props.changeTab}>
        <Tab label="Description" />
        {
          /* <Tab label="Other Files/Links" /> */
        }
        {
          /* <Tab label="Images" /> */
        }
        <Tab label="Video Reviews" />
        {
          /* <Tab label="Reviews" /> */
        }
      </Tabs>
    </Box>

    {/* Description */}

    {props.currTab === 0 && <AddDescription value={props.currTab} desc={props.desc} changeDesc={props.changeDesc} index={0} />}

    {/* Video Reviews */}

    {props.currTab === 1 && <VideoReviews videoKey={props.videoKey} setVideoKey={props.setVideoKey} addVideoUrl={props.addVideoUrl} videoReviews={props.videoReviews} handleVideoRemove={props.handleVideoRemove}></VideoReviews>}
  </Card>);
}


function AddDescription(props) {

  const [saveCheck, setSaveCheck] = useState(false);
  const [descTest, setDescTest] = useState(false);

  const myTheme = createTheme({
    // Set up your custom MUI theme here
  });

  const saveDesc = (data) => {
    props.changeDesc(data);
    console.log(data);
  }

  const ref = useRef(null);

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const handleClick = async () => {
    ref.current?.save()
    setSaveCheck(true)
    await delay(2000);
    setSaveCheck(false)
  }

  const descChange = event => {
    const plainText = event.getCurrentContent().getPlainText() // for plain text
    console.log(plainText);
    const rteContent = convertToRaw(event.getCurrentContent()) // for rte content with text formating
    rteContent && setDescTest(JSON.stringify(rteContent)) // store your rteContent to state
    console.log(descTest);
  }

  return (
    <Box className="addDesc">
      <ThemeProvider theme={myTheme}>
        <MUIRichTextEditor
          label="Blaster description..."
          inlineToolbar={true}
          onSave={saveDesc}
          defaultValue={props.desc}
          ref={ref}
          onChange={descChange}
          controls = {["title", "bold", "italic", "underline", "strikethrough", "highlight", "numberList", "bulletList", "quote", "code", "clear"]}
        />
      </ThemeProvider>
      {/* <TextField multiline sx={{ padding: "16px" }} /> */}

      <div style={{  display: "flex", justifyContent: "center", bottom:"0px", position:"absolute", width:"100%" }}>
        <Button size="large" variant="contained" style={{}} onClick={handleClick} endIcon={saveCheck ? <CheckIcon /> : "" } >Save</Button>
      </div>
    </Box>
  );
}

function VideoReviews(props) {
  return (<div>
    <div className="tabBox"
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "15px"
      }}>
      <TextField id="outlined-required" label="Youtube Key" sx={{
        width: "90%"
      }} value={props.videoKey} onChange={e => props.setVideoKey(e.target.value)} />
      <Button variant="contained" onClick={props.addVideoUrl} size="large" className="addImageButton">
        <AddCircleIcon sx={{
          paddingRight: "8px"
        }} />
        Add
      </Button>
    </div>
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      maxHeight: "650px",
      overflow: "auto"
    }}>
      {props.videoReviews.map(url => <VideoEmbed key={url} url={url} onChange={props.handleVideoRemove} />)}
    </div>
  </div>);
}

function VideoEmbed(props) {
  function removeURL(event) {
    // Here, we invoke the callback with the new value
    props.onChange(props.url);
    return <></>;
  }
  return (
    <div
      style={{
        margin: "12px",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <iframe
        width="336"
        height="188"
        src={"https://www.youtube.com/embed/" + props.url}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen"
        msallowfullscreen="msallowfullscreen"
        oallowfullscreen="oallowfullscreen"
        webkitallowfullscreen="webkitallowfullscreen"
      ></iframe>
      <Button variant="contained" sx={{ margin: "8px" }} onClick={removeURL}>
        <CloseIcon sx={{ paddingRight: "8px" }} />
        Remove
      </Button>
    </div>
  );
}