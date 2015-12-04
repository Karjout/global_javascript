var popup_map_info = new Array();
var popup_map_info_list = "";
var center_map_pin = "";
var driving_directions = 0;
var radius="";
/* var coatDriveStores = [{"storeNumber":"73", "postalCode":"02111", "city":"Boston","storeName":"Burlington","collectionDays":"Oct 1-3"},
{"storeNumber":"873", "postalCode":"02111", "city":"Boston","storeName":"Boston Outlet","collectionDays":"Oct 1-3"},
{"storeNumber":"807", "postalCode":"02111", "city":"Boston","storeName":"Wrentham Villiage Premium Outlets","collectionDays":"Oct 1-3"},
{"storeNumber":"290", "postalCode":"02111", "city":"Boston","storeName":"Garden City","collectionDays":"Oct 1-3"},
{"storeNumber":"274", "postalCode":"02111", "city":"Boston","storeName":"Kittery Outlet/Maine Gate Mall","collectionDays":"Oct 1-3"},
{"storeNumber":"809", "postalCode":"02111", "city":"Boston","storeName":"Cape Cod Mall","collectionDays":"Oct 1-3"},
{"storeNumber":"36", "postalCode":"48084", "city":"Detroit","storeName":"Somerset","collectionDays":"Oct 8-10"},
{"storeNumber":"121", "postalCode":"48084", "city":"Detroit","storeName":"Laurel Park","collectionDays":"Oct 8-10"},
{"storeNumber":"972", "postalCode":"48084", "city":"Detroit","storeName":"Partridge Creek","collectionDays":"Oct 8-10"},
{"storeNumber":"42", "postalCode":"48084", "city":"Detroit","storeName":"Twelve Oaks","collectionDays":"Oct 8-10"},
{"storeNumber":"931", "postalCode":"48084", "city":"Detroit","storeName":"Village of Rochester","collectionDays":"Oct 8-10"},
{"storeNumber":"763", "postalCode":"48084", "city":"Detroit","storeName":"Great Lakes Crossing Outlet","collectionDays":"Oct 8-10"},
{"storeNumber":"92", "postalCode":"48084", "city":"Detroit","storeName":"Briarwood","collectionDays":"Oct 8-10"},
{"storeNumber":"128", "postalCode":"48084", "city":"Detroit","storeName":"Kensington Valley Factory Outlet","collectionDays":"Oct 8-10"},
{"storeNumber":"64", "postalCode":"53226", "city":"Milwaukee","storeName":"Mayfair","collectionDays":"Oct 15-17"},
{"storeNumber":"997", "postalCode":"53226", "city":"Milwaukee","storeName":"Bayshore Mall","collectionDays":"Oct 15-17"},
{"storeNumber":"151", "postalCode":"53226", "city":"Milwaukee","storeName":"West Towne","collectionDays":"Oct 15-17"},
{"storeNumber":"737", "postalCode":"53226", "city":"Milwaukee","storeName":"Johnson Creek Premium Outlets","collectionDays":"Oct 15-17"},
{"storeNumber":"381", "postalCode":"53226", "city":"Milwaukee","storeName":"Pleasant Prairie Outlet","collectionDays":"Oct 15-17"},
{"storeNumber":"117", "postalCode":"84107", "city":"Salt Lake City","storeName":"Fashion Place","collectionDays":"Oct 22-24"},
{"storeNumber":"661", "postalCode":"84107", "city":"Salt Lake City","storeName":"South Towne Center","collectionDays":"Oct 22-24"},
{"storeNumber":"386", "postalCode":"84107", "city":"Salt Lake City","storeName":"Park City Outlet","collectionDays":"Oct 22-24"},
{"storeNumber":"740", "postalCode":"84107", "city":"Salt Lake City","storeName":"Newgate Mall","collectionDays":"Oct 22-24"},
{"storeNumber":"835", "postalCode":"84107", "city":"Salt Lake City","storeName":"University Mall","collectionDays":"Oct 22-24"},
{"storeNumber":"507", "postalCode":"60611", "city":"Chicago","storeName":"Michigan Avenue","collectionDays":"Oct 29-30"},
{"storeNumber":"885", "postalCode":"60611", "city":"Chicago","storeName":"Village Plaza Outlet","collectionDays":"Oct 29-30"},
{"storeNumber":"16", "postalCode":"60611", "city":"Chicago","storeName":"Oakbrook","collectionDays":"Oct 29-30"},
{"storeNumber":"980", "postalCode":"60611", "city":"Chicago","storeName":"Burr Ridge","collectionDays":"Oct 29-30"},
{"storeNumber":"908", "postalCode":"60611", "city":"Chicago","storeName":"Yorktown","collectionDays":"Oct 29-30"},
{"storeNumber":"106", "postalCode":"60611", "city":"Chicago","storeName":"Orland Square","collectionDays":"Oct 29-30"},
{"storeNumber":"24", "postalCode":"60611", "city":"Chicago","storeName":"Woodfield","collectionDays":"Oct 29-30"},
{"storeNumber":"547", "postalCode":"60611", "city":"Chicago","storeName":"Main Place","collectionDays":"Oct 29-30"},
{"storeNumber":"39", "postalCode":"60611", "city":"Chicago","storeName":"Hawthorn Center","collectionDays":"Oct 29-30"},
{"storeNumber":"177", "postalCode":"60611", "city":"Chicago","storeName":"Fox Valley","collectionDays":"Oct 29-30"},
{"storeNumber":"313", "postalCode":"60611", "city":"Chicago","storeName":"Chicago Premium Outlets","collectionDays":"Oct 29-30"},
{"storeNumber":"823", "postalCode":"60611", "city":"Chicago","storeName":"Joliet Commons Outlet","collectionDays":"Oct 29-30"},
{"storeNumber":"254", "postalCode":"60611", "city":"Chicago","storeName":"Lighthouse Place Premium Outlets","collectionDays":"Oct 29-30"},
{"storeNumber":"382", "postalCode":"60611", "city":"Chicago","storeName":"Prime Outlet at Huntley","collectionDays":"Oct 29-30"},
{"storeNumber":"504", "postalCode":"80206", "city":"Denver","storeName":"Park Meadows","collectionDays":"Nov 8-9"},
{"storeNumber":"170", "postalCode":"80206", "city":"Denver","storeName":"Cherry Creek","collectionDays":"Nov 8-9"},
{"storeNumber":"978", "postalCode":"80206", "city":"Denver","storeName":"Northfield at Stapleton","collectionDays":"Nov 8-9"},
{"storeNumber":"119", "postalCode":"80206", "city":"Denver","storeName":"Colorado Mills Outlet","collectionDays":"Nov 8-9"},
{"storeNumber":"915", "postalCode":"80206", "city":"Denver","storeName":"Aspen Grove","collectionDays":"Nov 8-9"},
{"storeNumber":"860", "postalCode":"80206", "city":"Denver","storeName":"Flat Iron Crossing","collectionDays":"Nov 8-9"},
{"storeNumber":"994", "postalCode":"80206", "city":"Denver","storeName":"Orchard Town Center","collectionDays":"Nov 8-9"},
{"storeNumber":"946", "postalCode":"80206", "city":"Denver","storeName":"Main Street at Southlands","collectionDays":"Nov 8-9"},
{"storeNumber":"979", "postalCode":"80301", "city":"Boulder","storeName":"29th Street","collectionDays":"Nov 12-13"},
{"storeNumber":"9", "postalCode":"98004", "city":"Seattle","storeName":"Bellevue Square","collectionDays":"Nov 19-21"},
{"storeNumber":"1", "postalCode":"98004", "city":"Seattle","storeName":"Pacific Place","collectionDays":"Nov 19-21"},
{"storeNumber":"427", "postalCode":"98004", "city":"Seattle","storeName":"University Village","collectionDays":"Nov 19-21"},
{"storeNumber":"85", "postalCode":"98004", "city":"Seattle","storeName":"Northgate Mall","collectionDays":"Nov 19-21"},
{"storeNumber":"651", "postalCode":"98004", "city":"Seattle","storeName":"Redmond Town Center","collectionDays":"Nov 19-21"},
{"storeNumber":"818", "postalCode":"98004", "city":"Seattle","storeName":"Woodinville Outlet","collectionDays":"Nov 19-21"},
{"storeNumber":"84", "postalCode":"98004", "city":"Seattle","storeName":"Alderwood Mall","collectionDays":"Nov 19-21"},
{"storeNumber":"314", "postalCode":"98004", "city":"Seattle","storeName":"Silverdale Outlet","collectionDays":"Nov 19-21"},
{"storeNumber":"448", "postalCode":"98004", "city":"Seattle","storeName":"Supermall Outlet","collectionDays":"Nov 19-21"},
{"storeNumber":"895", "postalCode":"98004", "city":"Seattle","storeName":"Factory Stores at North Bend","collectionDays":"Nov 19-21"},
{"storeNumber":"329", "postalCode":"98004", "city":"Seattle","storeName":"Tacoma Mall","collectionDays":"Nov 19-21"}];*/
var coatDriveStores = [];

