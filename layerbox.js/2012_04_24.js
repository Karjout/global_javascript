/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
Project: Remediation
Article: Layerbox (fundamental modal code)
Comment: Expects Yahoo Framework
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

if (!YAHOO.ebauer) {
	YAHOO.namespace('ebauer');
}

/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
	FUNDAMENTAL MODAL CODE
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

YAHOO.ebauer.layerbox = function() { //	escape if less than ideal environment
	if (!document.getElementById) {
		return;
	}
	//	PRIVATE
	//	establish shortcuts to YAHOO
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;
	var $ = $D.get;
	var configObj = new Array();
//	configObj['added'] = {name:"added", width:593, height:445, cmPageName:'/js/eb/item_added_to_cart.js',functionName:function() {prepareItemForm(YAHOO.ebauer.productUtils.isEOBProduct);}};
    configObj['added'] = {name:"added", width:593, height:445, cmPageName:'/js/eb/item_added_to_cart.js (Interstitial Page)',functionName:function() {prepareItemForm(YAHOO.ebauer.productUtils.isEOBProduct);}};
    //TSK01145 - Remvoe KIOSK: from Coremetrics tracking
    configObj['addedFromKiosk'] = {name:"addedFromKiosk", width:593, height:445, cmPageName:'/js/eb/item_added_to_cart.js (Interstitial Page)',functionName:function() {prepareItemForm(YAHOO.ebauer.productUtils.isEOBProduct);}};
	configObj['addedToWishList'] = {name:"addedToWishList", width:593, height:445, cmPageName:'/js/eb/item_added_to_wishlist.js',functionName:function() {prepareWishListItemForm(YAHOO.ebauer.productUtils.isEOBProduct);}};
	configObj['buyanother'] = {name:"product", width:593, height:445, cmPageName:'/js/eb/productdata.js', path:"dossier.jsp"};
	configObj['content'] = {name:"content", width:970, height:430, cmPageName:'', path:"get_product_info.jsp"};
	configObj['eobproduct'] = {name:"product", width:970, height:540, cmPageName:'/js/eb/productdata.js', path:"eob_dossier.jsp"};
	configObj['giftbox'] = {name:"giftbox", width:475, height:520, cmPageName:'/js/eb/giftbox.js', functionName:function() {createGiftBox(YAHOO.ebauer.productUtils.passedItemUUID, YAHOO.ebauer.productUtils.siteCss);}};
	configObj['monogram'] = {name:"monogram", width:593, height:590, cmPageName:'/js/eb/monogram.js', functionName:function() {loadMonogramDetailsForItem(YAHOO.ebauer.productUtils.passedItemUUID, YAHOO.ebauer.productUtils.siteCss);}};
	configObj['moreinfo'] = {name:"moreinfo", width:593, height:550, cmPageName:'', path:"more_info.jsp"};
	configObj['benefits'] = {name:"benefits", width:475, height:500, cmPageName:'', path:"modal_benefits.jsp"};
	configObj['giftcard'] = {name:"giftcard", width:400, height:300, cmPageName:'/js/eb/giftbox.js', path:"modal_giftcard.jsp"};
	configObj['product'] = {name:"product", width:970, height:540, cmPageName:'/js/eb/productdata.js', path:"dossier.jsp"};
	configObj['removed'] = {name:"removed", width:593, height:450, cmPageName:'/js/eb/removed_item_from_cart.js', functionName:function(bag) {updatedShoppingBag(bag);}};
	configObj['soldout'] = {name:"soldout", width:520, height:140, cmPageName:'/js/eb/productdata.js', functionName:function() {YAHOO.ebauer.checkout.createSoldOutLayer();}};
	configObj['login'] = {name:"login", width:475, height:520, cmPageName:'/js/eb/login.js', functionName:function() {YAHOO.ebauer.loginUtils.createLoginLayer();}};

	var modalAnim;
	var currentState = "";// holds the current configObj, used to calculate top and left changes for transitions
	var newName = "";
	var masked = false;
	var newLeft = 0; var newTop = 0; var newWidth = 0; var newHeight = 0;
	var startingLeft = 0; var startingTop = 0; baseStartWidth = 100; baseStartHeight = 100;
	var iFrameLayer = null; // holds the automatic iframe element built by the modal while in IE6

	var setIFrame = function() {
		//if the iFrame shim is in use behind layerbox (defualt behavior for IE6)
		if (YAHOO.ebauer.layerbox.modal.iframe) {
			iFrameLayer = YAHOO.ebauer.layerbox.modal.iframe;
			iFrameLayer.setAttribute('id','layerboxIFrame');
			YAHOO.ebauer.transitions.onTransitionComplete.subscribe(correctIFrame);
			}
	};

	var correctIFrame = function() {
		// makes sure the invisible iframe built by the modal for ie6 is in sync with the layer position
		iFrameLayer.style.width = newWidth;
		iFrameLayer.style.height = newHeight;
		$D.setY('layerboxIFrame',newTop);
		$D.setX('layerboxIFrame',newLeft);
	};

	var getLayerTypeFromURL = function() {
		var href = window.location.href;
		var pplState = href.split('ppl=');
		if (pplState.length > 1) {
			pplState = unescape(pplState[1]);
			eval("var pplObj="+ pplState);
			return pplObj.type;
		}
		else
			return null;
	};

	var addLayerboxMaskListener = function() {
		//	APPLY HIDE EVENT TO MASK HERE
		// This prevent the layer from being closed prematurely, causing some JS errors
		if (!masked) {
			masked = true;
			var mask = $('layerbox_mask');
			$E.addListener(mask, 'mousedown', YAHOO.ebauer.layerbox.hideLayer);
			mask.style.cursor = 'pointer';
		}
	};

	var removeLayerboxMaskListener = function() {
		//	APPLY HIDE EVENT TO MASK HERE
		// This prevent the layer from being closed prematurely, causing some JS errors
		if (masked) {
			masked = false;
			var mask = $('layerbox_mask');
			$E.removeListener(mask, 'mousedown');
			mask.style.cursor = 'default';
		}
	};

	var editModalListeners = function(newName) {
		var currentName = "";
		
		if (currentState != "") {
			//remove the previous listeners
			currentName = currentState.name;
			if (currentName == "giftbox") {  //submitGiftBox,cancelGiftBox,continueWithout
				$E.removeListener('cancelGiftBox', 'click', YAHOO.ebauer.layerbox.cancelClickCallback);
				$E.removeListener('continueWithout', 'click', YAHOO.ebauer.layerbox.continueWithoutGiftBox);
			}
			if (currentName == "monogram") {  //submitGiftBox,cancelGiftBox,continueWithout
				$E.removeListener('cancelMonogram', 'click', YAHOO.ebauer.layerbox.cancelClickCallback);
				$E.removeListener('continueWithout', 'click', YAHOO.ebauer.layerbox.continueWithoutMonogram);
			}
			if (currentName == "product") {  //submitGiftBox,cancelGiftBox,continueWithout
				$E.removeListener('goBack', 'click', YAHOO.ebauer.layerbox.hideLayer);
				$E.removeListener('canvas-palette-wrap', 'mouseover');
			}
			if (currentName == "added" || currentName == "addedFromKiosk") {  //buyAnother,addeditGiftbox,goBack
				$E.removeListener('checkoutButton', 'click', showNextPage);
				$E.removeListener('goBackFromAdded', 'click');
			}
			if (currentName == "addedToWishList") {  //buyAnother,addeditGiftbox,goBack
				$E.removeListener('goBackFromAdded', 'click');
			}

			if (currentName == "removed") {  //buyAnother,addeditGiftbox,goBack
				$E.removeListener('checkoutButton', 'click', showNextPage);
				$E.removeListener('goBackFromRemoved', 'click', YAHOO.ebauer.layerbox.hideLayer);
			}

			if (currentName == "login") {
				$E.removeListener('cancelLogin', 'click');
			}
		}


		
		var backToFormat = "product";
		if (YAHOO.ebauer.productUtils.isEOBProduct)
			backToFormat = "eobproduct";

		if (newName != undefined || newName != ''){
			addLayerboxMaskListener();   // If you come into layer after the login layer, then you may want to add this listener.
		}
		//BUG01603: Reload parent page for all close buttons except product page
		if (YAHOO.ebauer.productUtils.productPageMode) {
			$E.addListener('closeButtonId', 'click', YAHOO.ebauer.layerbox.hideLayer);
		}
		else {
			$E.addListener('closeButtonId', 'click', reloadParentPage);
		}
		if (newName == "giftbox") {  //submitGiftBox,cancelGiftBox,continueWithout
			if (YAHOO.ebauer.productUtils.productPageMode)
				$E.addListener('cancelGiftBox', 'click', YAHOO.ebauer.layerbox.hideLayer);
			else
				$E.addListener('cancelGiftBox', 'click', YAHOO.ebauer.layerbox.cancelClickCallback, backToFormat, false);
			$E.addListener('continueWithout', 'click', YAHOO.ebauer.layerbox.continueWithoutGiftBox);
		}

		if (newName == "monogram") {  //submitGiftBox,cancelGiftBox,continueWithout
			if (YAHOO.ebauer.productUtils.productPageMode)
				$E.addListener('cancelMonogram', 'click', YAHOO.ebauer.layerbox.hideLayer);
			else
				$E.addListener('cancelMonogram', 'click', YAHOO.ebauer.layerbox.cancelClickCallback, backToFormat, false);
			$E.addListener('continueWithout', 'click', YAHOO.ebauer.layerbox.continueWithoutMonogram);
		}

		if (newName == "login") {  //submitGiftBox,cancelGiftBox,continueWithout
			if (YAHOO.ebauer.loginUtils.getProductLayerLogin() == true) {
				$E.addListener('cancelLogin', 'click', YAHOO.ebauer.layerbox.cancelClickCallback, backToFormat, false);
				removeLayerboxMaskListener();
			}
		}
		
		if (newName == "product") {  //submitGiftBox,cancelGiftBox,continueWithout
			$E.addListener('goBack', 'click', YAHOO.ebauer.layerbox.hideLayer);
		}

		if (newName == "added" || newName == "addedFromKiosk") {  //buyAnother,addeditGiftbox,goBack
            $E.addListener('checkoutButton', 'click', showNextPage);
            if (YAHOO.ebauer.bagUtils) {
				$E.addListener('goBackFromAdded', 'click',showNextPage);
				$E.removeListener('layerbox_mask');
				$E.addListener('layerbox_mask', 'click',showNextPage);
				$E.addListener('closeButtonId', 'click', reloadParentPage);				
				}
			else if (YAHOO.ebauer.productUtils.productPageMode)
				$E.addListener('goBackFromAdded', 'click', YAHOO.ebauer.layerbox.showCategoryFromProductPage);
			else if (getEditReturnType() == 'review') {
				$E.addListener('goBackFromAdded', 'click', reloadParentPage);
				$E.removeListener('layerbox_mask');
				$E.addListener('layerbox_mask', 'click', reloadParentPage);
				$E.addListener('closeButtonId', 'click', reloadParentPage);
				setEditReturnType('');
			} else
				$E.addListener('goBackFromAdded', 'click', YAHOO.ebauer.layerbox.hideLayer);
		}


		if (newName == "addedToWishList") {  //buyAnother,addeditGiftbox,goBack
            $E.addListener('checkoutButton', 'click', showNextPage);
            if (YAHOO.ebauer.bagUtils) {
				$E.addListener('goBackFromAdded', 'click',showNextPage);
				$E.removeListener('layerbox_mask');
				$E.addListener('layerbox_mask', 'click',showNextPage);
				}
			else if (YAHOO.ebauer.productUtils.productPageMode)
				$E.addListener('goBackFromAdded', 'click', YAHOO.ebauer.layerbox.showCategoryFromProductPage);
			else if (getEditReturnType() == 'review') {
				$E.addListener('goBackFromAdded', 'click', reloadParentPage);
				$E.removeListener('layerbox_mask');
				$E.addListener('layerbox_mask', 'click', reloadParentPage);
				setEditReturnType('');
			} else
				$E.addListener('goBackFromAdded', 'click', YAHOO.ebauer.layerbox.hideLayer);
		}

		if (newName == "removed") {  //buyAnother,addeditGiftbox,goBack
			$E.addListener('checkoutButton', 'click', showNextPage);
			$E.addListener('goBackFromRemoved', 'click', YAHOO.ebauer.layerbox.hideLayer);
		}
	};

	var findCenter = function(desiredWidth, desiredHeight) {
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var viewPortWidth = $D.getClientWidth();
		var viewPortHeight = $D.getClientHeight();

		newLeft = (viewPortWidth / 2) - (desiredWidth / 2) + scrollX;
		newTop = (viewPortHeight / 2) - (desiredHeight / 2) + scrollY;
		startingLeft = (viewPortWidth / 2) - (baseStartWidth / 2) + scrollX;
		startingTop = (viewPortHeight / 2) - (baseStartHeight / 2) + scrollY;

		if (viewPortWidth < 810)
			newLeft = newLeft + 20; //offsets the layer when it's bigger that the viewport so that all buttons are visible
	};

	var findInseamFlag = function(el) {
		var id = el.id;
		if (id.indexOf("inseamFlag_")>-1)
			return true;
		else
			return false
	};

	var transitionModal = function(e, formatObj, p_obj) {

		newName = formatObj.name;
		newWidth = formatObj.width;
		newHeight = formatObj.height;

		if (newName == currentState.name) {
			if (newName == "product") {
				// transition from product layer to another product layer delay the load of showProductData until most of dossier has loaded, dash is a div near the bottom of dossier
				YAHOO.util.Event.onContentReady("dash", YAHOO.ebauer.layerbox.showProductData, p_obj, true);
				editModalListeners(newName);
			}
		}
		else {
			findCenter(newWidth, newHeight);

			if (currentState == "") {
				format = {
					width:{from:baseStartWidth,to:newWidth},
					height:{from:baseStartHeight,to:newHeight},
					top:{from:startingTop,to:newTop},
					left:{from:startingLeft,to:newLeft}
				};
			} else {
				format = {
					width:{to:newWidth},
					height:{to:newHeight},
					top:{to:newTop},
					left:{to:newLeft}
				};
			}

			if (newName == "product") {
				// delay the load of showProductData until most of dossier has loaded, dash is a div near the bottom of dossier
				YAHOO.util.Event.onContentReady("dash", YAHOO.ebauer.layerbox.showProductData, p_obj, true);
			}
			if (newName == "monogram")
				YAHOO.util.Event.onContentReady("monogramPreview", YAHOO.ebauer.layerbox.showMonogramData, p_obj, true);
			editModalListeners(newName);
			if (currentState == "") {
				p_obj.modal.show();
			}
			modalAnim = new YAHOO.util.Anim('layerbox_c', format, .3);
			modalAnim.animate();
			currentState = formatObj;
		}

		return false;
	};

	var setCoreMetricsProductData = function() {
		var piValue= '';
        if (getValueFromElement('eob') == 'true') {
			var pid = getValueFromElement('deptIndex') + getValueFromElement('dept') + ' ' + getValueFromElement('firstEffort') + ' ' + getValueFromElement('item');
			piValue = 'T50';
		} else {
			var pid = shownEnsembleId;
			if (YAHOO.ebauer.productUtils.buyAnotherMode === true) {
			    piValue = 'T429P' + pid;
			}  else {
			    piValue = document.forms.productForm.pathInfo.value;
			}
		}

		var tempURL = GetCookie("REFERRAL_URL");

		if (tempURL == '' || tempURL == null) {
			tempURL = GetCookie('PREVIOUS');
		}

		var search = GetCookie("EOB_Search");
        gPathInfo = piValue; // For ShopAction 5 and 9 tags
        if(search != '' && search != null){
			 SetCookie('EOB_Search','',1);
			 cmCreateProductviewTag(pid, document.forms.productForm.name.value, piValue, document.forms.productForm.dept.value, '1', document.forms.productForm.host.value, '', tempURL, pid,"1");
		} else {
			  cmCreateProductviewTag(pid, document.forms.productForm.name.value, piValue, document.forms.productForm.dept.value, '1', document.forms.productForm.host.value, '', tempURL);
		}

		if (YAHOO.ebauer.productUtils.productPageMode) {
			SetCookie('PREVIOUS', document.location.href);
			DelCookie('REFERRAL_URL');
		} else {
			//SetCookie('REFERRAL_URL', document.location.href);
			DelCookie("REFERRAL_URL");
			SetCookie('ebPi',document.forms.productForm.name.value + ' (' + pid + ')');
		}
	};

	//	______
	//	PUBLIC

	return {
		onLayerInit: new YAHOO.util.CustomEvent( "onLayerInit" ),
		init : function() {
			//	THE LAYERBOX ALTERNATIVE
			YAHOO.ebauer.layerbox.modal = new YAHOO.widget.LayerBox('layerbox', {state:0, effect:{effect:YAHOO.widget.ContainerEffect.FADE,duration:0.2}, fixedcenter:false, constraintoviewport:false, underlay:'none', close:false, visible:false, draggable:false, modal:true, width:'auto', height:'100%'} );
			YAHOO.ebauer.layerbox.modal.render('container');
			onCopyTextChange.subscribe(addLayerboxMaskListener);
			setIFrame();
			YAHOO.ebauer.layerbox.onLayerInit.fire();
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
                if (elTarget.pathInfo)
                    pathInfo = elTarget.pathInfo;
                if (elTarget.colorId)
                    colorId = elTarget.colorId;
                if (elTarget.imageName)
                    imageName = elTarget.imageName;
                if (elTarget.imageTypeCode)
                    imageTypeCode = elTarget.imageTypeCode;
                if (elTarget.cs)
                    cs = elTarget.cs;
                if (elTarget.catPath)
                    catPath = elTarget.catPath;
                if (elTarget.ensembleIsSet)
                    ensembleIsSet = elTarget.ensembleIsSet;
			}

			if (elTarget) {
				if (!ensembleId)
					ensembleId = elTarget.id;
				var ensPrefix = (ensembleId + '').substring(0, 5);
				//convert to string then get first 5 characters
				if (ensPrefix == "cell_")
					ensembleId = ensembleId.substring(5);
				if (parentEnsembleId == -1)
					parentEnsembleId = ensembleId;
            var tempPid = ensembleId;
// Added to support passing clearance search flag in hijack
                if (!cs && elTarget.cs) {
                    cs = elTarget.cs;
                }
            if (ensembleId != "") {
					YAHOO.ebauer.layerbox.transition('product',{ensembleId : tempPid});
				}
			}
		},
		overlay : function(formatStr, passedIdObj) {
			// used to display and overlay layer on top of the layerbox, as in a size chart on the product layer
			var transObj = configObj[formatStr];
			//if the overlay is already open, we need to close it first
			if (YAHOO.ebauer.transitions.checkOverlayStatus()) {
				// if an overlay is already open and we switch to another one concat formatStr and passedIdObj into one str that can get passed along to the reopen once the close anim is complete
				var passedOverlayStr = json.stringify(passedIdObj);
				passedOverlayStr = passedOverlayStr.replace("{", "");
				formatStr = '{"formatStr":"' + formatStr + '",';
				passedOverlayStr = formatStr.concat(passedOverlayStr);
				YAHOO.ebauer.transitions.transitionOverlay(passedOverlayStr);
			}
			else {
				YAHOO.ebauer.transitions.addOverlayHtml(transObj, passedIdObj);
				YAHOO.ebauer.transitions.transitionOverlay();
			}
		},
		clearEnsembleVars : function() {
			currentState = ""; //reset the current state to empty
			if (!YAHOO.ebauer.productUtils.productPageMode) {
			   // don't reset these if the call is coming from the stand alone product page
				colorValue = null;
				colorIndex = 0;
				ensembleId = "";
				shownEnsembleId = "";
				parentEnsembleId = -1;
				highlightTabIndex = 0; //reset the active completer tab
				YAHOO.ebauer.productUtils.passedIdObjForCancel = null;
				YAHOO.ebauer.productUtils.isGiftBoxSelected = false; 	//reset the switch
				YAHOO.ebauer.productUtils.isMonogramSelected = false; //reset the switch
				YAHOO.ebauer.productUtils.editProductMode = false; //reset the switch
				YAHOO.ebauer.productUtils.editProductModeType = "";
				YAHOO.ebauer.productUtils.passedItemUUID = null;
				YAHOO.ebauer.productUtils.buyAnotherMode = false; //reset the switch
				YAHOO.ebauer.productUtils.productImageShownColorId = "";
				productId = "";
				editedItemUUID = null;
				isMonogramSelectedOLD = 'N';
				queryString = '';
				gCs = null; //global Clearance Search flag
				ensembleId = "";
				monogramStyle = "";
				monogramTextColor = "";
				monogramTextStyle = "";
				monogramText = "";
				monogram_initial_1 = null;
				monogram_initial_2 = null;
				monogram_initial_3 = null;
				monogram_instructions = "";
				monogram_lines = null;
				isMonogramAllowed = "";
				colorIdSelected = -1;
				sizeIdSelected = -1;
				selectedSwatchName = "";
				mgmenabledflag = "";
				mgmflag = "";
				YAHOO.ebauer.productUtils.isEOBProduct = false;
				eobFlag = 'false';
				onCopyTextChange.unsubscribe(addEOBFormModule);
				YAHOO.ebauer.productUtils.isColorUpdated = false;
				YAHOO.ebauer.productUtils.isSizeUpdated = false;
				YAHOO.ebauer.productUtils.resetFlags(); // Reset the flag for inventory display as well.
				itemForEditValues = null;
				mode = 'add';
            //pgCnter = 0;
         }
		},
		hideLayer : function(e) {
			if (e && e.srcElement) {
				if (e.srcElement.id == 'goBackFromAdded' || e.srcElement.id == 'goBackFromRemoved' || e.srcElement.id == 'goBack') {
					// Let us generate the cm tag
					var targetUrl = document.location.href;
					var ppl = "{type:'hide'}";
					var newTargetUrl = targetUrl.replace(targetUrl.substring(targetUrl.indexOf("#"), targetUrl.length), "#ppl="+encodeURIComponent(ppl));
					cmCreateManualLinkClickTag(newTargetUrl , e.srcElement.id);
				}
			}
			removeLayerboxMaskListener();
         if (getLayerTypeFromURL() == 'hide')
				YAHOO.ebauer.layerbox.hideLayerworker();
			else
				YAHOO.util.History.navigate("ppl", '{type:"hide"}');
			if (!submitSaveBtnClicked) {
				DelCookie("REFERRAL_URL");
				DelCookie('ebPi');
			}
			
			closeBag();
		},
		hideLayerworker : function() {
			if (currentState != "") {
				editModalListeners("");
				YAHOO.ebauer.transitions.wipeLayer();
				//wipes the html
				YAHOO.ebauer.layerbox.clearEnsembleVars();
				YAHOO.ebauer.layerbox.modal.hide();
			}
		},
		closeInfoLayer : function() {
			// if this is a layer on a layer (like a size chart on a product layer), just hide the top layer
			if (YAHOO.ebauer.transitions.checkOverlayStatus())
				YAHOO.ebauer.transitions.transitionOverlay();
			// otherwise, if this is the parent layer (like a size chart on multi-sku), run hideLayer
			else
				YAHOO.ebauer.layerbox.hideLayer();
		},
		setCut : function() {
			if (productId && productId.length > 0){
				var cutEles=document.getElementsByName("cut");
				for (var n = 0; n < cutEles.length; n++){
					if(cutEles[n].value == productId){
						cutEles[n].checked = true;
					}
				}
			}
		},
		checkProductLayerModules : function() {
			var additionalModulesHaveRun = false;

			if (YAHOO.ebauer.productUtils.productLayerType == "REG") {
				//for regular products, make sure completer has loaded
				if (YAHOO.ebauer.productUtils.completerLoaded === true) {
                    additionalModulesHaveRun = true;
                }
			} else if (YAHOO.ebauer.productUtils.productLayerType == "EOB") {
				//for eob products, make sure the eob module is loaded
				if (YAHOO.ebauer.productUtils.eobLoaded === true) {
                    additionalModulesHaveRun = true;
                }
			} else {
                //for all other products, no additional modules are needed
				//so just skip this flag and wait for the swatch and info modules
				additionalModulesHaveRun = true;
			}

			if (YAHOO.ebauer.productUtils.infoLoaded === true && YAHOO.ebauer.productUtils.swatchesLoaded === true && additionalModulesHaveRun === true && YAHOO.ebauer.productUtils.infoLoading === false) {
				// adjust infomodule height once all three flags are set
				YAHOO.ebauer.productUtils.infoModuleInit();
			}
		},
		setProductLayerType : function() {
			if (getValueFromElement('displayClearaceVariants') == "Y")
				YAHOO.ebauer.productUtils.productLayerType = "CLX";
			else if (getValueFromElement('eob') == "true")
				YAHOO.ebauer.productUtils.productLayerType = "EOB";
			else if (YAHOO.ebauer.productUtils.buyAnotherMode)
				YAHOO.ebauer.productUtils.productLayerType = "BUY";
		},
		showProductData : function() {
			YAHOO.ebauer.layerbox.setCut();
			getCopyText(null);
			if (!showSelectedValues && !showSelectedValuesForBuyAnotherItem) {
				if (getValueFromElement('eob') != 'true' && getValueFromElement('displayClearaceVariants') != 'Y')
					updateOutFitsModule();
				else if (getValueFromElement('eob') == 'true')
					onCopyTextChange.subscribe(addEOBFormModule);
				else
					displayOutfitModule = false;
			} else {
				displayOutfitModule = false;
			}

            var isClearanceCategory = getValueFromElement('clearanceCategory');
            if (isClearanceCategory == 'Y') {
                var selectedClxColorSize = -1;
                if (colorIdSelected && sizeIdSelected && colorIdSelected != -1 && sizeIdSelected != -1) {
                    selectedClxColorSize = colorIdSelected + '-' + sizeIdSelected;
                }
                 updateClxColorsAndSizes(selectedClxColorSize);
				 getClxEnsemblePrices();
			} else {
				 var selectedColorId = getValueFromElement('selectedColorId');				 
				 updateColorsAndSizes(selectedColorId);
				 getEnsemblePrices();
			}
         //BUG01175: Inseam Length dropdown box
            var productForm = $("productForm");
			var selectedCutIndex = -1;
			for (i = 0; i < productForm.cut.length; i++) {
				if (productForm.cut[i].checked == true) {
					selectedCutIndex = i ;
					break;
				}
			}


			//var firstCutIndex = 1;
			var inseamFlagEl = $("inseamFlag_"+selectedCutIndex);     //BUG01175: Inseam Length dropdown box
			var inseamTest = false;
			if (inseamFlagEl != null) {
				var val = inseamFlagEl.value;
				if (val == 'true')
					inseamTest = true;
			} else {
				inseamFlagEl = $D.getElementsBy(findInseamFlag, 'input' , 'productForm');
				inseamFlagEl = inseamFlagEl[0];
				var val = inseamFlagEl.value;
				if (val == 'true')
					inseamTest = true;
			}

			if (inseamTest)
				initInseam();

			// set the initial states of giftbox
			if ($('giftbox')) {
				YAHOO.ebauer.productUtils.wasGiftBoxSelected = $('giftbox').checked;
				YAHOO.ebauer.productUtils.giftBoxCompleted = false;
			} else {
				YAHOO.ebauer.productUtils.wasGiftBoxSelected = false;
				YAHOO.ebauer.productUtils.giftBoxCompleted = true;
			}

			// set the initial states of monogram
			if ($('monogram')) {
				YAHOO.ebauer.productUtils.wasMonogramSelected = $('monogram').checked;
				YAHOO.ebauer.productUtils.monogramCompleted = false;
			} else {
				YAHOO.ebauer.productUtils.wasMonogramSelected = false;
				YAHOO.ebauer.productUtils.monogramCompleted = true;
			}

			YAHOO.ebauer.ieselect.init();
			YAHOO.ebauer.layerbox.setProductLayerType();
			setCoreMetricsProductData();
            //dotomi
            if (getValueFromElement('eob') == 'true') {
                webEnsId = document.getElementById("webEnsembleId").value;
                eobEnsId = document.getElementById("ensembleId").value;
                thisProdId = webEnsId;
                if(webEnsId == -1){
                    thisProdId = eobEnsId;
                }
                if(thisProdId != -1){
                    //dotomi does not want us to send non catalog products
                    createDTMAbandonPageTag("5", document.getElementById("userId").value, document.getElementById("primaryCategoryName").value, document.getElementById("defaultImageUrl").value,  thisProdId);
                    var matte = document.getElementById("matte");
                    var myDivElement = createDOM('div', {'id':'dtmdiv','style':'display:none'});
                    myDivElement.innerHTML = '<iframe name="response_frame" src="' + dtmSrc + '"></iframe>';
                    matte.appendChild(myDivElement);
                }
            } else  {
                createDTMAbandonPageTag("5", document.getElementById("userId").value, document.getElementById("primaryCategoryName").value, document.getElementById("defaultImageUrl").value,  document.getElementById("ensembleId").value);
                var matte = document.getElementById("matte");
                var myDivElement = createDOM('div', {'id':'dtmdiv','style':'display:none'});
                myDivElement.innerHTML = '<iframe name="response_frame" src="' + dtmSrc + '"></iframe>';
                matte.appendChild(myDivElement);
            }
		},
		showProductDataBasic : function() {
			YAHOO.ebauer.layerbox.setCut();
			displayOutfitModule = false;

			if (getValueFromElement('clearanceCategory') == 'Y') {
                 updateClxColorsAndSizes();
				 getClxEnsemblePrices();
			} else {
				 updateColorsAndSizes();
				 getEnsemblePrices();
			}
               //BUG01175: Inseam Length dropdown box
            var productForm = $("productForm");
			var selectedCutIndex = -1;
			for (i = 0; i < productForm.cut.length; i++) {
				if (productForm.cut[i].checked == true) {
					selectedCutIndex = i ;
					break;
				}
			}
            var inseamFlagEl = $("inseamFlag_"+selectedCutIndex);     //BUG01175: Inseam Length dropdown box
			//var inseamFlagEl = $('inseamFlag_1');
			var inseamTest = false;
			if (inseamFlagEl != null) {
				var val = inseamFlagEl.value;
				if (val == 'true')
					inseamTest = true;
			} else {
				inseamFlagEl = $D.getElementsBy(findInseamFlag, 'input' , 'productForm');
				inseamFlagEl = inseamFlagEl[0];
				var val = inseamFlagEl.value;
				if (val == 'true')
					inseamTest = true;
			}

			if (inseamTest)
				initInseam();

			//copies the active style values into the productForm
			//$E.on(window, 'load', YAHOO.ebauer.productUtils.copyBasicStyleValues);

			updateShownIn(); //update the shown in display initially, other updates are done through swatch select
			YAHOO.ebauer.ieselect.init();
			YAHOO.ebauer.layerbox.setProductLayerType();
			setCoreMetricsProductData();
		},
		continueWithoutGiftBox : function() {
			if (YAHOO.ebauer.productUtils.editProductMode && YAHOO.ebauer.productUtils.isGiftBoxSelected) {
				 YAHOO.ebauer.productUtils.isGiftBoxSelected = false;
				 editedItemUUID = YAHOO.ebauer.productUtils.passedItemUUID;
				 removeGiftbox(true);
			} else {
				 YAHOO.ebauer.productUtils.isGiftBoxSelected = false;
                if (isKioskMode() == 'true') {

                    YAHOO.ebauer.layerbox.transition('addedFromKiosk');
                } else {
                    YAHOO.ebauer.layerbox.transition('added');
                }
			}
		},
		continueWithoutMonogram : function(){
			if (YAHOO.ebauer.productUtils.editProductMode && YAHOO.ebauer.productUtils.isMonogramSelected) {
				YAHOO.ebauer.productUtils.isMonogramSelected = false;
				editedItemUUID = YAHOO.ebauer.productUtils.passedItemUUID;
				removeMonogram(true);
			} else {
				processClearMonogram();
				YAHOO.ebauer.productUtils.isMonogramSelected = false;

				if (YAHOO.ebauer.productUtils.isGiftBoxSelected)
					YAHOO.ebauer.layerbox.transition('giftbox');
				else
                    if (isKioskMode() == 'true') {

                        YAHOO.ebauer.layerbox.transition('addedFromKiosk');
                    } else {
                        YAHOO.ebauer.layerbox.transition('added');
                    }
			}
		},
		showMonogramData : function() {
			updateMonogramStyles(-1);
			updateMonogramColors();
		},
		showCategoryFromProductPage : function(e) {

			var categoryUrlNode = $("catURL");
            var pageSelectedNode = $("pageSelected");
            var sortSelectedNode = $("sortSelected");
			var categoryUrl = '';
            var pageSelected = '';
			if (categoryUrlNode != undefined){
			  categoryUrl = categoryUrlNode.getAttribute('caturl');
              //alert("categoryUrlNode != undefined, caturl = " + categoryUrl);
              //BUG01291 - trimmed off any #string that might be set from a searched product
              var hashCharPos = categoryUrl.indexOf("#");
              if ( hashCharPos != undefined && hashCharPos > 0){
                  categoryUrl = categoryUrl.substring(0,hashCharPos);
                  //alert("trimmed off # strings on categoryUrl = " + categoryUrl);
              }
            }
            if (pageSelectedNode != undefined){
              pageSelected = pageSelectedNode.getAttribute('pageSelected');
            }
            
            if (sortSelectedNode != undefined) {
            	sortSelected = sortSelectedNode.getAttribute('sortSelected');
            }

			if (e && e.srcElement) {
				//alert('id='+e.srcElement.id);
				if (e.srcElement.id == 'goBackFromAdded') {
					// Let us generate the cm tag
					//alert('Function: showCategoryFromProductPage: generate cmLinkClick Tag');
					var targetUrl = '';
					if (categoryUrl != '') {
						targetUrl = categoryUrl;
					} else {
						targetUrl = getBaseURL() + 'catalog/search.jsp';
					}
					cmCreateManualLinkClickTag(targetUrl, e.srcElement.id);
				}
			}

            //BUG00077 - set #pg: on the back to category page
			if(categoryUrl != ''){
                //alert("######categoryUrl.indexOf(#)=" + categoryUrl.indexOf("#"));
				if (sortSelected != '') {
					if (categoryUrl.indexOf("?") < 0) {
						categoryUrl = categoryUrl + "?sort=" + sortSelected;
					} else {
						categoryUrl = categoryUrl + "&sort=" + sortSelected;
					}
				}
				
                if (ensembleId != ''){
                    categoryUrl = categoryUrl + "#pid:"+ ensembleId;
                    if (pageSelected != ''){
                        categoryUrl = categoryUrl + "|pg:"+ pageSelected;
                    }
                } else {
                    if (pageSelected != ''){
                        categoryUrl = categoryUrl + "#pg:"+ pageSelected;
                    }
                }

            	window.location.href= categoryUrl;
                //alert("#categoryUrl from layerbox.js 20100726 : " + categoryUrl);
            }else
				window.location.href= getBaseURL() + 'catalog/search.jsp';
		},
		transitionContentLayer : function(sectionId, sectionName, x) {
			if (currentState == "") {
				// if the layerbox is not already open, open that first
				YAHOO.ebauer.layerbox.transition('content', {sectionId:sectionId,sectionName:sectionName});
			}
			else {
				// if the layerbox is already open, then launch the overlay
				YAHOO.ebauer.layerbox.overlay('content', {sectionId:sectionId,sectionName:sectionName});
			}
		},
        transitionContentLayerFromStandAlone : function(sectionId, sectionName, x) {
				YAHOO.ebauer.layerbox.overlay('content', {sectionId:sectionId,sectionName:sectionName});
				$j('.sizeModule .tabs').tabs();// target sizeModule and assign jquery tabs to sizeModule
		},
		cancelClickCallback : function(e, formatStr) {
            //the transition call from the listeners
			if (this.id && this.id == "cancelMonogram")
				YAHOO.ebauer.productUtils.isMonogramSelected = false;
			if (this.id && this.id == "cancelGiftBox")
				YAHOO.ebauer.productUtils.isGiftBoxSelected = false;
            if (this.id && this.id == "cancelLogin") {
                // Check is there any wishlist item added?
                if (YAHOO.ebauer.loginUtils.loginLevel == 1 && (YAHOO.ebauer.loginUtils.lastWishListUserItemIdAdded != '-1' && YAHOO.ebauer.loginUtils.lastWishListUserItemIdAdded != undefined && YAHOO.ebauer.loginUtils.lastWishListUserItemIdAdded != '')) {
                    // Yes it is Login Level 0 or 1, and There is a wishlist item added.
                    removeWishListItemForLoginLevel1(YAHOO.ebauer.loginUtils.lastWishListUserItemIdAdded);
                }
                showSelectedValues = true;
            }
            YAHOO.ebauer.layerbox.transition(formatStr, YAHOO.ebauer.productUtils.passedIdObjForCancel);
		},
		transition : function(formatStr, passedIdObj, bypassHistory) {
				if (passedIdObj != null && passedIdObj != undefined){
                YAHOO.ebauer.productUtils.passedIdObjForCancel = passedIdObj; //hold these values for reuse on the cancel buttons
            }
            YAHOO.ebauer.utilities.navigate("ppl", '{type:"transition",ensembleId:"' + ensembleId + '",formatStr:"' + formatStr + '",passedIdObj:' + json.stringify(passedIdObj) + ',categoryId:"' + categoryId + '",pathInfo:"' + pathInfo + '",colorId:"' + colorId + '",sizeIdSelected:"' + sizeIdSelected + '",quantitySelected:"' + quantitySelected + '",imageName:"' + imageName +  '",imageTypeCode:"' + imageTypeCode + '",catPath:"' + catPath + '",cs:"' + cs + '"}', formatStr, passedIdObj);
            // added this here
            global.jquery.utils.common.assignButtons();
        },
		transitionworker : function(formatStr, passedIdObj) {
			if (this.formatStr)
				formatStr = this.formatStr;
			var transObj = configObj[formatStr];
			YAHOO.ebauer.transitions.wipeLayer();
			transitionModal(null, transObj, YAHOO.ebauer.layerbox);
			var passedStr = appendJsonValue(passedIdObj,'formatStr', formatStr);
			if (modalAnim != null) {
				modalAnim.onComplete.subscribe(YAHOO.ebauer.layerbox.transitionCompleteCallback, passedStr, true);
			}
			else {
				YAHOO.ebauer.layerbox.transitionComplete(formatStr, passedIdObj);
			}
		},

		transitionCompleteCallback : function(dummyVar,dummyVar2,passedStr) {
			var passedIdObj = json.parse(passedStr);
			var formatStr = passedIdObj.formatStr;
			YAHOO.ebauer.layerbox.transitionComplete(formatStr, passedIdObj);
		},

		transitionComplete : function(formatStr, passedIdObj) {
			if (currentState.path == "eob_dossier.jsp" && passedIdObj != null) {
				if (passedIdObj.source != undefined)
					var backToValue = passedIdObj.source;

				YAHOO.ebauer.productUtils.queryString = 'dept=' + passedIdObj.department + '&effort=' + passedIdObj.effortcode + '&item=' + passedIdObj.itemNbr + '&source=' + backToValue + '&eobSource=' + backToValue + '&firsteffort=' + passedIdObj.firsteffort + '&pricetypecode=' + passedIdObj.pricetypecode;
				YAHOO.ebauer.transitions.swapHtml(currentState, passedIdObj);
			}
			else if (passedIdObj != undefined) {
				YAHOO.ebauer.transitions.swapHtml(currentState, passedIdObj);
			}
			else {
				YAHOO.ebauer.transitions.swapHtml(currentState);
			}
			modalAnim = null;

			var referralUrl = GetCookie("REFERRAL_URL");
			if (referralUrl == '' || referralUrl == null) {
				referralUrl = GetCookie("PREVIOUS");
			}
			if  (formatStr != 'product' && formatStr != 'eobproduct') {
				var transObj = configObj[formatStr];
				var pageName = null;
				if (transObj != null) {
					pageName = transObj.cmPageName;
				}
				SetCookie('ebPi', pageName);
				createPageViewTagForLayer(pageName,referralUrl);
			}

			if (formatStr != 'content' && formatStr != 'product'
					&& formatStr != 'eobproduct' && formatStr != 'added' && formatStr != 'addedToWishList') {
				SetCookie('REFERRAL_URL', document.location.href);
			}

		},

		getLayerboxState : function() {
			var layerboxState = currentState;
			if (layerboxState != "")
				layerboxState = currentState.name;
			return layerboxState;
		},

		getConfigObject : function(formatStr) {
			return configObj[formatStr];
		}
	};
}();


