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

var userID;

//POSTing an user - Use express router method and middleware funtion
Router.post('/user', function (req, res) {
    userID = req.body.user_id;
    console.log(req.body);
    res.send("User added!");
});

//GETing user - Use express router method and middleware funtion
Router.get('/user', function(req, res) {
    mysqlCon.query('SELECT full_name, phone, email FROM users WHERE user_id = ?', //mySQL query 
    [userID],
    function(err, results){ //Callback functions for error and results
        if(err) throw err; //If error
        res.send(results); //Send results back 
    });
});

module.exports = Router;