function loadMap(){
    map = new VEMap('myMap');
    map.LoadMap();
    map.SetMapMode(VEMapMode.Mode2D);
    map.AttachEvent("onclick", Map_OnClick);
	
	search_results_message = "<span style='text-transform:uppercase;'>SHOP MORE THAN 360 EDDIE BAUER STORES THROUGHOUT NORTH AMERICA</span><span class='searchresults_copytext'><p>Use our Store Locator to find addresses, phone numbers, hours and directions.</p></span>";
    document.getElementById('searchresults').innerHTML = search_results_message;
    document.getElementById("searchresults").style.display = 'block';  // show results

	//reset error messages
	YAHOO.util.Dom.removeClass('Postal_state', 'error_message'); 
	YAHOO.util.Dom.removeClass('City_state', 'error_message'); 
	YAHOO.util.Dom.removeClass('State_Province_state', 'error_message'); 	
}

function createRequest() {
  try {
    request = new XMLHttpRequest();
  } catch (trymicrosoft) {
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (othermicrosoft) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (failed) {
        request = false;
      }
    }
  }
}

function directions(store_ID) {	

   var stores = eval('(' + popup_map_info + ')');
   var storeInfo = stores[store_ID];   
   var store_latitude = storeInfo.latitude;
   var store_longitude = storeInfo.longitude;
   var store_name = storeInfo.name;
   var store_address = storeInfo.address;
   var store_city = storeInfo.city;
   var store_postalcode = postalCode(storeInfo.postalcode);
   var store_hours = storeInfo.hours;
   var store_phone = storeInfo.phone;
   var store_subdivision = storeInfo.subdivision;
   var store_stickpin = storeInfo.store_stickpin;
   var store_stickpinmapid = storeInfo.store_stickpinmapid;
   var store_type = storeInfo.type;

   window.open('store_locator_largemap.jsp?storelatitude=' + escape(store_latitude) + '&storelongitude=' + escape(store_longitude) + '&storename=' + escape(store_name) + '&storeaddress=' + escape(store_address) + '&storecity=' + escape(store_city) + '&storepostalcode=' + escape(store_postalcode) + '&storehours=' + escape(store_hours) + '&storephone=' + escape(store_phone) + '&storesubdivision=' + escape(store_subdivision) + '&storestickpin=' + escape(store_stickpin) + '&storetype=' + escape(store_type), 'newwindow', config = 'height=730, width=800, toolbar=no, menubar=no, scrollbars=yes, resizable=yes,location=no, directories=no, status=no');
	//    TheHref='store_locator_largemap.jsp?storelatitude=' + escape(store_latitude) + '&storelongitude=' + escape(store_longitude) + '&storename=' + escape(store_name) + '&storeaddress=' + escape(store_address) + '&storecity=' + escape(store_city) + '&storepostalcode=' + escape(store_postalcode) + '&storehours=' + escape(store_hours) + '&storephone=' + escape(store_phone) + '&storesubdivision=' + escape(store_subdivision) + '&storestickpin=' + escape(store_stickpin) + '&storetype=' + escape(store_type);
	//    TheRev="controlPos: tr showCaption:false width:800 height:730 sameBox:true";
	//	TheTitle="";		
		
	//parent.fb.loadAnchor(TheHref, TheRev, TheTitle); //pop open
	//	$j.fancybox(
	//			{
	//	        	'href'	: TheHref,
	//				'width' : 800,
	//				'height': 800
	//				
	//			}
	//		);

}

