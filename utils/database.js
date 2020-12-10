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
    password: 'Huacas-SQ-19',
    multipleStatements: true,
});

//Show message if connection is succesfull or there is an error 
mysqlCon.connect(function(err) {
    if(!err) {
        console.log(`Connection to database failed: ${err}`);
    } else {
        console.log('Connected to database!');
    } 
});

//We export the connection to use it in the queries file. This allows to have the connection in one file and the queries in other 
module.exports = mysqlCon;