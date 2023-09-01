import "../App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import CloseIcon from "@mui/icons-material/Close";

export default function AddImage(props) {

  return (<Card className="addImageCard">
    <div style={{
      display: "flex",
      justifyContent: "center",
      margin: "15px"
    }}>
      <TextField id="outlined-required" label="Blaster Image URL" sx={{
        width: "90%"
      }} value={props.imageURL} onChange={e => props.setImageURL(e.target.value)} />
      <Button variant="contained" onClick={props.addURL} size="large" className="addImageButton">
        <AddCircleIcon sx={{
          paddingRight: "8px"
        }} />
        Add
      </Button>
    </div>

    {props.imageArray.map(url => <URLItem key={url} url={url} onChange={props.handleChange} />)}
  </Card>);
}


function URLItem(props) {
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
        overflow: "auto",
      }}
    >
      <CloseIcon sx={{ paddingRight: "8px" }} onClick={removeURL} />
      <Link href={props.url} target="_blank">
        {props.url.substring(0, 35) + " •••"}
      </Link>
    </div>
  );
}

// const handleImgClick = event => {
//   console.log(event.target.src);
//   setBlasterHero(event.target.src)
//   console.log('Image clicked');
// };