function postalCode(postalcode) {
	if (postalcode.length <5){
		postalcode = "0"+ postalcode;
		return postalcode;
	}
	return postalcode;
}

function initMap() {
   // map.Clear();
    document.getElementById('searchresults').innerHTML = "";
    document.getElementById("searchresults").style.display = 'none';
    // hide results message
    document.getElementById('results').innerHTML = "";
    document.getElementById("storelocator_billboard_1").style.display = 'block';
    // show billboard
}

function checkEnter(e,id){ //e is event object passed from function invocation
	var characterCode;

	if(e && e.which){ //if which property of event object is supported (NN4)
		e = e;
		characterCode = e.which; //character code is contained in NN4's which property
	}else{
		e = event;
		characterCode = e.keyCode; //character code is contained in IE's keyCode property
	}

	if(characterCode == 13){ //if generated character code is equal to ascii 13 (if enter key)
		if(id == 1) {
			FindLocByZip(encodeURI(document.getElementById('txtZipcode').value), ''); // enter on zipcode
		}else if(id ==2){
			FindLocByCityState(encodeURI(document.getElementById('txtCity').value), encodeURI(document.getElementById('State_Province').options[document.getElementById('State_Province').selectedIndex].value), '');// enter on state_province
		}else if(id ==5){
			veShowDirections('StartAddress','EndAddress');
		}else if(id ==6){
			veShowDirections('EndAddress','StartAddress');
		}
		return false;
	}else{
		return true;
	}

}

function FindLocByZip(zipCode, numResults) {
    try
    {
        if (numResults == '') {
            numResults = 20;
            //Max set based on VE
        }

        initMap();

        //reset values for city and state
        document.getElementById('txtCity').value = "";
        document.getElementById('State_Province').selectedIndex = 0;
        SearchResultsType = 1; // Zip code Search
		YAHOO.util.Dom.removeClass('City_state', 'error_message'); 
		YAHOO.util.Dom.removeClass('State_Province_state', 'error_message'); 	

        //todo: add alerts for missing zip code or canadian postal code
		if (zipCode !=""){
			 var params = 'ebst=zc&zc='+zipCode;
			 makeLocatorRequest(params);
			 YAHOO.util.Dom.removeClass('Postal_state', 'error_message');
		}else{
			alert("Please enter a zip code or postal code.");
			YAHOO.util.Dom.addClass('Postal_state', 'error_message'); 			
		}
       

    }
    catch(e)
    {
        document.getElementById('searchresults').innerHTML = "";
        document.getElementById("searchresults").style.display = 'none';
        // hide results message
        document.getElementById('results').innerHTML = "";
        alert(e.message);

    }
}

function FindLocByCityState(cityName, stateInitials, numResults) {	
    try
    {
        if (numResults == '') {
            numResults = 20;
            //Max set based on VE
        }
        initMap();
        //reset zip code values
		var params = 'ebst=cs';
		var error_search = 0;
        document.getElementById('txtZipcode').value = "";		
		var selIndex = $("State_Province").value;	
		YAHOO.util.Dom.removeClass('Postal_state', 'error_message');
				        
			 if(selIndex == "" && cityName == ""){				
				 error_search = 1;
			 }else if(selIndex != "" && cityName == ""){	
				 error_search = 2;
		     }else if(selIndex == "" && cityName !=""){	
				 error_search = 3;
			 }else if(selIndex != "" && cityName != ""){
				 SearchResultsType = 2; // City and State Search
				 YAHOO.util.Dom.removeClass('City_state', 'error_message'); 
			     YAHOO.util.Dom.removeClass('State_Province_state', 'error_message'); 	
				 params += '&c='+cityName+'&s='+stateInitials;
				 error_search = 0;
			 }else{
				 SearchResultsType = 3; //State
				 params += '&s='+stateInitials;
				 error_search = 0;
			 }
                   
		 if(error_search == 0){
          makeLocatorRequest(params);
		 }else if(error_search == 1){
			alert("Please enter a city and select a state or province.");
			YAHOO.util.Dom.addClass('City_state', 'error_message'); 
			YAHOO.util.Dom.addClass('State_Province_state', 'error_message'); 	
		 }else if(error_search == 2){
			alert("Please enter a city.");
			YAHOO.util.Dom.addClass('City_state', 'error_message'); 
		 }else if(error_search == 3){
			alert("Please enter a select a state or province.");
			YAHOO.util.Dom.addClass('State_Province_state', 'error_message'); 		
		 }

    }
    catch(e)
    {		
        document.getElementById('searchresults').innerHTML = "";
        document.getElementById("searchresults").style.display = 'none';
        // hide results message
        document.getElementById('results').innerHTML = "";
        alert(e.message);

    }
}

function changeRadius(){
	
	if(document.getElementById('txtZipcode').value != ""){
		FindLocByZip(encodeURI(document.getElementById('txtZipcode').value), ''); // enter on zipcode
	}else{
		FindLocByCityState(encodeURI(document.getElementById('txtCity').value), encodeURI(document.getElementById('State_Province').options[document.getElementById('State_Province').selectedIndex].value), '');// enter on state_province
	}

}

function makeLocatorRequest(params){
        var reqUrl = '/SearchService?' + params;		
		var radius = document.getElementById('Radius').options[document.getElementById('Radius').selectedIndex].value;
        // quick sanity check

		if(SearchResultsType == 3){
			reqUrl += "&r=248" //set to max radius
		}else{
			if (radius) {			
			reqUrl += "&r=" + document.getElementById('Radius').options[document.getElementById('Radius').selectedIndex].value;				
			}
		}
		
		  YAHOO.util.Connect.asyncRequest('GET', reqUrl, callbackLocator);
		  // use YAHOO.util.Connect.asyncRequest with a callback function to make an ajax call		
}