/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
	LAYERBOX SUBCLASS DEFINITION
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
YAHOO.widget.LayerBox = function(el, userConfig) {
	if (arguments.length > 0)
		YAHOO.widget.LayerBox.superclass.constructor.call(this, el, userConfig);
};

//	Inherit from YAHOO.widget.Panel
YAHOO.extend(YAHOO.widget.LayerBox, YAHOO.widget.Panel);

//	Define the CSS class for the LayerBox
YAHOO.widget.LayerBox.CSS_LAYERBOX = 'eb-layerbox';

//	Initialize the LayerBox by setting up the footer navigation
YAHOO.widget.LayerBox.prototype.init = function(el, userConfig) {

	YAHOO.widget.LayerBox.superclass.init.call(this, el);
	this.beforeInitEvent.fire(YAHOO.widget.LayerBox);
	YAHOO.util.Dom.addClass(this.innerElement, YAHOO.widget.LayerBox.CSS_LAYERBOX);
	if (userConfig)
		this.cfg.applyConfig(userConfig, true);
	this.renderEvent.subscribe(function() {
	}, this, true);

	this.initEvent.fire(YAHOO.widget.LayerBox);
};
//	EXTEND THE SUPERCLASS WITH ADDITIONAL PROPERTIES
YAHOO.widget.LayerBox.prototype.initDefaultConfig = function() {
	YAHOO.widget.LayerBox.superclass.initDefaultConfig.call(this);
	this.cfg.addProperty('state', { handler:this.stateHandler, suppressEvent:true });
};

