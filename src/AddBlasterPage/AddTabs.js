import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CloseIcon from "@mui/icons-material/Close";

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

    {props.currTab === 0 && <AddDescription value={props.currTab} index={0} />}

    {/* Video Reviews */}

    {props.currTab === 1 && <VideoReviews videoKey={props.videoKey} setVideoKey={props.setVideoKey} addVideoUrl={props.addVideoUrl} videoReviews={props.videoReviews} handleVideoRemove={props.handleVideoRemove}></VideoReviews>}
  </Card>);
}


function AddDescription(props) {
  return (
    <>
      <h2>Description:</h2>
      <TextField multiline sx={{ padding: "16px" }} />
    </>
  );
}

function VideoReviews(props) {
  return (<div>
    <div style={{
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