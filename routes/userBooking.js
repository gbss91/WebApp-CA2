/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 10 November 2020

   Filename: userBooking.js
 
******************************************************************************************************
*/
//Import express and the mysqlCon to send queries 
var express = require('express');
var mysqlCon = require('../utils/database');

//Invoke the router method 
var Router = express.Router();

//Variables used to store data from requests 
var userID;
var bookingRef;
var activityBookingRef;
var hotelBookingRef;
var flightBookingRef;

//POSTing user ID
Router.post('/user', function (req, res) {
    //Assign data from the user to variables that will be used in mysql queries 
    userID = req.body.userID;
    res.send('User ID recieved!');
});

//POSTing User Details by User ID
Router.post('/queries/userDetails', function (req, res) {
   mysqlCon.query('SELECT user_id, full_name, first_name, last_name, phone, email, bookings FROM users WHERE user_id = ?;', [userID], //mySQL query 
   function(err, results, fields){ //Callback functions for error, result and fields
      if(!err) {
			res.send(results);
		} else {;
         console.log(err);
         res.send('An error has occurred!'); //Sent error message to user 
		}
   });  
});

//POSTing Full Booking Info by User ID
Router.post('/queries/fullBookingInfo', function (req, res) {
    mysqlCon.query('SELECT booking_ref, user_id, destination, dept_flight_booking, return_flight_booking, hotel_booking, activity_booking_one, activity_booking_two FROM bookings WHERE user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });  
});

//POSTing Flight Booking Info by User ID
Router.post('/queries/flightBookingInfo', function (req, res) {
    mysqlCon.query('SELECT booking_ref, booking_date, user_id, flight_no, dept_date, travel_class, ticket_qty, ticket_price, total_price, currency FROM flight_booking WHERE user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

//GETing Hotel Booking Info by User ID
Router.post('/queries/hotelBookingInfo', function (req, res) {
    mysqlCon.query('SELECT hotel_booking_ref, booking_date, user_id, hotel_id, check_in_date, check_out_date, no_nights, room_qty, price_net, vat, total_price, currency FROM hotel_booking WHERE user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });    
});

//GETing Activity Booking Info by User ID
Router.post('/queries/activityBookingInfo', function (req, res) {
    mysqlCon.query('SELECT activity_booking_ref, booking_date, user_id, activity_id, activity_date, ticket_qty, price_net, vat, total_price, currency, booking_status FROM activity_booking WHERE user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });    
});

//POSTing the details for a new booking 
Router.post('/deleteFlightBooking', function (req, res) {
    //Assign data from the user to variables that will be used in mysql queries 
    flightBookingRef = req.body.flightBookingRef;
    res.send('Data recieved!');
});

//DELETE Flight Booking by user id & flight booking reference sent by client to variables
//STEP 1 - Set flight booking reference in the bookings table to null
Router.post('/queries/deleteFlightBookingOne', function (req, res) {
    mysqlCon.query('UPDATE bookings SET dept_flight_booking = null WHERE dept_flight_booking = ? AND user_id = ?;',[flightBookingRef,userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 2 - Delete the Flight Booking from the flight_booking table
Router.post('/queries/deleteFlightBookingTwo', function (req, res) {
    mysqlCon.query('DELETE FROM flight_booking WHERE booking_ref = ? AND user_id = ?;',[flightBookingRef,userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

//POSTing the details to delete hotel booking 
Router.post('/deleteHotelBooking', function (req, res) {
    //Assign data from the user to variables that will be used in mysql queries 
    hotelBookingRef = req.body.hotelBookingRef;
    res.send('Data recieved!');
});

//DELETE Hotel Booking by user id & flight booking reference sent by client to variables
//STEP 1 - Set hotel booking reference in the bookings table to null
Router.post('/queries/deleteHotelBookingOne', function (req, res) {
    mysqlCon.query('UPDATE bookings SET hotel_booking = null WHERE hotel_booking = ? AND user_id = ?;',[hotelBookingRef,userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 2 - Delete the hotel booking from the hotel_booking table
Router.post('/queries/deleteHotelBookingTwo', function (req, res) {
    mysqlCon.query('DELETE FROM hotel_booking WHERE hotel_booking_ref = ? AND user_id = ?;',[hotelBookingRef,userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

//POSTing the details to delete activity booking 
Router.post('/deleteActivityBooking', function (req, res) {
    //Assign data from the user to variables that will be used in mysql queries 
    activityBookingRef = req.body.activityBookingRef;
    res.send('Data recieved!');
});

//DELETE Activity Booking by user id & flight booking reference sent by client to variables
//STEP 1 - Set activity booking reference in the bookings table to null
Router.post('/queries/deleteActivityBookingOne', function (req, res) {
    mysqlCon.query('UPDATE bookings SET activity_booking_one = null WHERE activity_booking_one = ? AND user_id = ?;',[activityBookingRef,userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 2 - Delete the activity booking from the activity_booking table
Router.post('/queries/deleteActivityBookingTwo', function (req, res) {
    mysqlCon.query('DELETE FROM activity_booking WHERE activity_booking_ref = ? AND user_id = ?;',[activityBookingRef,userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

//POSTing the details to delete activity booking 
Router.post('/deleteBooking', function (req, res) {
    //Assign data from the user to variables that will be used in mysql queries 
    bookingRef = req.body.bookingRef;
    res.send('Data recieved!');
});

//POST - (Delete Booking) Assign user id / booking reference sent by client to variables - You can GET response and send it to the client
//STEP 1 - Set booking reference in the bookings table to null
Router.post('/queries/deleteBookingOne', function (req, res) {
    mysqlCon.query('UPDATE users SET bookings = null WHERE bookings = ? AND user_id = ?;',[bookingRef,userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 2 - Delete the booking from the bookings table
Router.post('/queries/deleteBookingTwo', function (req, res) {
    mysqlCon.query('DELETE FROM bookings WHERE booking_ref = ? AND user_id = ?;',[bookingRef,userID],  //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

module.exports = Router;