var callbackLocator =
{
        success : handleRawResults,
        failure : responseFailure,
        argument: {},
        timeout : 6000
}

function responseFailure(data){
    alert("Could not connect to Map Point. Please try again!");
}

function handleRawResults(data){	 
			var datatxt = data.responseText;
			var ZipCode = document.getElementById('txtZipcode').value;
            var CityName = cnvrt2Upper(document.getElementById('txtCity').value);
            var StateName = document.getElementById('State_Province').options[document.getElementById('State_Province').selectedIndex].value;
            var StateNameFull = document.getElementById('State_Province').options[document.getElementById('State_Province').selectedIndex].text;
            var search_radius = document.getElementById('Radius').options[document.getElementById('Radius').selectedIndex].value;
            var search_radius_type = "mile";
						
			if (datatxt.length > 2){
			
            var places = eval('(' + data.responseText + ')');
			var placeCount = 0;				 
            var confidenceStrings = [ "High", "Medium", "Low" ];
			var precisionStrings = [ "Interpolated", "Rooftop" ];
			var pushpinUrls = ["../../assets/ocp/content/storelocator/pin_graphic.gif", "../../assets/ocp/content/storelocator/pin_graphic_outlet.gif", "../../assets/ocp/content/storelocator/pin_graphic_new.gif","../../assets/ocp/content/storelocator/pin_graphic.gif","../../assets/ocp/content/storelocator/pin_graphic.gif","../../assets/ocp/content/storelocator/pin_graphic.gif","../../assets/ocp/content/storelocator/pin_graphic.gif","../../assets/ocp/content/storelocator/pin_graphic.gif"];
		    var ResultsTableStart = "<table width='100%' border='0' class='searchresults'>";		 
			var ResultsTableHeader = "<tr class='searchresults_header'><td searchresults_header_col1>&nbsp;</td><td class='searchresults_header_col2'>Location</td><td class='searchresults_header_col3'>Hours</td><td class='searchresults_header_col4'>Distance</td><td class='searchresults_header_col5'>&nbsp;</td></tr>";
			var ResultsTableRow = "<tr><td>&nbsp;</td><td><dl><dt>Store Name</dt><dd>address 1</dd><dd>address 2</dd><dd>Zipcode</dd><dd>Phone</dd></dl></td><td><dl><dt>Mon-Sat:</dt><dd>10am - 9pm</dd><dt>Sunday:</dt><dd>11am - 7pm</dd></dl></td><td><dl><dt>0.31</dt><dd>miles</dd><dt><a href=''>maps & directions</a></dd></dl></td><td><dl><dd>1# Ascent</dd><dd>Outlet</dd><dd>New!</dd></dl></td></tr>";
			var ResultsTableEnd = "</table>";            
            var search_results_message = "";
            var stickpin = 1;            
            var locs = new Array();
            var lat1 = "";
            var lon1 = "";
            // get starrting lat,long for distance call VE to get
            if(SearchResultsType == 1){
               results = map.Find('', ZipCode, null, null, index, null, true, false, true, false, null);
            }
            if(SearchResultsType == 2){
               results = map.Find('', CityName + ' ' + StateName , null, null, index, null, true, false, true, false, null);
            }
            if(SearchResultsType == 3){
               results = map.Find('', StateName , null, null, index, null, true, false, true, false, null);
            }

               index=0;
               number=Number(10);
               SearchResults = ResultsTableStart + ResultsTableHeader;

                if(SearchResultsType == 1){
                 search_results_message = "Good news. The following stores are within a " + search_radius + " " + search_radius_type + " radius of " + ZipCode + ".";
                 document.getElementById('searchresults').innerHTML = search_results_message;
                 document.getElementById("searchresults").style.display = 'block';  // show results
                }
                if(SearchResultsType == 2){
                 search_results_message = "Good news. The following stores are within a " + search_radius + " " + search_radius_type + " radius of " + CityName + ", " + StateNameFull + ".";
                 document.getElementById('searchresults').innerHTML = search_results_message;
                 document.getElementById("searchresults").style.display = 'block';  // show results
                }
                if(SearchResultsType == 3){
                 search_results_message = "Good news. The following stores are within " + StateNameFull + ".";
                 document.getElementById('searchresults').innerHTML = search_results_message;
                 document.getElementById("searchresults").style.display = 'block';  // show results
                }
			   
			   
               for (var p = 0; p < places.length; p++) {
				 var place = places[p];				
                 var store_type = 0; //set as default value
                 var storetypestring = "";
                 var store_name = place.name;
                 var CoatDriveStores = eval(coatDriveStores);
                 var store_coatDriveCollectionDays = "";
                 
                 for (var Cd = 0; Cd < CoatDriveStores.length; Cd++) {
                	 var CoatDriveStore = CoatDriveStores[Cd];
                	 // check to see if store has a coat drive                	 
                	 if (store_name.toLowerCase() == (CoatDriveStore.storeName).toLowerCase()){
                		 store_coatDriveCollectionDays = CoatDriveStore.collectionDays;                		
                	 }
                 }
                 var store_address = place.address;
                 var store_city = place.city;
                 var store_postalcode = postalCode(place.postalCode);
                 var store_hours = place.hours;				 
                 var store_latitude = place.latitude;
                 var store_longitude = place.longitude
                 var store_phone =  place.phone;
                 var store_subdivision = place.subdivision;
                 var store_specialties = place.specialties;   
				 var displayStore = true;             ;
	     		 for (var i = 0; i < store_specialties.length; i++){	     			 
                     if(store_specialties[i] == "Outlet") {	// Outlet 	
                         store_type = 1;
                     }else if(store_specialties[i] == "New") { // New Store			
                         store_type = 2;
                     }else if(store_specialties[i] == "FirstAscent") { // First Ascent only		
                         store_type = 3;
                     }else if(store_specialties[i] == "Opening") {		
                         store_type = 4;
	        		 }else if(store_specialties[i] == "AFA") {		
                         store_type = 5;
	        		 }else if(store_specialties[i] == "OFA") {		
                         store_type = 6;
	        		 }else if(store_specialties[i] == "Apparel") {		
                         store_type = 7;
	        		 }
                     
                   }
				 if (document.getElementById("specialties")){
				 	
				 }
                 var store_miles = "miles";
                 var store_distance = roundNumber(place.distance,2) + ' ' + store_miles ;                 
                 var store_openhours = "";
                 var colorswitch = 0;
                 var ResultsTableRowStart = "";
                 var ResultsTableRowEnd = "";
		 		 var store_stickpin = (p+1);	
		 		 var store_stickpinmapid = "msftve_1000_" + (200000+p);					
                 var location = new VELatLong(Number(store_latitude), Number(store_longitude));
                 var direction_text = store_name + "," + store_address + "," + store_postalcode;
                 var desc = "";
                     desc = desc + store_address + "<br>" + store_city + ", " + store_subdivision + "  " + store_postalcode + "<br>" + store_phone;
                   
				     if (p == 0){
				        popup_map_info_list = "[{latitude:'" +  store_latitude + "' ,longitude:'" + store_longitude + "', name:'" + store_name + "', address:'" + store_address + "', city:'" + store_city + "', postalcode:'" + store_postalcode + "', hours:'" + store_hours + "', phone:'" + store_phone + "', subdivision:'" + store_subdivision + "', stickpin:'" + store_stickpin + "', stickpinmapid:'" + store_stickpinmapid + "', type:'" + store_type + "'}";
					 }else if(p < places.length){
						popup_map_info_list = popup_map_info_list + ",{latitude:'" +  store_latitude + "' ,longitude:'" + store_longitude + "', name:'" + store_name + "', address:'" + store_address + "', city:'" + store_city + "', postalcode:'" + store_postalcode + "', hours:'" + store_hours + "', phone:'" + store_phone + "', subdivision:'" + store_subdivision + "', stickpin:'" + store_stickpin + "', stickpinmapid:'" + store_stickpinmapid + "', type:'" + store_type + "'}";					 
					 }
	      		  	if (store_type ==1) {
                     	storetypestring = "<span class='outlet'>Outlet</span>";
	      		    }else if(store_type ==2) {
		     			storetypestring = "<span class='new'>New Store</span>";
                 	}else if(store_type ==5) {
		     			storetypestring = "<span class='afa'>First Ascent Available</span>";
	      			}else if(store_type ==6) {
		     			storetypestring = "<span class='ofa'>Outlet First Ascent</span>";
	      			}else if(store_type ==7) {
		     			storetypestring = "<span class='apparel'>Apparel</span>";
	      			}
                  desc = desc + "<br>Latitude: " + store_latitude + "<br/>" + "Longitude: " + store_longitude;
		          var pin = new VEShape(VEShapeType.Pushpin, location);
					   pin.SetCustomIcon("<img class='store_type_" + store_type + "' src='" +
                       pushpinUrls[store_type] +
                       "'><span class='pinText'>" +
                       store_stickpin +
                       "</span>");
                       if(storetypestring != ""){
                         pin.SetTitle(storetypestring + "<br><a href=\"javascript:directions(" + p + ");\">" +  store_name + "</a> ");					
                       }else{
                         pin.SetTitle("<a href=\"javascript:directions(" + p + ");\">" + store_name + "</a>");					
                       }
                       pin.SetDescription(desc);
					    var loc = new VELatLong(Number(store_latitude), Number(store_longitude));
						locs.push(loc); // save pins
                        map.AddShape(pin);


             if (store_type == 0) {
			   ResultsTableRowStart = "<tr class='searchresults_content searchresults_color0 store_type_" + store_type + "'>";
			 }else if (store_type == 1){
			   ResultsTableRowStart = "<tr class='searchresults_content searchresults_color1 store_type_" + store_type + "'>";
			 }else{
			   ResultsTableRowStart = "<tr class='searchresults_content searchresults_color0 store_type_" + store_type + "'>";
			 }
			   ResultsTableRowEnd = "</tr>";
             if(store_type == 1){           
				ResultsTableCol1 = "<td class='searchresults_col1 store_type_1' ><a name='storeid"  + stickpin + "' href=\"javascript:directions('" + p + "');\"'>" + stickpin + "</a></td>";
             }else if(store_type == 5){           
					ResultsTableCol1 = "<td class='searchresults_col1 store_type_5' ><a name='storeid"  + stickpin + "' href=\"javascript:directions('" + p + "');\"'>" + stickpin + "</a></td>";
	         }else if(store_type == 7){           
					ResultsTableCol1 = "<td class='searchresults_col1 store_type_7' ><a name='storeid"  + stickpin + "' href=\"javascript:directions('" + p + "');\"'>" + stickpin + "</a></td>";
	         }else{          
				ResultsTableCol1 = "<td class='searchresults_col1 store_type_0' ><a name='storeid"  + stickpin + "' href=\"javascript:directions('" + p + "');\"'>" + stickpin + "</a></td>";
             }           
				ResultsTableCol2 = "<td class='searchresults_col2' valign='top'><dl><dt>" + store_name + "</dt><dd>" + store_address + "</dd><dd>" + store_city + ", " + store_subdivision + "  " + store_postalcode + "</dd><dd>" + store_phone +"</dd><dd class='directions'><a href=\"javascript:directions(" + p + ");\">Get Directions</a></dd></dl></td>";
				
               ResultsTableCol3 = "<td class='searchresults_col3' valign='top'><dl><dt><span class='openhours'>" + storehours(store_hours) + "</span></dt></dl></td>";
               ResultsTableCol4 = "<td class='searchresults_col4' valign='top'><dl><dt><span class='distance'>" + store_distance + "</span><span class='miles'>" + store_miles + "</span><dt><a href=\"javascript:directions(" + p + ");\">maps & directions</a></dd></dl></td>";		 
			   if(!store_coatDriveCollectionDays == ""){
            	   ResultsTableCol5 = "<td class='searchresults_col5' valign='top'><dl><dd>" + specialties(store_specialties) + "</dd><dd><a class='coatDrive' href='/EB/One-Warm-Coat/index.cat' target='_new' alt='One Warm Coat Event' title='One Warm Coat Event'><img src='../../assets/ocp/content/storelocator/100924/one_warm_coat_logo.png'/><span class='collectionDays'>Collection Dates " + store_coatDriveCollectionDays + "</span></a></dd></dl></td></tr>";
               }else{
            	   ResultsTableCol5 = "<td class='searchresults_col5' valign='top'><dl><dd>" + specialties(store_specialties) + "</dd></dl></td></tr>";                   
               }
			  SearchResults = SearchResults + ResultsTableRowStart + ResultsTableCol1 + ResultsTableCol2 + ResultsTableCol3 + ResultsTableCol4 + ResultsTableCol5 + ResultsTableRowEnd;
			 
			  stickpin = stickpin + 1;
			  

             }

			 popup_map_info_list = popup_map_info_list + ']'; // store list
			 popup_map_info = popup_map_info_list; //assign to array
				
			
			 if (places.length >= 1){			  
			  SearchResults = SearchResults + ResultsTableEnd;
			  document.getElementById('results').innerHTML = SearchResults;
              document.getElementById('storelocator_billboard_1').style.display = 'none'; // hide billboard
			 
                map.SetMapView(locs); // fit map view around all pins				

			 }				
			 

			}else{

				var results_errormessage = "<br><span class='results_errormessage'>Please double-check that you entered your search correctly, or try expanding the search radius.</span>";

				if(SearchResultsType == 1){
					loadMap();
					 search_results_message = "<span class='error'>No results were found for " + ZipCode + " within a " + search_radius + " " + search_radius_type + " radius.</span>" + results_errormessage;
					 document.getElementById('searchresults').innerHTML = search_results_message;
					 document.getElementById("searchresults").style.display = 'block';  // show results
				}else if(SearchResultsType == 2){
					loadMap();
					 search_results_message = "<span class='error'>No results were found for " + CityName + ", " + StateNameFull + " within a " + search_radius + " " + search_radius_type + " radius.</span>" + results_errormessage;
					 document.getElementById('searchresults').innerHTML = search_results_message;
					 document.getElementById("searchresults").style.display = 'block';  // show results
				}else if(SearchResultsType == 3){
					loadMap();
					 search_results_message = "<span class='error'>No results were found for " + StateNameFull + " within a " + search_radius + " " + search_radius_type + " radius.</span>" + results_errormessage;
					 document.getElementById('searchresults').innerHTML = search_results_message;
					 document.getElementById("searchresults").style.display = 'block';  // show results
				}

			}
}


