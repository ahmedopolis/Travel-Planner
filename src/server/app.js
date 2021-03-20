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

// Connect the bundled folder
app.use(express.static("dist"));

//Create new database object and load database
/* const database = new dataStore({
  filename: "src/server/traveldatabase.db",
  autoload: true,
});
database.loadDatabase(); */

let moment = require("moment"); // require
const { encode } = require("node:punycode");
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
  const localApiGeoNamesKey = apiGeoNamesKey;
  return `${geonamesBaseURL}q=${city}&maxRows=1&username=${localApiGeoNamesKey}`;
}

//Function to print travel data
function printGeonamesProjectData(projectData) {
  console.log("::: Geonames Data Requested Loaded :::");
  console.log(`Name -> ${projectData.name}.`);
  console.log(`Country -> ${projectData.country}.`);
  console.log(`Latitude -> ${projectData.latitude}.`);
  console.log(`longitude-> ${projectData.longitude}.`);
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
      printGeonamesProjectData(travelCoordinatesData);
    })
    .then((newTravelCoordinatesData) => {
      res.send(newTravelCoordinatesData);
    });
}

// Post route for weatherbit

let travelWeatherData = {};

app.post("/weatherData", fetchCoordinatesFromWeatherbit);

function combineWeatherbitURL(latitude, longitude, durationTrip) {
  const weatherbitBaseURL = "https://api.weatherbit.io/v2.0/forecast/daily";
  const localApiWeatherbitKey = apiWeatherbitKey;
  return `${weatherbitBaseURL}?&lat=${latitude}&lon=${longitude}&days=${durationTrip}&key=${localApiWeatherbitKey}`;
}

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

function tripLength(dateArray) {
  return dateArray.length;
}

async function fetchCoordinatesFromWeatherbit(req, res) {
  const localLatitude = req.body.latitude;
  const localLongitude = req.body.longitude;
  const localStartDate = req.body.startDate;
  const localEndDate = req.body.endDate;
  const arrayDates = getDates(localStartDate, localEndDate);
  const durationTrip = tripLength(arrayDates);
  const fullWeatherbitURL = combineWeatherbitURL(
    localLatitude,
    localLongitude,
    durationTrip
  );
  console.log(
    `::: The concatenated API's URL is the following: ${fullWeatherbitURL}. :::`
  );
  getData(fullWeatherbitURL)
    .then((data) => {
      travelWeatherData = data;
    })
    .then((newTravelWeatherData) => {
      res.send(newTravelWeatherData);
    });
}

// Post route for pixabay

let travelPicturesData = {};

app.post("/picturesData", fetchCoordinatesFromPixabay);

function combinePixabayPictureURL(geographyTerm) {
  const pixabayBaseURL = "https://pixabay.com/api/?";
  const localApiPixabayKey = apiPixabayKey;
  return `${pixabayBaseURL}key=${localApiPixabayKey}&q=${geographyTerm}&image_type=photo&orientation=horizontal&per_page=3&pretty=true`;
}

async function getImageFromPixabay(cityName, countryName) {
  const cityName = encodeURI(req.body.city);
  const countryName = encodeURI(req.body.country);
  const cityNameModified = cityName.replace("%20", "+");
  const countryNameModified = countryName.replace("%20", "+");
  const fullCityPictureAPI = combinePixabayPictureURL(cityNameModified);
  const fullCountryPictureAPI = combinePixabayPictureURL(countryNameModified);
  console.log(
    `::: The concatenated API's URL for the city pictures is the following: ${fullCityPictureAPI}. :::`
  );
  console.log(
    `::: The concatenated API's URL for the country pictures is the following: ${fullCountryPictureAPI}. :::`
  );
  getData(fullCityPictureAPI).then((newCityPicturesData) => {
    if (newCityPicturesData.totalHits > 0) {
      res.send(newCityPicturesData);
      console.log("No image was found by Pixabay.");
    } else {
      getData(fullCountryPictureAPI).then((newCountryPicturesData) => {
        res.send(newCountryPicturesData);
      });
    }
  });
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
