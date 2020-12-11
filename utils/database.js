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

//Create connection with database - Use the credentials for our database 
var mysqlCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'HolidayBookingSystem',
    password: '*****',
    multipleStatements: true,
});

//Connects to database and show a message if connection is successful 
mysqlCon.connect(function(err) {
    if(!err) {
        console.log('Connected to database!');
    } else {
        console.log(err);
    } 
});

//Export the connection method to use it in the queries file. This allows to have the connection in one file and the queries in other 
module.exports = mysqlCon;