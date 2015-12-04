if (!YAHOO.ebauer) {
	YAHOO.namespace("ebauer");
}

/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
	FUNDAMENTAL MODAL CODE
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

YAHOO.ebauer.transitions = function() {

	//	escape if less than ideal environment
	if (!document.getElementById) {
		return;
	}

	//	establish shortcuts to YAHOO
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;
	var $ = $D.get;
	//	swapHtml vars
	var dir = getModalsdir();
	var url = "";
	var ele = "layerbox";
	var overlayEle = "layer_overlay";
	var overrideEle = "";
	var div = "";
	var idx = -1;
	var overlayIsOpen = false; //toggle for overlay (size charts, hemming info, etc...

	//	______
	//	PUBLIC
	return {
		onTransitionComplete: new YAHOO.util.CustomEvent( "onTransitionComplete" ),
	// onTransitionComplete will correct the position of the automatic iframe once the transition is finished, the iframe is used only in IE6

		handleSuccess : function(o) {
			var successDiv = div;
			if (o.responseText != undefined) {
				if (o.argument == "overlay")
					successDiv = $(overlayEle);
				if (o.argument == "override")
					successDiv = $(overrideEle);
				successDiv.innerHTML = o.responseText;
				if (YAHOO.ebauer.productUtils.productPageMode)
					YAHOO.util.Event.onContentReady("dash", YAHOO.ebauer.productUtils.loadStandalone);
				YAHOO.ebauer.transitions.onTransitionComplete.fire();
			}
			if (o.argument != "overlay") {
				//don't remove the background color of the sizechart overlays
				
				$D.setStyle(successDiv,'background-color','transparent');
			}			
			//jQuery('.tabs').tabs();// assign jquery tabs to sizeModule			
			$j('.sizeModule').sizecharts();
			// assign jquery tabs to sizeModule
			$j('a.viewSize').live('click', function(e) {// assign jquery click for viewSize		
				if( $j(this).attr("id") == "ViewInches"){
					$j('.inches').removeClass('hide').addClass('show');		
					$j('.centimeters').removeClass('show').addClass('hide');		
				}else{		
					$j('.inches').removeClass('show').addClass('hide');		
					$j('.centimeters').removeClass('hide').addClass('show');	
				}
				e.preventDefault(); // stop on click href
			});
			// assign jquery view Hem Styles sizeModule
			$j('a.viewHemStyles').live('click', function(e) {// assign jquery click for viewHemStyles					
				$j('.sizeModule').sizecharts({selectedTab:4});
				e.preventDefault(); // stop on click href
			});			
			
		},

		handleFailure : function(o) {
			if (o.responseText != undefined) {
				div.innerHTML = "<ul><li>Transaction id: " + o.tId + "</li>";
				div.innerHTML += "<li>HTTP status: " + o.status + "</li>";
				div.innerHTML += "<li>Status code message: " + o.statusText + "</li></ul>";
			}
		},

		makeRequest : function(arg) {
			var requestObject;
			if (typeof(arg) != "undefined") {
				requestObject = {
					success : YAHOO.ebauer.transitions.handleSuccess,
					failure : YAHOO.ebauer.transitions.handleFailure,
					argument : arg
				};
			}
			else {
				requestObject = {success : YAHOO.ebauer.transitions.handleSuccess, failure : YAHOO.ebauer.transitions.handleFailure};
			}
			var cLog = global.jquery.utils.common.consoleLog;
			//Departments
			if (url.match){
				cLog('url: ' + url);
				if($j("body").hasClass("EB") && $j("#dossier").hasClass("EB")){
					url += "&siteProductRef=EB";
				}
				else if($j("body").hasClass("FA") && $j("#dossier").hasClass("FA")){
					url += "&siteProductRef=FA";
				}
				else if($j("body").hasClass("EB") && $j("#dossier").hasClass("FA")){
					url += "&siteProductRef=FA";
				}
				else{
					url += "&siteProductRef=EB";
				}
			}
			cLog('url: ' + url);
			var request = YAHOO.ebauer.utilities.asyncRequest('GET', url, requestObject);
			
		},

		wipeLayer : function() {
			div = $(ele);
			div.innerHTML = "&nbsp;";
			YAHOO.ebauer.productUtils.infoModuleComplete = false;
			$D.setStyle(div,'background-color','white');
		},

		swapHtml : function(transObj, passedIdObj) {
			shownEnsembleId = ensembleId;
			var shownCategoryId = categoryId;
			var shownColorId = colorId;
			var shownCategoryName;
			var thisPathInfo = pathInfo;
			var thisCatPath = catPath;
			var thisCs = cs;
         //Added for BUG 0963
         var thisImageName = imageName;
         var thisImageTypeCode = imageTypeCode;
         var requestArg;
			if (passedIdObj != undefined) {
				if (passedIdObj.divOverride){
					overrideEle = passedIdObj.divOverride;
					var overrideObj = $(overrideEle);
					overrideObj.innerHTML = "&nbsp;";
					requestArg = "override";
				}

				if (passedIdObj.itemRemoved) {
					var passedBag = passedIdObj;
				}

				if (passedIdObj.ensembleId) {
					shownEnsembleId = passedIdObj.ensembleId;
					if (ensembleId == "") {
						ensembleId = shownEnsembleId;
						// this will set the global var if it's not already set, as in a completer call from the cart
					}
				}

				if (passedIdObj.itemUUID) {
					YAHOO.ebauer.productUtils.passedItemUUID = passedIdObj.itemUUID;
				}

				if (passedIdObj.catId) {
					shownCategoryId = passedIdObj.catId;
				}

				if (passedIdObj.catName) {
					shownCategoryName = passedIdObj.catName;
				}
			}

			if (transObj == undefined || transObj == "") {
				return;
			}
			else if (transObj.path) {

				var transPath = transObj.path;
				if (transPath != undefined) {

					url = dir + transPath + "?";

                    if (transObj.name == "content") {
						url += "sectionId=" + passedIdObj.sectionId + "&sectionName=" + passedIdObj.sectionName;
					}
					else if (transPath == "eob_dossier.jsp") {
						url += YAHOO.ebauer.productUtils.queryString;
						//added for BUG 0963
						if (shownColorId != undefined)
							url += "&colorId=" + shownColorId;
						
						if (thisImageName != undefined)
							url += "&imageName=" + thisImageName;
                  if (thisImageTypeCode != undefined)
							url += "&imageTypeCode=" + thisImageTypeCode;
					}
					else if (queryString != undefined && queryString != null && queryString != "") {
						url += "ensembleId=" + shownEnsembleId + "&" + queryString;

						if (shownColorId != undefined)
							url += "&colorId=" + shownColorId;

                  //added for BUG 0963
                  if (thisImageName != undefined)
							url += "&imageName=" + thisImageName;
                  if (thisImageTypeCode != undefined)
							url += "&imageTypeCode=" + thisImageTypeCode;
                  if (thisPathInfo != undefined)
							url += "&pathInfo=" + thisPathInfo;
                  if (thisCs && thisCs != undefined && thisCs != "undefined")
								url = url + "&cs=" + thisCs;
               }
					else if (transObj.name == "giftcard") {
						url += "ensembleId=" + passedIdObj.ensembleId + "&colorId=" + passedIdObj.colorId + "&colorName=" + passedIdObj.colorName;
					}
					else {
						url += "ensembleId=" + shownEnsembleId;

						if (shownCategoryId != undefined)
							url += "&categoryId=" + shownCategoryId;

						if (shownCategoryName != undefined)
							url += "&categoryName=" + shownCategoryName;

						if (shownColorId != undefined)
							url += "&colorId=" + shownColorId;

                  //added for BUG 0963
                  if (thisImageName != undefined)
							url += "&imageName=" + thisImageName;
                  if (thisImageTypeCode != undefined)
							url += "&imageTypeCode=" + thisImageTypeCode;

                  if (thisPathInfo != undefined)
							url += "&pathInfo=" + thisPathInfo;

						if (thisCatPath != undefined)
							url += "&catPath=" + thisCatPath;

						if (thisCs != undefined)
							url += "&cs=" + thisCs;
					}
					if (YAHOO.ebauer.productUtils.productPageMode) {
						top.location.hash = "ymalEnsembleId=" + shownEnsembleId;
					}
					YAHOO.ebauer.transitions.makeRequest(requestArg);
				}
			}
			else if (transObj.functionName) {
				if (passedBag) {
					transObj.functionName(passedBag);
				} else {
					transObj.functionName();
				}
				YAHOO.ebauer.transitions.onTransitionComplete.fire();
			}
		},

		wipeOverlay : function() {
			var overlayEl = $('layer_overlay');
			overlayEl.innerHTML = "&nbsp;";
		},

		addOverlayHtml : function(transObj, passedIdObj) {
			var openOverlayUrl = url; //used to see if the requested content layer is already open from another link
			if (transObj.path) {
				var transPath = transObj.path;
				if (transPath != undefined) {
					url = dir + transPath + "?";
					if (transObj.name == "content") {
						url += "sectionId=" + passedIdObj.sectionId + "&sectionName=" + passedIdObj.sectionName;
					}
						YAHOO.ebauer.transitions.makeRequest('overlay');
				}
			}
			else if (transObj.functionName) {
				transObj.functionName();
			}
		},

		transitionContentPage : function(sectionId, sectionName) {
			var configObj = YAHOO.ebauer.layerbox.getConfigObject('content');
			if (overlayIsOpen) {
				// if the overlay is open, swap the overlay html
				YAHOO.ebauer.transitions.addOverlayHtml(configObj,{sectionId:sectionId,sectionName:sectionName});
			}
			else {
				// otherwise swap the layerbox html
				YAHOO.ebauer.transitions.swapHtml(configObj,{sectionId:sectionId,sectionName:sectionName});				
			}
		},

		changeOverlay : function(dummyVar,dummyVar2,passedOverlayStr) {
			var passedIdObj = json.parse(passedOverlayStr);
			var formatStr = passedIdObj.formatStr;
			YAHOO.ebauer.layerbox.overlay(formatStr,passedIdObj);
		},

		transitionOverlay : function(passedOverlayStr) {
			var overlayEl = $('layer_overlay');
			var containerHeightDiv = $('canvas-palette-wrap');
			var topOffset = 0; //was set to 40, to leave space for the close button to show thru
			if (containerHeightDiv != undefined) {
				var containerHeight = containerHeightDiv.offsetHeight;
				var overlayHeight = containerHeight - topOffset; 
				overlayEl.style.bottom = '0px';
				var overlayAnim = new YAHOO.util.Anim('layer_overlay');
				if (overlayIsOpen) {//close overlay
					overlayAnim.attributes.height = { to: 0 };
					overlayAnim.onComplete.subscribe(YAHOO.ebauer.transitions.wipeOverlay);					
					//if (typeof(passedOverlayStr) != "undefined" && passedOverlayStr != null && passedOverlayStr != "")
					//	overlayAnim.onComplete.subscribe(YAHOO.ebauer.transitions.changeOverlay,passedOverlayStr,true);						
				}
				else //open overlay
					overlayAnim.attributes.height = { to: overlayHeight };
					overlayAnim.duration = 0.4;
					overlayAnim.animate();
					overlayIsOpen = !overlayIsOpen;			
					
			}
		},

		checkOverlayStatus : function() {
			return overlayIsOpen;
		},

		launch : function(e, el) {
			var elTarget;
			if (e) {
				//	call is from a listener
				elTarget = YAHOO.util.Event.getTarget(e);
				$E.stopEvent(e);
			} else if (el) {
				//	call is from a hijack
				elTarget = el;
			}

			if (elTarget) {
				var str = elTarget.getAttribute("id");
				var txt = document.createTextNode(str.substring(str.lastIndexOf("_") + 1));
				var img = elTarget.getElementsByTagName("IMG")[0].cloneNode(false);
				this.modal.setBody(img);
				this.modal.appendToBody(txt);
				this.modal.show();
			}
		}
	};
}();


/**
 * Works the same way as onAvailable, but additionally checks the
 * state of sibling elements to determine if the content of the
 * available element is safe to modify.
 *
 * @method onContentReady
 *
 * @param {string}   p_id the id of the element to look for.
 * @param {function} p_fn what to execute when the element is ready.
 * @param {object}   p_obj an optional object to be passed back as
 *                   a parameter to p_fn.
 * @param {boolean}  p_override If set to true, p_fn will execute
 *                   in the scope of p_obj
 *
 * @static
 */


