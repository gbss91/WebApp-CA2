/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 10 November 2020

   Filename: newBooking.js

   Supporting Files: 
   - index.html
   - style.css
   - script.js
******************************************************************************************************
*/

/////////////////////////////////////////////////
// NEW BOOKING PROCESS 
// Use: Allows user to search for the flights, hotel and activities, and creates the booking
/////////////////////////////////////////////////

//Global variables  
var bookingDate;
var destInput;
var deptInput;
var returnInput;
var adultsInput;
var childInput;
var roomInput;
var numPax;

//Empty arrays to store temporary search results 
var deptFlightResults = [];
var returnFlightResults = [];
var hotelResults = [];
var activitiesResults = [];

//Object with prebooking information. Will be used to send data in AJAX call
var preBookingObj = {
    destination: '',
    city: ''
};
//Departure flight object. Will be used to send data to server and create reservation
var deptFlightObj = {
    bookingDate: '',
    flightNo: '',
    deptDate: '',
    travelClass: 'Economy',
    fTicketQty: 0,
    fTicketPrice: 0,
    journey: 'Departure'
};
//Return flight object. Will be used to server and create reservation
var returnFlightObj = {
    bookingDate: '',
    flightNo: '',
    deptDate: '',
    travelClass: 'Economy',
    fTicketQty: 0,
    fTicketPrice: 0,
    journey: 'Return'
    
};
//Hotel object. Will be used to server and create reservation
var hotelObj = {
    hotelId: '',
    nights: '',
    roomQty: 1,
    hTotalPrice: '', 
    bookingDate: ''
};

//1.Validate the new booking inputs. Will be called when clicking search button
function preBookingValidation(){
    //Assing input to variables 
    destInput = $('#destination').val();
    deptInput = $('#dept-date').val();
    returnInput = $('#return-date').val();
    adultsInput = $('#pax-adult').val();
    childInput = $('#pax-child').val();
    roomInput = $('#rooms').val();
    //Validate destination
    if(destInput === '' || destInput === null){
        alert('Please enter destination');
        return false;
    }
    //Validate departure date 
    if(deptInput === '' || deptInput === null){
        alert('Please enter departure date');
        return false;
    }
    //Validate return date 
    if(returnInput === '' || returnInput === null){
        alert('Please enter return date');
        return false;
    }
    //Validate number adults 
    if(adultsInput === '' || adultsInput === null){
        alert('Please enter adults');
        return false;
    }
    if(childInput === '' || childInput === null) { 
        //Children number is optional. Assing 0 if empty 
        childInput = 0;
    }
    //Validate room number 
    if(roomInput === '' || roomInput === null) { 
        //Children number is optional. Assing 0 if empty 
        alert('Please enter room quantity');
        return false;
    }
    return true;
};

//2.Assign values to preBooking object with the inputs from the search box. Will be called when clicking search button
function newSearch(){
    //Assing destination and city  to prebooking object 
    if(destInput.includes('Prague')){
        preBookingObj.destination = 'PRG';
        preBookingObj.city = 'Prague';
    } 
    else if(destInput.includes('Copenhagen')){
        preBookingObj.destination = 'CPH';
        preBookingObj.city = 'Copenhagen';
    }
    else if(destInput.includes('Paris')){
        preBookingObj.destination = 'CDG';
        preBookingObj.city = 'Paris';
    }
    else if(destInput.includes('Berlin')){
        preBookingObj.destination = 'BER';
        preBookingObj.city = 'Berlin';
    }
    else if(destInput.includes('Budapest')){
        preBookingObj.destination = 'BUD';
        preBookingObj.city = 'Budapest';
    }
    else if(destInput.includes('Rome')){
        preBookingObj.destination = 'FCO';
        preBookingObj.city = 'Rome';
    }
    else if(destInput.includes('Valletta')){
        preBookingObj.destination = 'MLA';
        preBookingObj.city = 'Valletta';
    }
    else if(destInput.includes('Amsterdam')){
        preBookingObj.destination = 'AMS';
        preBookingObj.city = 'Amsterdam';
    }
    else if(destInput.includes('Lisbon')){
        preBookingObj.destination = 'LIS';
        preBookingObj.city = 'Lisbon';
    }
    else if(destInput.includes('Barcelona')){
        preBookingObj.destination = 'BCN';
        preBookingObj.city = 'Barcelona';
    }
    else if(destInput.includes('London')){
        preBookingObj.destination = 'STN';
        preBookingObj.city = 'London';
    }

    //Calculate ticket quantity 
    numPax = ((parseInt(adultsInput)) + (parseInt(childInput)));

    //Get current date - Booking date 
    var today = new Date();
    //Store using the same format in mySql (YYYY-MM-dd)
    bookingDate = `${today.getFullYear()}-${(today.getMonth()+1)}-${today.getDate()}`;

};

