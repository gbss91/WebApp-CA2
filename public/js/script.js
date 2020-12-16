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
    $('.oRow').addClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

$('#aBookings').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').addClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

$('#aDeptFlightBooking').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').addClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

$('#aReturnFlightBooking').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').addClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

$('#aHotelBooking').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').addClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

$('#aActivityBookingOne').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').addClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

$('#aActivityBookingTwo').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').addClass('menu-active'); 
});

//Add and remove main content sections in profile page based on button clicked
$('#aOverview').click(function(){
    $('.oSection').addClass('display');
    $('.aSection').removeClass('display');
    $('.bSection').removeClass('display');
    $('.cSection').removeClass('display');
    $('.dSection').removeClass('display');
    $('.eSection').removeClass('display');
    $('.fSection').removeClass('display');
	$('.oSection').removeClass('hide');
	$('.aSection').addClass('hide');
	$('.bSection').addClass('hide');
	$('.cSection').addClass('hide');
	$('.dSection').addClass('hide');
	$('.eSection').addClass('hide');
	$('.fSection').addClass('hide');
});

$('#aBookings').click(function(){
    $('.oSection').removeClass('display');
    $('.aSection').addClass('display');
    $('.bSection').removeClass('display');
    $('.cSection').removeClass('display');
    $('.dSection').removeClass('display');
    $('.eSection').removeClass('display');
    $('.fSection').removeClass('display');
	$('.oSection').addClass('hide');	
	$('.aSection').removeClass('hide');
	$('.bSection').addClass('hide');
	$('.cSection').addClass('hide');
	$('.dSection').addClass('hide');
	$('.eSection').addClass('hide');
	$('.fSection').addClass('hide');
});

$('#aDeptFlightBooking').click(function(){
    $('.oSection').removeClass('display');
    $('.aSection').removeClass('display');
    $('.bSection').addClass('display');
    $('.cSection').removeClass('display');
    $('.dSection').removeClass('display');
    $('.eSection').removeClass('display');
    $('.fSection').removeClass('display');
	$('.oSection').addClass('hide');	
	$('.aSection').addClass('hide');
	$('.bSection').removeClass('hide');
	$('.cSection').addClass('hide');
	$('.dSection').addClass('hide');
	$('.eSection').addClass('hide');
	$('.fSection').addClass('hide');
});

$('#aReturnFlightBooking').click(function(){
    $('.oSection').removeClass('display');
    $('.aSection').removeClass('display');
    $('.bSection').removeClass('display');
    $('.cSection').addClass('display');
    $('.dSection').removeClass('display');
    $('.eSection').removeClass('display');
    $('.fSection').removeClass('display');
	$('.oSection').addClass('hide');	
	$('.aSection').addClass('hide');
	$('.bSection').addClass('hide');
	$('.cSection').removeClass('hide');
	$('.dSection').addClass('hide');
	$('.eSection').addClass('hide');
	$('.fSection').addClass('hide');
});

$('#aHotelBooking').click(function(){
    $('.oSection').removeClass('display');
    $('.aSection').removeClass('display');
    $('.bSection').removeClass('display');
    $('.cSection').removeClass('display');
    $('.dSection').addClass('display');
    $('.eSection').removeClass('display');
    $('.fSection').removeClass('display');
	$('.oSection').addClass('hide');	
	$('.aSection').addClass('hide');
	$('.bSection').addClass('hide');
	$('.cSection').addClass('hide');
	$('.dSection').removeClass('hide');
	$('.eSection').addClass('hide');
	$('.fSection').addClass('hide');
});

$('#aActivityBookingOne').click(function(){
    $('.oSection').removeClass('display');
    $('.aSection').removeClass('display');
    $('.bSection').removeClass('display');
    $('.cSection').removeClass('display');
    $('.dSection').removeClass('display');
    $('.eSection').addClass('display');
    $('.fSection').removeClass('display');
	$('.oSection').addClass('hide');	
	$('.aSection').addClass('hide');
	$('.bSection').addClass('hide');
	$('.cSection').addClass('hide');
	$('.dSection').addClass('hide');
	$('.eSection').removeClass('hide');
	$('.fSection').addClass('hide');
});

