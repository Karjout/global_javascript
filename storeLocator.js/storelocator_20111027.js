/// <reference path="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.5-vsdoc.js" />

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


var StoreLocator = {

    map: null,
    mapDirections: null,
    mapStoreZoom: null,
    mapPreDir: null,
    mapCenterLatitude: 39.571822,
    mapCenterLongitude: -99.667969,
    selectedProjectShape: null,
    autozoom: false, // if true, map will zoom out until projects are found 
    autozoomed: false, // if true, map has zoomed to accomodate all items
    MapKey: UserVar.MapKey, //Bing Map Key
    SDSURL: "https://spatial.virtualearth.net/REST/v1/data/" + UserVar.SDSAccessID + "/" + UserVar.DataSourceName + "/" + UserVar.EntityTypeName + "?spatialFilter=",
    SDSNearbyRadius: 100,
    Locations: null,
    PageSize: 0,
    Boundaries: null,
    CurrentItemNumer: 0,
    InitializeFlag: true,
    Distance: 0,
    DrivingInstSelected: 0,
    StoreZoomSeleced: 0,
    BackButtonPageFrom: "",
    MainMapFlag: true,      //Flag use to store whether which Map Object is being used
    SearchedLocation: null,         //Location to hold the lat and long of the searched location
    OptionsQuery: null,             //Variable used to store the option query
    KmToMiles: 0.621371192,
    MilesToKm: 1.609344,
    SearchedLocationDet: {
        Address: "",
        PrimaryCity: "",
        State: "",
        PostalCode: "",
        Latitude: "",
        Longitude: ""
    },
    DirectionPreWayPoint: null,
    DirectionPrePos: null,
    itineraryItems: null,
    DirectionFirstWP: null,
    DirectionLastWP: null,
    DirectionResult: null,
    SetViewFlag: false,
    SearchString: null,
    ZipFlag: 0,

    // Initialize Page
    Initialize: function () {
        // initialize map
        StoreLocator.options = { credentials: StoreLocator.MapKey,
            center: new Microsoft.Maps.Location(StoreLocator.mapCenterLatitude, StoreLocator.mapCenterLongitude),
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            zoom: 4,
            enableClickableLogo: false,
            enableSearchLogo: false
        };

        StoreLocator.map = null;

        StoreLocator.map = new Microsoft.Maps.Map(document.getElementById('dvMapContainer'), StoreLocator.options);
        StoreLocator.Locations = null;
        StoreLocator.CurrentItemNumer = 0;
        StoreLocator.SearchedLocation = null;

        jQuery("#dvInfobox").mouseover(function (e) {
            StoreLocator.ShowInfoBox();
        });

        jQuery("#dvInfobox").mouseout(function (e) {
            StoreLocator.HideInfoBox();
        });

        //Handle Input Enter Key
        StoreLocator.HandleInputEnterKey();

        //Handle Querystring

        StoreLocator.FetchQueryString();
        //BING TOU
        StoreLocator.TOU();
        
    },

    FetchQueryString: function () {

        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var sZipCode = '';
        var sCity = '';
        var sState = '';

        if (hashes.length > 0) {
            // We have querystring
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                if (hash[0].toLowerCase() == "postalcode") {
                    sZipCode = hash[1].replace(/[+]/g, ' ').replace("%20", " ");
                }
                if (hash[0].toLowerCase() == "footertxtcity") {
                    sCity = hash[1].replace(/[+]/g, ' ').replace("%20", " ");
                }
                if (hash[0].toLowerCase() == "footerstate_province") {
                    sState = hash[1].replace(/[+]/g, ' ').replace("%20", " ");
                }
            }

            if (sZipCode == "" && sCity == "" && sState == "") {
                // do nothing
            }
            else if (sZipCode != "") {
                jQuery("#txtZipcode").val(sZipCode);
                StoreLocator.GoToLocation(sZipCode.replace("%20", " "));
            }
            else if (sCity != "" && sState != "") {
                var sValue = sCity + ", " + sState;
                jQuery("#State_Province").val(sState.replace("%20", " "));
                jQuery("#txtCity").val(sCity.replace("%20", " "));
                StoreLocator.GoToLocation(sValue);
            }
            else if (sState == "") {
                StoreLocator.SearchString = '';
                StoreLocator.NoRecordsFound();
            }
            else if (sCity == "") {
                jQuery("#State_Province").val(sState.replace("%20", " "));
                StoreLocator.SearchString = ', ' + document.getElementById('State_Province').options[document.getElementById('State_Province').selectedIndex].text;
                StoreLocator.NoRecordsFound();
            }
        }
    },

    HandleInputEnterKey: function () {

        // Zip Code
        jQuery("#txtZipcode").keypress(function (event) {
            if (event.which == 13) {
                StoreLocator.SearchByZip();
                event.preventDefault();
            }
        });

        //City
        jQuery("#txtCity").keypress(function (event) {
            if (event.which == 13) {
                StoreLocator.SearchByCity();
                event.preventDefault();
            }
        });

    },

    SearchByZip: function () {

        var sValue = jQuery("#txtZipcode").val();


        if (sValue != "") {
            jQuery("#txtCity").val("");
            jQuery("#State_Province").val("");
            if (StoreLocator.ZipFlag == 1) {
                jQuery('#Postal_state').toggleClass('Postal_state_error', 'Postal_state');
                StoreLocator.ZipFlag = 0;
            }
            StoreLocator.GoToLocation(sValue);
        }

        else {
            alert("Please enter a zip code or postal code.");
            jQuery('#Postal_state').toggleClass('Postal_state_error');
            StoreLocator.ZipFlag = 1;
        }


        //        var sValue = jQuery("#txtZipcode").val();
        //        jQuery("#txtCity").val("");
        //        jQuery("#State_Province").val("");
        //        if (sValue != "") {
        //            if (isNaN(sValue)) {
        //                // show alert
        //                alert("Please provide a valid zip code.");
        //                return;
        //            }
        //            else {
        //                // Continue with search
        //                StoreLocator.GoToLocation(sValue);
        //            }
        //        }
    },
    
    TOU: function(){
    	jQuery('.storelocator_content .column2').append('<div class="TOU"><a href="https://www.microsoft.com/maps/product/terms.html" target="_blank" rel="nofollow">Bing Maps TOU</a></div>');
    },
    
    SearchByCity: function () {
        var sCity = capitaliseFirstLetter( jQuery("#txtCity").val() );
        //var sState = jQuery("#State_Province").val();
        var sState = document.getElementById('State_Province').options[document.getElementById('State_Province').selectedIndex].text;

        if (StoreLocator.ZipFlag == 1) {
            jQuery('#Postal_state').toggleClass('Postal_state_error', 'Postal_state');
            StoreLocator.ZipFlag = 0;
        }

        if (sCity == "" && sState == "Select One") {
            alert("Please enter a City and select a State or Province.");
            return;
        }

        else {
            if (sCity == "" && sState != "") {
                alert("Please enter a City.");
                return;
            }
            else if (sCity != "" && sState == "Select One") {
                alert("Please select a State or Province.");
                return;
            }
        }

        jQuery("#txtZipcode").val("");
        var sValue = sCity + ", " + sState;

        // Continue with search
        StoreLocator.GoToLocation(sValue);


        //        var sCity = jQuery("#txtCity").val();
        //        var sState = jQuery("#State_Province").val();
        //        jQuery("#txtZipcode").val("");

        //        if (sCity == "" && sState == "") {
        //            alert("Please provide a value for City and State");
        //            return;
        //        }

        //        var sValue = sCity + ", " + sState;

        //        // Continue with search
        //        StoreLocator.GoToLocation(sValue);

    },

    RadiusChanged: function () {
        if (StoreLocator.SearchString == null || StoreLocator.SearchString == "") {
            var sCity = jQuery("#txtCity").val();
            var sState = jQuery("#State_Province").val();
            if (sCity != "" || sState != "") {
                StoreLocator.SearchString = sCity + ", " + sState;
            }
            else if (jQuery("#txtZipcode").val() != "") {
                StoreLocator.SearchString = capitaliseFirstLetter( jQuery("#txtZipcode").val() );
            }
            else {
                alert("Please enter a City and select a State or Province.");
                return;
            }
        }
        StoreLocator.GoToLocation(StoreLocator.SearchString);
    },

    /* 
    Geocode the Location
    */
    GoToLocation: function (searchString) {
        // go to the location which has been provided in the search box
        StoreLocator.autozoom = true;
        StoreLocator.InitializeFlag = false;

        StoreLocator.SearchString = searchString;

        // Need to geocode the location
        geocodeRequest = "https://dev.virtualearth.net/REST/v1/Locations/" + searchString + "?output=json&key=" + StoreLocator.MapKey;
       
        //using ajax to call the geocode service
        jQuery.ajax({
            url: geocodeRequest,
            type: 'get',
            dataType: 'jsonp',
            jsonp: 'jsonp',
            success: StoreLocator.GeoCodeSuccess,
            error: StoreLocator.NoRecordsFound
        });

    },

    /*
    Show errors
    */
    ShowError: function () {
        //alert("There was some error. Please try again.");
        // Show error in message div
        var sAlert = "<div class='error' id='dbMError'>There was some error. Please try again.</div>";
        jQuery("#dvMessage").html(sAlert);
    },

    /* 
    Geocoding is successful
    */
    GeoCodeSuccess: function (result, ResponseStatus) {



        if (result && result.resourceSets && result.resourceSets.length > 0 && result.resourceSets[0].resources && result.resourceSets[0].resources.length > 0) {
            // Set the map view using the returned bounding box

            var ConfidenceIndex = -1;

            for (var i = 0; i <= result.resourceSets[0].resources.length - 1; i++) {
                if(result.resourceSets[0].resources[i].confidence.toLowerCase() == "high")
                {
                    ConfidenceIndex = i;
                    break;
                }
            }
            if (ConfidenceIndex > -1) {
                var bbox = result.resourceSets[0].resources[ConfidenceIndex].bbox;
                var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(bbox[0], bbox[1]), new Microsoft.Maps.Location(bbox[2], bbox[3]));

                //get the co-ordinates of the location and set it as the searched Location
                var point = result.resourceSets[0].resources[ConfidenceIndex].point;
                var searchedCenter = {
                    latitude: point.coordinates[0],
                    longitude: point.coordinates[1]
                };

                StoreLocator.SearchedLocation = searchedCenter;

                StoreLocator.Boundaries = viewBoundaries;

                //StoreLocator.map.setView({ bounds: StoreLocator.Boundaries }); // calls the viewchangeend event

                StoreLocator.SetViewFlag = true;
                StoreLocator.GetLocationsNearCenter();
            }
            else {
                StoreLocator.NoRecordsFound();
            }
        }
        else {
            StoreLocator.NoRecordsFound();
        }
    },


    /* 
    When no records are found
    */
    NoRecordsFound: function () {
        jQuery("#dvMessage").empty();
        var sMessage = "<div class='error' id='dbMError'>No results were found for " + StoreLocator.SearchString + " within a " + jQuery("#Radius").val() + " mile radius</div><br />" +
        "<span class='results_error_msg'>Please double-check that you entered your search correctly, or try expanding the search radius.</span>";
        jQuery("#dvMessage").html(sMessage);

        rl = jQuery("#dvResults");
        rl.empty();

        jQuery("#storelocator_billboard_1").show();

        StoreLocator.map.entities.clear();
    },

    /*
    Called when we need stores from the center of the map at a specified distance
    */
    GetLocationsNearCenter: function () {
        //alert("center");
        StoreLocator.map.entities.clear();
        //StoreLocator.HideUpper();
        StoreLocator.selectedProjectShape = null;

        //Getting the Center Location of the map
        var mc = StoreLocator.map.getCenter();
        var center = {
            centerLat: mc.Latitude,
            centerLong: mc.Longitude
        };

        var Dist = parseFloat(jQuery("#Radius").val()) * StoreLocator.MilesToKm;
        var sURL = StoreLocator.SDSURL + "nearby(" + StoreLocator.SearchedLocation.latitude + "," + StoreLocator.SearchedLocation.longitude + "," + Dist + ")";
        sURL += "&$select=EntityID,Name,AddressLine,Latitude,Longitude,PrimaryCity,SubDivision,PostalCode,Phone,StoreHours,StoreType,__Distance";

        sURL += "&$orderby=PostalCode";
        sURL += "&key=" + StoreLocator.MapKey + "&$format=json";


        jQuery.ajax({
            url: sURL,
            type: 'GET',
            dataType: 'jsonp',
            jsonp: 'jsonp',
            success: StoreLocator.LocationsFetchSuccess,
            error: StoreLocator.NoRecordsFound
        });
    },

    /*
    Called when stores are successfully fetched
    */
    LocationsFetchSuccess: function (data, textStatus) {
        //alert("LocationsFetchSuccess");
        if (textStatus != "success") {
            StoreLocator.NoRecordsFound();
        }
        else {
            StoreLocator.Locations = [];
            //StoreLocator.SetSearchedLocInForm();
            StoreLocator.Replot(data);
        }
    },

    /*
    used to sort the strores by distance from the searched location
    */
    sortByDistance: function (a, b) {
        if (a.__Distance == b.__Distance) {
            return 0;
        }
        return a.__Distance > b.__Distance ? 1 : -1;
    },

    /*
    Used to Plot the Stores
    Data - all data related to the stores as array
    */
    Replot: function (data) {

        //alert(data.d.results.length);
        if (data.d.results.length > 0) {

            jQuery("#dvMessage").empty();
            jQuery("#dvMessage").append("Good news. The following stores are within a " + jQuery("#Radius").val() + " mile radius of " + StoreLocator.SearchString + ".");
            jQuery("#storelocator_billboard_1").hide();

            for (i = 0; i < data.d.results.length; i++) {
                var prop = data.d.results[i];
                var pn = i + 1;
                prop.LocationNumber = pn;

                // Checking whether we have the __Distance field or not
                // if we do not then we need to calculate the distance between the searched and the current location and save it in the object.
                if (!prop.__Distance && StoreLocator.SearchedLocation != null) {
                    // Calculate the distance

                    prop.__Distance = StoreLocator.CalcDistance((StoreLocator.SearchedLocation.latitude), (StoreLocator.SearchedLocation.longitude), prop.Latitude, prop.Longitude);
                }

                //Adding the Location on an array - to be used for paging
                StoreLocator.Locations.push(prop);


            }

            //First we need to sort the pin array
            (StoreLocator.Locations).sort(StoreLocator.sortByDistance);


            StoreLocator.CurrentItemNumer = 0;

            StoreLocator.PopulateGrid();

        }
        else {
            //alert("Replot");
            StoreLocator.NoRecordsFound();
        }
    },

    /*
    used to Populate the Grid
    */
    PopulateGrid: function () {

        StoreLocator.autozoom = true;

        // Setting BackButtonPageFrom
        //StoreLocator.BackButtonPageFrom = "";

        var sHTML = '<table cellpadding="0" cellspacing="0" border="0" width="100%" class="searchresults">';

        var itemNumber = parseInt(StoreLocator.CurrentItemNumer, 0);

        rl = jQuery("#dvResults");
        rl.empty();

        var UpperLimit = 0;
        if (StoreLocator.PageSize == 0) {
            UpperLimit = StoreLocator.Locations.length - 1;
        }
        else {
            UpperLimit = (itemNumber + (StoreLocator.PageSize - 1));
        }
        if (UpperLimit > StoreLocator.Locations.length)
            UpperLimit = StoreLocator.Locations.length - 1;
        //Point from where route needs to be determined
        var sCenter = null;
        if (StoreLocator.SearchedLocation != null)
            sCenter = (StoreLocator.SearchedLocation.latitude) + "," + (StoreLocator.SearchedLocation.longitude)

        // clear pushpins
        StoreLocator.map.entities.clear();

        // save a set of locations for setting the map view later
        var locations = [];

        //Display the data
        for (i = itemNumber; i <= UpperLimit; i++) {
            var prop = StoreLocator.Locations[i];
            var pos = i + 1;
            StoreLocator.Distance = 0;

            //Creating a pushpin
            var location = new Microsoft.Maps.Location(prop.Latitude, prop.Longitude);
            //Adding the location to an array to setup the map view later
            locations.push(location);

            // display pin on basis of StoreType...
            var pushpin_icon = '';
            var FirstColClass = '';
            var LastColText = ''

            if (StoreLocator.Locations[i].StoreType.toLowerCase() == "outlet") {
                pushpin_icon = '/assets/ocp/content/storelocator/111027//pin_graphic_outlet.gif';
                FirstColClass = 'col11';
                LastColText = '<td class="col4" valign="top">' +
                                '<dl>' +
                                    '<dd>' +
                                        '<span class="outlet">OUTLET' +
                                            '<span class="notavailable"><br>First Ascent<br>Not Available' +
                                            '</span>' +
                                        '</span>' +
                                    '</dd>' +
                                    '</dl>' +
                                '</td>';
            }
            else if (StoreLocator.Locations[i].StoreType.toLowerCase() == "afa") {
                pushpin_icon = '/assets/ocp/content/storelocator/111027//pin_graphic.gif';
                FirstColClass = 'col1';
                LastColText = "<td class='col4'>" +
                                    "<dl>" +
                                        "<dd>" +
                                            "<span class='afa'></span>" +
                                        "</dd>" +
                                    "</dl>" +
                                "</td>";

            }
            else {
                pushpin_icon = '/assets/ocp/content/storelocator/111027//pin_graphic.gif';
                FirstColClass = 'col1';
                LastColText = "<td class='col4'>" +
                                    "<dl>" +
                                    '<dd>' +
                                        '<span class="outlet">' +
                                            '<span class="notavailable">' +
                                            '</span>' +
                                        '</span>' +
                                    '</dd>' +
                                    "</dl>" +
                                "</td>";

            }

            var options = {
                icon: pushpin_icon,
                width: 31,
                height: 40,
                text: pos + "",
                zIndex: 1000,
                typeName: "pushpin"
            };
            var pushpin = new Microsoft.Maps.Pushpin(location, options);
            pushpin._id = "pushpin_" + i;

            Microsoft.Maps.Events.addHandler(pushpin, 'click', StoreLocator.pushpinClicked);
            Microsoft.Maps.Events.addHandler(pushpin, 'mouseover', StoreLocator.pushpinMouseOver);
            Microsoft.Maps.Events.addHandler(pushpin, 'mouseout', StoreLocator.pushpinMouseOut);

            StoreLocator.map.entities.push(pushpin);

            // things to the pin as expando properties
            var pin = {
                Location: prop,
                LocationNumber: pos,
                IconElementId: 'pushpin_' + pos,
                text: pos
            };

            var wayPoint = prop.Latitude + "," + prop.Longitude;

            // Converting Kms into Miles
            var Dist = (prop.__Distance) * StoreLocator.KmToMiles;

            var aStoreHrs = (prop.StoreHours).split(' ~ ');

            var StoreHrs = '';
            for (iCtrStHrs = 0; iCtrStHrs < aStoreHrs.length; iCtrStHrs++) {
                StoreHrs += aStoreHrs[iCtrStHrs] + '<br />';
            }
            // Add Accessibily info for Ontario
            prop.Accessibity = "";
            if (prop.SubDivision.indexOf('ON') != -1){
                prop.Accessibity = "<dl class='accessibility'><a href=' /assets/ocp/content/storelocator/Eddie Bauers Ontario Accessible Customer Service Plan.pdf' target='_blank' class='links'><dd>Accessible Customer</dd><dd>Service Plan</dd><dd>(PDF 410K)</dd></a></dl>";
            }


            var td =    "<tr class='searchItem clearfix'>" +
                "<td class='left " + FirstColClass + "'>" +
                    "<a href='javascript:void(0)'  onclick=\"StoreLocator.OpenDirections(\'" + (i) + "\');\">" + (i + 1) + "</a>" +
                "</td>" +
                "<td class='col2'>" +
                    "<dl>" +
                        "<dt>" + prop.Name + "</dt>" +
                        "<dd>" + prop.AddressLine + "</dd>" +
                        "<dd>" + prop.PrimaryCity + ", " + prop.SubDivision + "  " + prop.PostalCode + "</dd>" +
                        "<dd>" + prop.Phone + "</dd>" +
                        "<dd><a href='javascript:void(0)'  onclick=\"StoreLocator.OpenDirections(\'" + (i) + "\');\">Get Directions</a></dd>" +
                    "</dl>" +
                "</td>" +
                "<td class='col3'>" +
                    "<dl>" +
                        "<dt>" +
                            "<span class='openhours'>" + StoreHrs + "</span>" +
                        "</dt>" +
                    "</dl>" +
                    prop.Accessibity +
                "</td>" + LastColText + "</tr>";

            sHTML += td;
        }


        //Setting the map view
        var option;
        if (StoreLocator.autozoom && StoreLocator.Locations.length > 0 && StoreLocator.SetViewFlag == true) {
            StoreLocator.autozoomed = true;

            if (StoreLocator.Locations.length > 1) {
                //Setting the map view on based of the locations found
                var locaRect = new Microsoft.Maps.LocationRect.fromLocations(locations);

                option = StoreLocator.map.getOptions();
                option.bounds = locaRect;
                option.bounds.height = option.bounds.height * 1.2;
                option.bounds.width = option.bounds.width * 1.2;
            }
            else if (StoreLocator.Locations.length == 1) {
                option = StoreLocator.map.getOptions();
                option.center = locations[0];
            }
            //Increasing the height and width of the map so that no pushpins are hidden under the Navigation/Toolbar

            StoreLocator.map.setView(option);
        }

        StoreLocator.autozoom = false;
        //alert(StoreLocator.CurrentItemNumer);


        sHTML += '</table>';

        //sHTML += StoreLocator.MakeFooter();
        rl.append(sHTML);
    },

    pushpinClicked: function (e) {
        var entity_id = e.target.getId();
        var index = parseFloat(entity_id.substring(8));
        StoreLocator.OpenDirections(index);
    },

    pushpinMouseOver: function (e) {
        //Hide Infobox
        StoreLocator.HideInfoBox();

        //Show Infobox for current pushpin
        var entity_id = e.target.getId();
        index = parseFloat(entity_id.substring(8));
        var prop = StoreLocator.Locations[index];
        var prop1 = prop.StoreType;
        var Stype;
        var Sclass;
        var blankSpace = '';
        if (prop1 == "Outlet") {
            Stype = "Outlet";
            Sclass = "outlet";
            blankSpace = '<br><br>';
        }
        else {
            Stype = "First Ascent Available";
            Sclass = "afacss";
            blankSpace = '';
        }

        var sTitle = '<span class=' + Sclass + '>' + Stype + '</span><br /><a href="javascript:void(0);" onclick="StoreLocator.OpenDirections(\'' + index + '\')">' + prop.Name + '</a>';
        var sDesc = prop.AddressLine + '<br>' + prop.PrimaryCity + ", " + prop.SubDivision + "  " + prop.PostalCode + '<br>' + prop.Phone + '<br>Latitude: ' + prop.Latitude + '<br>Longitude: ' + prop.Longitude + blankSpace;

        var pixel = StoreLocator.map.tryLocationToPixel(new Microsoft.Maps.Location(prop.Latitude, prop.Longitude), Microsoft.Maps.PixelReference.page);
        jQuery("#dvPushPinTitle").empty();
        jQuery("#dvPushPinTitle").append(sTitle);
        jQuery("#dvPushPinBody").empty();
        jQuery("#dvPushPinBody").append(sDesc);

        jQuery("#dvInfobox").attr('style', 'visibility: visible; top: ' + (pixel.y - 163) + 'px; left: ' + (pixel.x + 11) + 'px; opacity: 1;');
        jQuery("#dvEro-beak").attr('style', 'top: 121px;');

        jQuery("#dvInfobox").show();
        jQuery("#dvPushPinTitle").show();
    },

    pushpinMouseOut: function (e) {
        StoreLocator.HideInfoBox();
    },

    HideInfoBox: function () {
        jQuery("#dvInfobox").hide();
    },

    ShowInfoBox: function () {
        jQuery("#dvInfobox").show();
    },

    OpenDirections: function (index) {
        var prop = StoreLocator.Locations[index];

        // Create querystring
        var sQueryString = "?storelatitude=" + prop.Latitude + "&storelongitude=" + prop.Longitude + "&storename=" + prop.Name + "&storeaddress=" +
        prop.AddressLine + "&storecity=" + prop.PrimaryCity + "&storepostalcode=" + prop.PostalCode + "&storehours=" + prop.StoreHours + "&storephone=" + prop.Phone +
        "&storesubdivision=" + prop.SubDivision + "&storeStoreType=" + prop.StoreType;

        fb.start( '/assets/html/modalContent/storelocator/storelocator_popup.html' + sQueryString, 'height:680px; width:900px;' );
        //popupWindow.open({
        //    windowURL: 'store_locator_largemap.jsp' + sQueryString,
        //    windowName: 'swip',
        //    centerScreen: 1,
        //    height: 600,
        //    width: 900,
        //    resizable: 1,
        //    scrollbars: 1
        //});
    },


    /*
    function used to calculate the distance between two locations
    lat1 - latitude value for location 1
    lon1 - longitude value for location 1
    lat2 - latitude value for location 2
    lon2 - longitude value for location 2
    */
    CalcDistance: function (lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1 / 180 ;
        var radlat2 = Math.PI * lat2 / 180 ;
        var radlon1 = Math.PI * lon1 / 180 ;
        var radlon2 = Math.PI * lon2 / 180 ;
        var theta = lon1 - lon2 ;
        var radtheta = Math.PI * theta / 180 ;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist) ;
        dist = dist * 180 / Math.PI ;
        dist = dist * 60 * 1.1515 ;
        return dist ;
    }
} ;












