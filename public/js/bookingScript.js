/*
******************************************************************************************************
   Web Application Development CA2 - Booking App
   
   Student Names: Student Names: Ruby Lennon (x19128355) & Gabriel Salas (x19104162)
   
   Date: 10 November 2020

   Filename: bookingScript.js

   Supporting Files: 
   - index.html
   - script.js

   @Reference - Moment package - https://momentjs.com - JS package used to calculate dates 

******************************************************************************************************
*/

/////////////////////////////////////////////////
// NEW BOOKING PROCESS 
// Use: Allows users to search for the flights, hotel and activities, and creates the booking
/////////////////////////////////////////////////

//Global variables  
var bookingDate;
var destinationInput;
var deptInput;
var returnInput;
var adultsInput;
var childInput;
var roomInput;
var nights; 
var numPax;
var aticketNum;
var aTotalPrice;
var deptFlight;
var returnFlight;
var hotelOption;
var aTotal;
var userId = localStorage.getItem('userId');

//Empty arrays to store search results returned by server. Each result can contain several JSON objects 
var deptFlightResults = [];
var returnFlightResults = [];
var hotelResults = [];
var activitiesResults = [];
var referenceResult = []; //Store booking references 

//Object with pre-booking information. Used to send pre-booking details to server, Details shared by all reservations
var preBookingObj = {
    destination: '',
    city: '',
    userId: 0,
    bookingDate: ''

};

//Flights Array. Used to store departure[0] and return[1] flight objects, send them to the server, and create the final booking
var flights = [];

//Hotel object. Used to send data to server and create final hotel booking 
var hotel = {
    hotelId: '',
    deptDate: '',
    returnDate: '',
    nights: '',
    roomQty: 1,
    hTotalPrice: 0 
};

//Activity Array. Used to store activities selected by user and create final reservation 
var activities = [];

//Final object. Used to send data to server and create final booking 
var finalBooking = {
    deptFlight: 0,
    returnFlight: 0, 
    hotel: 0, 
    activityOne: null, //Null is the value accepted by mySql when no activity is selected 
    activityTwo: null
};

