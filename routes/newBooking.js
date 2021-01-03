/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 13 November 2020

   Filename: newBooking.js
 
******************************************************************************************************
*/

//Import express and the mysqlCon to send queries 
var express = require('express');
var mysqlCon = require('../utils/database');
var jsonSchema = require('jsonschema').Validator;

//Create instance of validator and add schema 
var validator =  new jsonSchema();
validator.addSchema('./schema.json');
var schema = require('../schema.json');
//Invoke the router method 
var Router = express.Router();

//Variables used to store data from requests 
var destination;
var city;
var userId;
var bookingDate;
var validResult;

//Router Level Middleware - Handle HTTP requests 
//POSTing the details for a new booking 
Router.post('/newbooking', function (req, res) {
    //Assign data from the user to variables that will be used in mysql queries 
    destination = req.body.destination;
    city = req.body.city;
    userId = req.body.userId;
    bookingDate = req.body.bookingDate;
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

    //Validates JSON, store result in varilavle and prints them for testing 
    validResult = validator.validate(req.body, schema);
    console.log(validResult);
    
    //If resulst errors equal to 0 - Continue with the request 
    if(validResult.errors.length <= 0){
        //Options chosen by user are stored in variables to be used in query 
        //var bookingRef = req.body.fBookingRef; This has been set to auto increment in mySQL
        var flightNo = req.body.flightNo;
        var deptDate = req.body.deptDate;
        var travelClass = req.body.travelClass;
        var ticketQty = req.body.fTicketQty;
        var ticketPrice = req.body.fTicketPrice;
        var currency = 'EUR';
        var journey = req.body.journey;

        mysqlCon.query('INSERT INTO flight_booking (booking_date, user_id, flight_no, dept_date, travel_class, ticket_qty, ticket_price, currency, journey) VALUES (?,?,?,?,?,?,?,?,?);', 
        [bookingDate, userId, flightNo, deptDate, travelClass, ticketQty, ticketPrice, currency, journey], //Escaped query values 
        function(err, results){ //Callback functions for error and results
            if (!err) {
                res.send('Data added!');
            } else {
                console.log(err);
                res.send('An error has occurred!'); //Sent error message to user 
            }
        });
    } else {
        console.log('Invalid data');
        res.send('Invalid data has been submitted');
    }
});

//Step 2. Add hotel reservation 
Router.put('/newbooking/final-hotel', function(req, res) {

    //Validates JSON, store result in varilavle and prints them for testing 
    validResult = validator.validate(req.body, schema);
    console.log(validResult);
    
    //If resulst errors equal to 0 - Continue with the request 
    if(validResult.errors.length <= 0){
        //Options chosen by user are stored in variables to be used in query 
        //var bookingRef = req.body.hBookingRef; This has been set to auto increment in mySQL
        var hotelId = req.body.hotelId;
        var checkIn = req.body.deptDate;
        var checkOut = req.body.returnDate;
        var nights = req.body.nights;
        var rooms = req.body.roomQty;
        var totalPrice = req.body.hTotalPrice;
        var currency = 'EUR'

        mysqlCon.query('INSERT INTO hotel_booking (booking_date, user_id, hotel_id, check_in_date, check_out_date, no_nights, room_qty, total_price, currency) VALUES (?,?,?,?,?,?,?,?,?);', 
        [bookingDate, userId, hotelId, checkIn, checkOut, nights, rooms, totalPrice, currency], //Escaped values 
        function(err, results){ //Callback functions for error and results
            if (!err) {
                res.send('Data added!');
            } else {
                console.log(err);
                res.send('An error has occurred!'); //Sent error message to user 
            }
        });
    } else {
        console.log('Invalid data');
        res.send('Invalid data has been submitted');
    }
});

