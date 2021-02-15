// Load-in env variables
if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require("express");

// Module to enable request via hyper text transfer protocol
const http = require("http");

// HTTP request logger middleware for node.js
const morgan = require("morgan");