//1.Validate the new booking inputs. Will be called when clicking search button
function preBookingValidation(){
    //Assing input to variables 
    destinationInput = $('#destination').val();
    deptInput = $('#dept-date').val();
    returnInput = $('#return-date').val();
    adultsInput = $('#pax-adult').val();
    childInput = $('#pax-child').val();
    roomInput = $('#rooms').val();
    //Validate destination
    if(destinationInput === '' || destinationInput === null){
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

//2.Assign values to pre-booking object with the inputs from the search box. Will be called when clicking search button
function newSearch(){
    //Assing destination and city  to prebooking object 
    if(destinationInput.includes('Prague')){
        preBookingObj.destination = 'PRG';
        preBookingObj.city = 'Prague';
    } 
    else if(destinationInput.includes('Copenhagen')){
        preBookingObj.destination = 'CPH';
        preBookingObj.city = 'Copenhagen';
    }
    else if(destinationInput.includes('Paris')){
        preBookingObj.destination = 'CDG';
        preBookingObj.city = 'Paris';
    }
    else if(destinationInput.includes('Berlin')){
        preBookingObj.destination = 'BER';
        preBookingObj.city = 'Berlin';
    }
    else if(destinationInput.includes('Budapest')){
        preBookingObj.destination = 'BUD';
        preBookingObj.city = 'Budapest';
    }
    else if(destinationInput.includes('Rome')){
        preBookingObj.destination = 'FCO';
        preBookingObj.city = 'Rome';
    }
    else if(destinationInput.includes('Valletta')){
        preBookingObj.destination = 'MLA';
        preBookingObj.city = 'Valletta';
    }
    else if(destinationInput.includes('Amsterdam')){
        preBookingObj.destination = 'AMS';
        preBookingObj.city = 'Amsterdam';
    }
    else if(destinationInput.includes('Lisbon')){
        preBookingObj.destination = 'LIS';
        preBookingObj.city = 'Lisbon';
    }
    else if(destinationInput.includes('Barcelona')){
        preBookingObj.destination = 'BCN';
        preBookingObj.city = 'Barcelona';
    }
    else if(destinationInput.includes('London')){
        preBookingObj.destination = 'STN';
        preBookingObj.city = 'London';
    }

    //Adds user ID to pre-booking object 
    preBookingObj.userId = userId;

    //Calculate ticket quantity 
    numPax = ((parseInt(adultsInput)) + (parseInt(childInput)));

    //Get current date - Booking date 
    var date = new Date();
    //Store using the same format in mySql (YYYY-MM-dd)
    bookingDate = `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()}`;
    //Adds booking date to pre-booking object 
    preBookingObj.bookingDate = bookingDate;

    /*@Reference Start - Moment package - https://momentjs.com - Used to calculate nights*/
    var checkIn = moment(deptInput, 'YYYY-MM-DD')
    var checkOut = moment(returnInput, 'YYYY-MM-DD');
    nights = moment.duration(checkOut.diff(checkIn)).asDays(); //Calculate nights
    /*@Reference End- Moment package - https://momentjs.com*/
};

//3. Search button function - This will run all functions in respective order when user clicks search 
function startSearchBtn(){
    //Checks if user is logged in 
    if(userId === 0 || userId === null){
        alert('Please log in')
        window.location.href = './login.html'; //Redirect to login page 
    } else {
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
    }   
};

//4.AJAX call to post pre-booking details to server. Will be called when clicking search button
function postPreBooking(){
    $.ajax({
        url: 'http://83.212.127.26/newbooking', //Path 
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
        url: 'http://83.212.127.26/newbooking/outbound', //Path 
        type: 'GET', 
        dataType: 'json', //Type recieved from server
        //timeout: 1000, //Gives pre-booking some time to complete
        success: function(data){ //Updates HTML with details of the flight returned by server

            //Renders results for outbound flights 
            renderFlightResult(data, '#dept-wrap', 'deptBtn'); 
        } 
    });
};

//6.Select button for departure flights. It takes the result ID assigned by renderFlightResult()
//Result ID will be used to access flight in results Array
function deptBtn(resultID) {
    //Get the flight selected by user using Result ID
    deptFlight = deptFlightResults[resultID];

    //Details of the selected flight will be stored in a temporary object 
    var tempObj = new Object();
    tempObj.flightNo = deptFlight.flight_no; 
    tempObj.deptDate = deptInput;
    tempObj.travelClass = 'Economy';
    tempObj.fTicketQty = numPax;
    tempObj.fTicketPrice = deptFlight.ticket_price;
    tempObj.journey = 'Departure';

    //Delete object in index 0 (in case there was already a departure flight selected) and add temporay object 
    flights.splice(0, 1, tempObj);

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
        url: 'http://83.212.127.26/newbooking/inbound', //Path 
        type: 'GET', 
        dataType: 'json', //Type recieved from server
        success: function(data){ //Updates HTML with details of the flight returned by server
            
            //Renders results for inbound flights 
            renderFlightResult(data, '#return-wrap', 'returnBtn');
        } 
    });
};

//8.Select button for return flights. It takes the result ID assigned by renderFlightResult()
//Result ID will be used to access flight in results Array
function returnBtn(resultID) {

    //Get the flight selected by user using Result ID
    returnFlight = returnFlightResults[resultID];

    //Details of the selected flight will be stored in a temporary object 
    var tempObj = new Object();
    tempObj.flightNo = returnFlight.flight_no; 
    tempObj.deptDate = deptInput;
    tempObj.travelClass = 'Economy';
    tempObj.fTicketQty = numPax;
    tempObj.fTicketPrice = returnFlight.ticket_price;
    tempObj.journey = 'Return';

    //Delete object in index 1 (in case there was already a return flight selected) and add temporay object 
    flights.splice(1, 1, tempObj);

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
        url: 'http://83.212.127.26/newbooking/hotels', //Path 
        type: 'GET', 
        dataType: 'json', //Type recieved from server
        success: function(data){ //Updates HTML with details of the flight returned by server
        
            //Renders results in HTML 
            renderHotelResult(data, '#hotel-wrap', 'hotelBtn'); 
        } 
    });
};

