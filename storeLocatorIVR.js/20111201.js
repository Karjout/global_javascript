// Read a page's GET URL variables and return them as an associative array.  
function GetUrlVariable( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  	if( results == null ){
    	return "";
  	}else{  
   	 	return results[1];	
	}
}

var radiusIVR;
var zipIVR;

function OnPageLoadIVR(){	
	var map = null;   
    var results = null;
    var searchresults = null;	
	var errorcode = 0;	
	zipIVR = GetUrlVariable("postalcode");	
		            
	if (zipIVR !=""){
		var queryKey = "&key= AmowNsVsJ4HTBQJvG2tx3T3IJkeLBfMjwxFfLWx8Ngum6VkACf8XZKOghfBw_eoi";
		var geLocationInfoUrl = "https://dev.virtualearth.net/REST/v1/Locations?postalCode=" + zipIVR + queryKey;
			
		$j.ajax({
		  url: geLocationInfoUrl,
		  dataType: 'get',		 
		  success: handleRawResultsIVR(data),
		  failure: responseFailureIVR(data),
		  timeout: 6000
		});		
		
	}else{
		document.getElementById('searchresults').innerHTML = "Please enter a zip code or postal code.";
      	// show 'searchresults' message
		document.getElementById('searchresults').style.display = 'block';
		// no 'results' message
       	document.getElementById('results').innerHTML = "";		
		errorcode = 1; //Invaild or missing postal code					
	}  			
		
}
	
function responseFailureIVR(data){
		document.getElementById('searchresults').innerHTML = "Could not connect to Bing Maps. Please try again!";
       	// show 'searchresults' error message
		document.getElementById('searchresults').style.display = 'block';	
		errorcode = 2; //Could not connect to Bing Maps			  
}
	
function handleRawResultsIVR(data){	
	var datatxt = data.responseText;	
	
	var geocodePoints = datatxt.geocodePoints;
	alert(geocodePoints);
		if (datatxt.length >= 1){
			//stores found
			searchresults = "Good news. The following stores are within a " + radiusIVR + " radius of " + zipIVR + ".";	
			// show 'results' message			
			document.getElementById('results').innerHTML = datatxt;
			document.getElementById('searchresults').style.display = 'block';
			document.getElementById('results').style.display = 'block';
			errorcode = 0; //no errors
		}else{
			//no stores found
			searchresults = "No stores where found within a " + radiusIVR + " radius of " + zipIVR + "<br>Please refine search and try again.";	
			errorcode = 3; //No stores found with serach parameters		
		}
			// show 'searchresults' message
			document.getElementById('searchresults').innerHTML = searchresults;
			document.getElementById('searchresults').style.display = 'block';
}