function Map_OnClick(e)
{
    // Check if a Shape was clicked
    if (e.elementID != null)
    {
        // Get a reference to the Shape that was clicked
        var shape = map.GetShapeByID(e.elementID);
		var shapeID = shape.GetID();
		var stores = eval('(' + popup_map_info + ')');
		for (var p = 0; p < stores.length; p++) {
			var storeInfo = stores[p];   			
			if (shapeID == storeInfo.stickpinmapid){
				directions(p);
			}
		}
        //directions(shape.GetMoreInfoURL);// open larger popup map

    }
}


function setStoreLink(stickpin){
    window.location.hash='storeid' + stickpin; //jump to link
}

function setCenter(latitude,longitude,stickpin){
    window.location.hash='map'; //jump to map
    map.SetCenter(new VELatLong(latitude, longitude));
}


function show_search_options() {
    var action = document.getElementById("specialty_store_content_state").value;
    if (action == "show") {
        document.getElementById("specialtiy_store_content").style.display = 'block';
        document.getElementById("specialty_store_button").src = "../../assets/ocp/content/storelocator/up_arrow.gif";
        document.getElementById("specialty_store_content_state").value = 'hide';
    } else if (action == "hide") {
        document.getElementById("specialtiy_store_content").style.display = 'none';
        document.getElementById("specialty_store_button").src = "../../assets/ocp/content/storelocator/down_arrow.gif";
        document.getElementById("specialty_store_content_state").value = 'show';
    }

}