//10.Select button for return flights. It takes the result ID assigned by renderFlightResult()
//Result ID will be used to access activities in temporay Array
function hotelBtn(resultID) {

    //Get the flight selected by user using Result ID
    hotelOption = hotelResults[resultID];

    //Details of the selected flight will be stored in the departure flight object to be ready for the booking creation 
    this.hotel.hotelId = hotelOption.hotel_id;
    this.hotel.deptDate = deptInput;
    this.hotel.returnDate = returnInput;
    this.hotel.nights = parseInt(nights);
    this.hotel.roomQty = parseInt(roomInput);
    this.hotel.hTotalPrice = roomInput*(nights * (hotelOption.night_rate));
    
    //Hide hotel wrap(page)
    $('#hotel-wrap').hide()

    //Show hotel menu and wrap(page) and add active class to menu 
    $('.activityRow').css('display','flex');
    $('#activity-wrap').show();
    $('.hotelRow').removeClass('menu-active');
    $('.activityRow').addClass('menu-active');

    getActivity(); //AJAX call to get activities 

};

//11.AJAX call to get activities results  
function getActivity(){
    $.ajax({
        url: 'http://83.212.127.26/newbooking/activities', //Path 
        type: 'GET', 
        dataType: 'json', //Type recieved from server
        success: function(data){ //Updates HTML with details of the flight returned by server
        
            //Renders results in HTML 
            renderActivitiesResult(data, '#activity-wrap', 'activityBtn'); 
        } 
    });
};

//12.Complete resertion and review it 
function completeBtn() {

    //Clear any previous selection when user changes selection to avoid results being added on top of each other 
    //Empty activity results Array 
    activities = [];
    aTotal = 0;

    //For each checked checkbox it will add data to the activities Array of objects. This is used to post final booking
    $('input[type=checkbox]:checked').each(function (){

        //Get the value of the checkbox. This matches the index in the activities results Array 
        var index = $(this).val();

        //Check if date has been entered, and only runs when date has been entered
        var activityDate = $(`#activity-date${index}`).val(); //Use index to find correct activity date 

        //Loop the activity results Array to look for the activity selected by user
        var activity = activitiesResults[index];

        //Store the data of the selected acticity into temporary object. 
        var tempObj = new Object();
        tempObj.activityID = activity.activity_id;
        tempObj.activityDate = (activityDate === '' || activityDate === null) ? tempObj.activityDate = null : tempObj.activityDate = activityDate;
        tempObj.aTickets = aticketNum;
        tempObj.aTotalPrice = aTotalPrice;
        tempObj.bookingStatus = (activityDate === '' || activityDate === null) ? tempObj.bookingStatus = 'Not Confirmed' : tempObj.bookingStatus = 'Confirmed';
        tempObj.booking = index == 0 ? tempObj.booking = 'Primary' : tempObj.booking = 'Secondary';
        aTotal = (aTotal + aTotalPrice);

        //Push temp object into activity Array 
        activities.push(tempObj);   
    });

    //Hide activity wrap(page)
    $('#activity-wrap').hide();

    //Show review menu and wrap(page) and add active class to menu 
    $('.reviewRow').css('display','flex');
    $('#review-wrap').show();
    $('.activityRow').removeClass('menu-active');
    $('.reviewRow').addClass('menu-active');

    var fTotal = ((deptFlight.ticket_price+returnFlight.ticket_price) * numPax);
    var hTotal = hotel.hTotalPrice;
    var bookingTotal = fTotal + hTotal + aTotal;

    //Print booking breakdown with total
    $('#flights').find('.fDestination').html(`${preBookingObj.city}`);
    $('#flights').find('.fTotalPrice').html(`€${fTotal}`);
    $('#hotel').find('.hName').html(`${hotelOption.hotel_name}`);
    $('#hotel').find('.hTotalPrice').html(`€${hTotal}`);
    $('#aTotal').html(`€${aTotal}`);
    $('#bookingTotal').html(`Total: €${bookingTotal}`);

};

