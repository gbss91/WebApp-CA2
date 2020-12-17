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

//GETing outbound flights for destination chosen by user 
Router.get('/newbooking/outbound', function(req, res) {
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

//GETing inbound flight from destination chosen by user 
Router.get('/newbooking/inbound', function(req, res) {
    mysqlCon.query('SELECT * FROM flights WHERE origin = ? and destination = "DUB";', [destination], //mySQL query 
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
//Step 1. Add the flight reservation 
Router.put('/newbooking/final-flight', function(req, res) {
    //Options chosen by user are stored in variables to be used in query 
    //var bookingRef = req.body.fBookingRef; This has been set to auto increment in mySQL
    var bookingDate = req.body.bookingDate;
    var userId = req.body.userId;
    var flightNo = req.body.flightNo;
    var deptDate = req.body.deptDate;
    var travelClass = req.body.travelClass;
    var ticketQty = req.body.fTicketQty;
    var ticketPrice = req.body.fTicketPrice;
    var currency = 'EUR';
    var journey = req.body.journey;

    mysqlCon.query('INSERT INTO flight_booking (booking_ref, booking_date, user_id, flight_no, dept_date, travel_class, ticket_qty, ticket_price, currency) VALUES (?,?,?,?,?,?,?,?,?);', 
    [bookingDate, userId, flightNo, deptDate, travelClass, ticketQty, ticketPrice, currency, journey], //Escaped query values 
    function(err, results){ //Callback functions for error and results
        if (!err) {
            res.send('Data added!');
        } else {
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
        }
    });
});

//Step 2. Add hotel reservation 
Router.put('/newbooking/final-hotel', function(req, res) {
    //Options chosen by user are stored in variables to be used in query 
    //var bookingRef = req.body.hBookingRef; This has been set to auto increment in mySQL
    var bookingDate = req.body.bookingDate;
    var userId = req.body.userId;
    var hotelId = req.body.hotelId;
    var checkIn = req.body.deptDate;
    var checkOut = req.body.returnDate;
    var nights = req.body.nights;
    var rooms = req.body.roomQty;
    var totalPrice = req.body.hTotalPrice;
    var currency = 'EUR'



    mysqlCon.query('INSERT INTO hotel_booking (hotel_booking_ref, booking_date, user_id, hotel_id, check_in_date, check_out_date, no_nights, room_qty, total_price, currency) VALUES (?,?,?,?,?,?,?,?,?,?);', 
    [bookingRef, bookingDate, userId, hotelId, checkIn, checkOut, nights, rooms, totalPrice, currency], //Escaped values 
    function(err, results){ //Callback functions for error and results
        if (!err) {
            res.send('Data added!');
        } else {
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
        }
    });
});

//Step 3. Add activities reservation if any 
Router.put('/newbooking/final-activity', function(req, res) {
    //Options chosen by user are stored in variables to be used in query 
    var bookingRef = req.body.aBookingRef;
    var bookingDate = req.body.bookingDate;
    var userId = req.body.userId;
    var activityID = req.body.activityID;
    var activityDate = req.body.activityDate;
    var aTickets = req.body.aTickets;
    var totalPrice = req.body.aTotalPrice;
    var currency = 'EUR'
    var bookingStatus = req.body.bookingStatus;


    mysqlCon.query('INSERT INTO activity_booking (activity_booking_ref, booking_date, user_id, activity_id, activity_date, ticket_qty, total_price, currency, booking_status) VALUES (?,?,?,?,?,?,?,?,?);', 
    [bookingRef, bookingDate, userId, activityID, activityDate, aTickets, totalPrice, currency, bookingStatus], //Escaped values 
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