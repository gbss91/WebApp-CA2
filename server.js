/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 10 November 2020

   Filename: server.js
******************************************************************************************************
*/

//Import node.js packages
var express = require('express'); //Express framework 
var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');

//Import router files
var queryRouter = require('./routes/queries'); //This is where we execute the queries 

//Create express app 
var app = express();

//1. GLOBAL MIDDLEWARES
//Serving static content in public file
app.use(express.static(path.join(__dirname, 'public')));

//Body parserer to read data
app.use(bodyParser.json());

//2. ROUTES - Pass the router files 
app.use(queryRouter);gm

//3.Server listens on port 4000
app.listen(4000); 

