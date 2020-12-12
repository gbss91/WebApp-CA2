/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 10 November 2020

   Filename: queries.js
 
******************************************************************************************************
*/
//Import express and the mysqlCon to send queries 
const { request } = require('express');
var express = require('express');
var mysqlCon = require('../utils/database');

//Invoke the router method 
var Router = express.Router();

var userID;

//POST - Assign user id sent by client to variable - You can GET response and send it to the client
/*Router.post('/queries', function (req, res) {
    userID = req.body;
    console.log(userID);
    mysqlCon.query(`SELECT full_name, phone, email FROM users WHERE user_id = 101;`, //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(err) throw err; //If error
        res.send(results); //Send results back 
    });
    
});*/


//POST - Assign user id sent by client to variable - You can GET response and send it to the client
Router.post('/queries', function (req, res) {
    userID = req.body;
    console.log(userID);
    mysqlCon.query(`SELECT full_name FROM users WHERE user_id = 101;`, //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(err) throw err; //If error
        res.send(results); //Send results back 
    });
    
});

//POSTing an user - Use express router method and middleware funtion
Router.post('/user', function (req, res) {
    userID = req.body.user_id;
    res.send("User added!");
});

//GETing user - Use express router method and middleware funtion
Router.get('/user', function(req, res) {
    mysqlCon.query(`SELECT full_name, phone, email FROM users WHERE user_id = ${userID};`, //mySQL query 
    function(err, results){ //Callback functions for error and results
        if(err) throw err; //If error
        res.send(results); //Send results back 
    });
});

module.exports = Router;