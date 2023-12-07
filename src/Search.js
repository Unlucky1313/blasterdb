import React from "react";
import { useState, useEffect } from "react";
import "instantsearch.css/themes/satellite.css";
import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { SearchClient as TypesenseSearchClient } from "typesense";

import Card from "@mui/material/Card";
import { storage } from "./useFirebase";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import Link from "@mui/material/Link";
import BlasterActions from "./BlasterActions";
import BlasterLinks from "./BlasterLinks";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Pagination from "@mui/material/Pagination";

var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export default function Search(props) {
  // const searchClient = algoliasearch(
  //   process.env.REACT_APP_ALGOLIA_APP_ID,
  //   process.env.REACT_APP_ALGOLIA_SEARCH_KEY
  // );

  // const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  //   server: {
  //     apiKey: process.env.REACT_APP_TYPESENSE_SEARCH_KEY, // Be sure to use the search-only-api-key
  //     nodes: [
  //       {
  //         host: process.env.REACT_APP_TYPESENSE_NODE,
  //         port: 443,
  //         protocol: "https"
  //       }
  //     ]
  //   },

  //   // The following parameters are directly passed to Typesense's search API endpoint.
  //   //  So you can pass any parameters supported by the search endpoint below.
  //   //  queryBy is required.
  //   additionalSearchParameters: {
  //     query_by: "blasterName"
  //   }
  // });
  // const searchClient = typesenseInstantsearchAdapter.searchClient;

  const [searchList, setSearchList] = useState([]);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParameters, setSearchParameters] = useState({
    q: "*",
    query_by: "blasterName,creator,shortDesc,propulsion,rof",
    sort_by: "released:desc",
    per_page: 20,
    infix: "always",
    filterArray: {
      propulsion: [],
      rof: [],
      feed: [],
      construction: [],
      diff: [],
      ammo: [],
      avalibility: [],
    },
    page: 1
  });

  useEffect(() => {
    let client = new TypesenseSearchClient({
      nodes: [
        {
          host: process.env.REACT_APP_TYPESENSE_NODE, // For Typesense Cloud use xxx.a1.typesense.net
          port: "443", // For Typesense Cloud use 443
          protocol: "https", // For Typesense Cloud use https
        },
      ],
      apiKey: process.env.REACT_APP_TYPESENSE_SEARCH_KEY,
      connectionTimeoutSeconds: 2,
    });

    client
      .collections("blasters")
      .documents()
      .search(searchParameters)
      .then(({ hits, found }) => {
        setSearchList(hits);
        setPages(Math.ceil(found / 20));
        console.log(Math.ceil(found / 20));
      });
  }, [searchParameters]);

  const pageChange = (event, value) => {
    setPage(value);
    console.log(page);
    let updatedValue = { page: value };
    setSearchParameters((searchParameters) => ({
      ...searchParameters,
      ...updatedValue,
    }));
  };

  const searchChange = (event) => {
    console.log(event.target.value);
    let updatedValue = { q: event.target.value };
    setSearchParameters((searchParameters) => ({
      ...searchParameters,
      ...updatedValue,
    }));
  };

  const sortChange = (event) => {
    console.log(event.target.value);
    let updatedValue = { sort_by: event.target.value };
    setSearchParameters((searchParameters) => ({
      ...searchParameters,
      ...updatedValue,
    }));
    console.log(searchParameters);
  };

  const checkboxChange = (event) => {
    var filterString = "";
    var filterArray = searchParameters.filterArray;
    var filterKey = event.target.value.includes("ammo")
      ? "ammo"
      : event.target.value.split(":")[0];

    if (event.target.value.includes("Bool")) {
      filterKey = "avalibility";
    }

    // If Checked add to array
    if (event.target.checked) {
      filterArray[filterKey].push(event.target.value);
    }

    // If not Checked remove from array
    else {
      const index = filterArray[filterKey].indexOf(event.target.value);
      if (index > -1) {
        // only splice array when item is found
        filterArray[filterKey].splice(index, 1); // 2nd parameter means remove one item only
      }
    }

    // Loop through array of arrays to add each to filters
    Object.keys(filterArray).forEach((key) => {
      console.log(key, filterArray[key]);
      if (filterArray[key].length !== 0) {
        // Parentheses to begin type of filters
        filterString = filterString + "(";

        // Loop though filter type and add each
        filterArray[key].forEach((filter) => {
          filterString += filter + "||";
        });

        // Remove the last "||" and add &&
        filterString =
          filterString.substring(0, filterString.length - 2) + ")&&";
      }
    });

    // Remove the last "&&"
    filterString = filterString.substring(0, filterString.length - 2);

    // Update main parameter object
    let updatedValue = {
      filter_by: filterString,
      filterArray: filterArray,
    };
    setSearchParameters((searchParameters) => ({
      ...searchParameters,
      ...updatedValue,
    }));
  };

  return (
    <Card
      className="searchHolder"
      sx={{ margin: "24px 36px", display: "flex", flexDirection: "row" }}
    >
      <Card className="searchBox">
        <TextField
          id="outlined-required"
          label="Search for Blasters"
          onChange={searchChange}
          name="shortDesc"
          inputProps={{ maxLength: 40 }}
        />

        <div className="sortContainer">
          <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
          <Select
            label="Age"
            onChange={sortChange}
            defaultValue="blasterName:asc"
          >
            <MenuItem value={"blasterName:asc"}>Name</MenuItem>
            <MenuItem value={"fpsLow:asc"}>Min Fps</MenuItem>
            <MenuItem value={"fpsHigh:desc"}>Max Fps</MenuItem>
            <MenuItem value={"released:desc"}>Release Date</MenuItem>
          </Select>
        </div>

        <Divider />

        <h3 style={{ marginBottom: "0px" }}>Propulsion:</h3>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"propulsion:Springer"}
                className="searchCheckbox"
              />
            }
            label="Springer"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"propulsion:Flywheeler"}
                className="searchCheckbox"
              />
            }
            label="Flywheeler"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"propulsion:Stringer"}
                className="searchCheckbox"
              />
            }
            label="Stringer"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"propulsion:HPA"}
                className="searchCheckbox"
              />
            }
            label="HPA"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"propulsion:LPA"}
                className="searchCheckbox"
              />
            }
            label="LPA"
          />
        </FormGroup>

        <h3 style={{ marginBottom: "0px" }}>Rate of Fire:</h3>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"rof:Prime to Fire"}
                className="searchCheckbox"
              />
            }
            label="Prime to Fire"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"rof:Slamfire"}
                className="searchCheckbox"
              />
            }
            label="Slamfire"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"rof:Semi Auto"}
                className="searchCheckbox"
              />
            }
            label="Semi Auto"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"rof:Full Auto"}
                className="searchCheckbox"
              />
            }
            label="Full Auto"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"rof:Select Fire"}
                className="searchCheckbox"
              />
            }
            label="Select Fire"
          />
        </FormGroup>

        <h3 style={{ marginBottom: "0px" }}>Feed Type:</h3>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"feed:Magazine"}
                className="searchCheckbox"
              />
            }
            label="Magazine"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"feed:Cylinder"}
                className="searchCheckbox"
              />
            }
            label="Cylinder"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"feed:Internal Clip"}
                className="searchCheckbox"
              />
            }
            label="Internal Clip"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"feed:Hopper"}
                className="searchCheckbox"
              />
            }
            label="Hopper"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"feed:Front Load"}
                className="searchCheckbox"
              />
            }
            label="Front Load"
          />
        </FormGroup>

        <h3 style={{ marginBottom: "0px" }}>Construction Type:</h3>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"construction:3D Printed"}
                className="searchCheckbox"
              />
            }
            label="3D Printed"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"construction:Injection Molded"}
                className="searchCheckbox"
              />
            }
            label="Injection Molded"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"construction:Metal"}
                className="searchCheckbox"
              />
            }
            label="Metal"
          />
        </FormGroup>

        <h3 style={{ marginBottom: "0px" }}>Difficulty of Build:</h3>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"diff:No Build Needed"}
                className="searchCheckbox"
              />
            }
            label="No Build Needed"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"diff:Very Easy"}
                className="searchCheckbox"
              />
            }
            label="Very Easy"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"diff:Easy"}
                className="searchCheckbox"
              />
            }
            label="Easy"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"diff:Medium"}
                className="searchCheckbox"
              />
            }
            label="Medium"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"diff:Difficult"}
                className="searchCheckbox"
              />
            }
            label="Difficult"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"diff:Very Difficult"}
                className="searchCheckbox"
              />
            }
            label="Very Difficult"
          />
        </FormGroup>

        <h3 style={{ marginBottom: "0px" }}>Ammo Types:</h3>
        <FormGroup>
          <div style={{ display: "flex" }}>
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={checkboxChange}
                    value={"ammo.half:true"}
                    className="searchCheckbox"
                  />
                }
                label="Half Darts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={checkboxChange}
                    value={"ammo.full:true"}
                    className="searchCheckbox"
                  />
                }
                label="Full Darts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={checkboxChange}
                    value={"ammo.rival:true"}
                    className="searchCheckbox"
                  />
                }
                label="Rival"
              />
            </div>

            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={checkboxChange}
                    value={"ammo.mega:true"}
                    className="searchCheckbox"
                  />
                }
                label="Mega Darts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={checkboxChange}
                    value={"ammo.megaXL:true"}
                    className="searchCheckbox"
                  />
                }
                label="MegaXL Darts"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={checkboxChange}
                    value={"ammo.rockets:true"}
                    className="searchCheckbox"
                  />
                }
                label="Rockets"
              />
            </div>
          </div>
        </FormGroup>

        <h3 style={{ marginBottom: "0px" }}>Avalibility:</h3>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"storeBool:true"}
                className="searchCheckbox"
              />
            }
            label="Store"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"kitBool:true"}
                className="searchCheckbox"
              />
            }
            label="Kit"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={checkboxChange}
                value={"filesBool:true"}
                className="searchCheckbox"
              />
            }
            label="Files"
          />
        </FormGroup>
      </Card>

      <div style={{ width: "100%" }}>
        <div className="searchHitsHolder">
          {searchList.map((obj) => (
            <BlasterDetail blaster={obj.document} key={obj.document.id} />
          ))}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination count={pages} page={page} onChange={pageChange} />
          </div>
        </div>
      </div>
      {/* </InstantSearch> */}
    </Card>
  );
}

