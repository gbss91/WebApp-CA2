/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 10 November 2020

   Filename: server.js

   Supporting Files: 
   - database.js
******************************************************************************************************
*/

//Import node.js packages
var express = require('express'); //Express framework 
var mysql = require('mysql'); 
var bodyParser = require('body-parser'); //Parse data from client 
var path = require('path');
var cors = require('cors');

//Import router files
var userBookingRouter = require('./routes/userBooking'); 
var newBookingRouter = require('./routes/newBooking'); 

//Create express app 
var app = express();

//1. GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors()); // Access-Control-Allow-Origin *

//Serving static content in public directory (HTML, CSS, JS and Images)
app.use(express.static(path.join(__dirname, 'public')));

//Body parserer to read data
app.use(bodyParser.json());

//2. ROUTES - Pass the router files 
app.use(newBookingRouter);
app.use(userBookingRouter);

//3.Server listens on port 4000
app.listen(4000); 
