function updatedShoppingBag(shoppingBag){

	bag = shoppingBag;
	var isWishList = bag.isWishListItem;
	setSOACookie(bag.totalBagItems);
	var itemLebel = 'item';
	if (shoppingBag.totalBagItems > 1 || shoppingBag.totalBagItems == 0) {
		itemLebel = 'items';
	}
	if (isWishList == undefined || isWishList == false) {
		var itemsCountTxt = bag.totalBagItems + ' ' + itemLebel;
		$("itemsCount").innerHTML = itemsCountTxt;
	}
	var orders = shoppingBag.orders;
	var close = createDOM('a', { 'id': 'close', 'class': 'closeX', 'href': 'javascript:closeProductInfoLayer();', 'style': 'left:574px' });
	var modal = createDOM('div',{'class':'modal added', 'style':'margin-top:-16px'});
	var matte = createDOM('div',{'id':'matte'});
	modal.appendChild(matte);
	var dialogSlat = createDOM('div',{'class':'dialog-slat'});
	matte.appendChild(dialogSlat);

	if (isWishList == true) {
		var h2 = createTextTag('h2','This item has been removed from your Wish List.');
		dialogSlat.appendChild(h2);
	} else {
		var h2 = createTextTag('h2','This item has been removed from your Shopping Bag');
		dialogSlat.appendChild(h2);
	}

	for(var i=0;i<orders.length;i++){ // Iterate through the orders..
		var order = orders[i];
		var items = order.items;
	 	for(var j=0;j<items.length;j++){ // Iterate through Items
			 var item = items[j];
			 var ticket = createDOM('div',{'class':'ticket'});
			 dialogSlat.appendChild(ticket);
			 var ticketWrap = createDOM('div',{'class':'ticket_wrap clearfix'});
			 ticketWrap.style.background = ' url(' + item.imageUrl + ') no-repeat 10px 0';
			 ticket.appendChild(ticketWrap);
			 var column1wrapper = createDOM('div',{'class':'column_1_wrapper'});
			 ticketWrap.appendChild(column1wrapper);
			 var column1 = createDOM('dl',{'class':'column_1'});
			 column1wrapper.appendChild(column1);
             //Add icon element for display
             var iconElement = getIconElement(item.icons);
             column1.appendChild(iconElement);

             var dtElement = createTextTag('dt',item.name);
			 column1.appendChild(dtElement);
			 var ddElement = createDOM('dd',null);
			 column1.appendChild(ddElement);
			 var sizeDisplayString = 'Size:&nbsp;';
			 if (!item.showSizes || "true" == item.showSizes) {
				 sizeDisplayString += item.sizeName + ',&nbsp;';
			 }
			 sizeDisplayString += item.styleName;
			 addAbbrTag(item.sizeName, sizeDisplayString, ddElement);
			 if("Y" == item.inseamflag){
				 var hemStyleStr = YAHOO.ebauer.productUtils.hemStyleDisplay(item.hemStyle);
				 var inseamString = '';
				 if(item.inseamLength != 'default')
				  inseamString = 'Inseam: ' + item.inseamLength + ', ' + hemStyleStr;
				 else
				  inseamString = hemStyleStr;
			  addAbbrTag(item.hemStyle,inseamString ,ddElement);
			 }
			 var brElement = createDOM('br',null);
			 ddElement.appendChild(brElement);
			 addAbbrTag(item.colorName,'Color: '+ item.colorName,ddElement);
			 brElement = createDOM('br',null);
			 ddElement.appendChild(brElement);
			 var dispQty = null;
			 var priceDisp = null;
			 dispQty = item.itemQuantity + ' ';
			var abbrElement = addAbbrTag('Quantity','Qty: ' + dispQty ,ddElement);

			 // displays the Monogram info of text, color, style
			if (item.mgmDisplayStr != undefined) {
				ddMgmInfoElement = createDOM('dd', {'id':'mgm_info','class':'clearfix'});
				column1.appendChild(ddMgmInfoElement);
				dlMgmNameElement = createDOM('dl', {'id':'mgm_name'});
				ddMgmInfoElement.appendChild(dlMgmNameElement);

					dtSectionElement = createDOM('dt', {'class':'mgmSectionLabel'});
					dtSectionElement.innerHTML = item.mgmDisplayStr + item.mgmSectionLabel;
					dlMgmNameElement.appendChild(dtSectionElement);

					dtElement = createDOM('dt', {'class':'mgmDisplayLabel'});
					dtElement.innerHTML = item.mgmNameLabel;
					dlMgmNameElement.appendChild(dtElement);
						ddElement = createDOM('dd', {'class':'mgmDisplayText'});
						ddElement.innerHTML = item.mgmNameText;
						dlMgmNameElement.appendChild(ddElement);

				dlMgmColorElement = createDOM('dl', {'id':'mgm_color'});
				ddMgmInfoElement.appendChild(dlMgmColorElement);
					dtElement = createDOM('dt', {'class':'mgmDisplayLabel'});
					dtElement.innerHTML = item.mgmColorLabel;
					dlMgmColorElement.appendChild(dtElement);
						ddElement = createDOM('dd', {'class':'mgmDisplayText'});
						ddElement.innerHTML = item.mgmColorText;
						dlMgmColorElement.appendChild(ddElement);

				dlMgmStyleElement = createDOM('dl', {'id':'mgm_style'});
				ddMgmInfoElement.appendChild(dlMgmStyleElement);
					dtElement = createDOM('dt', {'class':'mgmDisplayLabel'});
					dtElement.innerHTML = item.mgmStyleLabel;
					dlMgmStyleElement.appendChild(dtElement);
						ddElement = createDOM('dd', {'class':'mgmDisplayText'});
						ddElement.innerHTML = item.mgmStyleText;
						dlMgmStyleElement.appendChild(ddElement);

				dlMgmPriceElement = createDOM('dl', {'id':'mgmDisplayPrice'});
				ddMgmInfoElement.appendChild(dlMgmPriceElement);
					mgmPriceDisp = createTextTag('dd', item.mgmDisplayPrice);
					mgmPriceDisp.className = 'mgmDisplayText';
					dlMgmPriceElement.appendChild(mgmPriceDisp);
			}// end monogram info display

			// displays the Gift Box info of to, from, message, and price
			if (item.giftBoxDisplayStr != undefined) {
				ddGboxInfoElement = createDOM('dd', {'id':'gbox_info','class':'clearfix'});
				column1.appendChild(ddGboxInfoElement);
				dlGboxToElement = createDOM('dl', {'id':'gbox_to'});
				ddGboxInfoElement.appendChild(dlGboxToElement);

					dtSectionElement = createDOM('dt', {'class':'gboxSectionlabel'});
					dtSectionElement.innerHTML = item.giftBoxDisplayStr + item.gboxSectionLabel;
					dlGboxToElement.appendChild(dtSectionElement);

					dtElement = createDOM('dt', {'class':'gboxDisplayLabel'});
					dtElement.innerHTML = item.gboxToLabel;
					dlGboxToElement.appendChild(dtElement);
						ddElement = createDOM('dd', {'class':'gboxDisplayText'});
						ddElement.innerHTML = item.gboxToText;
						dlGboxToElement.appendChild(ddElement);

				dlGboxFromElement = createDOM('dl', {'id':'gbox_from'});
				ddGboxInfoElement.appendChild(dlGboxFromElement);
					dtElement = createDOM('dt', {'class':'gboxDisplayLabel'});
					dtElement.innerHTML = item.gboxFromLabel;
					dlGboxFromElement.appendChild(dtElement);
						ddElement = createDOM('dd', {'class':'gboxDisplayText'});
						ddElement.innerHTML = item.gboxFromText;
						dlGboxFromElement.appendChild(ddElement);

				dlGboxMsgElement = createDOM('dl', {'id':'gbox_msg'});
				ddGboxInfoElement.appendChild(dlGboxMsgElement);
					dtElement = createDOM('dt', {'class':'gboxDisplayLabel'});
					dtElement.innerHTML = item.gboxMsgLabel;
					dlGboxMsgElement.appendChild(dtElement);
						ddElement = createDOM('dd', {'class':'gboxDisplayText'});
						ddElement.innerHTML = item.gboxMsgText;
						dlGboxMsgElement.appendChild(ddElement);
			}// end gift box info display

			 ensembleId =item.ensembleId;
			 gUUID = item.uuid;
			 dialogSlat = createDOM('div',{'class':'dialog-slat'});
			 matte.appendChild(dialogSlat);
			 }
		}


	if (bag.checkoutPage.indexOf('?') >= 0) {
		bag.checkoutPage = bag.checkoutPage + '&ensembleId='+ensembleId;
	} else {
		bag.checkoutPage = bag.checkoutPage + '?ensembleId='+ensembleId;
	}
	dialogSlat = createDOM('div',{'class':'dialog-slat'});
	matte.appendChild(dialogSlat);
	var form = createDOM('form',{'class':'clearfix', 'action':''+bag.checkoutPage , 'method':'post'});
	dialogSlat.appendChild(form);
	var fieldSet = createDOM('fieldset',{'id':'go_shop'});
	form.appendChild(fieldSet);
	var tag = createDOM('legend',{'class':'ignore'});
	tag.appendChild(document.createTextNode('Back to Shopping'));
	fieldSet.appendChild(tag);
	fieldSet.innerHTML = "<input type='button' class='button' value='Back to: "+gBackToCat+"' id='goBackFromRemoved' onclick='goBackToCat()'>";
	fieldSet.appendChild(tag);
	fieldSet = createDOM('fieldset',{'id':'go_bag'});
	form.appendChild(fieldSet);
	tag = createDOM('legend',{'class':'ignore'});
	tag.appendChild(document.createTextNode('Checkout'));
	fieldSet.appendChild(tag);
	var itemLebel = 'item';
	if(shoppingBag.totalBagItems > 1 || shoppingBag.totalBagItems == 0){
		itemLebel = 'items';
	}

	if (isWishList == true) {
		var buttonName = 'View WishList ('+shoppingBag.totalBagItems +' '+itemLebel+')';
		var buttonClickAction = 'location.href='+'\''+shoppingBag.checkoutPage+'\'';
		var inputButton = createDOM('input',{'class':'button', 'id':'checkoutButton' , 'onclick':'showNextPage()' , 'type':'submit', 'name':'checkout', 'value':''+buttonName });

		tag = createDOM('a',{'href':''+shoppingBag.checkoutPage });
		tag.appendChild(document.createTextNode('View Wish List'));


	} else {
		var buttonName = 'Checkout('+shoppingBag.totalBagItems +' '+itemLebel+')';
		var buttonClickAction = 'location.href='+'\''+shoppingBag.checkoutPage+'\'';
		var inputButton = createDOM('input',{'class':'button', 'id':'checkoutButton' , 'onclick':'showNextPage()' , 'type':'submit', 'name':'checkout', 'value':''+buttonName });

		tag = createDOM('a',{'href':''+shoppingBag.checkoutPage });
		tag.appendChild(document.createTextNode('View Shopping Bag'));

	}

	fieldSet.appendChild(inputButton);
	fieldSet.appendChild(tag);
	var promoDiv = createDOM('div', {'class' : 'promoContent'});
	matte.appendChild(promoDiv);
	var dialogPanel = createDOM('div',{'class':'dialog-panel clearfix'});
	matte.appendChild(dialogPanel);
	getInterstitialContent("interstitial_removed","promoContent");
	if (eobFlag != 'true') {
        var innerDtEle = createTag('dt', 'tabs', null, createTag('br', null, null, null));
        var innerDdEle = createTag('dd', 'thumbs', null, createTag('br', null, null, null));
        var innerDlEle = createTag('dl', 'alsoModule', null, null);
        innerDlEle.appendChild(innerDtEle);
        innerDlEle.appendChild(innerDdEle);
        dialogPanel.appendChild(innerDlEle);
        var link = document.createTextNode("Get this entire look");
        var anchor = createDOM('a');
        anchor.appendChild(link);
        var div = createDOM('div', {'id':'outfit_link'});
        div.appendChild(anchor);
        dialogPanel.appendChild(div);

        if (parentEnsembleId == -1) {
            parentEnsembleId = ensembleId;
        }
        getOutFitTabs(null);
    }
    else{
        var innerDlEle = createTag('dl', 'eobModule', null, null);
        dialogPanel.appendChild(innerDlEle);
        addEOBForm(innerDlEle);
    }
//    return modal;
	$("layerbox").appendChild(close);
	$("layerbox").appendChild(modal);
 }

