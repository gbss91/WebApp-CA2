/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 10 November 2020

   Filename: script.js

   Supporting Files: 
   - index.html
   - script.js
******************************************************************************************************
*/


$('#aOverview').click(function(){
    $('.bRow').removeClass('menu-active');
    $('.oRow').addClass('menu-active'); 

    
});

$('#aBookings').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.bRow').addClass('menu-active'); 
});


var fullname;
var email;
var phone; 

$(document).ready(function() {
    $.ajax({
        url: 'http://localhost:4000/queries',
        type: 'POST',
        data: {'user_id':'101'},
        dataType: "json",
        success: function (data) {
            console.log(data);
            
            //Parse the data from the server into object
            obj = JSON.parse(data);
            //Assign property of object to variable
            fullname = obj.full_name;
            //Update name in profile page 

        },
    });
});

$('#overview-img').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries',
        type: 'GET',
        dataType: "json",
        success: function (data) {
            console.log(data);
        },
    });
});

