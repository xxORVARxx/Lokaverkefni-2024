"use strict";
// Accessing the Server with browser connected to the local network:
// http://192.168.1.54:3000
const http = require('http');
const express = require('express');
const app = express();
const hostname = '192.168.1.54'; //'localhost';
const port = 3000;
// Specify the directory containing your HTML file:
const path = require('path');
const publicPath = path.join(__dirname, 'public');

// Fetch requests.
// Serve static files only for requests that don't start with '/':
app.use((req, res, next) => {
  if (req.path.startsWith('/')) {
    return express.static(publicPath)(req, res, next);
  }
  next();
});
// Define the response for the fetch request
// only triggered for root path '/':
app.get('/data', (req, res) => {
  // Make request to fetch PLC data here.
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // Simulation data to send frontend:
  res.end( '' + Math.floor(Math.random() * 256 ));
});

const server = http.createServer(app);
// Serve static files from the 'public/' directory:
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