function showNextPage(e) {
	if (e && e.srcElement) {
		//alert('sCOP: id='+e.srcElement.id);
		if (e.srcElement.id == 'goBackFromAdded') {
			// Let us generate the cm tag
			//alert('Function: (2)showCheckOutPage: generate cmLinkClick Tag');
			var newTargetUrl = bag.checkoutPage;
			cmCreateManualLinkClickTag(newTargetUrl , e.srcElement.id);
		}
	}
	//BUG0099: Delete the cookie instead of setting, to fix the payment review page popup issue
	//SetCookie('DESTINATION_URL', escape(bag.checkoutPage));
	DelCookie("DESTINATION_URL");
}
function goBackToCat() {
	if (window.location.search.indexOf('eobSource') >= 0) {
		window.location.href = window.location.search;
	} else {
		var pairs = window.location.search.substring(1).split("&"),
		obj = {},
	    pair,
	    i;
		if (pairs.length < 3) {
			window.location.href = window.location.search;
			return false;
		}
		for ( i in pairs ) {
			if ( pairs[i] === "" ) continue;
			pair = pairs[i].split("=");
			obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
		 
	        for (var key in obj) {
	            key + "=" + obj[key];
	        }
	        
	        if (key == "catPath") {
	        	var categoryPath = obj[key];
	        	if (categoryPath == "") {
	        		var breadcrumbPath = parent.setBreadCrumbVariable();
	        		var pathName = breadcrumbPath.substr(breadcrumbPath.indexOf("m") + 1);
	        		window.location.href = pathName;
	        		return;
	        	}
	        }
	        if (key == "ggpCategoryName") {
	        	var part4 = obj[key];
	        	if (part4 != 'undefined' || part4 != undefined) {
	        		part4 = "/"+part4;
	        	} else {
	        		return "";
	        	}
	        }
	        if (key == "gpCategoryName") {
	        	var part3 = obj[key];
	        }
	        if (key == "pCategoryName") {
	        	var part2 = obj[key];
	        }
	        if (key == "categoryName") {
	        	var part1 = obj[key];
	        }
	        if(part4 == "undefined" || part4 == undefined) {
	        	pathName = "/"+part3+"/"+part2+"/"+part1+"/index.cat";
	        } else {
	        	pathName = part4+"/"+part3+"/"+part2+"/"+part1+"/index.cat";
	        }
	        window.location.href = pathName;
		}
	}
}      
	