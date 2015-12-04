function prepareWishListItemForm(isEOBProduct) {
	var input;
	var form = createDOM("form", {action:"",name:"itemform",id:"itemform",method:"POST"});
	input = createDOM("input", {type:"hidden",name:"giftboxflag",value:"N"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"giftboxfrom",value:""});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"giftboxto",value:""});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"giftboxmsg",value:""});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"giftboxenabledflag",value:"N"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"editProductModeType",value:""});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mgmenabledflag",value:"N"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mgmflag",value:"N"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mgmstyle",value:"N"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mgmcolor",value:"N"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mgmfont",value:"N"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mgmtext",value:"N"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mgminitial1",value:""});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mgminitial2",value:""});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mgminitial3",value:""});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mgminstruction",value:""});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"mode",value:"add"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"edituseritemid",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"productid",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"colorid",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"sizeid",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"qty",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"inseamFlag",value:"N"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"hemStyle",value:"default"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"inseamLength",value:"default"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"ensid",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"ensname",value:"-1",id:"ensname"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"style",value:"-1",id:"style"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"categoryId",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"itemType",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"pageType",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"dept",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"effort",value:"-1"});
	form.appendChild(input);
    input = createDOM("input", {type:"hidden",name:"firstEffort",value:"-1"});
	form.appendChild(input);
    input = createDOM("input", {type:"hidden",name:"item",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"eobFlag",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"webEnsembleId",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"SkuEobCatalogOnly",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"deptIndex",value:"i"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"clearanceFlag",value:"N"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"pathInfo",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"cmReferrer",value:"-1"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"productVariantId",value:"-1",id:"productVariantId" });
	form.appendChild(input);
    input = createDOM("input", {type:"hidden",name:"productVariantType",value:"WEB",id:"productVariantType" });
    form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"catPath",value:""});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"cs",value:"0"});
	form.appendChild(input);
	input = createDOM("input", {type:"hidden",name:"showSizes",value:"true"});
	form.appendChild(input);
    input = createDOM("input", {type:"hidden",name:"siteCss",value:"EB"});
    form.appendChild(input);    
    var div2 = createDOM("div", {id:"prepareitemform"});
	div2.appendChild(form);
	var layerbox = $("layerbox");
	while (layerbox.hasChildNodes())
		layerbox.removeChild(layerbox.firstChild);
	layerbox.appendChild(div2);
	initializeItemFormToSubmit(isEOBProduct, true);
}

function createTextTag(tagName, text) {
	var tagNode = createDOM(tagName, null);
	if (text != null && text != '')
		text = text.replace(/&nbsp;/g,'\u00A0');
	//tagNode.appendChild(document.createTextNode(text));
	tagNode.innerHTML = text; // innerHTML prevents encoded charater from displaying
	return tagNode;
}

function addAbbrTag(title, attr, parent) {
	var abbrElement = createDOM('abbr', {'title':title});
	if (attr != null && attr != '')
		attr = attr.replace(/&nbsp;/g,'\u00A0');
	//abbrElement.appendChild(document.createTextNode(attr));
	abbrElement.innerHTML = attr; // innerHTML prevents encoded charater from displaying
	parent.appendChild(abbrElement);
	return abbrElement;
}

function addAnchorElement(href, title, parent) {
	var aElement = createDOM('a', {'href':href,'title':title});
	aElement.appendChild(document.createTextNode(title));
	parent.appendChild(aElement);
}


var bag = "";
var ensembleId = "";
var gPromoContent = "";