$('#aActivityBookingTwo').click(function(){
    $('.oSection').removeClass('display');
    $('.aSection').removeClass('display');
    $('.bSection').removeClass('display');
    $('.cSection').removeClass('display');
    $('.dSection').removeClass('display');
    $('.eSection').removeClass('display');
    $('.fSection').removeClass('display');
	$('.oSection').addClass('hide');	
	$('.aSection').addClass('hide');
	$('.bSection').addClass('hide');
	$('.cSection').addClass('hide');
	$('.dSection').addClass('hide');
	$('.eSection').addClass('hide');
	$('.fSection').removeClass('hide');
});

//user ID
var user = {
    userID: 102,
};

//user information
var fullname;
var email;
var phone;

//booking information
var bookingRef;
var destination; 
var deptFlightBooking;
var returnFlightBooking;
var hotelBooking;
var activityBookingOne;
var activityBookingTwo;

//departure flight booking information
var deptFlightBookingRef;
var deptFlightBookingDate;
var deptFligthDate;
var deptFlightNo;
var deptFligthTravelClass;
var deptFligthTicketQty;
var deptFligthTicketPrice;
var deptFligthTotalPrice;
var deptFligthCurrency;

//return flight booking information
var returnFlightBookingRef;
var returnFlightBookingDate;
var returnFlightNo;
var returnFlightDate;
var returnFlightTravelClass;
var returnFlightTicketQty;
var returnFlightTicketPrice;
var returnFlightTotalPrice;
var returnFlightCurrency;

//hotel booking information
var hotelBookingRef;
var hotelBookingDate;
var hotelBookingHotelID;
var hotelBookingCheckIn;
var hotelBookingCheckOut;
var hotelBookingNoNights;
var hotelBookingRoomQty;
var hotelBookingTotalPrice;
var hotelBookingCurrency;

//activity booking one information
var activityBookingOneBookingRef;
var activityBookingOneBookingDate;
var activityBookingOneActivityID;
var activityBookingOneActivityDate;
var activityBookingOneTicketQty;
var activityBookingOneTotalPrice;
var activityBookingOneCurrency;
var activityBookingOneBookingStatus;

//activity booking two information
var activityBookingTwoBookingRef;
var activityBookingTwoBookingDate;
var activityBookingTwoActivityID;
var activityBookingTwoActivityDate;
var activityBookingTwoTicketQty;
var activityBookingTwoTotalPrice;
var activityBookingTwoCurrency;
var activityBookingTwoBookingStatus;

//get user ID & display on page
$('#aOverview').click(function() {
    $.ajax({
        url: 'http://localhost:4000/user', //Path 
        type: 'POST', 
        data: JSON.stringify(user), //Convert object to JSON
        contentType: 'application/json', //Type of data sent to the server 
        success: function(data){ //A function to be called if the request succeeds. Returns response from server  
            console.log(data);
        } 
    });
    $.ajax({
        url: 'http://localhost:4000/queries/userDetails',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
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

//get and display main booking details for user ID
$('#aBookings').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries/fullBookingInfo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
           
            //Assign property of object to variable
            bookingRef = data[0].booking_ref;
            userID = data[0].user_id;
            destination = data[0].destination;
            deptFlightBooking = data[0].dept_flight_booking;
            returnFlightBooking = data[0].return_flight_booking;
            hotelBooking = data[0].hotel_booking;
            activityBookingOne = data[0].activity_booking_one;
            activityBookingTwo = data[0].activity_booking_two;
            //Update name in profile page 
            $('#bookings-bookingRef p').html(bookingRef);
            $('#bookings-userId p').html(userID);
            $('#bookings-destination p').html(destination);
            $('#bookings-deptFlightBooking p').html(deptFlightBooking);
            $('#bookings-returnFlightBooking p').html(returnFlightBooking);
            $('#bookings-hotelBooking p').html(hotelBooking);
            $('#bookings-activityBookingOne p').html(activityBookingOne);
            $('#bookings-activityBookingTwo p').html(activityBookingTwo);
        }
    });
});