//	CONFIGURE THE SUPERCLASS EXTENSION
YAHOO.widget.LayerBox.prototype.stateHandler = function(type, args, obj) {
	//	This handler is executed whenever 'state' property is modified
	//	type is the property
	//	args is the value
	//	obj is the instance
};
//	OVERRIDE HANDLER FOR THE 'MODAL' PROPERTY WITH SPECIAL ANIMATION-RELATED FUNCTIONALITY
YAHOO.widget.LayerBox.prototype.configModal = function(type, args, obj) {
	var modal = args[0];
	if (modal) {
		this.buildMask();
		if (typeof this.maskOpacity == 'undefined') {
			this.mask.style.visibility = 'hidden';
			this.mask.style.display = 'block';
			this.maskOpacity = YAHOO.util.Dom.getStyle(this.mask, 'opacity');
			this.mask.style.display = 'none';
			this.mask.style.visibility = 'visible';
		}
		if (! YAHOO.util.Config.alreadySubscribed(this.beforeShowEvent, this.showMask, this))
			this.beforeShowEvent.subscribe(this.showMask, this, true);
		if (! YAHOO.util.Config.alreadySubscribed(this.hideEvent, this.hideMask, this))
			this.hideEvent.subscribe(this.hideMask, this, true);
		if (! YAHOO.util.Config.alreadySubscribed(YAHOO.widget.Overlay.windowResizeEvent, this.sizeMask, this))
			YAHOO.widget.Overlay.windowResizeEvent.subscribe(this.sizeMask, this, true);
		if (! YAHOO.util.Config.alreadySubscribed(this.destroyEvent, this.removeMask, this))
			this.destroyEvent.subscribe(this.removeMask, this, true);
		this.cfg.refireEvent('zIndex');
	} else {
		this.beforeShowEvent.unsubscribe(this.showMask, this);
		this.beforeHideEvent.unsubscribe(this.hideMask, this);
		YAHOO.widget.Overlay.windowResizeEvent.unsubscribe(this.sizeMask);
	}
};

