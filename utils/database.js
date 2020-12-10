/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 10 November 2020

   Filename: database.js
 
******************************************************************************************************
*/

//Import mysql 
var mysql = require('mysql');

//Create connection with database 
var mysqlCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HolidayBookingSystem',
    password: 'Your password',
    multipleStatements: true,
});

//Show message if connection is succesfull or there is an error 
mysqlCon.connect(function(err) {
    if(!err) {
        console.log('Connected to database!');
        var q = 'INSERT INTO users (full_name, first_name, last_name, phone, email, bookings) VALUES  ("John Scott", "John", "Scott", "353876547", "johnSc@email.com", "B103");';
        mysqlCon.query(q, function(err, result) {
            if (err) throw err;
            console.log('movie added');
        });
    } else {
        console.log(err);
    } 
});

//We export the connection to use it in the queries file. This allows to have the connection in one file and the queries in other 
module.exports = mysqlCon;