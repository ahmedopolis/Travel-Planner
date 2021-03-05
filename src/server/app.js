// Load-in env variables
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
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

// Initialize all route with a callback function
app.get("/apiData", sendTravelData);

// Callback function to complete GET '/all'
function sendTravelData(req, res) {
  res.send(projectData);
}

/* POST ROUTES */

fucntion fetchENVData(){
  const apiPixabayKey = process.env.Pixabay_Api_Key || "No Pixabay API key";
  const apiGeoNamesKey = process.env. || "No Pixabay API key"
  console.log(`The Pixabay API key is the following: ${apiKey}`);
}

// Post route for geonames

// Post route for weatherbit

// Post route for pixabay

async function getImageFromPixabay(countryName) {
  
  const apiURL = `https://pixabay.com/api/?key=${apiKey}&q=${countryName}`;
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
