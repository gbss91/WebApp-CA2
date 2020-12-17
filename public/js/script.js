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

//Overview menu
$('#aOverview').click(function(){
    $('.oRow').addClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

//Booking menu
$('#aBookings').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').addClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

//Dept Flight menu
$('#aDeptFlightBooking').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').addClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

//Return Flight menu
$('#aReturnFlightBooking').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').addClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

//Hotel Booking menu
$('#aHotelBooking').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').addClass('menu-active');
    $('.eRow').removeClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

//Primary Activity Booking menu
$('#aActivityBookingOne').click(function(){
    $('.oRow').removeClass('menu-active');
    $('.aRow').removeClass('menu-active');
    $('.bRow').removeClass('menu-active');
    $('.cRow').removeClass('menu-active');
    $('.dRow').removeClass('menu-active');
    $('.eRow').addClass('menu-active');
    $('.fRow').removeClass('menu-active'); 
});

//Secondary Activity Booking menu
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

//Overview main content
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

//Booking main content
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

//Dept Flight Booking main content
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

//Return Flight Booking main content
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

//Hotel Booking main content
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

//Primary Activity Booking main content
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

//Secondary Activity Booking main content
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
var bookingDestination; 
var bookingDeptFlightBooking;
var bookingReturnFlightBooking;
var bookingHotelBooking;
var bookingActivityBookingOne;
var bookingActivityBookingTwo;

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
        url: 'http://83.212.127.26/user', //Path 
        type: 'POST', 
        data: JSON.stringify(user), //Convert object to JSON
        contentType: 'application/json', //Type of data sent to the server 
        success: function(data){ //A function to be called if the request succeeds. Returns response from server  
            console.log(data);
        } 
    });
    $.ajax({
        url: 'http://83.212.127.26/queries/userDetails',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
           
            //Assign property of object to variable
            fullname = data[0].full_name;
            email = data[0].email;
            phone = data[0].phone;
            //Update user details in profile page 
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
            bookingDestination = data[0].destination;
            bookingDeptFlightBooking = data[0].dept_flight_booking;
            bookingReturnFlightBooking = data[0].return_flight_booking;
            bookingHotelBooking = data[0].hotel_booking;
            bookingActivityBookingOne = data[0].activity_booking_one;
            bookingActivityBookingTwo = data[0].activity_booking_two;
            //Update booking details profile page 
            $('#bookings-bookingRef p').html(bookingRef);
            $('#bookings-userId p').html(userID);
            $('#bookings-destination p').html(bookingDestination);
            $('#bookings-deptFlightBooking p').html(bookingDeptFlightBooking);
            $('#bookings-returnFlightBooking p').html(bookingReturnFlightBooking);
            $('#bookings-hotelBooking p').html(bookingHotelBooking);
            $('#bookings-activityBookingOne p').html(bookingActivityBookingOne);
            $('#bookings-activityBookingTwo p').html(bookingActivityBookingTwo);
        }
    });
});

//get and display departure flight booking details for user ID
$('#aDeptFlightBooking').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries/deptFlightBookingInfo',
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
        url: 'http://localhost:4000/queries/returnFlightBookingInfo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
           
            //Assign property of object to variable
            returnFlightBookingRef = data[0].booking_ref;
            returnFlightBookingDate = data[0].booking_date;
            userID = data[0].user_id;
            returnFlightNo = data[0].flight_no;
            returnFlightDate = data[0].dept_date;
            returnFlightTravelClass = data[0].travel_class;
            returnFlightTicketQty = data[0].ticket_qty;
            returnFlightTicketPrice = data[0].ticket_price;
            returnFlightTotalPrice = data[0].total_price;
            returnFlightCurrency = data[0].currency;
            //Update return booking details in profile page
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
            //Update hotel booking details in profile page 
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

//get and display primary activity booking details for user ID
$('#aActivityBookingOne').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries/primaryActivityBookingInfo',
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
            //Update primary activity booking details in profile page 
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

//get and display secondary activity booking two details for user ID
$('#aActivityBookingTwo').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries/secondaryActivityBookingInfo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
           
            //Assign property of object to variable
            activityBookingTwoBookingRef = data[0].activity_booking_ref;
            activityBookingTwoBookingDate = data[0].booking_date;
            userID = data[0].user_id;
            activityBookingTwoActivityID = data[0].activity_id;
            activityBookingTwoActivityDate = data[0].activity_date;
            activityBookingTwoTicketQty = data[0].ticket_qty;
            activityBookingTwoTotalPrice = data[0].total_price;
            activityBookingTwoCurrency = data[0].currency;
            activityBookingTwoBookingStatus = data[0].booking_status;
            //Update secondary activity booking details in profile page 
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

//delete booking by user id
$('#deleteBooking').click(function() {
	//delete the booking reference from the user table
    $.ajax({
        url: 'http://localhost:4000/queries/deleteBookingOne',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
	//delete booking record by user id
    $.ajax({
        url: 'http://localhost:4000/queries/deleteBookingTwo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
});

//delete hotel booking by user id
$('#deleteHotelBooking').click(function() {
	//delete the hotel booking reference from the bookings table
    $.ajax({
        url: 'http://localhost:4000/queries/deleteHotelBookingOne',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
	//delete the hotel booking by user id
    $.ajax({
        url: 'http://localhost:4000/queries/deleteHotelBookingTwo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
});

//delete dept flight booking by user id
$('#deleteDeptFlightBooking').click(function() {
	//delete the dept flight booking reference from the bookings table
    $.ajax({
        url: 'http://localhost:4000/queries/deleteDeptFlightBookingOne',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
	//delete the dept flight booking by user id
    $.ajax({
        url: 'http://localhost:4000/queries/deleteDeptFlightBookingTwo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
});

//delete return flight booking by user id
$('#deleteReturnFlightBooking').click(function() {
	//delete the return flight booking reference from the bookings table
    $.ajax({
        url: 'http://localhost:4000/queries/deleteReturnFlightBookingOne',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
	//delete the return flight booking by user id
    $.ajax({
        url: 'http://localhost:4000/queries/deleteReturnFlightBookingTwo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
});

//delete primary activity booking by user id
$('#deleteActivityOneBooking').click(function() {
	//delete the primary activity booking reference from the bookings table
    $.ajax({
        url: 'http://localhost:4000/queries/deletePrimaryActivityBookingOne',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
	//delete the primary activity booking by user id
    $.ajax({
        url: 'http://localhost:4000/queries/deletePrimaryActivityBookingTwo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
});

//delete secondary activity booking by user id
$('#deleteActivityTwoBooking').click(function() {
    $.ajax({
        url: 'http://localhost:4000/queries/deleteSecondaryActivityBookingOne',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
	//delete the secondary activity booking by user id
    $.ajax({
        url: 'http://localhost:4000/queries/deleteSecondaryActivityBookingTwo',
        type: 'POST',
        //dataType: 'json', //Type of data recieved - Response from server is json 
        success: function (data) {
            //Print results in console 
            console.log(data);
        } 
    });
});