//	OVERRIDE SHOWMASK FUNCTION TO ALLOW FOR FADE-IN ANIMATION
YAHOO.widget.LayerBox.prototype.showMask = function() {
	if (this.cfg.getProperty('modal') && this.mask) {
		YAHOO.util.Dom.addClass(document.body, 'masked');
		this.sizeMask();
	/*	var o = this.maskOpacity; // disabling opacity transition due to IE issues. */
	/*	Animation retained (using lineHeight) to maintain timing. Remove eventually. */
		if (! this.maskAnimIn) {
			this.maskAnimIn = new YAHOO.util.Anim(this.mask, {lineHeight: {to:2}}, 0.1);
			this.maskAnimIn.onComplete.subscribe(function() {
				this.cfg.setProperty('state', 1);
			}, this, true);
	/*		YAHOO.util.Dom.setStyle(this.mask, 'opacity', 0); */
		}
		if (! this.maskAnimOut) {
			this.maskAnimOut = new YAHOO.util.Anim(this.mask, {lineHeight: {to:1}}, 0.1);
			this.maskAnimOut.onComplete.subscribe(function() {
				this.mask.tabIndex = -1;
				this.mask.style.display = 'none';
				this.hideMaskEvent.fire();
				YAHOO.util.Dom.removeClass(document.body, 'masked');
				this.cfg.setProperty('state', 0);
			}, this, true);
		}

		this.mask.style.display = 'block';
		this.maskAnimIn.animate();
		this.mask.tabIndex = 0;
		this.showMaskEvent.fire();

		// APPLY HIDE EVENT TO MASK
		// YAHOO.util.Event.addListener(this.mask, 'mousedown', YAHOO.ebauer.layerbox.hideLayer, this, true);
		// this.mask.style.cursor = 'pointer';
	}
};

//	Overrides the showMask function to allow for fade-out animation
YAHOO.widget.LayerBox.prototype.hideMask = function() {
	if (this.cfg.getProperty('modal') && this.mask) {
		this.maskAnimOut.animate();
	}
};

/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
	LAYERBOX INITIALIZATION
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */
//	pass the namespace object as scope,then pass true to use 'this' scope within namespace
YAHOO.util.Event.onDOMReady(YAHOO.ebauer.layerbox.init, YAHOO.ebauer.layerbox, true);