//3. Search button function - This will run all functions (including the 2AJAX calls) in respective order when user clicks search 
function startSearchBtn(){
    //Only runs if validation is successful (returns true)
    if(preBookingValidation()){
        newSearch();
        postPreBooking(); //1st AJAX call to post pre-booking to server 

        //Manipulate HTML to creates the illusion of changing pages 
        $('#search-wrap').hide(); //Hide search bar wrap(page) 
        $('#booking-body-wrap').show(); //Shows the booking body

        //Renders results for outbound flights
        getOutbound(); //2nd AJAX call to request flight from server
    }
};

//4.AJAX call to post pre-booking details to server. Will be called when clicking search button
function postPreBooking(){
    $.ajax({
        url: 'http://localhost:4000/newbooking', //Path 
        type: 'POST', 
        data: JSON.stringify(preBookingObj), //Convert pre-booking object to JSON
        contentType: 'application/json', //Type of data sent to the server 
        success: function(data){ //A function to be called if the request succeeds. Response from server 
            console.log(data);
        } 
    });
};

//5. AJAX call to get outbound flights. Will be called when clicking search button 
function getOutbound(){
    $.ajax({
        url: 'http://localhost:4000/newbooking/outbound', //Path 
        type: 'GET', 
        dataType: 'json', //Type recieved from server
        timeout: 200, //Gives pre-booking some time to complete
        success: function(data){ //Updates HTML with details of the flight returned by server

            //Renders results for outbound flights 
            renderFlightResult(data, '#dept-wrap', 'deptBtn'); 
        } 
    });
};

//6.Select button for departure flights. It takes the result ID assigned by renderFlightResult()
//Result ID will be used to access flight in temporay Array
function deptBtn(resultID) {
    //Get the flight selected by user using Result ID
    var flight = deptFlightResults[resultID];

    //Details of the selected flight will be stored in the departure flight object to be ready for the booking creation 
    deptFlightObj.bookingDate = bookingDate;
    //User ID will be added at the end. This allows non-registered users to search 
    deptFlightObj.flightNo = flight.flight_no; 
    deptFlightObj.deptDate = deptInput
    deptFlightObj.fTicketQty = numPax;
    deptFlightObj.fTicketPrice = flight.flight_no;

    //Hide the departure flight wrap(page)
    $('#dept-wrap').hide()

    //Show return flight menu and wrap(page) and add active class to menu 
    $('.returnRow').css('display','flex');
    $('#return-wrap').show();
    $('.deptRow').removeClass('menu-active');
    $('.returnRow').addClass('menu-active');

    getInbound();//AJAX call to request inbound flight details 

};

//7. AJAX call to get inbound flights. Will be called when selecting flight. 
function getInbound(){
    $.ajax({
        url: 'http://localhost:4000/newbooking/inbound', //Path 
        type: 'GET', 
        dataType: 'json', //Type recieved from server
        success: function(data){ //Updates HTML with details of the flight returned by server
            
            //Renders results for inbound flights 
            renderFlightResult(data, '#return-wrap', 'returnBtn');
        } 
    });
};

