var DirectionsManager = {
    map: null,
    mapDirections: null,
    MapKey: UserVar.MapKey, //Bing Map Key
    StoreDetail: {
        storelatitude: "",
        storelongitude: "",
        storename: "",
        storeaddress: "",
        storecity: "",
        storepostalcode: "",
        storehours: "",
        storephone: "",
        storesubdivision: "",
        storeStoreType: ""
    },
    StoreLocationToFrom: 1, // 1 - to, 0 - from
    WayPoints: [],
    ItineraryItems: [],

    // Initialize Page
    Initialize: function () {
        // initialize map
        DirectionsManager.options = { credentials: DirectionsManager.MapKey,
            mapTypeId: Microsoft.Maps.MapTypeId.road,
            zoom: 4,
            enableClickableLogo: false,
            enableSearchLogo: false
        };

        DirectionsManager.map = new Microsoft.Maps.Map(document.getElementById('dvDirLocMap'), DirectionsManager.options);
        DirectionsManager.mapDirections = new Microsoft.Maps.Map(document.getElementById('dvDirectionMap'), DirectionsManager.options);

        // Fetch the Values from Query String
        DirectionsManager.FetchQueryString()

        //Display the Store Location
        DirectionsManager.DisplayStoreLoc();

        //Setting the labels
        DirectionsManager.SetLabels();

        jQuery("#dvInfobox").mouseover(function (e) {
            DirectionsManager.ShowInfoBox();
        });

        jQuery("#dvInfobox").mouseout(function (e) {
            DirectionsManager.HideInfoBox();
        });

        // Hide the Directions Map
        jQuery("#dvDirMapContainer").hide();


        //Hide the from div
        jQuery("#dvDirFrom").hide();

        DirectionsManager.HideInfoBox();
    },

    DisplayStoreLoc: function () {
        var location = new Microsoft.Maps.Location(DirectionsManager.StoreDetail.storelatitude, DirectionsManager.StoreDetail.storelongitude);
        DirectionsManager.map.setView({ center: location, zoom: 12 });
        var pushpin_icon = '';
        var pin = DirectionsManager.StoreDetail.storeStoreType;
        if (pin == "Outlet") {
            pushpin_icon = '/assets/ocp/content/storelocator/111027/pin_graphic_outlet.gif';
        }
        else {
            pushpin_icon = '/assets/ocp/content/storelocator/111027/pin_graphic.gif';

        }
        //Show Pushpin
        var options = {
            icon: pushpin_icon,
            width: 31,
            height: 40,
            zIndex: 1000,
            typeName: "pushpin"
        };
        var pushpin = new Microsoft.Maps.Pushpin(location, options);
        pushpin._id = "pushpin";

        Microsoft.Maps.Events.addHandler(pushpin, 'mouseover', DirectionsManager.pushpinMouseOver);
        Microsoft.Maps.Events.addHandler(pushpin, 'mouseout', DirectionsManager.pushpinMouseOut);

        DirectionsManager.map.entities.push(pushpin);
    },

    FetchQueryString: function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        if (hashes.length > 1) {
            // We have querystring
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                if (hash[0] == "storelatitude") {
                    DirectionsManager.StoreDetail.storelatitude = hash[1].replace(/[+]/g, ' ');
                }
                else if (hash[0] == "storelongitude") {
                    DirectionsManager.StoreDetail.storelongitude = hash[1].replace(/[+]/g, ' ');
                }
                else if (hash[0] == "storename") {
                    DirectionsManager.StoreDetail.storename = decodeURIComponent(hash[1].replace(/[+]/g, ' '));
                }
                else if (hash[0] == "storeaddress") {
                    DirectionsManager.StoreDetail.storeaddress = decodeURIComponent(hash[1].replace(/[+]/g, ' '));
                }
                else if (hash[0] == "storecity") {
                    DirectionsManager.StoreDetail.storecity = decodeURIComponent(hash[1].replace(/[+]/g, ' '));
                }
                else if (hash[0] == "storepostalcode") {
                    DirectionsManager.StoreDetail.storepostalcode = decodeURIComponent(hash[1].replace(/[+]/g, ' '));
                }
                else if (hash[0] == "storehours") {
                    DirectionsManager.StoreDetail.storehours = decodeURIComponent(hash[1].replace(/[+]/g, ' '));
                }
                else if (hash[0] == "storephone") {
                    DirectionsManager.StoreDetail.storephone = decodeURIComponent(hash[1].replace(/[+]/g, ' '));
                }
                else if (hash[0] == "storesubdivision") {
                    DirectionsManager.StoreDetail.storesubdivision = decodeURIComponent(hash[1].replace(/[+]/g, ' '));
                }
                else if (hash[0] == "storeStoreType") {
                    DirectionsManager.StoreDetail.storeStoreType = decodeURIComponent(hash[1].replace(/[+]/g, ' '));
                }
            }
        }
    },

    SetLabels: function () {
        // Store Details
        var sStoreDetails = '<dl>' +
                                '<dt>' + DirectionsManager.StoreDetail.storename + '</dt>' +
                                '<dd class="address">' + DirectionsManager.StoreDetail.storeaddress + '</dd>' +
                                '<dd class="address">' + DirectionsManager.StoreDetail.storecity + ',&nbsp;' + DirectionsManager.StoreDetail.storesubdivision + '&nbsp;' + DirectionsManager.StoreDetail.storepostalcode + '</dd>' +
                                '<dd class="phone">' + DirectionsManager.StoreDetail.storephone + '</dd>' +
                            '</dl>';
        jQuery("#store_details").html(sStoreDetails);

        var aStoreHrs = (DirectionsManager.StoreDetail.storehours).split(' ~ ');
        var StoreHrs = '';
        for (iCtrStHrs = 0; iCtrStHrs < aStoreHrs.length; iCtrStHrs++) {
            StoreHrs += aStoreHrs[iCtrStHrs] + '<br />';
        }
        // Store Hours
        var sStoreHours = '<dl>' +
                                '<dt>Store Hours</dt>' +
                                '<dd>' +
                                    '<div id="storehours">' +
                                        '<span class="openhours">' + StoreHrs + '</span>' +
                                    '</div>' +
                                '</dd>' +
                            '</dl>';
        jQuery("#dvDirStoreHours").html(sStoreHours);

        // GPS Coordinates
        var sGPSCoord = '<dl>' +
                                '<dt>GPS Coordinates</dt>' +
                                '<dd class="gps_location">latitude: ' + DirectionsManager.StoreDetail.storelatitude + '</dd>' +
                                '<dd class="gps_location">longitude: ' + DirectionsManager.StoreDetail.storelongitude + '</dd>' +
                            '</dl>';
        jQuery("#gps_coordinates").html(sGPSCoord);

        //End Address
        var EndAdd = '<span class="title">End Address:</span><br />' +
                        '<span class="address">' + DirectionsManager.StoreDetail.storeaddress + '<br></span>' +
                        '<span class="address">' + DirectionsManager.StoreDetail.storecity + ',&nbsp;' + DirectionsManager.StoreDetail.storesubdivision + '&nbsp;' + DirectionsManager.StoreDetail.storepostalcode + '<br></span>';
        jQuery("#tdEndAddress").html(EndAdd);

        //Start Address
        var StartAdd = '<span class="title">Start Address:</span><br />' +
                        '<span class="address">' + DirectionsManager.StoreDetail.storeaddress + '<br></span>' +
                        '<span class="address">' + DirectionsManager.StoreDetail.storecity + ',&nbsp;' + DirectionsManager.StoreDetail.storesubdivision + '&nbsp;' + DirectionsManager.StoreDetail.storepostalcode + '<br></span>';
        jQuery("#tdStartAddress").html(StartAdd);
    },

    pushpinMouseOver: function (e) {
        //Hide Infobox
        DirectionsManager.HideInfoBox();
        var sTitle = '';
        var sDesc = '';
        var pixel = '';
        var entity_id = e.target.getId();

        if (entity_id == "pushpin_A") {
            //Start Location
            sTitle = "Start";
            var ItiItem = DirectionsManager.ItineraryItems[0];
            sDesc = ItiItem.instruction.text;
            pixel = DirectionsManager.mapDirections.tryLocationToPixel(new Microsoft.Maps.Location(ItiItem.maneuverPoint.coordinates[0], ItiItem.maneuverPoint.coordinates[1]), Microsoft.Maps.PixelReference.page);
            jQuery("#dvInfobox").attr('style', 'visibility: visible; top: ' + (pixel.y - 58) + 'px; left: ' + (pixel.x + 8) + 'px; opacity: 1;');
            jQuery("#dvEro-beak").attr('style', 'top: 30px;');
        }
        else if (entity_id == "pushpin_B") {
            //End Location
            sTitle = "End";
            var ItiItem = DirectionsManager.ItineraryItems[DirectionsManager.ItineraryItems.length - 1];
            sDesc = ItiItem.instruction.text;
            pixel = DirectionsManager.mapDirections.tryLocationToPixel(new Microsoft.Maps.Location(ItiItem.maneuverPoint.coordinates[0], ItiItem.maneuverPoint.coordinates[1]), Microsoft.Maps.PixelReference.page);
            jQuery("#dvInfobox").attr('style', 'visibility: visible; top: ' + (pixel.y - 60) + 'px; left: ' + (pixel.x + 8) + 'px; opacity: 1;');
            jQuery("#dvEro-beak").attr('style', 'top: 30px;');
        }
        else if (entity_id.indexOf("pushpinDir") > -1) {
            //Turns
            sTitle = "Step " + entity_id.substring(10);
            var ItiItem = DirectionsManager.ItineraryItems[entity_id.substring(10)];
            sDesc = ItiItem.instruction.text;
            pixel = DirectionsManager.mapDirections.tryLocationToPixel(new Microsoft.Maps.Location(ItiItem.maneuverPoint.coordinates[0], ItiItem.maneuverPoint.coordinates[1]), Microsoft.Maps.PixelReference.page);
            jQuery("#dvInfobox").attr('style', 'visibility: visible; top: ' + (pixel.y - 60) + 'px; left: ' + (pixel.x + 8) + 'px; opacity: 1;');
            jQuery("#dvEro-beak").attr('style', 'top: 30px;');
        }
        else {

            //Show Infobox for current pushpin
            sTitle = DirectionsManager.StoreDetail.storename;
            sDesc = DirectionsManager.StoreDetail.storeaddress + '<br>' + DirectionsManager.StoreDetail.storecity + ", " + DirectionsManager.StoreDetail.storesubdivision + "  " +
                DirectionsManager.StoreDetail.storepostalcode + '<br>' + DirectionsManager.StoreDetail.storephone;
            pixel = DirectionsManager.map.tryLocationToPixel(new Microsoft.Maps.Location(DirectionsManager.StoreDetail.storelatitude, DirectionsManager.StoreDetail.storelongitude), Microsoft.Maps.PixelReference.page);
            jQuery("#dvInfobox").attr('style', 'visibility: visible; top: ' + (pixel.y - 100) + 'px; left: ' + (pixel.x + 8) + 'px; opacity: 1;');
            jQuery("#dvEro-beak").attr('style', 'top: 60px;');
        }

        jQuery("#dvPushPinTitle").empty();
        jQuery("#dvPushPinTitle").append(sTitle);
        jQuery("#dvPushPinBody").empty();
        jQuery("#dvPushPinBody").append(sDesc);


        jQuery("#dvInfobox").show();
        jQuery("#dvPushPinTitle").show();
    },

    pushpinMouseOut: function (e) {
        DirectionsManager.HideInfoBox();
    },

    HideInfoBox: function () {
        jQuery("#dvInfobox").hide();
    },

    ShowInfoBox: function () {
        jQuery("#dvInfobox").show();
    },

    direction_switch: function (ele) {
        if (ele == "From") {
            var Svalue = jQuery("#StartAddress").val();
            jQuery("#EndAddress").val(Svalue);
            jQuery("#dvDirTo").hide();
            jQuery("#dvDirFrom").show();
            DirectionsManager.StoreLocationToFrom = 0;
        }
        else if (ele == "To") {
            var Svalue = jQuery("#EndAddress").val();
            jQuery("#StartAddress").val(Svalue);
            jQuery("#dvDirTo").show();
            jQuery("#dvDirFrom").hide();
            DirectionsManager.StoreLocationToFrom = 1;
        }
    },

    DirectionsClicked: function () {
        var waypoint1 = '';
        var waypoint2 = '';
        DirectionsManager.WayPoints = [];

        if (DirectionsManager.StoreLocationToFrom == 1) {
            if (jQuery('#StartAddress').val() == "") {
                alert("Please provide Start Address");
                return;
            }
            waypoint1 = jQuery('#StartAddress').val();
            waypointAdd = DirectionsManager.StoreDetail.storeaddress + ',' + DirectionsManager.StoreDetail.storecity + ',' + DirectionsManager.StoreDetail.storesubdivision + ',' + DirectionsManager.StoreDetail.storepostalcode;
            waypoint2 = DirectionsManager.StoreDetail.storelatitude + ',' + DirectionsManager.StoreDetail.storelongitude;

            DirectionsManager.WayPoints.push(waypoint1);
            DirectionsManager.WayPoints.push(waypointAdd);
        }
        else {
            if (jQuery('#EndAddress').val() == "") {
                alert("Please provide End Address");
                return;
            }

            waypoint2 = jQuery('#EndAddress').val();
            waypointAdd = DirectionsManager.StoreDetail.storeaddress + ',' + DirectionsManager.StoreDetail.storecity + ',' + DirectionsManager.StoreDetail.storesubdivision + ',' + DirectionsManager.StoreDetail.storepostalcode;
            waypoint1 = DirectionsManager.StoreDetail.storelatitude + ',' + DirectionsManager.StoreDetail.storelongitude;

            DirectionsManager.WayPoints.push(waypointAdd);
            DirectionsManager.WayPoints.push(waypoint2);

        }

        DirectionsManager.GetDirections(waypoint1, waypoint2);


    },

    /*
    Fetched Directions between the point
    warpoint1 - First waypoint
    warpoint2 - Secondwaypoint
    */
    GetDirections: function (waypoint1, waypoint2) {


        var routeRequest = "http://dev.virtualearth.net/REST/v1/Routes?wp.0=" + waypoint1 + "&wp.1=" + waypoint2 + "&routePathOutput=Points&output=json&distanceUnit=mi&key=" + DirectionsManager.MapKey;

        //alert(routeRequest);

        jQuery.ajax({
            url: routeRequest,
            type: 'get',
            dataType: 'jsonp',
            jsonp: 'jsonp',
            success: DirectionsManager.GetDirectionsSuccess,
            error: DirectionsManager.ShowErrorDirection

        });
    },

    /*
    Called when directions are successfully fetched
    */
    GetDirectionsSuccess: function (result, ResponseStatus) {
        if (result && result.resourceSets && result.resourceSets.length > 0 && result.resourceSets[0].resources && result.resourceSets[0].resources.length > 0) {

            // Hide/show divs
            jQuery("#dvDirMapContainer").show();
            jQuery("#dvDirLocMap").hide();


            // Set the map view
            var bbox = result.resourceSets[0].resources[0].bbox;
            var viewBoundaries = Microsoft.Maps.LocationRect.fromLocations(new Microsoft.Maps.Location(bbox[0], bbox[1]), new Microsoft.Maps.Location(bbox[2], bbox[3]));
            DirectionsManager.Drivingoptions = { credentials: DirectionsManager.MapKey,
                mapTypeId: Microsoft.Maps.MapTypeId.auto,
                zoom: 3,
                enableClickableLogo: false,
                enableSearchLogo: false
            };

            DirectionsManager.mapDirections = new Microsoft.Maps.Map(document.getElementById('dvDirectionMap'), DirectionsManager.Drivingoptions);
            DirectionsManager.mapDirections.setView({ bounds: viewBoundaries });

            DirectionsManager.mapDirections.entities.clear();


            // Draw the route
            var routeline = result.resourceSets[0].resources[0].routePath.line;
            var routepoints = new Array();

            for (var i = 0; i < routeline.coordinates.length; i++) {
                routepoints[i] = new Microsoft.Maps.Location(routeline.coordinates[i][0], routeline.coordinates[i][1]);

                //Adding the start and finish pushpin
                if (i == 0) {
                    var options =
					{
					    icon: "/assets/ocp/content/storelocator/111027/start.gif",
					    width: 25,
					    height: 29,
					    zIndex: 1000,
					    typeName: "pushpin_A"
					};
                    var pushpin = new Microsoft.Maps.Pushpin(routepoints[i], options);
                    pushpin._id = "pushpin_A";
                    Microsoft.Maps.Events.addHandler(pushpin, 'mouseover', DirectionsManager.pushpinMouseOver);
                    Microsoft.Maps.Events.addHandler(pushpin, 'mouseout', DirectionsManager.pushpinMouseOut);
                    DirectionsManager.mapDirections.entities.push(pushpin);
                }
                else if (i == (routeline.coordinates.length - 1)) {
                    var options =
					{
					    icon: "/assets/ocp/content/storelocator/111027/stop.gif",
					    width: 25,
					    height: 29,
					    zIndex: 1002,
					    typeName: "pushpin_B"
					};
                    var pushpin = new Microsoft.Maps.Pushpin(routepoints[i], options);
                    pushpin._id = "pushpin_B";
                    Microsoft.Maps.Events.addHandler(pushpin, 'mouseover', DirectionsManager.pushpinMouseOver);
                    Microsoft.Maps.Events.addHandler(pushpin, 'mouseout', DirectionsManager.pushpinMouseOut);
                    DirectionsManager.mapDirections.entities.push(pushpin);
                }

            }

            // Draw the route on the map
            var routeshape = new Microsoft.Maps.Polyline(routepoints, { strokeColor: new Microsoft.Maps.Color(200, 0, 0, 200) });
            DirectionsManager.mapDirections.entities.push(routeshape);


            // Dislaying the Directions
            // clear item list
            rl1 = jQuery("#tdItinerary");
            rl1.empty();

            var header = '<ol start="1" style="margin-top:4px; padding-left:0px;">';
            var sHTML = "";
            sHTML = header;

            var itineraryItems = result.resourceSets[0].resources[0].routeLegs[0]["itineraryItems"];
            DirectionsManager.ItineraryItems = [];
            DirectionsManager.ItineraryItems = itineraryItems;
            for (var i = 0; i < itineraryItems.length; i++) {
                var val = parseFloat(itineraryItems[i].travelDistance);
                var dec = 2;
                var sFirst = '';
                var sOddEven = '';
                var index = i;

                //Display Pushpins
                if (i > 0) {
                    var location = new Microsoft.Maps.Location(itineraryItems[i].maneuverPoint.coordinates[0], itineraryItems[i].maneuverPoint.coordinates[1]);
                    var options = {
                        icon: "/assets/ocp/content/storelocator/111027/Store_locator_popup_direction_icon.gif",
                        width: 20,
                        height: 20,
                        zIndex: 1001,
                        text: i + "",
                        typeName: "dirPushpin"
                    };
                    var pushpin = new Microsoft.Maps.Pushpin(location, options);
                    pushpin._id = "pushpinDir" + i;
                    Microsoft.Maps.Events.addHandler(pushpin, 'mouseover', DirectionsManager.pushpinMouseOver);
                    Microsoft.Maps.Events.addHandler(pushpin, 'mouseout', DirectionsManager.pushpinMouseOut);
                    DirectionsManager.mapDirections.entities.push(pushpin);
                }

                if (i == 0) {
                    sFirst = ' first';
                    index = '&nbsp;';
                }

                if (i % 2 == 0)
                    sOddEven = ' even';
                else
                    sOddEven = ' odd';

                var Divbody = '<li class="directions' + sOddEven + '">' +
                            '<table><tr><td valign="top" class="directions_pushpins' + sFirst + '">' + index + '</td>' +
                            '<td valign="top" class="directions_text">' + itineraryItems[i].instruction.text + '</td>' +
                            '<td valign="top" class="directions_distance"> ' + Math.round(val * Math.pow(10, dec)) / Math.pow(10, dec) + ' mi</td></tr></tbody></table></li>';

                sHTML += Divbody;
            }

            var footer = '</ol>';
            sHTML += footer;
            rl1.append(sHTML);



            // Displaying the total distance and time
            var TotDist = result.resourceSets[0].resources[0].travelDistance;
            var TotTime = result.resourceSets[0].resources[0].travelDuration;

            var Hr = Math.floor(TotTime / (60 * 60));
            var divisor_for_minutes = TotTime % (60 * 60);
            var Min = Math.floor(divisor_for_minutes / 60);
            var divisor_for_seconds = divisor_for_minutes % 60;
            var sec = Math.ceil(divisor_for_seconds);

            var sTime = '';
            if (Hr > 0) {
                sTime = Hr + ':' + Min + ' Hrs';
            }
            else if (Min > 0) {
                sTime = Min + ':' + sec + ' Mins';
            }
            else {
                sTime = sec + ' Secs';
            }


            var sStartText = DirectionsManager.WayPoints[0] + '<br>' +
                             '<span class="directions_distance_wrapper"><span class="directions_distance_total">' + Math.round(TotDist * Math.pow(10, 2)) / Math.pow(10, 2) + ' mi</span>' +
                             '<span class="directions_time">(Approximate Time ' + sTime + ')</span>' +
                             '</span>';

            jQuery("#tdStart").html(sStartText);

            jQuery("#tdEnd").html(DirectionsManager.WayPoints[1] + '<br>');

        }else {
            alert("The location you entered cannot be found.");
        }

    },

    /*
    Displaye error when directions are not successfully fetched
    */
    ShowErrorDirection: function () {
        alert("Directions could not be fetched. Please try again later.");
    },

    Print: function () {
        window.print();
    }
} ;