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

//variables
var userId;
var userIDInputOne;
var emailInputOne;
var userID;
var email;
var validation = false;

//login object
var login = {
    userID: 0,
    email: ''
}

//function is triggered when log in button is clicked
$('#log').click(function(){
	//check if user input user ID and email
	if(preLoginValidation()){
	//if so
	//the login details are set to variables
		assignLoginVariables();
		//the login details are checked to see if they are valid
		setTimeout(validUserDetailsCheck, 2000);
		//if valid, the global userId variable is updated
		setTimeout(validationCheckFinal, 4000);
		//if login details are correct the user is redirected to profile page
		setTimeout(loginPageRedirect, 6000);
	}
})

//1.Validate the new user details inputs. Will be called when clicking login in button
function preLoginValidation(){
	
    //Assigning input to variables 
    userIDInputOne = parseInt($('#uID').val());
    emailInputOne = $('#email').val();
    //Validate first name
    if(userIDInputOne === '' || userIDInputOne === null){
        alert('Please enter your user ID.');
        return false;
    }
    //Validate last name 
    if(emailInputOne === '' || emailInputOne === null){
        alert('Please enter your email.');
        return false;
    }
    return true;
};

//assign variables to login object
function assignLoginVariables(){
    //Adds user ID to login object 
    login.userID = userIDInputOne;
	//Adds email to login object 
	login.email = emailInputOne;	
};

//checks if user login details are correct
function validUserDetailsCheck(){
    $.ajax({
        url: 'http://83.212.127.26/login', //Path 
        type: 'POST', 
        data: JSON.stringify(login), //Convert object to JSON
        contentType: 'application/json', //Type of data sent to the server 
        success: function(data){ //If there is a match, set validation to true
            console.log(data);
            //Result is array of object. If not empty validation = true
            if(data.length > 0){
                validation = true;
            } else {
				validation = false;
			}
		}
	});
};

//checks if login details are valid and updates global userId variable
function validationCheckFinal(){
	if(validation){
		localStorage.setItem('userId', userIDInputOne);
		alert('Login successful');
	} else {
		alert('User does not exist.');
		localStorage.setItem('userId',0);
	} 
};

//if login is valid user is redirected to profile page
function loginPageRedirect(){
	if(validation){
	window.location.replace("http://83.212.127.26/profile.html");
	}
};