//8.Select button for return flights. It takes the result ID assigned by renderFlightResult()
//Result ID will be used to access flight in temporay Array
function returnBtn(resultID) {

    //Get the flight selected by user using Result ID
    var flight = returnFlightResults[resultID];

    //Details of the selected flight will be stored in the departure flight object to be ready for the booking creation 
    returnFlightObj.bookingDate = bookingDate;
    //User ID will be added at the end. This allows non-registered users to search 
    returnFlightObj.flightNo = flight.flight_no; 
    returnFlightObj.deptDate = deptInput
    returnFlightObj.fTicketQty = numPax;
    returnFlightObj.fTicketPrice = flight.flight_no;

    //Hide the return flight wrap(page)
    $('#return-wrap').hide()

    //Show return hotel menu and wrap(page) and add active class to menu 
    $('.hotelRow').css('display','flex');
    $('#hotel-wrap').show();
    $('.returnRow').removeClass('menu-active');
    $('.hotelRow').addClass('menu-active');


    getHotel(); //AJAX call to get hotels 

};

//9.AJAX call to get hotel results  
function getHotel(){
    $.ajax({
        url: 'http://localhost:4000/newbooking/hotels', //Path 
        type: 'GET', 
        dataType: 'json', //Type recieved from server
        success: function(data){ //Updates HTML with details of the flight returned by server
        
            //Renders results in HTML 
            renderHotelResult(data, '#hotel-wrap', 'hotelBtn'); 
        } 
    });
};



/////////////////////////////////////////////////
// RENDERING FUNCTIONS
// Use: Renders the HTML block for the result boxes 
/////////////////////////////////////////////////

/*Function to dynamically render result boxes, as the number of boxes will depend on the results from server
 *It takes 3 arguments: data from ther server, the HTML ID where the html should be rendered and the name of the  
 *the select fucntion. Only the name, ()s will be added  byt this function with the index of array as argument, 
 *to know which option was clicked, as there could be several select buttons/flights*/
