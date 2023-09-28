import "./App.css";

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import RedeemIcon from "@mui/icons-material/Redeem";

export default function BlasterLinks(props) {

  var storePriceData = "";
  var kitPriceData = "";
  var filesPriceData = "";

  if (props.hit.storePrice === 0 || props.hit.storePrice === "0") { storePriceData = "Free" } else { storePriceData = "$" + props.hit.storePrice }
  if (props.hit.kitPrice === 0 || props.hit.kitPrice === "0") { kitPriceData = "Free" } else { kitPriceData = "$" + props.hit.kitPrice }
  if (props.hit.filesPrice === 0 || props.hit.filesPrice === "0") { filesPriceData = "Free" } else { filesPriceData = "$" + props.hit.filesPrice }

  return (<div style={{
    gridColumn: "links",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }}>

    {props.hit.store ? <Tooltip title={<h2 style={{
      margin: "0px"
    }}>{storePriceData}</h2>} placement="bottom" TransitionComponent={Zoom}>
      <Link href={props.hit.store}>
        <Avatar sx={{
          width: 30,
          height: 30,
          bgcolor: "#3064ad",
          margin: "4px"
        }}>
          <RedeemIcon sx={{
            width: "22px"
          }} />
        </Avatar>
      </Link>
    </Tooltip> : ""}

    {props.hit.kit ? <Tooltip title={<h2 style={{
      margin: "0px"
    }}>{kitPriceData}</h2>} placement="bottom" TransitionComponent={Zoom}>
      <Link href={props.hit.kit}>
        <Avatar sx={{
          width: 30,
          height: 30,
          bgcolor: "#3064ad",
          margin: "4px"
        }}>
          <HomeRepairServiceIcon sx={{
            width: "22px"
          }} />
        </Avatar>
      </Link>
    </Tooltip> : ""}

    {props.hit.files ? <Tooltip title={<h2 style={{
      margin: "0px"
    }}>{filesPriceData}</h2>} placement="bottom" TransitionComponent={Zoom}>
      <Link href={props.hit.files}>
        <Avatar sx={{
          width: 30,
          height: 30,
          bgcolor: "#3064ad",
          margin: "4px"
        }}>
          <InsertDriveFileIcon sx={{
            width: "22px"
          }} />
        </Avatar>
      </Link>
    </Tooltip> : ""}

  </div>);
}