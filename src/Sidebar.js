import "./App.css";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import RedeemIcon from "@mui/icons-material/Redeem";
import BlasterActions from "./BlasterActions";

import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";

export default function Sidebar(props) {

  return (
    <Card className="sidebar">
      <h1 style={{ textAlign: "center", marginBottom: "4px" }}>{props.blasterData.blasterName}</h1>
      <h3 style={{ textAlign: "center", margin: "0px" }}>{props.blasterData.shortDesc}</h3>
      <div style={{ paddingLeft: "24px" }}>
        <h3 style={{ marginBottom: "0px" }}>By: {props.blasterData.creator}</h3>
        {props.blasterData.released && (
          <h3 style={{ margin: "0px 0px 0px 0px", fontWeight: "500" }}>
            Released {props.blasterData.released.toLocaleDateString('en-US')}
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5 style={{ margin: "0px 0px 0px 0px", fontWeight: "500" }}>Propulsion:</h5>
            <h3 style={{ margin: "0px 0px 0px 12px" }}>{props.blasterData.propulsion}</h3>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5 style={{ margin: "0px 0px 0px 0px", fontWeight: "500" }}>Rate of Fire:</h5>
            <h3 style={{ margin: "0px 0px 0px 12px" }}>{props.blasterData.rof}</h3>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5 style={{ margin: "0px 0px 0px 0px", fontWeight: "500" }}>Feed Type:</h5>
            <h3 style={{ margin: "0px 0px 0px 12px" }}>{props.blasterData.feed}</h3>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5 style={{ margin: "0px 0px 0px 0px", fontWeight: "500" }}>Construction Type:</h5>
            <h3 style={{ margin: "0px 0px 0px 12px" }}>{props.blasterData.construction}</h3>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5 style={{ margin: "0px 0px 0px 0px", fontWeight: "500" }}>Difficulty of Build:</h5>
            <h3 style={{ margin: "0px 0px 0px 12px" }}>{props.blasterData.diff}</h3>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <div style={{ display: "flex" }}></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h5 style={{ margin: "0px 0px 0px 0px", fontWeight: "500" }}>Min FPS:</h5>
            <h3 style={{ margin: "0px 0px 0px 12px" }}>{props.blasterData.fpsLow}</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: "10%" }}>
            <h5 style={{ margin: "0px 0px 0px 0px", fontWeight: "500" }}>Max FPS:</h5>
            <h3 style={{ margin: "0px 0px 0px 12px" }}>{props.blasterData.fpsHigh}</h3>
          </div>
        </ListItem>
        <Divider variant="inset" component="li" />

        <FormControl
          sx={{ m: 3, marginTop: 0, marginLeft: "16px", width: "90%" }}
          component="fieldset"
          variant="standard"
        >
          <h5 style={{ margin: "4px 0px 0px 0px", fontWeight: "500" }}>Ammo Type:</h5>
          <FormGroup>
            <Grid container direction="row" alignItems="flex-start" sx={{ paddingLeft: "24px" }}>
              <Grid item xs={6} sx={{ width: "50%" }}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.blasterData.ammo ? props.blasterData.ammo.half : ""}
                          name="half"
                          sx={{ padding: "4px" }}
                        />
                      }

                      label={<h5 style={{ fontSize: "13px", fontWeight: 500, margin: "0px" }}>Half Length Darts</h5>}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.blasterData.ammo ? props.blasterData.ammo.full : ""}
                          name="full"
                          sx={{ padding: "4px" }}
                        />
                      }
                      label={<h5 style={{ fontSize: "13px", fontWeight: 500, margin: "0px" }}>Full Length Darts</h5>}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.blasterData.ammo ? props.blasterData.ammo.rival : ""}
                          name="rival"
                          sx={{ padding: "4px" }}
                        />
                      }
                      label={<h5 style={{ fontSize: "13px", fontWeight: 500, margin: "0px" }}>Rival</h5>}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.blasterData.ammo ? props.blasterData.ammo.mega : ""}
                          name="mega"
                          sx={{ padding: "4px" }}
                        />
                      }
                      label={<h5 style={{ fontSize: "13px", fontWeight: 500, margin: "0px" }}>Mega Darts</h5>}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.blasterData.ammo ? props.blasterData.ammo.megaXL : ""}
                          name="megaXL"
                          sx={{ padding: "4px" }}
                        />
                      }
                      label={<h5 style={{ fontSize: "13px", fontWeight: 500, margin: "0px" }}>MegaXL Darts</h5>}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={props.blasterData.ammo ? props.blasterData.ammo.rockets : ""}
                          name="rockets"
                          sx={{ padding: "4px" }}
                        />
                      }
                      label={<h5 style={{ fontSize: "13px", fontWeight: 500, margin: "0px" }}>Rockets</h5>}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </FormGroup>
        </FormControl>
        <Divider variant="inset" component="li" />
        <ListItem>
          <BlasterLinks
            blasterData={props.blasterData}
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

  var storePriceData = "";
  var kitPriceData = "";
  var filesPriceData = "";

  if (props.blasterData.storePrice === 0 || props.blasterData.storePrice === "0") { storePriceData = "Free" } else { storePriceData = "$" + props.blasterData.storePrice }
  if (props.blasterData.kitPrice === 0 || props.blasterData.kitPrice === "0") { kitPriceData = "Free" } else { kitPriceData = "$" + props.blasterData.kitPrice }
  if (props.blasterData.filesPrice === 0 || props.blasterData.filesPrice === "0") { filesPriceData = "Free" } else { filesPriceData = "$" + props.blasterData.filesPrice }

  return (
    <div className="links">
      {props.blasterData.store && (
        <Button
          variant="contained"
          style={{ textAlign: "center", fontWeight: "bold", padding: "4px 12px 4px 12px", width: "30%", height: "50px" }}
          href={props.blasterData.store}
        >
          <Avatar sx={{ bgcolor: "#ffffff", margin: "0px 8px 0px 8px", position:"absolute", left:"0px" }}>
            <RedeemIcon color="primary" />
          </Avatar>
          <div style={{ textAlign: "right", position:"absolute", right:"12px" }}>
            Store
            <br />
            <p style={{fontSize: "12px", margin:"0px"}}>{storePriceData}</p>
          </div>
        </Button>
      )}

      {props.blasterData.kit && (
        <Button
          variant="contained"
          style={{ textAlign: "center", fontWeight: "bold", padding: "4px 12px 4px 12px", width: "30%", height: "50px" }}
          href={props.blasterData.kit}
        >
          <Avatar sx={{ bgcolor: "#ffffff", margin: "0px 8px 0px 8px", position:"absolute", left:"0px" }}>
            <HomeRepairServiceIcon color="primary" />
          </Avatar>
          <div style={{ textAlign: "right", position:"absolute", right:"12px" }}>
            Kit
            <br />
            <p style={{fontSize: "12px", margin:"0px"}}>{kitPriceData}</p>
          </div>
        </Button>
      )}

      {props.blasterData.files && (
        <Button
          variant="contained"
          style={{ textAlign: "center", fontWeight: "bold", padding: "4px 12px 4px 12px", width: "30%", height: "50px" }}
          href={props.blasterData.files}
        >
          <Avatar sx={{ bgcolor: "#ffffff", margin: "0px 8px 0px 8px", position:"absolute", left:"0px" }}>
            <InsertDriveFileIcon color="primary" />
          </Avatar>
          <div style={{ textAlign: "right", position:"absolute", right:"12px" }}>
            Files
            <br />
            <p style={{fontSize: "12px", margin:"0px"}}>{filesPriceData}</p>
          </div>
        </Button>
      )}
    </div>
  );
}