//13. Finalise booking - Create all bookings and get booking reference numbers 
function finishBtn(){

    referenceResult = []; //Clear reference from previous results 

    //Create all bookings first (activities is set as callback for hotel booking) 
    $.when(putFlights(flights[0]), putFlights(flights[1]), putHotel(hotel)).done(function(){
        
        //Once all bookings have been created, get booking reference numbers for those bookings 
        flightReference(flights[0]);
        flightReference(flights[1]);
        hotelReference(hotel);
        
        //Add booking references to the final booking object, and create final booking 
        setTimeout(addFinal, 500); //Timeout to complete previous calls

        //Hide activity wrap(page)
        $('#review-wrap').hide();
        $('#final-wrap').show();
    
    });
};

function addFinal() {

    finalBooking.deptFlight = referenceResult[0];
    finalBooking.returnFlight = referenceResult[1];
    finalBooking.hotel = referenceResult[2];
    if(activities.length > 0){ //Only if activities were selected 
        for(i in activities){
            if(referenceResult[3] != null){
                finalBooking.activityOne = referenceResult[3];
            }
            if(referenceResult[4] != null){
                finalBooking.activityTwo = referenceResult[4];
            } 
        }
    }
    //Creates final booking
    setTimeout(putBooking(finalBooking), 100);
    
};

//AJAX call to PUT flight booking  
function putFlights(object){
    $.ajax({
        url: 'http://83.212.127.26/newbooking/final-flight', //Path 
        type: 'PUT', 
        contentType: 'application/json', //Type of data sent 
        data: JSON.stringify(object),//Data sent to the server 
        success: function(data){ //Updates HTML with details of the flight returned by server
            console.log(data);
        } 
    });
};

//AJAX call to PUT hotel booking and activities once it has finished
function putHotel(object){
    $.ajax({
        url: 'http://83.212.127.26/newbooking/final-hotel', //Path 
        type: 'PUT', 
        contentType: 'application/json', //Type of data sent 
        data: JSON.stringify(object),//Data sent to the server 
        success: function(data){ 
            console.log(data);

            if(activities.length > 0){
                for(i in activities){
                    putActivities(activities[i]); //Sent each activity to database
                }
            }

        } 
    });
};
//AJAX call to PUT activity booking
function putActivities(object){
    $.ajax({
        url: 'http://83.212.127.26/newbooking/final-activity', //Path 
        type: 'PUT', 
        contentType: 'application/json', //Type of data sent 
        data: JSON.stringify(object),//Data sent to the server 
        success: function(data){ 
            console.log(data);
        } 
    });
};

//AJAX get departure flight booking reference for final booking  
function flightReference(object){
    $.ajax({
        url: 'http://83.212.127.26/newbooking/flightReference', //Path 
        type: 'POST', 
        contentType: 'application/json', //Type of data sent 
        dataType: 'json', //Type recieved from server
        data: JSON.stringify(object),//Data sent to the server 
        success: function(data){ 
            referenceResult.push(data[0].booking_ref);
        } 
    });
};

//AJAX get hotel booking reference for final booking  
function hotelReference(object){
    $.ajax({
        url: 'http://83.212.127.26/newbooking/hotelReference', //Path 
        type: 'POST',
        contentType: 'application/json', //Type of data sent 
        dataType: 'json', //Type recieved from server
        data: JSON.stringify(object),//Data sent to the server 
        success: function(data){ 
            referenceResult.push(data[0].hotel_booking_ref);

            if(activities.length > 0){
                for(i in activities){
                    activityReference(activities[i]); 
                }
            }
        } 
    });
};

//AJAX get activity booking reference for final booking  
function activityReference(object){
    $.ajax({
        url: 'http://83.212.127.26/newbooking/activityReference', //Path 
        type: 'POST', 
        contentType: 'application/json', //Type of data sent 
        dataType: 'json', //Type recieved from server
        data: JSON.stringify(object),//Data sent to the server 
        success: function(data){ 
            referenceResult.push(data[0].activity_booking_ref);
        } 
    });
};

