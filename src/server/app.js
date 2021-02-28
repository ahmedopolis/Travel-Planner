// Load-in env variables
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

// Setup empty JS object to act as endpoint for all routes
let travelPlannerData = {};

// Express to run server and routes
const express = require("express");

// Module to enable request via hyper text transfer protocol
const http = require("http");

// Type1: In-memory only datastore (no need to load the database)
var dataStore = require("nedb");

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
const database = new dataStore({
  filename: "src/server/traveldatabase.db",
  autoload: true,
});
database.loadDatabase();

// Initialize all route with a callback function
app.get("/apiData", sendTravelData);

// Callback function to complete GET '/all'
function sendTravelData(req, res) {
  res.send(projectData);
}

/* POST ROUTES */

// Post route for geonames

// Post route for weatherbit

// Post route for pixabay

// Post route for skyscanner
/* fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/referral/v1.0/%7Bcountry%7D/%7Bcurrency%7D/%7Blocale%7D/%7Boriginplace%7D/%7Bdestinationplace%7D/%7Boutboundpartialdate%7D/%7Binboundpartialdate%7D?shortapikey=ra66933236979928&apiKey=%7Bshortapikey%7D", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "7c6d439b1amshb536815fbe5b02fp1ab6b6jsn8384a821f581",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
}); */

// Post route for Hotels
/* fetch("https://hotels4.p.rapidapi.com/locations/search?query=new%20york&locale=en_US", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "7c6d439b1amshb536815fbe5b02fp1ab6b6jsn8384a821f581",
		"x-rapidapi-host": "hotels4.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
}); */
