/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 13 November 2020

   Filename: booking.js
 
******************************************************************************************************
*/

//Import express and the mysqlCon to send queries 
var express = require('express');
var mysqlCon = require('../utils/database');

//Invoke the router method 
var Router = express.Router();

//Variables used to store data from requests 
var destination;
var city;


//Router Level Middleware - Handle HTTP requests 
//POSTing the details for a new booking 
Router.post('/newbooking', function (req, res) {
    //Assign data from the user to variables that will be used in mysql queries 
    destination = req.body.destination;
    city = req.body.city;
    res.send('Data recieved!');
});

//GETing flights for destination chosen by user 
Router.get('/newbooking/flights', function(req, res) {
    mysqlCon.query('SELECT * FROM flights WHERE destination = ?;', [destination], //mySQL query 
    function(err, results){ //Callback functions for error and results
        if (!err) {
            res.send(results);
        } else {
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
        }
    });
});

//GETing hotels for city chosen by user 
Router.get('/newbooking/hotels', function(req, res) {
    mysqlCon.query('SELECT * FROM hotels WHERE city = ?;', [city], //mySQL query 
    function(err, results){ //Callback functions for error and results
        if (!err) {
            res.send(results);
        } else {
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
        }
    });
});

//GETing activities for city chosen by user 
Router.get('/newbooking/activities', function(req, res) {
    mysqlCon.query('SELECT * FROM activities WHERE city = ?;', [city], //mySQL query 
    function(err, results){ //Callback functions for error and results
        if (!err) {
            res.send(results);
        } else {
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
        }
    });
});

//PUT reservation in database 
Router.put('/newbooking/final-flight', function(req, res) {

    //Options chosen by user are stored in variables to be used in query 
    var bookingRef = req.body.booking_ref;
    var bookingDate = req.body.booking_date;
    var userId = req.body.user_id;
    var flightNo = req.body.flight_no;
    var deptDate = req.body.dept_date;
    var travelClass = req.body.travel_class;
    var ticketQty = req.body.ticket_qty;
    var ticketPrice = req.body.ticket_price;
    var currency = 'EUR';
    mysqlCon.query('INSERT INTO flight_booking (booking_ref, booking_date, user_id, flight_no, dept_date, travel_class, ticket_qty, ticket_price, currency) VALUES (?,?,?,?,?,?,?,?,?);', [bookingRef, bookingDate, userId, flightNo, deptDate, travelClass, ticketQty, ticketPrice, currency], //Escaped query values 
    function(err, results){ //Callback functions for error and results
        if (!err) {
            res.send('Data added!');
        } else {
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
        }
    });
});

module.exports = Router;