//AJAX call to PUT final booking
function putBooking(object){
    $.ajax({
        url: 'http://83.212.127.26/newbooking/final-booking', //Path 
        type: 'PUT', 
        contentType: 'application/json', //Type of data sent 
        data: JSON.stringify(object),//Data sent to the server 
        success: function(data){ 
            console.log(data);
            //Get final booking reference and print it 
            getBooking(); 
        } 
    });
};

//AJAX call to GET final booking reference
function getBooking(){
    $.ajax({
        url: 'http://83.212.127.26/newbooking/final-booking', //Path 
        type: 'POST', 
        contentType: 'application/json', //Type of data sent 
        dataType: 'json', //Type recieved from server
        data: JSON.stringify(finalBooking),
        success: function(data){ 
            console.log(data);
            $('#final-ref').html(`Booking Referece: ${data[0].booking_ref}`);
        } 
    });
};

/////////////////////////////////////////////////
// RENDERING FUNCTIONS
// Use: To dynamically render result boxes, as the number of rows/boxes will depend on the results from server
/////////////////////////////////////////////////

/*It takes 3 arguments: data from ther server, the HTML ID where the html should be rendered and the name of the  
 *the select fucntion. Only the name, ()s will be added  by this function with the index of the array as argument, 
 *to specify which option was clicked, as there could be several results per page*/
function renderFlightResult(data, htmlID, selectBtn) {

    //Clear any previous result to avoid results being printed and stored on top of each other 
    //a.Empty return flight Array 
    returnFlightResults = [];

    //b.Clear HTML. 
    $(htmlID).html('');

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

/*It takes 3 arguments: data from ther server, the HTML ID where the html should be rendered and the function 
 *for the select button as String*/
function renderHotelResult(data, htmlID, selectBtn) {

    //Clear any previous result to avoid results being printed and stored on top of each other 
    //a.Empty hotel results Array 
    hotelResults = [];

    //b.Clear HTML. 
    $(htmlID).html('');

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
        var hTotalPrice = roomInput*(nights * hRate);

        //Store html block required to render a result box, and assign data return from server
        var html = `
        <div class="row align-items-center">
            <div class="col-lg-12 col-md-12 col-12">
                <div class="result-box" id=${i}>
                    <div class="d-flex flex-row">
                        <div class="col-lg-4 col-md-4 col-4">
                            <p class="hName">${hName}</p>
                            <p class="hDetails">${hAddress1}. ${hCity}</p>
                            <p class="hDetails">${hPhone}</p>
                        </div>
                        <div class="col-lg-4 col-md-4 col-4 d-flex align-items-center justify-content-center">
                            <div class="text-center">
                                <p class="hDetails">Rate per room </p>
                                <p class="hDetails">€${hRate} x ${nights} nights</p>
                            </div>
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

/*It takes 2 arguments: data from ther server and the HTML ID where the html should be rendered*/
function renderActivitiesResult(data, htmlID) {

    //Clear any previous result to avoid results being printed and stored on top of each other 
    //a.Empty activity results Array 
    activitiesResults = [];

    //b.Clear HTML. 
    $(htmlID).html('');

    //The server returns a JSON array of object with the details for each hotel.
    //This loops array and creates a search box in the HTML document for each JSON object in the array 
    for(var i in data) { //For-in loop

        //Add hotel results to Array 
        activitiesResults.push(data[i]);

        //Store values of the flight
        var aName = data[i].activity_description;
        var aCity = data[i].city;
        var aCountry = data[i].country;
        var aTicketType = data[i].ticket_type;
        var aRate= data[i].price;
        aticketNum = (aTicketType === 'Per Person') ? (aticketNum = numPax) : (aticketNum = 1); //Conditional operator
        aTotalPrice = (aticketNum * aRate);

        //Store html block required to render a result box, and assign data return from server
        //Array index number is assigned to several id's to help identify each result 
        var html = `
        <div class="row align-items-center">
            <div class="col-lg-12 col-md-12 col-12">
                <div class="result-box" id=${i}>
                    <div class="d-flex flex-row">
                        <div class="col-lg-4 col-md-4 col-4">
                            <p class="hName">${aName}</p>
                            <p class="hDetails">${aCity}. ${aCountry}</p>
                            <div id="date-input"> <!-- Activity date -->
                                <input type="date" placeholder="Date" id="activity-date${i}")"> 
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-4 d-flex align-items-center justify-content-center">
                            <div class="text-center">
                                <p class="fDestination">${aticketNum} x ${aRate}</p>
                                <p class="hDetails">Ticket type: ${aTicketType}.</p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-4 d-flex justify-content-end">
                            <div class="row-fluid">
                                <p class="hTotalPrice">€${aTotalPrice}</p>
                                <input type="checkbox" class="activityCheck" value="${i}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        
        //Add the HTML to the HTML document right after the HTML ID passed in funtion 
        $(htmlID).append(html);
    }

    //Add submit button 
    $(htmlID).append(`
        <div class="row align-items-center">
            <div class="col-lg-12 col-md-12 col-12 d-flex justify-content-end">
                <button type="button" class="selectBtn" onclick="completeBtn()">Complete</button>
            </div>
        </div>`
    );
};


