import "./App.css";
import Card from "@mui/material/Card";

export default function Description(props) {
  return (
    <>
      <Card className="description">
        <h2>Description:</h2>
        <br/>
        <p>{props.descText}</p>
      </Card>
    </>
  );
}