function BlasterDetail({ blaster }) {
  const [blasterHero, setBlasterHero] = useState();

  // console.log(hit);

  useEffect(() => {
    const getData = async () => {
      const resizedRef = storageRef(
        storage,
        `images/${blaster.imageArray[0]}_256x144`
      );
      getDownloadURL(resizedRef).then((url) => {
        setBlasterHero(url);
      });
    };
    getData();
  });

  const blasterURL = "./blaster?blaster=" + blaster.id;

  var fpsStr = "";
  if (blaster.fpsLow) {
    fpsStr += blaster.fpsLow;
  }
  if (blaster.fpsHigh && blaster.fpsHigh !== blaster.fpsLow) {
    fpsStr += "-" + blaster.fpsHigh;
  }
  fpsStr += " FPS";

  return (
    <Card className="detailGrid">
      <a href={blasterURL}>
        <img
          style={{
            width: "128px",
            marginTop: "4px",
            aspectRatio: "16/9",
            objectFit: "cover",
            gridColumn: "image",
          }}
          src={blasterHero}
          alt="Blaster"
        />
      </a>
      <Link href={blasterURL} underline="hover" color="black">
        <h2
          style={{
            marginLeft: "12px",
            marginBottom: "0px",
            gridColumn: "name",
            marginTop: "6px",
          }}
        >
          {blaster.blasterName}
        </h2>
        <h4
          style={{
            marginLeft: "12px",
            marginTop: "4px",
            marginBottom: "0px",
            gridColumn: "name",
          }}
        >
          {blaster.shortDesc}
        </h4>
      </Link>

      <h3
        style={{ marginLeft: "12px", gridColumn: "creator", paddingTop: "5px" }}
      >
        {blaster.creator}
      </h3>

      <h5
        style={{
          marginLeft: "12px",
          gridColumn: "propulsion",
          textAlign: "center",
          paddingTop: "5px",
        }}
      >
        {blaster.propulsion}
      </h5>

      <h5
        style={{
          marginLeft: "12px",
          gridColumn: "fps",
          textAlign: "center",
          paddingTop: "5px",
        }}
      >
        {fpsStr}
      </h5>

      <BlasterLinks hit={blaster}></BlasterLinks>

      <div
        style={{ gridColumn: "actions", display: "flex", alignItems: "center" }}
      >
        <BlasterActions blasterData={blaster} />
      </div>
    </Card>
  );
}