/////////////////////////////////////////////////
// SIDE MENU EVENTS 
// Use: Handles events for side menu 
/////////////////////////////////////////////////

//Outboung flight tab - Shows outbound and hides everything else 
$('#aDeptFlight').click(function(){
    $('.returnRow').removeClass('menu-active');
    $('.hotelRow').removeClass('menu-active');
    $('.activityRow').removeClass('menu-active');
    $('#return-wrap').hide();
    $('#hotel-wrap').hide();
    $('#activity-wrap').hide();
    $('#review-wrap').hide();
    $('.deptRow').addClass('menu-active');
    $('#dept-wrap').show();
});

//Inbound flight tab - Shows inbound and hides everything else 
$('#aReturnFlight').click(function(){
    $('.deptRow').removeClass('menu-active');
    $('.hotelRow').removeClass('menu-active');
    $('.activityRow').removeClass('menu-active');
    $('.reviewRow').removeClass('menu-active');
    $('#dept-wrap').hide();
    $('#hotel-wrap').hide();
    $('#activity-wrap').hide();
    $('#review-wrap').hide();
    $('#final-wrap').hide();
    $('.returnRow').addClass('menu-active');
    $('#return-wrap').show();
});

//Hotel tab - Shows hotel and hides everything else 
$('#aHotel').click(function(){
    $('.deptRow').removeClass('menu-active');
    $('.returnRow').removeClass('menu-active');
    $('.activityRow').removeClass('menu-active');
    $('.reviewRow').removeClass('menu-active');
    $('#dept-wrap').hide();
    $('#return-wrap').hide();
    $('#activity-wrap').hide();
    $('#review-wrap').hide();
    $('#final-wrap').hide();
    $('.hotelRow').addClass('menu-active');
    $('#hotel-wrap').show();
});

//Activity tab - Shows activity and hides everything else 
$('#aActivity').click(function(){
    $('.deptRow').removeClass('menu-active');
    $('.returnRow').removeClass('menu-active');
    $('.hotelRow').removeClass('menu-active');
    $('.reviewRow').removeClass('menu-active');
    $('#dept-wrap').hide();
    $('#return-wrap').hide();
    $('#hotel-wrap').hide();
    $('#review-wrap').hide();
    $('#final-wrap').hide();
    $('.activityRow').addClass('menu-active');
    $('#activity-wrap').show();
});

//Review tab - Shows review and hides everything else 
$('#aReview').click(function(){
    $('.deptRow').removeClass('menu-active');
    $('.returnRow').removeClass('menu-active');
    $('.hotelRow').removeClass('menu-active');
    $('.activityRow').removeClass('menu-active');
    $('#dept-wrap').hide();
    $('#return-wrap').hide();
    $('#hotel-wrap').hide();
    $('#activity-wrap').hide();
    $('#final-wrap').hide();
    $('.aReview').addClass('menu-active');
    $('#review-wrap').show();
});