//get and display departure flight booking details for user ID
$('#aDeptFlightBooking').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries/flightBookingInfo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
           
            //Assign property of object to variable
            deptFlightBookingRef = data[0].booking_ref;
            deptFlightBookingDate = data[0].booking_date;
            userID = data[0].user_id;
            deptFligthDate = data[0].flight_no;
            deptDate = data[0].dept_date;
            deptFligthTravelClass = data[0].travel_class;
            deptFligthTicketQty = data[0].ticket_qty;
            deptFligthTicketPrice = data[0].ticket_price;
            deptFligthTotalPrice = data[0].total_price;
            deptFligthCurrency = data[0].currency;
            //Update dept flight booking details on page
            $('#deptFlightBooking-bookingRef p').html(deptFlightBookingRef);
            $('#deptFlightBooking-bookingDate p').html(deptFlightBookingDate);
            $('#deptFlightBooking-userId p').html(userID);
            $('#deptFlightBooking-flightNo p').html(deptFligthDate);
            $('#deptFlightBooking-deptDate p').html(deptDate);
            $('#deptFlightBooking-travelClass p').html(deptFligthTravelClass);
            $('#deptFlightBooking-ticketQty p').html(deptFligthTicketQty);
            $('#deptFlightBooking-ticketPrice p').html(deptFligthTicketPrice);
            $('#deptFlightBooking-totalPrice p').html(deptFligthTotalPrice);
            $('#deptFlightBooking-currency p').html(deptFligthCurrency);
        }
    });
});

//get and display return flight booking details for user ID
$('#aReturnFlightBooking').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries/flightBookingInfo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
           
            //Assign property of object to variable
            returnFlightBookingRef = data[1].booking_ref;
            returnFlightBookingDate = data[1].booking_date;
            userID = data[1].user_id;
            returnFlightNo = data[1].flight_no;
            returnFlightDate = data[1].dept_date;
            returnFlightTravelClass = data[1].travel_class;
            returnFlightTicketQty = data[1].ticket_qty;
            returnFlightTicketPrice = data[1].ticket_price;
            returnFlightTotalPrice = data[1].total_price;
            returnFlightCurrency = data[1].currency;
            //Update name in profile page
            $('#returnFlightBookings-flightBookingRef p').html(returnFlightBookingRef);
            $('#returnFlightBookings-bookingDate p').html(returnFlightBookingDate);
            $('#returnFlightBookings-userId p').html(userID);
            $('#returnFlightBookings-flightNo p').html(returnFlightNo);
            $('#returnFlightBookings-deptDate p').html(returnFlightDate);
            $('#returnFlightBookings-travelClass p').html(returnFlightTravelClass);
            $('#returnFlightBookings-ticketQty p').html(returnFlightTicketQty);
            $('#returnFlightBookings-ticketPrice p').html(returnFlightTicketPrice);
            $('#returnFlightBookings-totalPrice p').html(returnFlightTotalPrice);
            $('#returnFlightBookings-currency p').html(returnFlightCurrency);
        }
    });
});

