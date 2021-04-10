// Load-in env variables
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

// Response for mockAPI
const mockApiRes = require("./mockAPI");

// Setup empty JS object to act as endpoint for all routes
let travelPlannerData = {};
let travelCoordinatesData = {};
let travelWeatherData = {};
let travelPictureData = {};
let userData = {};

// Express to run server and routes
const express = require("express");

// HTTP assertions https://www.npmjs.com/package/supertest
const request = require("supertest");

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
const database = new dataStore({
  filename: "src/server/traveldatabase.db",
  autoload: true,
});
database.loadDatabase();

let moment = require("moment"); // require
const { encode } = require("punycode");
moment().format();

/* GET ROUTES */

// Initialize all route with a callback function
app.get("/apiData", sendTravelData);

// Callback function to complete GET '/all'
function sendTravelData(req, res) {
  travelPlannerData = {
    userData: userData,
    travelCoordinatesData: travelCoordinatesData,
    travelWeatherData: travelWeatherData,
    travelPictureData: travelPictureData,
  };
  database.insert(travelPlannerData);
  console.log(travelPlannerData);
  res.status(200).send(travelPlannerData);
}

//  GET function for Test
app.get("/Test", sendTestData);

// Callback function to complete GET '/Test'
function sendTestData(req, res) {
  res.status(200).send(mockApiRes);
}

/* POST ROUTES */

// Post route for geoNames

app.post("/coordinates", fetchCoordinatesFromGeoNames);

function combineGeoNamesURL(city) {
  const apiGeoNamesKey = process.env.GeoNames_Username || "No GeoNames API key";
  console.log(`The GeoNames API key is the following: ${apiGeoNamesKey}`);
  const geoNamesBaseURL = "http://api.geoNames.org/searchJSON?";
  const localApiGeoNamesKey = apiGeoNamesKey;
  return `${geoNamesBaseURL}q=${city}&maxRows=1&username=${localApiGeoNamesKey}`;
}

//Function to print travel data
function printGeoNamesProjectData(projectData) {
  console.log("::: geoNames Data Requested Loaded :::");
  console.log(`Name -> ${projectData.name}.`);
  console.log(`Country -> ${projectData.country}.`);
  console.log(`Latitude -> ${projectData.latitude}.`);
  console.log(`longitude-> ${projectData.longitude}.`);
}

//Function to generate an array of date strings based on a given range of dates
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

//Function to compute length of date array
function tripLength(dateArray) {
  return dateArray.length;
}

async function fetchCoordinatesFromGeoNames(req, res) {
  const currentDate = req.body.currentDate;
  const destination = req.body.destination;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const notes = req.body.notes;
  const arrayDatesForDurationTrip = getDates(startDate, endDate);
  const durationTrip = tripLength(arrayDatesForDurationTrip);
  const arrayDatesCountdown = getDates(currentDate, startDate);
  const countdown = tripLength(arrayDatesCountdown);
  userData = {
    currentDate: currentDate,
    destination: destination,
    startDate: startDate,
    endDate: endDate,
    countdown: countdown,
    durationTrip: durationTrip,
    arrayDatesForDurationTrip: arrayDatesForDurationTrip,
    notes: notes,
  };
  console.log(userData);
  const userStartCity = encodeURI(destination);
  const fullGeoNamesURL = combineGeoNamesURL(userStartCity);
  console.log(
    `::: The concatenated API's URL is the following: ${fullGeoNamesURL}. :::`
  );
  getData(fullGeoNamesURL).then((data) => {
    console.log(data);
    travelCoordinatesData = {
      STATUS: "Success",
      name: data.geonames[0].name,
      country: data.geonames[0].countryName,
      latitude: data.geonames[0].lat,
      longitude: data.geonames[0].lng,
    };
    printGeoNamesProjectData(travelCoordinatesData);
    res.status(200).send(travelCoordinatesData);
  });
}

// Post route for weatherbit

app.post("/weatherData", fetchWeatherbitData);

function combineWeatherbitURL(latitude, longitude, durationTrip) {
  const apiWeatherbitKey =
    process.env.Weatherbit_Api_key || "No Weatherbit API key";
  console.log(`The Weatherbit API key is the following: ${apiWeatherbitKey}\n`);
  const weatherbitBaseURL = "https://api.weatherbit.io/v2.0/forecast/daily";
  const localApiWeatherbitKey = apiWeatherbitKey;
  return `${weatherbitBaseURL}?&lat=${latitude}&lon=${longitude}&days=${durationTrip}&key=${localApiWeatherbitKey}`;
}

async function fetchWeatherbitData(req, res) {
  const localLatitude = travelCoordinatesData.latitude;
  console.log(localLatitude);
  const localLongitude = travelCoordinatesData.longitude;
  console.log(localLongitude);
  localDurationTrip = userData.durationTrip;
  const fullWeatherbitURL = combineWeatherbitURL(
    localLatitude,
    localLongitude,
    localDurationTrip
  );
  console.log(
    `::: The concatenated API's URL is the following: ${fullWeatherbitURL}. :::`
  );
  getData(fullWeatherbitURL).then((data) => {
    travelWeatherData = {
      STATUS: "Success",
      weatherData: data,
    };
    res.status(200).send(travelWeatherData);
    console.log(travelWeatherData);
  });
}

// Post route for Pixabay

app.post("/picturesData", fetchImagesFromPixabay);

function combinePixabayPictureURL(geographyTerm) {
  console.log("::: Api keys & username from dotenv file :::");
  const apiPixabayKey = process.env.Pixabay_Api_Key || "No Pixabay API key";
  console.log(`The Pixabay API key is the following: ${apiPixabayKey}`);
  const pixabayBaseURL = "https://pixabay.com/api/?";
  const localApiPixabayKey = apiPixabayKey;
  return `${pixabayBaseURL}key=${localApiPixabayKey}&q=${geographyTerm}&image_type=photo&orientation=horizontal&per_page=3&pretty=true`;
}

async function fetchImagesFromPixabay(req, res) {
  const cityName = travelCoordinatesData.name;
  const countryName = travelCoordinatesData.country;
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
    let pictureURL = "";
    if (newCityPicturesData.totalHits > 0) {
      pictureURL = newCityPicturesData.hits[0].webformatURL;
      travelPictureData = {
        picture: pictureURL,
      };
      res.status(200).send(travelPictureData);
      console.log(`::: One or more City images were found. :::`);
      console.log(newCityPicturesData);
      console.log(pictureURL);
    } else if (newCityPicturesData.totalHits < 0) {
      getData(fullCountryPictureAPI).then((newCountryPicturesData) => {
        if (newCountryPicturesData.totalHits > 0) {
          pictureURL = newCountryPicturesData.hits[0].webformatURL;
          travelPictureData = {
            picture: pictureURL,
          };
          res.status(200).send(travelPictureData);
          console.log(`::: One or more Country images were found. :::`);
          console.log(newCountryPicturesData);
          console.log(pictureURL);
        } else {
          console.log(`::: No Image was found. :::`);
        }
      });
    } else {
      console.log(`::: No Image was found. :::`);
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

// Export 'app.js'
module.exports = app;