function storehours(str) {
	var storehours_str = "";	
    if (str != ""){
       
        var storehours_array = str.split("~");
        var storehours_num = 0;
        while (storehours_num < storehours_array.length)
        {
            if(storehours_num == (storehours_array.length)-1){
              storehours_str = storehours_str + "<span class='openhours'>" + storehours_array[storehours_num] + "</span>";
            }else{
              storehours_str = storehours_str + "<span class='openhours'>" + storehours_array[storehours_num] + "</span><br>";
            }
            storehours_num += 1;
        }
    }
    return storehours_str;
}

function specialties(str) {

    if (str != ""){
        var specialties_str = "";
        var specialties_array = str;
        var specialties_num = 0;
        var specialties_displayname = "<span class='notavailable'>First Ascent<br>Not Available</span>";

        while (specialties_num < specialties_array.length)
        {
	if(specialties_array[specialties_num] == "AFA"){
		specialties_displayname = "Available";
	}else if(specialties_array[specialties_num] == "OFA"){
		specialties_displayname = "Outlet<br>First Ascent<br>Available";
	}else if(specialties_array[specialties_num].toLowerCase() == "outlet"){
		specialties_displayname = "OUTLET<span class='notavailable'><br>First Ascent<br>Not Available</span>";
	}else if(specialties_array[specialties_num].toLowerCase() == "apparel"){
		specialties_displayname = "<span class='notavailable'>First Ascent<br>Not Available</span>";
	}else{
		specialties_displayname = specialties_array[specialties_num];
	}
             if(specialties_num == (specialties_array.length)-1){
               specialties_str = specialties_str + "<span class='" + specialties_array[specialties_num].toLowerCase() + "'>" + specialties_displayname + "</span>";
             }else{
               specialties_str = specialties_str + "<span class='" + specialties_array[specialties_num].toLowerCase() + "'>" + specialties_displayname + "</span><br>";
             }
            specialties_num += 1;

        }
    }
    return specialties_str;
}


