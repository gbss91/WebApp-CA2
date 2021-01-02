/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 30 December 2020

   Filename: script.js

   Supporting Files: 
   - index.html
   - login.html
   - loginStyle.css
******************************************************************************************************
*/

var userId;
var validation = false;

var login = {
    userID: 0,
    email: ''
}

//1. Function to validate if users exist 
function loginValidation() {

    login.userID = parseInt($('#uID').val());
    login.email = $('#email').val();

    $.ajax({
        url: 'http://83.212.127.26/login', //Path 
        type: 'POST', 
        data: JSON.stringify(login), //Convert login object to JSON
        dataType: 'json', //Type recieved from server
        contentType: 'application/json', //Type of data sent to the server 
        success: function(data){ //If there is a match, set validation to true
            //Result is array of object. If not empty validation = true
            if(data.length > 0){
                validation = true;
            }
        } 
    });
    
}

//2. Login button function 
$('#log').click(function(){

    //a. Call validaton function
    loginValidation();

    //b. Add user to localStorage to be used elsewhere if validation = true
    if(validation){
        localStorage.setItem('userId', `${userId}`);
    } else {
        alert('No user found');
    } 
})