function renderFlightResult(data, htmlID, selectBtn) {

    //The server returns a JSON array of object with the details for each flight. Multiple flights can be returned. 
    //This loops array and creates a search box in the HTML document for each JSON object in the array 
    for(var i in data) { //For-in loop

        //Add object to correct array. Allows to re-use the renderFlightResult() function
        if(data[i].destination == preBookingObj.destination) {
            deptFlightResults.push(data[i]); //Add flight to Array be used them once the user selects one option
        } else {
            returnFlightResults.push(data[i]);
        }

        //Variables used when rendering HTML 
        var fNum = data[i].flight_no;
        var airline = data[i].airline_name;
        var deptTime = data[i].dept_time;
        var arrTime = data[i].arr_time;
        var aircraft = data[i].aircraft;
        var fTicketPrice = data[i].ticket_price;
        var fTotalPrice = (numPax * fTicketPrice);
        

        //Store html block required to render a result box, and assign data return from server. 
        //Assign array index as ID to be able to identify each result 
        var html = `
        <div class="row align-items-center">
            <div class="col-lg-12 col-md-12 col-12">
                <div class="result-box" id=${i}> 
                    <div class="d-flex flex-row">
                        <!--Name-->
                        <div class="col-lg-4 col-md-4 col-4">
                            <p class="fTime">${deptTime}-${arrTime}</p>
                            <p><span class="fNum">${fNum}</span> - <span class="airline">${airline}</span></p>
                            <p class="aircraft">${aircraft}</p>
                        </div>
                        <div class="col-lg-4 col-md-4 col-4 d-flex justify-content-center">
                            <p class="fDestination">DUB-${preBookingObj.destination}</p>
                        </div>
                        <div class="col-lg-4 col-md-4 col-4 d-flex justify-content-end">
                            <div class="row-fluid">
                                <p class="fTotalPrice">€${fTotalPrice}</p>
                                <button type="button" class="selectBtn" onclick="${selectBtn}(${i})">Select</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        //Add the HTML to the HTML document right after the HTML ID passed in funtion 
        $(htmlID).append(html);
    }
};

/*Function to dynamically render result boxes, as the number of boxes will depend on the results from server
 *It takes 3 arguments: data from ther server, the HTML ID where the html should be rendered and the function 
 for the select button as String, to avoid calling whilst being passed*/
function renderHotelResult(data, htmlID, selectBtn) {

    //The server returns a JSON array of object with the details for each hotel.
    //This loops array and creates a search box in the HTML document for each JSON object in the array 
    for(var i in data) { //For-in loop

        //Add hotel results to Array 
        hotelResults.push(data[i]);

        //Store values of the flight
        var hName = data[i].hotel_name;
        var hAddress1 = data[i].address_line1;
        var hCity = data[i].city;
        var hPhone = data[i].phone;
        var hRate= data[i].night_rate;
        var hTotalPrice = (numPax * hRate);

        //Store html block required to render a result box, and assign data return from server
        var html = `
        <div class="row align-items-center">
            <div class="col-lg-12 col-md-12 col-12">
                <div class="result-box" id=${i}>
                    <div class="d-flex flex-row">
                        <div class="col-lg-8 col-md-8 col-8">
                            <p class="hName">${hName}</p>
                            <p class="hDetails">${hAddress1}. ${hCity}</p>
                            <p class="hDetails">${hPhone}</p>
                        </div>
                        <div class="col-lg-4 col-md-4 col-4 d-flex justify-content-end">
                            <div class="row-fluid">
                                <p class="hTotalPrice">€${hTotalPrice}</p>
                                <button type="button" class="selectBtn" onclick="${selectBtn}(${i})">Select</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        //Add the HTML to the HTML document right after the HTML ID passed in funtion 
        $(htmlID).append(html);
    }
};



/////////////////////////////////////////////////
// SIDE MENU EVENTS 
// Use: Handles events for side menu 
/////////////////////////////////////////////////

//Outboung flight tab - Shows outbound and hides everything else 
$('#aDeptFlight').click(function(){
    $('.returnRow').removeClass('menu-active');
    $('.hotelRow').removeClass('menu-active');
    //$('.activityRow').removeClass('menu-active');
    $('#return-wrap').hide()
    $('#hotel-wrap').hide()
    //$('#activity-wrap').hide()
    $('.deptRow').addClass('menu-active');
    $('#dept-wrap').show();
});

//Inbound flight tab - Shows inbound and hides everything else 
$('#aReturnFlight').click(function(){
    $('.deptRow').removeClass('menu-active');
    $('.hotelRow').removeClass('menu-active');
    //$('.activityRow').removeClass('menu-active');
    $('#dept-wrap').hide()
    $('#hotel-wrap').hide()
    //$('#activity-wrap').hide()
    $('.returnRow').addClass('menu-active');
    $('#return-wrap').show();
});

//Hotel tab - Shows hotel and hides everything else 
$('#aHotel').click(function(){
    $('.deptRow').removeClass('menu-active');
    $('.returnRow').removeClass('menu-active');
    //$('.activityRow').removeClass('menu-active');
    $('#dept-wrap').hide()
    $('#return-wrap').hide()
    //$('#activity-wrap').hide()
    $('.hotelRow').addClass('menu-active');
    $('#hotel-wrap').show();
});

//Activity tab - Shows activity and hides everything else 
$('#aActivity').click(function(){
    $('.deptRow').removeClass('menu-active');
    $('.returnRow').removeClass('menu-active');
    $('.hotelRow').removeClass('menu-active');
    $('#dept-wrap').hide()
    $('#return-wrap').hide()
    $('#hotel-wrap').hide()
    $('.activityRow').addClass('menu-active');
    $('#activity-wrap').show();
});





