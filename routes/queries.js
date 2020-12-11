/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 10 November 2020

   Filename: queries.js
 
******************************************************************************************************
*/
//Import express and the mysqlCon to send queries 
var express = require('express');
var mysqlCon = require('../utils/database');

//Invoke the router method 
var Router = express.Router();

//GET all users using Router method and a middleware function 
Router.get('/queries', function(req, res) {
    mysqlCon.query('SELECT * FROM users;', //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(err) throw err; //If error
        res.send(results); //Send results back 
    });
});

module.exports = Router;