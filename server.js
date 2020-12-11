/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 10 November 2020

   Filename: server.js
******************************************************************************************************
*/

//Import node.js packages and files
var express = require('express'); //Express framework 
var mysql = require('mysql');
var bodyParser = require('body-parser');
var queryDB = require('./routes/queries'); //This is where we execute the queries 

//Create express app 
var app = express();
//Parse data in the HTTP request 
app.use(bodyParser.json());
//Pass the queries file 
app.use(queryDB);

//Server listens on port 4000
app.listen(4000); //This is simlar the node.js htttp.server