function createShoppingBagForWishList(shoppingBag) {
	YAHOO.ebauer.productUtils.editProductModeType = "";

	bag = shoppingBag;
	var orders = shoppingBag.orders;
	var modal = createDOM('div', {'id':'modal','class':'modal added'});
	var matte = createDOM('div', {'id':'matte'});
	modal.appendChild(matte);
	var dialogSlat = createDOM('div', {'class':'dialog-slat'});
	matte.appendChild(dialogSlat);
	//var aCloseElement = createDOM('a', {'href':'javascript:YAHOO.ebauer.layerbox.hideLayer();','title':'Close','id':'closeWishListButtonId' });
	//var aCloseElement = createDOM('a', {'href':'javascript:hideWishList();','title':'Close','id':'closeWishListBtnId' });
	//aCloseElement.appendChild(document.createTextNode('Close'));
	//dialogSlat.appendChild(aCloseElement);
	dialogSlat.innerHTML = "<input type='button' class='ui-button ui-widget ui-state-default ui-corner-all' value='Close' id='closeButtonId'>";

	var h2 = createDOM('h2', null);
	dialogSlat.appendChild(h2);
	if (YAHOO.ebauer.productUtils.editProductMode)
		h2.appendChild(document.createTextNode('This item has been updated in your Wish List'));
	else
		h2.appendChild(document.createTextNode('Added to Your Wish List'));
    var wishListInstructionTextDiv = createDOM('div',{'id':'wishlistInstruction'});
    dialogSlat.appendChild(wishListInstructionTextDiv);
    var h4 = createDOM('h4',null);
	wishListInstructionTextDiv.appendChild(h4);
	h4.appendChild(document.createTextNode('Any promotional offers will be applied in the Shopping Bag'));
    var h6 = createDOM('h6',null);
    wishListInstructionTextDiv.appendChild(h6);
    h6.appendChild(document.createTextNode('Please remember, items in your Wish List are not reserved, and may sell out.'));
    for (var i = 0; i < orders.length; i++) { // Iterate through the orders..
		var order = orders[i];
		var orderIndex = createDOM('input', {'type':'hidden', 'value':order.orderIndex});
		dialogSlat.appendChild(orderIndex);
		var items = order.items;
		for (var j = 0; j < items.length; j++) { // Iterate through Items
			var item = items[j];
			var ticket = createDOM('div', {'class':'ticket'});
			dialogSlat.appendChild(ticket);
			var ticketWrap = createDOM('div', {'class':'ticket_wrap clearfix'});
			ticketWrap.style.background = ' url(' + item.imageUrl + ') no-repeat 10px 0';
			ticket.appendChild(ticketWrap);
			var column1wrapper = createDOM('div', {'class':'column_1_wrapper'});
			ticketWrap.appendChild(column1wrapper);
			var column1 = createDOM('dl', {'class':'column_1'});
			column1wrapper.appendChild(column1);
            //Add icons here
            var iconElement = getIconElement(item.icons);
            column1.appendChild(iconElement);

            var dtElement = createTextTag('dt', null);
			dtElement.innerHTML = item.name; //prevents encoded characters from showing
            column1.appendChild(dtElement);
			var ddElement = createDOM('dd', null);
			column1.appendChild(ddElement);
			var sizeDisplayString = 'Size:&nbsp;';
			if (!item.showSizes || "true" == item.showSizes) {
				sizeDisplayString += item.sizeName + ',&nbsp;';
			}
			sizeDisplayString += item.styleName;
			addAbbrTag(item.sizeName, sizeDisplayString, ddElement);
			if ("Y" == item.inseamflag) {
				var hemStyleStr = YAHOO.ebauer.productUtils.hemStyleDisplay(item.hemStyle);
				var inseamString = '';
				if (item.inseamLength != 'default')
					inseamString = 'Inseam:&nbsp;' + item.inseamLength + ',&nbsp;' + hemStyleStr;
				else
					inseamString = hemStyleStr;
				addAbbrTag(item.hemStyle, inseamString, ddElement);
			}
			var brElement = createDOM('br', null);
			ddElement.appendChild(brElement);
			addAbbrTag(item.colorName, 'Color:&nbsp;' + item.colorName, ddElement);
			brElement = createDOM('br', null);
			ddElement.appendChild(brElement);
			var abbrElement = addAbbrTag('Inventory', 'Status:&nbsp;', ddElement);
			var soldOutFlag = false;
			if ((item.inventoryStatus).toLowerCase() == 'soldout') {
				soldOutFlag = true;
			}
			var emtag = createTextTag('em', item.inventoryStatus);
			abbrElement.appendChild(emtag);
			var dispQty = null;
			var priceDisp = null;
			var clearanceDisp = null;
			if (item.itemQuantity > 1)
				dispQty = item.itemQuantity + '&nbsp;x';
			else
				dispQty = item.itemQuantity + ' ';
			abbrElement = addAbbrTag('Quantity', 'Qty:&nbsp;' + dispQty, ddElement);
			showCurrent = false;
			if (item.regularPrice != undefined) {
				priceDisp = createTextTag('span', item.regularPrice);
				if (item.currentPrice == undefined) {
					if (item.itemQuantity == 1)
						priceDisp.className = 'totalPrice';
				} else {
					if (item.currentPrice == item.regularPrice) {
						if (item.itemQuantity == 1) {
							priceDisp.className = 'currentPrice';
						}
					} else {
						showCurrent = true;
						priceDisp.className = 'regularPrice';
					}
				}
				abbrElement.appendChild(document.createTextNode('\u00A0'));//creates a nbsp
				abbrElement.appendChild(priceDisp);
			}
			//priceDisp = createTextTag('span', '');
			abbrElement.appendChild(priceDisp);
			if (showCurrent) {
				priceDisp = createTextTag('span', item.currentPrice);
				if (item.discountedCurrentPrice == undefined) {
					priceDisp.className = 'salePrice';
				} else {
					priceDisp.className = 'regularPrice';
				}
				abbrElement.appendChild(document.createTextNode('\u00A0'));//creates a nbsp
				abbrElement.appendChild(priceDisp);
			}
			priceDisp = createTextTag('span', '');
			abbrElement.appendChild(priceDisp);
			if (item.discountedCurrentPrice != undefined) {
				priceDisp = createTextTag('span', '&nbsp;' + item.discountedCurrentPrice);
				priceDisp.className = 'salePrice';
				abbrElement.appendChild(priceDisp);
			}

			if (item.itemQuantity > 1) {
				priceDisp = createTextTag('span', '&nbsp;ea.&nbsp;');
			}

			abbrElement.appendChild(priceDisp);
			if (item.itemQuantity > 1) {
				priceDisp = createTextTag('span', '&nbsp;' + item.totalPrice);
				priceDisp.className = 'totalPrice';
				abbrElement.appendChild(priceDisp);
			}
			if ("Y" == item.clearanceflag || "1" == item.cs) {
				clearanceDisp = createTextTag('span', '&nbsp;Clearance');
				clearanceDisp.className = 'clearance';
				column1.appendChild(ddElement);
				abbrElement.appendChild(clearanceDisp);
			}
			// displays the Monogram info of text, color, style,and price
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

				dlGboxPriceElement = createDOM('dl', {'id':'gboxDisplayPrice'});
				ddGboxInfoElement.appendChild(dlGboxPriceElement);
				giftBoxPriceDisp = createTextTag('dd', item.giftBoxDisplayPrice);
				giftBoxPriceDisp.className = 'gboxDisplayText';
				dlGboxPriceElement.appendChild(giftBoxPriceDisp);
			}// end gift box info display

			ensembleId = item.ensembleId;
			ddElement = createDOM('dd', null);
			column1.appendChild(ddElement);
			gUUID = item.useritemid;
			
		 	// BUG0534: Remove	Edit / Add Another links 
			//addAnchorElement('javascript:editItemInCart(\"' + item.useritemid + '\",true,null,\"'+ item.imageName +'\",\"' + item.imageTypeCode + '\", true )', 'Edit', ddElement);
			//if (!soldOutFlag) {
			//	var aElement = createDOM('a', {'href':'javascript:YAHOO.ebauer.productUtils.buyAnotherItem(\"' + item.useritemid + '\",null,\"'+ item.imageName +'\",\"' + item.imageTypeCode + '\", true);','title':'Buy Another','id':'buyAnother'});
			//	aElement.appendChild(document.createTextNode('Add Another'));
			//	ddElement.appendChild(aElement);
			//}

			if (!soldOutFlag) {
				if (item.giftboxFlag == 'Y') {
					var aElement = createDOM('a', {'href':'javascript:YAHOO.ebauer.productUtils.editGiftBox(\"' + item.useritemid + '\");','title':'Edit Gift Box','id':'addeditGiftBox'});
					aElement.appendChild(document.createTextNode('Edit Gift Box'));
					ddElement.appendChild(aElement);
				} else if (item.giftboxAllowedFlag == 'Y') {
					var aElement = createDOM('a', {'href':'javascript:YAHOO.ebauer.productUtils.editGiftBox(\"' + item.useritemid + '\");','title':'Add Gift Box','id':'addeditGiftBox'});
					aElement.appendChild(document.createTextNode('Add Gift Box'));
					ddElement.appendChild(aElement);
				}
			}
			if (mgmEnabledFlag == 'Y' && false) { // We donot want to display Monogram Link in wishlist layer.#BUG00220
				if (!soldOutFlag) {
					if (item.monogramFlag == 'Y') {
						var aElement = createDOM('a', {'href':'javascript:YAHOO.ebauer.productUtils.editMonogram(\"' + item.useritemid + '\");','title':'Edit Monogram','id':'addeditMonogram'});
						aElement.appendChild(document.createTextNode('Edit Monogram'));
						ddElement.appendChild(aElement);
					} else if (item.monogramFlag == 'N') {
						var aElement = createDOM('a', {'href':'javascript:YAHOO.ebauer.productUtils.editMonogram(\"' + item.useritemid + '\");','title':'Add Monogram','id':'addeditMonogram'});
						aElement.appendChild(document.createTextNode('Add Monogram'));
						ddElement.appendChild(aElement);
					}
				}
			}

		 	// BUG0534: Remove	Delete links
			//addAnchorElement('javascript:removeConfirmationForWishList(\"' + item.useritemid + '\",true)', 'Remove', ddElement);
			dialogSlat = createDOM('div', {'class':'dialog-slat'});
			matte.appendChild(dialogSlat);
			var invMessage = createDOM('div', {'class':'invMessage'});
			dialogSlat.appendChild(invMessage);
			var emTag = createTextTag('em', getInventoryMessaging(item.inventoryStatus));
			invMessage.appendChild(emTag);
		}
	}

	dialogSlat = createDOM('div', {'class':'dialog-slat'});
	matte.appendChild(dialogSlat);
	var form = createDOM('form', {'class':'clearfix', 'action':'' + bag.wishListPage , 'method':'post'});
	dialogSlat.appendChild(form);
	var fieldSet = createDOM('fieldset', {'id':'go_shop'});
	form.appendChild(fieldSet);
	var tag = createDOM('legend', {'class':'ignore'});
    var isWishListOrBagPageFlag = isCurrentPageWishListOrShoppingBag();
    if ( isWishListOrBagPageFlag == false) { // Show Back to button ONLY for layers coming from other than wishlist page, or bag page.
        tag.appendChild(document.createTextNode('Back to Shopping'));
        fieldSet.appendChild(tag);
        if (gBackToCat == undefined || gBackToCat == "undefined")
            gBackToCat = document.title;
        fieldSet.innerHTML = "<input type='button' class='button' value='Back to: " + gBackToCat + "' id='goBackFromAdded'>";
        fieldSet.appendChild(tag);
        fieldSet = createDOM('fieldset', {'id':'go_bag'});
        form.appendChild(fieldSet);
    }
    tag = createDOM('legend', {'class':'ignore'});
	tag.appendChild(document.createTextNode('View Wish List'));
	fieldSet.appendChild(tag);
	var itemLebel = 'item';
	if (shoppingBag.totalWishListItems > 1 || shoppingBag.totalWishListItems == 0) {
		itemLebel = 'items';
	}
	var buttonName = 'View Wish List ' + ' (' + shoppingBag.totalWishListItems + ' ' + itemLebel + ') >';

	var buttonClickAction = 'location.href=' + '\'' + shoppingBag.wishListPage + '\'';
	var inputButton = createDOM('input', {'class':'button', 'id':'wishListButton' , 'onclick':'showNextPage()' , 'type':'submit', 'name':'wishlist', 'value':'' + buttonName });
	fieldSet.appendChild(inputButton);
	var dialogPanel = createDOM('div', {'class':'dialog-panel clearfix'});
	matte.appendChild(dialogPanel);
	var promoDiv = createDOM('div', {'class' : 'promoContent','id' : 'promoContent'});
	dialogPanel.appendChild(promoDiv);
	getInterstitialContent("interstitial_addedToWishList","promoContent");
	if (eobFlag != 'true' && displayOutfitModule) {
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
	else if (eobFlag == 'true') {
		var innerDlEle = createTag('dl', 'eobModule', null, null);
		dialogPanel.appendChild(innerDlEle);
		addEOBForm(innerDlEle);
	}
	resetPageVars();
	return modal;
}