//get and display hotel booking details for user ID
$('#aHotelBooking').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries/hotelBookingInfo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
           
            //Assign property of object to variable
            hotelBookingRef = data[0].hotel_booking_ref;
            hotelBookingDate = data[0].booking_date;
            userID = data[0].user_id;
            hotelBookingHotelID = data[0].hotel_id;
            hotelBookingCheckIn = data[0].check_in_date;
            hotelBookingCheckOut = data[0].check_out_date;
            hotelBookingNoNights = data[0].no_nights;
            hotelBookingRoomQty = data[0].room_qty;
            hotelBookingTotalPrice = data[0].total_price;
            hotelBookingCurrency = data[0].currency;
            //Update name in profile page 
            $('#hotelBookings-bookingRef p').html(hotelBookingRef);
            $('#hotelBookings-bookingDate p').html(hotelBookingDate);
            $('#hotelBookings-userId p').html(userID);
            $('#hotelBookings-hotelId p').html(hotelBookingHotelID);
            $('#hotelBookings-checkInDate p').html(hotelBookingCheckIn);
            $('#hotelBookings-checkOutDate p').html(hotelBookingCheckOut);
            $('#hotelBookings-numberNights p').html(hotelBookingNoNights);
            $('#hotelBookings-roomQty p').html(hotelBookingRoomQty);
            $('#hotelBookings-totalPrice p').html(hotelBookingTotalPrice);
            $('#hotelBookings-currency p').html(hotelBookingCurrency);
        }
    });
});

//get and activity booking one details for user ID
$('#aActivityBookingOne').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries/activityBookingInfo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
           
            //Assign property of object to variable
            activityBookingOneBookingRef = data[0].activity_booking_ref;
            activityBookingOneBookingDate = data[0].booking_date;
            userID = data[0].user_id;
            activityBookingOneActivityID = data[0].activity_id;
            activityBookingOneActivityDate = data[0].activity_date;
            activityBookingOneTicketQty = data[0].ticket_qty;
            activityBookingOneTotalPrice = data[0].total_price;
            activityBookingOneCurrency = data[0].currency;
            activityBookingOneBookingStatus = data[0].booking_status;
            //Update name in profile page 
            $('#activityBookingOne-bookingRef p').html(activityBookingOneBookingRef);
            $('#activityBookingOne-bookingDate p').html(activityBookingOneBookingDate);
            $('#activityBookingOne-userId p').html(userID);
            $('#activityBookingOne-activityId p').html(activityBookingOneActivityID);
            $('#activityBookingOne-activityDate p').html(activityBookingOneActivityDate);
            $('#activityBookingOne-ticketQty p').html(activityBookingOneTicketQty);
            $('#activityBookingOne-totalPrice p').html(activityBookingOneTotalPrice);
            $('#activityBookingOne-currency p').html(activityBookingOneCurrency);			
            $('#activityBookingOne-bookingStatus p').html(activityBookingOneBookingStatus);
        }
    });
});

//get and activity booking two details for user ID
$('#aActivityBookingTwo').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries/activityBookingInfo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
           
            //Assign property of object to variable
            activityBookingTwoBookingRef = data[1].activity_booking_ref;
            activityBookingTwoBookingDate = data[1].booking_date;
            userID = data[1].user_id;
            activityBookingTwoActivityID = data[1].activity_id;
            activityBookingTwoActivityDate = data[1].activity_date;
            activityBookingTwoTicketQty = data[1].ticket_qty;
            activityBookingTwoTotalPrice = data[1].total_price;
            activityBookingTwoCurrency = data[1].currency;
            activityBookingTwoBookingStatus = data[1].booking_status;
            //Update name in profile page 
            $('#activityBookingTwo-bookingRef p').html(activityBookingTwoBookingRef);
            $('#activityBookingTwo-bookingDate p').html(activityBookingTwoBookingDate);
            $('#activityBookingTwo-userId p').html(userID);
            $('#activityBookingTwo-activityId p').html(activityBookingTwoActivityID);
            $('#activityBookingTwo-activityDate p').html(activityBookingTwoActivityDate);
            $('#activityBookingTwo-ticketQty p').html(activityBookingTwoTicketQty);
            $('#activityBookingTwo-totalPrice p').html(activityBookingTwoTotalPrice);
            $('#activityBookingTwo-currency p').html(activityBookingTwoCurrency);			
            $('#activityBookingTwo-bookingStatus p').html(activityBookingTwoBookingStatus);
        }
    });
});