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
var firstName;
var lastName;
var userId;
var email;
var phone;
var fullName;

//POSTing user ID
Router.post('/user', function (req, res) {
    //Assign data from the user to variables that will be used in mysql queries 
    userID = req.body.userID;
    res.send('User ID recieved!');
});

//POSTing the details for a new booking 
Router.post('/updateUserDetails', function (req, res) {
    //Assign data from the user to variables that will be used in mysql queries 
    firstName = req.body.firstName;
    lastName = req.body.lastName;
	fullName = req.body.fullName;
    userId = req.body.userId;
    email = req.body.email;
    phone = req.body.phone;
    res.send('Data recieved!');
});

//UPDATE USER DETAILS using updated user details input by user & user ID
//STEP 1 - Update User First Name
Router.post('/updateFirstName', function (req, res) {
    mysqlCon.query('UPDATE users SET first_name = ? WHERE user_id = ?;',[firstName,userId], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 2 - Update User Last Name
Router.post('/updateLastName', function (req, res) {
    mysqlCon.query('UPDATE users SET last_name = ? WHERE user_id = ?;',[lastName,userId], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 3 - Update user full name
Router.post('/updateFullName', function (req, res) {
    mysqlCon.query('UPDATE users SET full_name = ? WHERE user_id = ?;',[fullName,userId], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 4 - Update user email
Router.post('/updateEmail', function (req, res) {
    mysqlCon.query('UPDATE users SET email = ? WHERE user_id = ?;',[email,userId], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 5 - Update user phone
Router.post('/updatePhone', function (req, res) {
    mysqlCon.query('UPDATE users SET phone = ? WHERE user_id = ?;',[phone,userId], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
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

//POSTing Departure Flight Booking Info by User ID
Router.post('/queries/deptFlightBookingInfo', function (req, res) {
    mysqlCon.query('SELECT booking_ref, booking_date, user_id, flight_no, dept_date, travel_class, ticket_qty, ticket_price, total_price, currency FROM flight_booking WHERE journey="Departure" AND user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

//POSTing Return Flight Booking Info by User ID
Router.post('/queries/returnFlightBookingInfo', function (req, res) {
    mysqlCon.query('SELECT booking_ref, booking_date, user_id, flight_no, dept_date, travel_class, ticket_qty, ticket_price, total_price, currency FROM flight_booking WHERE journey="Return" AND user_id = ?;',[userID], //mySQL query 
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
    mysqlCon.query('SELECT hotel_booking_ref, booking_date, user_id, hotel_id, check_in_date, check_out_date, no_nights, room_qty, total_price, currency FROM hotel_booking WHERE user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });    
});

//GETing Primary Activity Booking Info by User ID
Router.post('/queries/primaryActivityBookingInfo', function (req, res) {
    mysqlCon.query('SELECT activity_booking_ref, booking_date, user_id, activity_id, activity_date, ticket_qty, total_price, currency, booking_status FROM activity_booking WHERE booking = "Primary" AND user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });    
});

//GETing Secondary Activity Booking Info by User ID
Router.post('/queries/secondaryActivityBookingInfo', function (req, res) {
    mysqlCon.query('SELECT activity_booking_ref, booking_date, user_id, activity_id, activity_date, ticket_qty, total_price, currency, booking_status FROM activity_booking WHERE booking = "Secondary" AND user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });    
});

//DELETE Flight Booking by user id sent by client to variables
//STEP 1 - Set departure flight booking reference in the bookings table to null
Router.post('/queries/deleteDeptFlightBookingOne', function (req, res) {
    mysqlCon.query('UPDATE bookings SET dept_flight_booking = null WHERE user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 2 - Delete the departure Flight Booking from the flight_booking table
Router.post('/queries/deleteDeptFlightBookingTwo', function (req, res) {
    mysqlCon.query('DELETE FROM flight_booking WHERE journey = "Departure" AND user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

//STEP 1 - Set return flight booking reference in the bookings table to null
Router.post('/queries/deleteReturnFlightBookingOne', function (req, res) {
    mysqlCon.query('UPDATE bookings SET return_flight_booking = null WHERE user_id = ?',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 2 - Delete the return Flight Booking from the flight_booking table
Router.post('/queries/deleteReturnFlightBookingTwo', function (req, res) {
    mysqlCon.query('DELETE FROM flight_booking WHERE journey = "Return" AND user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

//DELETE Hotel Booking by user id sent by client to variables
//STEP 1 - Set hotel booking reference in the bookings table to null
Router.post('/queries/deleteHotelBookingOne', function (req, res) {
    mysqlCon.query('UPDATE bookings SET hotel_booking = null WHERE user_id = ?;',[userID], //mySQL query 
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
    mysqlCon.query('DELETE FROM hotel_booking WHERE user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

//DELETE Primary Activity Booking by user id sent by client to variables
//STEP 1 - Set primary activity booking reference in the bookings table to null
Router.post('/queries/deletePrimaryActivityBookingOne', function (req, res) {
    mysqlCon.query('UPDATE bookings SET activity_booking_one = null WHERE user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 2 - Delete the primary activity booking from the activity_booking table
Router.post('/queries/deletePrimaryActivityBookingTwo', function (req, res) {
    mysqlCon.query('DELETE FROM activity_booking WHERE booking = "Primary" AND user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

//DELETE Secondary Activity Booking Two by user id sent by client to variables
//STEP 1 - Set secondary activity booking reference in the bookings table to null
Router.post('/queries/deleteSecondaryActivityBookingOne', function (req, res) {
    mysqlCon.query('UPDATE bookings SET activity_booking_two = null WHERE user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});
//STEP 2 - Delete the secondary activity booking from the activity_booking table
Router.post('/queries/deleteSecondaryActivityBookingTwo', function (req, res) {
    mysqlCon.query('DELETE FROM activity_booking WHERE booking = "Secondary" AND user_id = ?;',[userID], //mySQL query 
    function(err, results, fields){ //Callback functions for error, result and fields
        if(!err) {
			res.send(results);
		} else {;
            console.log(err);
            res.send('An error has occurred!'); //Sent error message to user 
		}
    });
});

//DELETE - (Delete Booking) Assign user id / booking reference sent by client to variables
//STEP 1 - Set booking reference in the bookings table to null
Router.post('/queries/deleteBookingOne', function (req, res) {
    mysqlCon.query('UPDATE users SET bookings = null WHERE user_id = ?;',[userID], //mySQL query 
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
    mysqlCon.query('DELETE FROM bookings WHERE user_id = ?;',[userID],  //mySQL query 
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