function cnvrt2Upper(str) {
    return str.toLowerCase().replace(/\b[a-z]/g, cnvrt);
    function cnvrt() {
        return arguments[0].toUpperCase();
    }
}

function isZip(s) {
    // Check for correct zip code
    reZip = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);

    if (!reZip.test(s)) {
        document.getElementById('searchresults').innerHTML = "";
        document.getElementById("searchresults").style.display = 'none';
        // hide results message
        document.getElementById('results').innerHTML = ""
        alert("Zip Code Is Not Valid");
        return false;
    }

    return true;
}

var pushpinUrls = ["../../assets/ocp/content/storelocator/pin_graphic.gif", "../../assets/ocp/content/storelocator/pin_graphic_outlet.gif", "../../assets/ocp/content/storelocator/pin_graphic.gif", "../../assets/ocp/content/storelocator/pin_graphic.gif", "../../assets/ocp/content/storelocator/pin_graphic.gif", "../../assets/ocp/content/storelocator/pin_graphic.gif"];

function OnPageLoadMap(){
    document.getElementById('storehours').innerHTML = selectedstorehours;
    map = new VEMap('myMap');
    mapCenter = new VELatLong(selectedstorelatitude, selectedstorelongitude);
    map.LoadMap();
    map.SetMapMode(VEMapMode.Mode2D);	
		var pin = new VEShape(VEShapeType.Pushpin, mapCenter);
		pin.SetCustomIcon("<img src='" + pushpinUrls[selectedstoretype] + "'><span class='pinText'>" + 1 + "</span>");
		pin.SetTitle(selectedstorename);
		pin.SetDescription(desc);
		map.AddShape(pin);			
    map.SetCenterAndZoom(mapCenter, 14);
}

function OnPageLoadLarge(){
    document.getElementById('storehours').innerHTML = selectedstorehours;
    map = new VEMap('myMap');
    mapCenter = new VELatLong(selectedstorelatitude, selectedstorelongitude);
    map.LoadMap();
    map.SetMapMode(VEMapMode.Mode2D);	
		var pin = new VEShape(VEShapeType.Pushpin, mapCenter);
		center_map_pin = pin;
		pin.SetCustomIcon("<img src='" + pushpinUrls[selectedstoretype] + "'>");
		pin.SetTitle(selectedstorename);
		pin.SetDescription(desc);
		map.AddShape(pin);	
		reSizeMap();
        map.SetCenterAndZoom(mapCenter, 14);		
}

function reSizeMap(){
	//get screen width and height 
	var screen_width = parseInt(YAHOO.util.Dom.getClientWidth());
	var screen_height = parseInt(YAHOO.util.Dom.getClientHeight());
	
	if(YAHOO.util.Dom.hasClass('body', 'popup')) {			
	
	}
		
}

function veShowDirections(idfrom, idto){
    var from = document.getElementById(idfrom).value;
    var to = document.getElementById(idto).value;
    if (0 == from.length) {
        alert("Please enter Address");
        return;
    }
    if (0 == to.length) {
        to = selectedstoreadress;
    }
    document.getElementById('routebox').style.display = "none";
    document.getElementById('routebox').style.overflow = "visible";
    document.getElementById('routebox').style.height = "auto";    
    document.getElementById('routeinfo').innerHTML = "";
    var options = new VERouteOptions;
    options.DistanceUnit = ('km' == DistanceUnit) ? VERouteDistanceUnit.Kilometer : VERouteDistanceUnit.Mile;
	options.SetBestMapView = true;
    options.RouteCallback = veOnDirections; 
	
	var storeLatLong = new VELatLong(selectedstorelatitude, selectedstorelongitude);
	if (driving_directions == 0){
		map.GetDirections([from,storeLatLong], options);
	}else if(driving_directions == 1){
		map.GetDirections([storeLatLong,from], options);
	}
   
    document.getElementById('VELayerListDiv').style.display = "none";
 		

}

function timeFromSec(sec)
{
    var time = "";
    var inc = "";
    if (60 < sec)
    {
        // seconds
        inc = "0" + sec % 60;
        time = inc.substr(inc.length - 2) + time;
        sec = (sec - (sec % 60)) / 60;
        if (60 < sec)
        {
            // minutes
            inc = "0" + sec % 60;
            time = inc.substr(inc.length - 2) + ":" + time;
            sec = (sec - (sec % 60)) / 60;
            if (24 < sec)
            {
                // hours
                inc = "0" + sec % 24;
                time = inc.substr(inc.length - 2) + ":" + time;
                sec = sec - (sec % 24);
                if (0 < sec)
                // days
                    time = sec + " days, " + time;
            }
            else
            {
                inc = "0" + sec;
                time = inc.substr(inc.length - 2) + ":" + time;
            }
        }
        else
        {
            inc = "0" + sec;
            time = inc.substr(inc.length - 2) + ":" + time;
        }
    }
    else
        time = "00:00:" + sec;

    return time;
}

function viewRouteBox(obj)
{
    if ("V" == obj.innerHTML)
    {
        document.getElementById("routebox").style.overflow = "visible";
        document.getElementById("routebox").style.height = "auto";
        obj.innerHTML = "&mdash;";
        obj.title = "Minimize route directions"
    }
    else
    {
        document.getElementById("routebox").style.overflow = "hidden";
        document.getElementById("routebox").style.height = "18px";
        obj.innerHTML = "V";
        obj.title = "Restore route directions"
    }
}

function PlaceNewPushpin(newLatLong, newText, index)
		 {
			var shape = new VEShape(VEShapeType.Pushpin, newLatLong);
			
			if(index == 0)
			{
				shape.SetCustomIcon('../../assets/ocp/content/storelocator/pin_graphic_end.png');
			}
			else
			{
				shape.SetCustomIcon('../../assets/ocp/content/storelocator/pin_graphic_start.png');
			}
			shape.SetDescription(newText);
			map.AddShape(shape);
		 }

