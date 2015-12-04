/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
Article: Category Click Intercept
Comment: Expects Yahoo Framework
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

if ( !YAHOO.ebauer ) YAHOO.namespace("ebauer");

/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
	AN ANCHOR INTERCEPT
	Prior to complete Dom parse and LayerBox init,
	this code will place a load meter at the
	event target and then poll the page load.
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

YAHOO.ebauer.intercept = function() {

//	escape if less than ideal environment
	if(!document.getElementById){ return; }

//	_______
//	PRIVATE

//	establish shortcuts to YAHOO
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;

//	emulate prototype $()
//	though use anonymous array when multiples, $(['a','b',c])
	var $ = $D.get;

	var getHref = function(elTarget, relValue) {
		var href = null;
		var relMatches = false;

		if (elTarget && relValue) {
			if ("AREA" == elTarget.nodeName) {
				var areaAtts = elTarget.attributes;
				var attLen = areaAtts.length;
				for (var i = 0; i < attLen; i++) {
					if (areaAtts[i].value.indexOf(relValue) > -1) {
						relMatches = true;
						break;
					}
				}
			} else if ("IMG" == elTarget.nodeName) {
				if (elTarget.rel && elTarget.rel.indexOf(relValue) > -1) {
					relMatches = true;
				} else {
					// in cases where the IMG is wrapped by an A, this will check the IMG tag first and then check the parent A tag
					return getHref(elTarget.parentNode, relValue);
				}
			}

			if ("A" == elTarget.nodeName) {
				if ($D.hasClass(elTarget, "cmPoseClick") || $D.hasClass(elTarget, "cmTextClick")) {
					relMatches = false; //let cell events handle the click
				} else {
					if (elTarget.rel) {
						if (elTarget.rel.indexOf(relValue) > -1) {
							relMatches = true;
						}
					}
				}
			}

			if (relMatches) {
				href = elTarget.href;

				//Added for BUG 0963
				try {
					var areaAtts = elTarget.attributes;
					var attLen = areaAtts.length;
					for (i = 0; i < attLen; i++) {
						if (areaAtts[i].name == 'colorid') {
							colorId = areaAtts[i].value;
						}
						if (areaAtts[i].name  == 'imagename') {
							imageName = areaAtts[i].value;
						}
						if (areaAtts[i].name == 'imagetypecode') {
							imageTypeCode = areaAtts[i].value;
						}
						if (areaAtts[i].name == 'contentname') {
							contentName = areaAtts[i].value;
						}
					}
				} catch(eX){
					//alert(eX)
				}
			}
		}

		return href;
	};

	var setReferralURL = function(href) {
		//If cmRef present and value is N , update REFERRAL_URL cookie, indicates request coming from content/billboard
		if (href.indexOf('cmRef=') > -1) {
			var tempRef = href.substring(href.indexOf("cmRef=") + "cmRef=".length);
			var refIndex = tempRef.indexOf("&");
			var cmRef = "";
			if (refIndex != -1) {
				cmRef = tempRef.substring(0, refIndex);
			} else {
				cmRef = tempRef;
			}
		}
	};

	var setCmCg = function(tempPid) {
		if (tempPid.indexOf('cm_cg=') > -1) {

			var tempPathInfo = tempPid.substring(tempPid.indexOf("cm_cg=") + "cm_cg=".length);
			var cmCgStartIndex = tempPid.indexOf('cm_cg=');
			var cmCgEndIndex = tempPathInfo.indexOf("&");
			if (cmCgStartIndex != -1 && cmCgEndIndex > cmCgStartIndex) {
				pathInfo = tempPid.substring(cmCgStartIndex + "cm_cg=".length, cmCgEndIndex);
			} else {
				pathInfo = tempPathInfo;
			}
		}
		if (GetCookie("CMCG") != "" && GetCookie("CMCG") != null) {
			pathInfo = GetCookie("CMCG");
		}
	};

	var waitingProduct = function(e, href) {
		if (href) {
			var pid = getRequestParameter(href, 'ensembleId');
			pid = (pid == '') ? (getRequestParameter(href, 'productId')) : pid;
			if (pid != '') {
				$E.stopEvent(e); // (stop normal browser functionality)
				setCmCg(pid);
				YAHOO.ebauer.layerbox.transition('product', {ensembleId : pid});
			}
		}
	};

	var waitingLogin = function(e, href) {
		if (href) {
			//	(stop normal browser functionality)
			$E.stopEvent(e);
			YAHOO.ebauer.loginUtils.checkLoginLevel(false, href);
		}
	};

	var waiting = function(e) {
		var elTarget = $E.getTarget(e);
		//check if this is a dl.cell click, if it is we should ignore it here and let cellevents handle it
		//this should probably be consolidated at some point
		if (elTarget && elTarget.nodeName != 'DL' && elTarget.id.indexOf("cell_") == -1) {
			var href = getHref(elTarget, 'layerbox');

			if (href) {
				setReferralURL(href);
				waitingProduct(e, href);
			} else {
				href = getHref(elTarget, 'login');
				if (href) {
					setReferralURL(href);
					waitingLogin(e, href);
				}
			}
		}
	};

//	______
//	PUBLIC

	return {
		init : function() {
			$E.on("content", "click", waiting);
			$E.on("above", "click", waiting);
			$E.on("below", "click", waiting);
            $E.on("layerbox", "click", waiting);
		},

		proof : function() {
			$E.removeListener("content","click", waiting);
			$D.setStyle("wait","display","none");
		},

		contentClickHandler : function(e) {
			//get the resolved (non-text node) target:
			var elTarget = $E.getTarget(e);
			while (elTarget != null && (elTarget.id != "topNavLinks" || elTarget.id != "footNavLinks")) {
				if(elTarget.nodeName.toUpperCase() == "A") {
					var origPath = elTarget.href;
					if (origPath == null) {
						//this is not a link
						break;
					}
					if (elTarget.target && elTarget.target == "_blank") {
						//the target is a new window, so we don't need to warn them
						break;
					}
					if (origPath.indexOf(location.href) >= 0) {
						//this is just an anchor to somewhere else on the same page
						break;
					}
					if (origPath.indexOf("javascript:") >= 0) {
						//javascript function
						break;
					}
					$E.stopEvent(e);
					var warnPath = getSecureBaseURL() + "/checkout/create_account_warn.jsp?dest=";
					var env = elTarget.attributes.env ? elTarget.attributes.env.value : null;

					if (env != null)
						warnPath += origPath + "&env=" + env;
					else
						warnPath += origPath;

					location.href = warnPath;
					break;
				} else {
					elTarget = elTarget.parentNode;
				}
			}
		}

	};
}();
//	pass the namespace object as scope,
//	then pass true to use 'this' scope within namespace
//YAHOO.util.Event.onDOMReady(YAHOO.ebauer.intercept.init, YAHOO.ebauer.intercept, true);

//Enables the redirect to the checkout warning page if a user clicks on a header or footer link while in an unsaved session
//YAHOO.util.Event.onDOMReady( function() {
//       YAHOO.util.Event.on("topNav", "mouseover", topnavEventShow); // add interceptor on mouseover topNav names
//        YAHOO.util.Event.on("topNav", "mouseout", topnavEventHide); // add interceptor on mouseout topNav names	        
//        if (YAHOO.util.Dom.get("isCheckoutWarnNeeded").value == "true") {
//        	YAHOO.util.Event.on("topNavLinks", "click", YAHOO.ebauer.intercept.contentClickHandler);
//        	YAHOO.util.Event.on("footNavLinks", "click", YAHOO.ebauer.intercept.contentClickHandler);
//        };
//});