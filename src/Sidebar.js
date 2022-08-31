import "./App.css";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RedeemIcon from "@mui/icons-material/Redeem";
import BlasterActions from "./BlasterActions";

import fps from "./img/FPS.png";
import btype from "./img/btype.png";
import darts from "./img/darts.png";

export default function Sidebar(props) {
  // FPS formating
  var fpsStr = "";
  if (props.blasterData.fpsLow) {
    fpsStr += props.blasterData.fpsLow;
  }
  if (props.blasterData.fpsHigh) {
    fpsStr += "-" + props.blasterData.fpsHigh;
  }

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
  halfFull += " Length";

  return (
    <Card className="sidebar">
      <h1 style={{ textAlign: "center" }}>{props.blasterData.blasterName}</h1>
      <div style={{ paddingLeft: "24px" }}>
        <h3>By: {props.blasterData.creator}</h3>
        {props.blasterData.released && (
          <h3 style={{ marginTop: "-16px", fontWeight: "500" }}>
            Released {props.blasterData.released}
          </h3>
        )}
      </div>
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
        }}
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar src={btype} />
          </ListItemAvatar>
          <ListItemText primary={props.blasterData.propulsion} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar src={fps} />
          </ListItemAvatar>
          <ListItemText primary={fpsStr} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar src={darts} />
          </ListItemAvatar>
          <ListItemText primary={halfFull} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <BlasterLinks
            store={props.blasterData.store}
            kit={props.blasterData.kit}
            files={props.blasterData.files}
          />
        </ListItem>
        <ListItem style={{ marginTop: "30px" }}>
          <BlasterActions blasterData={props.blasterData} />
        </ListItem>
      </List>
    </Card>
  );
}

function BlasterLinks(props) {
  return (
    <div className="links">
      {props.store && (
        <a className="link" href={props.store}>
          <Avatar>
            <RedeemIcon />
          </Avatar>
          <Button
            variant="contained"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Store
          </Button>
        </a>
      )}

      {props.kit && (
        <a className="link" href={props.kit}>
          <Avatar>
            <HomeRepairServiceIcon />
          </Avatar>
          <Button
            variant="contained"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Kit
          </Button>
        </a>
      )}

      {props.files && (
        <a className="link" href={props.files}>
          <Avatar>
            <InsertDriveFileIcon />
          </Avatar>
          <Button
            variant="contained"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            Files
          </Button>
        </a>
      )}
    </div>
  );
}