function veOnDirections(route){	

	if (route != null){
    var routeinfo = "";

    var StartAddress = document.getElementById('StartAddress').value;
    if (StartAddress == "") {
        StartAddress = selectedstoreadress;
    }
    var EndAddress = document.getElementById('EndAddress').value;
    if (EndAddress == "") {
        EndAddress = selectedstoreadress;
    }
    var directions_footer = "<table width='100%' class='directions_footer'><tr height='40'><td valign='top' class='route_pinText'><img src='../../../assets/ocp/content/storelocator/stop.gif'></td><td valign='middle' class='directions_header_text'>" + EndAddress + "</td></tr></table>";
    var legs = route.RouteLegs;
	var steps_LatLong = new Array();
	var steps = '<div class="steps" style="margin:4px 0"><b>Steps:</b></div>';

    var leg;
    var turn;
    var dist = 0;
    var pushpins = 0;
    var foundresults = 1;

    for (var i = 0; i < legs.length; i++)
    {		
        leg = legs[i];
        steps += '<ol start="1" style="margin-top:4px;';
        colorStlye = " odd";
        count = 1;
        if (is_NN)
            steps += ' padding-left:0px;">';
        else
            steps += ' margin-left:0px;">';

        for (var j = 0; j < leg.Itinerary.Items.length; j++)
        {
			steps_LatLong.push(leg.Itinerary.Items[j].LatLong);
            turn = leg.Itinerary.Items[j];	
            if(count==0){
            	colorStlye = " odd";
            	count=1;
            }else{
            	colorStlye = " even";
            	count=0;
            }
            
			if (pushpins < 1){
				steps += "<li class='directions"+ colorStlye +"'><table><tr><td valign='top' class='directions_pushpins first'>&nbsp</td><td valign='top' class='directions_text'>" + turn.Text + "</td><td valign='top' class='directions_distance'> 0.0 " + DistanceUnit + "</td>";
			}else{
				steps += "<li class='directions"+ colorStlye +"'><table><tr><td valign='top' class='directions_pushpins'>" + pushpins + "</td><td valign='top' class='directions_text'>" + turn.Text + "</td>";
			}
            pushpins = pushpins + 1;
            if (0 < dist)
                steps += "<td valign='top' class='directions_distance'> " + dist.toFixed(1) + " " + DistanceUnit + "</td>";
            steps += "</tr></table>";
            dist = turn.Distance;
        }

        steps += "<\/ol>";
    }
    var directions_header = "<table width='100%' class='directions_header'><tr height='40'><td valign='top' class='route_pinText'><img src='../../../assets/ocp/content/storelocator/start.gif'></td><td valign='middle' class='directions_header_text'>" + StartAddress + "</br>";
    var routeinfoa = "";    
    routeinfoa += "<span class='directions_distance_wrapper'><span class='directions_distance_total'>";
    routeinfoa += route.Distance.toFixed(1) + " " + DistanceUnit + "</span>";
    routeinfoa += "<span class='directions_time'>(Approximate Time ";
    routeinfoa += timeFromSec(route.Time) + " mins)</span></span>";
    routeinfo += directions_header + routeinfoa + "</td></tr></table>";
    routeinfo += steps;
    routeinfo += directions_footer;
    document.getElementById('routebox').style.display = "block";
    document.getElementById('routeinfo').innerHTML = routeinfo;
	YAHOO.util.Dom.addClass('myMap', 'small'); 	
	map.DeleteShape(center_map_pin);
	map.Resize(370 + "px", 400 + "px");
    document.getElementById('myMap').style.width = 370 + "px";
    document.getElementById('myMap').style.height = 400 + "px";
	map.SetMapView(steps_LatLong); // fit map view around all route pins	
	document.getElementById('VELayerListDiv').style.display = "block";	
	
	}
}


function direction_switch(direction) {
    if (direction == 'to') {
        document.getElementById("directions_from").style.display = 'none';
        document.getElementById("directions_to").style.display = 'block';
        if (document.getElementById('EndAddress').value != "") {
            document.getElementById('StartAddress').value = document.getElementById('EndAddress').value;
            document.getElementById('EndAddress').value = "";
			driving_directions = 0;
        }
    } else {
        document.getElementById("directions_from").style.display = 'block';
        document.getElementById("directions_to").style.display = 'none';
        if (document.getElementById('StartAddress').value != "") {
            document.getElementById('EndAddress').value = document.getElementById('StartAddress').value;
            document.getElementById('StartAddress').value = "";
			driving_directions = 1;
        }
    }
}

function roundNumber(number,decimal_points) {
	if(!decimal_points) return Math.round(number);
	if(number == 0) {
		var decimals = "";
		for(var i=0;i<decimal_points;i++) decimals += "0";
		return "0."+decimals;
	}

	var exponent = Math.pow(10,decimal_points);
	var num = Math.round((number * exponent)).toString();
	return num.slice(0,-1*decimal_points) + "." + num.slice(-1*decimal_points)
}


function printpage() {
    window.print();
}
YAHOO.util.Event.onDOMReady(updateStoreTypes);

function updateStoreTypes(){	
		document.getElementById('specialtiy_store_content').innerHTML = "<ol><li><input id='specialties' name='specialties' type='checkbox' value='0' onChange='updateSearchFilter();' checked/><span>Apparel</span></li><li><input id='specialties' name='specialties' type='checkbox' value='1' onChange='updateSearchFilter();' checked/><span>Outlet</span></li><li><input id='specialties' name='specialties' type='checkbox' value='3' onChange='updateSearchFilter();' checked/><span>First Ascent</span></li><li><input id='specialties' name='specialties' type='checkbox' value='4' onChange='updateSearchFilter();' checked/><span>New</span></li></ol>";	
}

function updateSearchFilter(id){
	
}
window.onresize = reSizeMap;
