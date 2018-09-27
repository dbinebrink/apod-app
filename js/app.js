$(document).ready(function(){

	// load the page with the current APOD for today
    var currentDay = moment().format('L');
    currentDay = currentDay.replace(/\//g, '-'); // swap the slashes for dashes
    currentDay = currentDay.slice(6,10) + '-' + currentDay.slice(0,5) // rearrange the date string for the json request

    getTheJson(currentDay);



    // the datepicker stuff here uses moment.js and lightpick.js
    // create a new calendar view
	var picker = new Lightpick({
	    field: document.getElementById('date'),
	    numberOfMonths: 2,
	    numberOfColumns: 1,
	    maxDate: moment(),
	    minDate: '1995-09-01',
	    onSelect: function(date){
	        var myString = date.format('MMDDYY');
	    	var newRequestString = '20' + myString.slice(4,6) + "-" + myString.slice(0,2) + "-" + myString.slice(2,4);
	    	getTheJson(newRequestString);
		}
	});

	// show the calendar/datepicker
	picker.show();



	// SELECT A DIFFERENT YEAR
	// SELECT A DIFFERENT YEAR
	$('#select-year').on('change', function(){

		if(picker) picker.destroy();
		if(picker2) picker2.destroy();

		// get the new json based on the new year
		var newJsonDate = $('#select-year').val().toString() + '-' + '01' + '-' + '01';
		getTheJson(newJsonDate);

		var newCalendarDate = $('#select-year').val() + moment().format('MM') + moment().format('DD');

		var picker2 = new Lightpick({
		    field: document.getElementById('date'),
		    numberOfMonths: 2,
		    numberOfColumns: 1,
		    maxDate: moment(),
		    minDate: '1995-09-01',
		    onSelect: function(date){
		        var myString = date.format('MMDDYY');
		    	var newRequestString = '20' + myString.slice(4,6) + "-" + myString.slice(0,2) + "-" + myString.slice(2,4);
		    	getTheJson(newRequestString);
			}
		});



		picker2.setDate(moment(newCalendarDate));

		picker2.show();

	});


    // the primary function to get the JSON from the API
    // the primary function to get the JSON from the API
    // the primary function to get the JSON from the API
	function getTheJson(theDate){

        $('#info-message').html('<h3>Loading...</h3>');

	    var theDateString = "https://api.nasa.gov/planetary/apod?api_key=7WqB2NYW6K9cLyq4Uk1ZZ7LYO3hPufVQtVJI5Wgn&date=" + theDate;

	    $.getJSON(theDateString, function(result) {	
	    	if(result.media_type == 'image') {
		        $('#apod-image').show().attr('src',result.url);
		        $('#full-image').show().attr('src',result.url);
		        $('#apod-date').html(result.date);
		        $('#apod-title').html(result.title);
		        $('#apod-description').html(result.explanation);	    		
	    	}
	    	else {  // if video, and not an image
	    		alert('This day\'s APOD was a video, no image for this one.');
	    		$('a#modal-link').attr('data-toggle','')
		        $('#apod-image').hide();
		        $('#apod-date').html(result.date);
		        $('#apod-title').html(result.title);
		        $('#apod-description').html(result.explanation);		    		
	    	}

	        $('#info-message').html('You can browse through previous Astronomy Pictures for any day you want:');
		});
	}

	// RANDOM BUTTON FUNCTION
	// RANDOM BUTTON FUNCTION
	// RANDOM BUTTON FUNCTION
    $('#random-button').click(function(){
    	// create a random date
	    var randomDay = Math.floor(Math.random() * (28 - 1) + 1);
	    if(randomDay < 10) randomDay = '0' + randomDay;

	    var randomMonth = Math.floor(Math.random() * (12 - 1) + 1);
	    if(randomMonth < 10) randomMonth = '0' + randomMonth;

	    var randomYear = Math.floor(Math.random() * (2018 - 1996) + 1996);
	    var randomFullDate = randomYear.toString() + '-' + randomMonth.toString() + '-' + randomDay.toString();

    	getTheJson(randomFullDate);

        $('header p:last').html('<b>Random image from the APOD archive loaded... </b>');

    });


});