function hideWishList(){

	$("matte").style.display = "none";
	$("modal").style.display = "none";
	$("layerbox").style.display = "none";
	
	}
function resetPageVars()
{
	giftboxEnabledFlag = "N";
	giftBoxFrom = "";
	giftBoxTo = "";
	giftBoxMsg = "";
}

function showNextPage(e) {

	//BUG0099: Delete the cookie instead of setting, to fix the payment review page popup issue
	//SetCookie('DESTINATION_URL', escape(bag.checkoutPage));
	DelCookie("DESTINATION_URL");
	 
    YAHOO.util.History.navigate("ppl", '{type:"hide"}');

	 if (e && e.srcElement) {
		 //alert('sCOP(1): id='+e.srcElement.id);
		if (e.srcElement.id == 'goBackFromAdded') {
			// Let us generate the cm tag
			//alert('Function: showWishListPage: generate cmLinkClick Tag');
			var targetUrl = bag.wishListPage;
			var ppl = "{type:'hide'}";
			if (targetUrl && targetUrl.indexOf('#')) {
				var newTargetUrl = targetUrl.replace(targetUrl.substring(targetUrl.indexOf("#"), targetUrl.length), "#ppl="+encodeURIComponent(ppl));
			} else if (targetUrl) {
				targetUrl = targetUrl + "#ppl="+encodeURIComponent(ppl);
			}
			cmCreateManualLinkClickTag(targetUrl, e.srcElement.id);
		}
	}

	window.location.href = '' + bag.wishListPage;
}

function isCurrentPageWishListOrShoppingBag() {
    var currentPage = document.location.href;
    var index = currentPage.indexOf('bag.jsp');
    if (index == -1) {
        index = currentPage.indexOf('wishlist.jsp');
    }

    if (index > 0) {
        return true;
    } else {
        return false;
    }

}

function removeConfirmationForWishList(uuid, flag) {
	var answer = confirm("Are you sure you want to remove this item from WishList ?");
	if (answer) {
		removeItemFromCart(uuid, flag, true);
	}
}