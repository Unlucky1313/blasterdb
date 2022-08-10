import "./App.css";
import Card from "@mui/material/Card";

export default function HeroImg(props) {
  return (
    <>
      <Card className="imgCard">
        <img className="heroImg" src={props.blasterImage} alt ="BlasterIcon" />
      </Card>
    </>
  );
}