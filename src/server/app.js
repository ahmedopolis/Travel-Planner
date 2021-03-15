// Load-in env variables
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
  console.log("::: Api keys & username from dotenv file :::");
  const apiPixabayKey = process.env.Pixabay_Api_Key || "No Pixabay API key";
  console.log(`The Pixabay API key is the following: ${apiPixabayKey}`);
  const apiGeoNamesKey = process.env.GeoNames_Username || "No Geonames API key";
  console.log(`The Geonames API key is the following: ${apiGeoNamesKey}`);
  const apiWeatherbitKey =
    process.env.Weatherbit_Api_key || "No Weatherbit API key";
  console.log(`The Geonames API key is the following: ${apiWeatherbitKey}\n`);
}

// Setup empty JS object to act as endpoint for all routes
let travelPlannerData = {};

// Express to run server and routes
const express = require("express");

// Type1: In-memory only datastore (no need to load the database)
let dataStore = require("nedb");

// Start up an instance of app
const app = express();

// External module to use fetch in Node js
const fetch = require("node-fetch");

/* Dependencies & Middleware */
const bodyParser = require("body-parser");
const cors = require("cors");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance for proxy server
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

//Create new database object and load database
/* const database = new dataStore({
  filename: "src/server/traveldatabase.db",
  autoload: true,
});
database.loadDatabase(); */

var moment = require("moment"); // require
moment().format();

// Initialize all route with a callback function
app.get("/apiData", sendTravelData);

// Callback function to complete GET '/all'
function sendTravelData(req, res) {
  res.send(projectData);
}

/* POST ROUTES */

// Post route for geonames

let travelCoordinatesData = {};

app.post("/coordinates", fetchCoordinatesFromGeonames);

function combineGeonamesURL(city) {
  const geonamesBaseURL = "http://api.geonames.org/searchJSON?";
  const localApiGeoNamesKey = process.env.GeoNames_Username;
  return `${geonamesBaseURL}q=${city}&maxRows=1&username=${localApiGeoNamesKey}`;
}

async function fetchCoordinatesFromGeonames(req, res) {
  const userStartCity = encodeURI(req.body.destination);
  const fullGeonamesURL = combineGeonamesURL(userStartCity);
  console.log(
    `::: The concatenated API's URL is the following: ${fullGeonamesURL}. :::`
  );
  getData(fullGeonamesURL)
    .then((data) => {
      travelCoordinatesData = {
        name: data.name,
        country: data.country,
        latitude: data.geonames[0].lat,
        longitude: data.geonames[0].lng,
      };
      /* console.log(
        `::: The latitude and longitude of the destination are respectively: ${travelCoordinatesData}. :::`
      ); */
    })
    .then((newTravelCoordinatesData) => {
      res.send(newTravelCoordinatesData);
    });
}

// Post route for weatherbit

// Find array of dates

function getDates(startDate, endDate) {
  let dateArray = [];
  let currentDate = moment(startDate);
  endDate = moment(endDate);
  while (currentDate <= endDate) {
    dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
}

// Post route for pixabay

async function getImageFromPixabay(countryName) {
  const apiURL = `https://pixabay.com/api/?key=${apiPixabayKey}&q=${countryName}`;
}

/* Function to GET Project Data */
async function getData(url = "") {
  const res = await fetch(url);
  try {
    const Data = await res.json();
    return Data;
  } catch (error) {
    console.error("Error:", error);
  }
}
