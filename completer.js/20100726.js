/* This js file has all the functions related to completer */
var cacheOutfit;
var outfit = null;

var highlightTabIndex = 0; // This is to display the tabs corresponding to the sets to which the given ensemble is the member.
var tabType = "CTL"; // This is used to determine the type of tab that is active

var processOutFitModule = function(o) {
	var x = eval('(' + o.responseText + ')');
	var out = document.getElementById("tabs");
	if (out == null) {
		var out_timeout = setTimeout(function(){processOutFitModule(o);},200);
	} else{
		out.innerHTML = "";
		var tablength = x.outfits.length;
		var relatedoutfitstablength = x.relatedoutfits.length;
		if (tablength <= 0 && relatedoutfitstablength == 0) {
			$("alsoModule").style.display = "none";
			$("outfit_link").style.display = "none";
		} else {
			tabSelected = 0;
			cacheOutfit = new Array();
			var ulElement = createTag('ul', null, 'tabs clearfix', null);
			var firstTab;
			var itrLength = tablength;
			if(itrLength > 3)
				itrLength = 3;
			for (var j = 0; j < itrLength; j++) {
				var hrefElement = createDOM('a', {'href':'javascript:alsoModuleShow(' + x.outfits[j].id + ',' + j + ', false)' });
				if (itrLength ==1)
					hrefElement.appendChild(document.createTextNode("Complete the Look"));
				else
					hrefElement.appendChild(document.createTextNode("Outfit "+ (j+1)));
				var liElement = createTag('li', 'alsoTab' + j, 'not', hrefElement);
				if (j == highlightTabIndex)
					firstTab = liElement;
				ulElement.appendChild(liElement);
			}
			// ymal tab along with other modules
			if (relatedoutfitstablength > 0 && tablength <=2 ) {
				var relatedoutfitstabindex = 0;
				if (tablength > 0)
					relatedoutfitstabindex = tablength;
				var hrefElement = createDOM('a', {'href':'javascript:alsoModuleShow(' + x.relatedoutfits[0].id + ',' + relatedoutfitstabindex + ', true)' });
				hrefElement.appendChild(document.createTextNode(x.relatedoutfits[0].name));
				var liElement = createTag('li', 'alsoTab' + relatedoutfitstabindex, 'not', hrefElement);
				if (tablength <= 0 || relatedoutfitstabindex == highlightTabIndex)
					firstTab = liElement;
				ulElement.appendChild(liElement);
			}
			out.appendChild(ulElement);
			if (x.outfits.length > 0 && highlightTabIndex < x.outfits.length) {
				firstTab.className = "hot";
				changeOutfitLink(x.outfits[highlightTabIndex].id);
				alsoTabActive = firstTab;
                tabType = "CTL";
                getOutFits(x.outfits[highlightTabIndex].id);
			} else if (relatedoutfitstablength > 0) {
				firstTab.className = "hot";
				$("outfit_link").style.display = "none";
                tabType = "YMAL";
                alsoTabActive = firstTab;
				getRelatedOutFits(x.relatedoutfits[0].id);
			}
		}
	}
	if (YAHOO.ebauer.productUtils.productPageMode || YAHOO.ebauer.layerbox.getLayerboxState() == "product") {
		YAHOO.ebauer.productUtils.completerLoaded = true;
		YAHOO.ebauer.layerbox.checkProductLayerModules();
	}
};


var tabSelected = -1;
var processRelatedOutFits = function(o)
{
	var x = eval('(' + o.responseText + ')');
	updateDisplay(x.relatedensembles);
};

var processOutFit = function(o){
	var x = eval('(' + o.responseText + ')');
	if(x.ensembles != undefined && x.ensembles.length > 0){
	    YAHOO.ebauer.productUtils.productImageShownColorId = x.alsoModuleColorId;
	}
	updateDisplay(x.ensembles);
};

// This is to display the outfits of a given set.
function updateDisplay(ensembles)
{
	if(ensembles == undefined){
		$("alsoModule").style.display = "none";
		$("outfit_link").style.display = "none";
		return;
	}
	if (ensembles.length <= 0 ) {
		$("alsoModule").style.display = "none";
		$("outfit_link").style.display = "none";
		return;
	}
	var out = document.getElementById("thumbs");
	out.innerHTML = "";
	ulElement = createTag('ul', 'alsoModuleContent', 'thumbs clearfix');
	for (var i = 0; i < ensembles.length; i++) {
		var image = ensembles[i].img;
		var ensemble_id = ensembles[i].id;
		var name = ensembles[i].name;
		var imgElement = createDOM('img', {'src':'' + image});
        var bodyClassName = document.body.className;
        var aElement;
        if (bodyClassName.match('STANDALONE-PRODUCT-PAGE')){
            var ensembleUrl = getBaseURL() + '/catalog/product.jsp?ensembleId=' + ensemble_id;
            var ebCMCatInfo = $("ebCM_CATEGORY_INFO");
            var categoryInfo = null;
            if (ebCMCatInfo !== null) {
            	categoryInfo = $("ebCM_CATEGORY_INFO").value;
            }                   
            if(categoryInfo == null || categoryInfo == "null"){
        	   aElement = createDOM('a', {'href':ensembleUrl, 'alt':'' + name});
            }
           else {
           	   aElement = createDOM('a', {'href':ensembleUrl+categoryInfo, 'alt':'' + name});
           }
        } else {
            aElement = createDOM('a', {'href':'javascript:YAHOO.ebauer.productUtils.completer(\'' + ensemble_id + '\')' , 'alt':'' + name});
        }
        aElement.appendChild(imgElement);
		//var aElement = createDOM('a', {'href':'javascript:YAHOO.ebauer.productUtils.completer(\'' + ensemble_id + '\')' , 'alt':'' + name});


		var liElement = '';
		if (ensemble_id == shownEnsembleId) {
			liElement = createTag('li', 'alsoThumb' + i, 'hot', aElement);
		} else {
			liElement = createTag('li', 'alsoThumb' + i, 'not', aElement);
		}
		ulElement.appendChild(liElement);
	}
	out.appendChild(ulElement);
}

/* To create the link to the multi-product page */
function changeOutfitLink(setId) {
	var linkDiv = $("outfit_link");
	var tempPathInfo = '';
	if (YAHOO.ebauer.productUtils.cmPathInfo != undefined) {
		tempPathInfo = YAHOO.ebauer.productUtils.cmPathInfo;
	}
	if (YAHOO.ebauer.layerbox.getLayerboxState() == 'added' || YAHOO.ebauer.layerbox.getLayerboxState() == 'addedToWishList') {
		tempPathInfo = "T427P" + parentEnsembleId;
	} else if (YAHOO.ebauer.layerbox.getLayerboxState() == 'product' || YAHOO.ebauer.layerbox.getLayerboxState() == undefined || YAHOO.ebauer.layerbox.getLayerboxState() == '') {
		tempPathInfo = "T281P" + parentEnsembleId;
	}

	var tempCatPath = '';
	if (catPath != undefined) {
		tempCatPath = catPath;
	}

	if (linkDiv != undefined) {
		linkDiv.childNodes[0].href = getBaseURL() + '/catalog/multi_product.jsp?setId=' + setId + "&" + YAHOO.ebauer.productUtils.cmCategoryInfo + '&PATH_INFO=' + tempPathInfo + '&CAT_PATH=' + tempCatPath + '&cs=' + cs + '&mainEnsembleId=' + parentEnsembleId;
	}
}