//Step 3. Add activities reservation if any 
Router.put('/newbooking/final-activity', function(req, res) {

    //Validates JSON, store result in varilavle and prints them for testing 
    validResult = validator.validate(req.body, schema);
    console.log(validResult);
    
    //If resulst errors equal to 0 - Continue with the request 
    if(validResult.errors.length <= 0){
        //Options chosen by user are stored in variables to be used in query 
        var activityID = req.body.activityID;
        var activityDate = req.body.activityDate;
        var aTickets = req.body.aTickets;
        var totalPrice = req.body.aTotalPrice;
        var currency = 'EUR'
        var bookingStatus = req.body.bookingStatus;
        var booking = req.body.booking;

        mysqlCon.query('INSERT INTO activity_booking (booking_date, user_id, activity_id, activity_date, ticket_qty, total_price, currency, booking_status, booking) VALUES (?,?,?,?,?,?,?,?,?);', 
        [bookingDate, userId, activityID, activityDate, aTickets, totalPrice, currency, bookingStatus, booking], //Escaped values 
        function(err, results){ //Callback functions for error and results
            if (!err) {
                res.send('Data added!');
            } else {
                console.log(err);
                res.send('An error has occurred!'); //Sent error message to user 
            }
        });
    } else {
        console.log('Invalid data');
        res.send('Invalid data has been submitted');
    }
});

//Step 5. Get booking reference for flight, hotel and activity
Router.post('/newbooking/flightReference', function(req, res){

    var flightNo = req.body.flightNo

    mysqlCon.query('SELECT booking_ref FROM flight_booking WHERE booking_date = ? and user_id = ? and flight_no = ?;', [bookingDate, userId, flightNo], //mySQL query 
    function(err, results){ //Callback functions for error and results
        if (!err) {
            res.send(results);
        } else {
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
        }
    });
});

Router.post('/newbooking/hotelReference', function(req, res){

    var hotelId = req.body.hotelId;

    mysqlCon.query('SELECT hotel_booking_ref FROM hotel_booking WHERE booking_date = ? and user_id = ? and hotel_id = ?;', [bookingDate, userId, hotelId], //mySQL query 
    function(err, results){ //Callback functions for error and results
        if (!err) {
            res.send(results);
        } else {
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
        }
    });


});

Router.post('/newbooking/activityReference', function(req, res){

    var activityId = req.body.activityID;

    mysqlCon.query('SELECT activity_booking_ref FROM activity_booking WHERE booking_date = ? and user_id = ? and activity_id = ?;', [bookingDate, userId, activityId], //mySQL query 
    function(err, results){ //Callback functions for error and results
        if (!err) {
            res.send(results);
        } else {
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
        }
    });


});

//Step 6. Add final booking
Router.put('/newbooking/final-booking', function(req, res) {

    //Validates JSON, store result in varilavle and prints them for testing 
    validResult = validator.validate(req.body, schema);
    console.log(validResult);
    
    //If resulst errors equal to 0 - Continue with the request 
    if(validResult.errors.length <= 0){
        //Options chosen by user are stored in variables to be used in query 
        var deptFlight = req.body.deptFlight;
        var returnFlight = req.body.returnFlight;
        var hotel = req.body.hotel;
        var activityOne = req.body.activityOne;
        var activityTwo = req.body.activityTwo;

        mysqlCon.query('INSERT INTO bookings (user_id, destination, dept_flight_booking, return_flight_booking, hotel_booking, activity_booking_one, activity_booking_two) VALUES (?,?,?,?,?,?,?);', 
        [userId, destination, deptFlight, returnFlight, hotel, activityOne, activityTwo], //Escaped values 
        function(err, results){ //Callback functions for error and results
            if (!err) {
                res.send('Data added!');
            } else {
                console.log(err);
                res.send('An error has occurred!'); //Sent error message to user 
            }
        });
    } else {
        console.log('Invalid data');
        res.send('Invalid data has been submitted');
    }
});

//Step 7. Get final booking reference 
Router.post('/newbooking/final-booking', function(req, res){

    var deptFlight = req.body.deptFlight;

    mysqlCon.query('SELECT booking_ref FROM bookings WHERE user_id = ? and destination = ? and dept_flight_booking = ?;', [userId, destination, deptFlight], //mySQL query 
    function(err, results){ //Callback functions for error and results
        if (!err) {
            res.send(results);
        } else {
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
        }
    });
});

module.exports = Router;