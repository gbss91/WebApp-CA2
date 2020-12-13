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

//Add and remove background color for menu options in profile page 
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

var user = {
    user_id: 101,
    fullname: 'John Smith'
};

$('#aOverview').click(function() {
    $.ajax({
        url: 'http://localhost:4000/user',
        type: 'POST',
        body: JSON.stringify(user),
        dataType: 'JSON',
        success: function (textStatus) {
            console.log(textStatus);
        }
    });
});

$('#overview-img').click(function() {
    $.ajax({
        url: 'http://localhost:4000/user',
        type: 'GET',
        dataType: 'JSON',
        success: function (data) {
            //Print results in console 
            console.log(data);
           
            //Assign property of object to variable
            fullname = data[0].full_name;
            email = data[0].email;
            phone = data[0].phone;
            //Update name in profile page 
            $('#hello').html(`Hello, ${fullname}`);
            $('#overview-name p').html(fullname);
            $('#overview-email p').html(email);
            $('#overview-phone p').html(phone);
        }
    });
});

