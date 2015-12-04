//this is used to make sure that the footer javascripts load after the header scripts are ready
YAHOO.util.Event.onDOMReady(loadFooterScripts);

var modalID;
//This is used for testing if layers are ready.
var canLoadLayer = false;
var ensembleId;
var categoryId;
var colorId;
//Added for BUG963
var imageName;
var imageTypeCode;

var contentName;

//var pgCnter = 0;
var parentEnsembleId = -1;
var shownEnsembleId = "";
var pathInfo;
var catPath;
var cs;
var productVariantId;
var cmReferrer;
var queryString;
var isGiftBoxSelectedOLD = "N";
var isMonogramSelectedOLD = "N";
var regPrice = "";
var gMonogramInputFields = new Array();
var gMonogramMode = "";
var siteCss = "EB";
/*** ALSOMODULE TABS ***/
var alsoTabActive;
var tablength;
var image_path = "/assets/ocp/content/custserv/monogramming/";
var characters = new Array()
		// Lower Case Characters
		characters[0] = new Array("a",93,33)
		characters[1] = new Array("b",93,32)
		characters[2] = new Array("c",93,32)
		characters[3] = new Array("d",93,32)
		characters[4] = new Array("e",93,32)
		characters[5] = new Array("f",93,23)
		characters[6] = new Array("g",93,32)
		characters[7] = new Array("h",93,31)
		characters[8] = new Array("i",93,12)
		characters[9] = new Array("j",93,19)
		characters[10] = new Array("k",93,29)
		characters[11] = new Array("l",93,12)
		characters[12] = new Array("m",93,47)
		characters[13] = new Array("n",93,31)
		characters[14] = new Array("o",93,33)
		characters[15] = new Array("p",93,33)
		characters[16] = new Array("q",93,33)
		characters[17] = new Array("r",93,21)
		characters[18] = new Array("s",93,27)
		characters[19] = new Array("t",93,28)
		characters[20] = new Array("u",93,29)
		characters[21] = new Array("v",93,32)
		characters[22] = new Array("w",93,51)
		characters[23] = new Array("x",93,37)
		characters[24] = new Array("y",93,32)
		characters[25] = new Array("z",93,28)
		// Upper Case Characters
		characters[26] = new Array("A",93,35)
		characters[27] = new Array("B",93,27)
		characters[28] = new Array("C",93,31)
		characters[29] = new Array("D",93,28)
		characters[30] = new Array("E",93,27)
		characters[31] = new Array("F",93,26)
		characters[32] = new Array("G",93,32)
		characters[33] = new Array("H",93,26)
		characters[34] = new Array("I",93,15)
		characters[35] = new Array("J",93,26)
		characters[36] = new Array("K",93,30)
		characters[37] = new Array("L",93,30)
		characters[38] = new Array("M",93,35)
		characters[39] = new Array("N",93,29)
		characters[40] = new Array("O",93,31)
		characters[41] = new Array("P",93,26)
		characters[42] = new Array("Q",93,32)
		characters[43] = new Array("R",93,28)
		characters[44] = new Array("S",93,29)
		characters[45] = new Array("T",93,31)
		characters[46] = new Array("U",93,28)
		characters[47] = new Array("V",93,33)
		characters[48] = new Array("W",93,45)
		characters[49] = new Array("X",93,38)
		characters[50] = new Array("Y",93,36)
		characters[51] = new Array("Z",93,33)
		// Special Characters
		characters[52] = new Array("0",93,31)
		characters[53] = new Array("1",93,22)
		characters[54] = new Array("2",93,30)
		characters[55] = new Array("3",93,31)
		characters[56] = new Array("4",93,33)
		characters[57] = new Array("5",93,31)
		characters[58] = new Array("6",93,31)
		characters[59] = new Array("7",93,30)
		characters[60] = new Array("8",93,31)
		characters[61] = new Array("9",93,31)
		characters[62] = new Array("#",93,41)
		characters[63] = new Array("/",93,31)
		characters[64] = new Array(",",93,18)
		characters[65] = new Array(".",93,10)
		characters[66] = new Array("&",93,36)
		characters[67] = new Array("-",93,25)
		characters[68] = new Array("'",93,9)
		characters[69] = new Array('"',93,22)
		characters[70] = new Array(" ",93,28)
var monogram_case = "";
var matchFlag = false;
var alsoModuleShow = function(id, idx, ymalFlag) {
	tabIdx = idx;
	setActiveTab(idx);
	changeOutfitLink(id);
	if (ymalFlag) {
		$("outfit_link").style.display = "none";
		tabType = "YMAL";
		getRelatedOutFits(id);
    }
	else {
		$("outfit_link").style.display = "block";
		tabType = "CTL";
		getOutFits(id);
	}
};
var isNN = (navigator.appName.indexOf("Netscape")!=-1);

function autoTab(input,len, e) {
  var keyCode = (isNN) ? e.which : e.keyCode;
  var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];
  if(input.value.length >= len && !containsElement(filter,keyCode)) {
    input.value = input.value.slice(0, len);
    input.form[(getIndex(input)+1) % input.form.length].focus();
	input.form[(getIndex(input)+1) % input.form.length].select();
  }

  function containsElement(arr, ele) {
    var found = false, index = 0;
    while(!found && index < arr.length)
    if(arr[index] == ele)
    found = true;
    else
    index++;
    return found;
  }

  function getIndex(input) {
    var index = -1, i = 0, found = false;
    while (i < input.form.length && index == -1)
    if (input.form[i] == input)index = i;
    else i++;
    return index;
  }
  return true;
}

var inseamFlag = 'N';
function reload(isMonogramAllowed, inseamFlagNode, defaultImageUrl, defaultColorName, defaultColorId, regularPrice, department, overrideSessionId) {
	YAHOO.ebauer.productUtils.resetFlags();
	regPrice = regularPrice;
	$("defaultImageUrl").value = defaultImageUrl;
	$("defaultColorName").value = defaultColorName;
	$("defaultColorId").value = defaultColorId;
    if (getValueFromElement('clearanceCategory') == 'Y') {
	colorIndex = 0;
	sizeIndex = 0;
        var currentlySelectedColorSize = "-1";
        var currentlySelectedColorSizeIndex = $("colorsize").selectedIndex;
        if (currentlySelectedColorSizeIndex > 0)
            currentlySelectedColorSize = $("colorsize").value;
        $("colorsize").selectedIndex = -1;
        $("selectedSwatch").innerHTML = "";
        updateClxColorsAndSizes(currentlySelectedColorSize);
    } else {
        colorIndex = 0;
        sizeIndex = 0;
	var currentlySelectedColor = "-1";
	var currentlySelectedColorIndex = $("color").selectedIndex;
	if (currentlySelectedColorIndex > 0)
		currentlySelectedColor = $("color").value;
	if (YAHOO.ebauer.productUtils.basicMode == true) {
		YAHOO.ebauer.productUtils.copyBasicStyleValues();
		if ($("size").selectedIndex > 0)
			YAHOO.ebauer.productUtils.basicStyleChange();
	}
	$("size").selectedIndex = -1;
	$("color").selectedIndex = -1;
	$("selectedSwatch").innerHTML = "";
	updateColorsAndSizes(currentlySelectedColor);
        }
	changeProductLabel(defaultColorId);
        var inseamFlagVal = inseamFlagNode.value;
	// Add the stmt to check the inseamlag to either hide or display the inseamFlag
	if (inseamFlagVal == "true") {
		// Display the inseam details
		inseamFlag = 'Y';
		var inseamDisplay = YAHOO.util.Dom.get("inseamDetails");
		YAHOO.util.Dom.setStyle(inseamDisplay, "display", "block");
		$("inSeamLength").selectedIndex = 0;
		$("inSeamLength").disabled = "disabled";
		$("hemStyle").selectedIndex = 0;
		initInseam();
		if (isEnableDisplay($("sizeChartLink")))
			disableDisplay($("sizeChartLink"));
		var extendedLinkNode = $("inseamExtendedLink");
		extendedLinkNode.innerHTML = "";
		var aHemStyles = createDOM('a', {'href':'javascript:YAHOO.ebauer.layerbox.transitionContentLayerFromStandAlone("' + getHemStyleCMSSectionId() + '","' + getHemStyleCMSSectionName() + '", 0);'});
		aHemStyles.appendChild(document.createTextNode('Hem Styles'));
		extendedLinkNode.appendChild(aHemStyles);
        //TSK00771 - Product level sizechart override
        if (overrideSessionId != undefined){

            var aHowToMeasure = createDOM('a', {'href':'javascript:YAHOO.ebauer.layerbox.transitionContentLayerFromStandAlone("' + overrideSessionId + '","' + getHowToMeasureSectionName() + '", 0);'});
            aHowToMeasure.appendChild(document.createTextNode('How to Measure'));
            extendedLinkNode.appendChild(document.createTextNode(" , "));
            extendedLinkNode.appendChild(aHowToMeasure);
        } else if (department != undefined) {
			var aHowToMeasure = createDOM('a', {'href':'javascript:YAHOO.ebauer.layerbox.transitionContentLayerFromStandAlone("' + department + '","' + getHowToMeasureSectionName() + '", 0);'});
			aHowToMeasure.appendChild(document.createTextNode('How to Measure'));
			extendedLinkNode.appendChild(document.createTextNode(" , "));
			extendedLinkNode.appendChild(aHowToMeasure);
		}
		if (isDisableDisplay(extendedLinkNode))
			enableDisplay(extendedLinkNode);
	} else {
		YAHOO.util.Dom.get("inseamDetails").style.display = 'none';
		inseamFlag = 'N';
        //TSK00771 - Product level sizechart override
        if (overrideSessionId != undefined){

            $("sizeChartLink").innerHTML = "";
            var sizeChartLinkNode = $("sizeChartLink");
            var aSizeChartLink = createDOM('a', {'href':'javascript:YAHOO.ebauer.layerbox.transitionContentLayerFromStandAlone("' + overrideSessionId + '","' + getSizeChartCMSSectionName() + '", 0);'});
            aSizeChartLink.appendChild(document.createTextNode('Size Chart'));
            sizeChartLinkNode.appendChild(aSizeChartLink);
            if (isDisableDisplay(sizeChartLinkNode))
                enableDisplay(sizeChartLinkNode);
        } else if (department != undefined) {
			$("sizeChartLink").innerHTML = "";
			var sizeChartLinkNode = $("sizeChartLink");
			var aSizeChartLink = createDOM('a', {'href':'javascript:YAHOO.ebauer.layerbox.transitionContentLayerFromStandAlone("' + department + '","' + getSizeChartCMSSectionName() + '", 0);'});
			aSizeChartLink.appendChild(document.createTextNode('Size Chart'));
			sizeChartLinkNode.appendChild(aSizeChartLink);
			if (isDisableDisplay(sizeChartLinkNode))
				enableDisplay(sizeChartLinkNode);
		}
		if (isEnableDisplay($("inseamExtendedLink"))) {
			$("inseamExtendedLink").innerHTML = "";
			disableDisplay($("sizeChartLink"));
		}
	}

	if (YAHOO.ebauer.productUtils.basicMode != true) {
		// no monogram in basic mode
		if (isMonogramAllowed.value == 'Y') {
			// Show the monogram checkbox
			var monogramStyleDiv = document.getElementById("monogram_div");
			monogramStyleDiv.style.display = "block";
			// Reset the checkbox.
			var monogramChkBox = document.getElementById("monogram");
			if (monogramChkBox != null)
				monogramChkBox.checked = false;
			isMonogramSelectedOLD = "N";
			$("monogramExtendedLink").innerHTML = "";
			var aMonogram = createDOM('a', {'href':'javascript:YAHOO.ebauer.layerbox.transitionContentLayer("' + getMonogramCMSSectionId() + '","' + getMonogramCMSSectionName() + '", 0);'});
			aMonogram.appendChild(document.createTextNode('Monogram'));
			var extendedLinkNode = $("monogramExtendedLink");
			extendedLinkNode.appendChild(monogramChkBox);
			extendedLinkNode.appendChild(aMonogram);
		} else {
			// Reset the checkbox.
			var monogramChkBox = document.getElementById("monogram");
			if (monogramChkBox != null)
				monogramChkBox.checked = false;
			isMonogramSelectedOLD = "N";
			// Hide the monogram checkbox
			monogramStyleDiv = document.getElementById("monogram_div");
			monogramStyleDiv.style.display = "none";
		}
	}

        //TSK00771 - Product level sizechart override
        if (overrideSessionId != undefined){

            $("extendedLink").innerHTML = "";
            var aAboutExtendedSizes = createDOM('a', {'href':'javascript:YAHOO.ebauer.layerbox.transitionContentLayerFromStandAlone("' + overrideSessionId + '","' + getAboutExtendedSizes() + '", 0);'});
            aAboutExtendedSizes.appendChild(document.createTextNode('About Extended Sizes'));
            var extendedLinkNode = $("extendedLink");
            extendedLinkNode.appendChild(aAboutExtendedSizes);
        } else if (department != undefined) {
			$("extendedLink").innerHTML = "";
			var aAboutExtendedSizes = createDOM('a', {'href':'javascript:YAHOO.ebauer.layerbox.transitionContentLayerFromStandAlone("' + department + '","' + getAboutExtendedSizes() + '", 0);'});
			aAboutExtendedSizes.appendChild(document.createTextNode('About Extended Sizes'));
			var extendedLinkNode = $("extendedLink");
			extendedLinkNode.appendChild(aAboutExtendedSizes);
		}
	YAHOO.ebauer.productUtils.toggleAddToButton();
	changeMainImage(defaultImageUrl, defaultColorName);
	selectedButtonObj = $("button0");
	if (selectedButtonObj != undefined) {
		selectedButtonObj.style.background = "white";
		selectedButtonObj.style.color = "#CC6601";
	}
}

function reloadEob(department, effort, item) {
	$("dept").value = department;
	$("effort").value = effort;
	$("item").value = item;
}

function setActiveTab(idx) {
	if (alsoTabActive != "undefined" && alsoTabActive != "") {
		alsoTabActive.className = "not";
	}
	alsoTabActive = $("alsoTab" + idx);
	alsoTabActive.className = "hot";
	highlightTabIndex = idx;
}

var alsoThumbSelection;
var tabIdx;
var alsoThumbSelect = function(idx) {
	/*
	 This is a simplified routine to illustrate basic interaction:
	 Selection of thumb will trigger primary product to synchronize to new selection.
 */
	if (typeof alsoThumbSelection == "undefined")
		alsoThumbSelection = $(tabIdx + "alsoThumb" + idx);
	alsoThumbSelection.className = "not";
	alsoThumbSelection = $(tabIdx + "alsoThumb" + idx);
	alsoThumbSelection.className = "hot";
};

var giftBoxEnsembleId;
// To keep track of ensembleId for which the giftbox has popped up.
var giftBoxSelectedValues = new Array(6);
var giftBoxPopupMode = false;

function createMonogram(passedUUID) {
	if (passedUUID != "") {
		itemUUID = passedUUID;
		gBackToCat = 'Shopping Bag';
		queryString = 'uuid=' + itemUUID;
		var cObj = YAHOO.ebauer.utilities.asyncRequest('GET', getBaseURL() + '/ajax/loadMonogramDetails.jsp?uuid=' + passedUUID, callbackLoadMonogram);
	}
}

function populateMonogrammingInputFields() {
	var tempObj = document.getElementById("lines");
	if (isDefined(tempObj)) {
		gMonogramInputFields[0] = tempObj;
		return;
	}
    for (var i = 1; i <= 3; i++) {
		tempObj = document.getElementById("initial_" + i);
		if (isDefined(tempObj)) {
			gMonogramInputFields[i - 1] = tempObj;
		}
	}
}

function isDefined(obj) {
	if (obj != null && obj != undefined) {
		return true;
	}
	return false;
}

function updateColors(currentColor) {
	var selectColor = $("color");
	var selectSize = $("size");

	if (selectSize.selectedIndex > 0) {
		colorIndex = selectColor.selectedIndex;
		colorValue = selectColor.value;
		selectColor.options.length = 0;
		getColors(selectColor, selectSize.value, colorValue);
	} else {
        if (currentColor != undefined && currentColor.length > 0) {
            getColors(selectColor, selectSize.value, currentColor);
        } else {
            getColors(selectColor, selectSize.value, "-1");
        }
    }
}

/* ENH00038 Updates*/
function updateClxColorSizes(currentColorSize) {
    var selectColor = $("colorsize");
    selectColor.options.length = 0;
    if (currentColorSize != undefined && currentColorSize.length > 0) {
        getColorSizes(selectColor, currentColorSize);
    } else {
        getColorSizes(selectColor, "-1");
    }
}

/**
 * Function added to solve the issue with the loading of size and color when the product page loads.
 */
function updateColorSize() {
	if (($("size") != undefined) && ($("color") != undefined)) {
		updateColorsAndSizes();
	} else {
		doPoll = setTimeout("updateColorSize()", 50);
	}
}
function retrieveCopyText() {
	if ($("infoModule") == undefined) {
		doPoll = setTimeout("retrieveCopyText()", 50);
	} else {
		getCopyText(null);

	}
}

function updateInseamLength() {
	var hemStyle = $("hemStyle");
	$("inSeamLength").selectedIndex = 0;
	//$("inSeamLength").value = "default";

	if (hemStyle.value == "Unfinished" || hemStyle.selectedIndex == 0)
		$("inSeamLength").disabled = "disabled";
	else
		getInseamLength(hemStyle);

	YAHOO.ebauer.productUtils.toggleAddToButton();
}

function updateSizes() {
	var selectColor = $("color");
	if (selectColor.selectedIndex != 0 || gGetSizeFlag) {
		var selectSize = $("size");
		sizeIndex = selectSize.selectedIndex;
		sizeValue = selectSize.value;
		if (sizeIndex == -1)
			sizeIndex = 0;
		selectSize.options.length = 0;
		gGetSizeFlag = false;
		getSizes(selectSize, selectColor.value);
	}
}

function updateOutFitsModule() {
	eobFlag = getValueFromElement('eob');
	pageType = getValueFromElement('pageType');
	YAHOO.ebauer.productUtils.productImageShownColorId = getValueFromElement('defaultColorId');
	var select = $("alsoTab0");
	if (eobFlag != 'true')
		getOutFitTabs(select);
}

function addEOBFormModule() {
	addEOBForm($('eobModule'));
	YAHOO.ebauer.productUtils.eobLoaded = true;
	YAHOO.ebauer.layerbox.checkProductLayerModules();
}

function addEOBForm(area) {
	area.innerHTML = "";
	if ($("deptIndex") != undefined) {
		deptIndex = $("deptIndex").value;
	}
	if ($("dept") != undefined) {
		dept = $("dept").value;
	}
	if ($("effort") != undefined) {
		effort = $("effort").value;
		if (effort.length == 2) {
			effort = "0" + effort;
		}
	}
	if ($("firstEffort") != undefined) {
	  firstEffort = $("firstEffort").value;
	  if (firstEffort.length == 2) {
			firstEffort = "0" + effort;
	  }
	}
	if ($("item") != undefined) {
		item = $("item").value;
	}
	var divElement = createTag('div', null, 'eobContainer clearfix', null);
	var h5Element = createTag('h5', null, null, null);
	h5Element.appendChild(document.createTextNode('Catalog Quick Order'));
	var textElement = createTag('p', null, null, null);
	textElement.appendChild(document.createTextNode('Looking for a different item?'));
	var formTag = createTag('form', 'eobForm', 'action', null);
	formTag.action = 'javascript:validateSkuFormat(\'deptLayer\',\'effortLayer\',\'itemLayer\', \'Catalog Quick Order\')';
	var eobDiv = createTag('div', 'eobDivOnLayer', null, null);
	// start dept field
	var exampleSpan = createTag('span', 'deptFormat', null, document.createTextNode('A00'));
	var inputElement = createDOM('input', {'type':'text', 'name':'deptLayer','id':'deptLayer','size':'3','maxLength':'3','value':deptIndex + dept,'autocomplete':'off','onkeyup':'eobAutotab(\'deptLayer\', \'effortLayer\',3);'});
	var numsDiv = createTag('div', null, 'alignEobNums', null);
	numsDiv.appendChild(inputElement);
	numsDiv.appendChild(createTag('br'));
	numsDiv.appendChild(exampleSpan);
	eobDiv.appendChild(numsDiv);
	// end dept field, start effort field
	exampleSpan = createTag('span', 'effortFormat', null, document.createTextNode('000'));
	inputElement = createDOM('input', {'type':'text', 'name':'effortLayer','id':'effortLayer','size':'3','maxLength':'3','value':( (firstEffort != '') ? firstEffort : effort),'autocomplete':'off','onkeyup':'eobAutotab(\'effortLayer\', \'itemLayer\',3);'});
	numsDiv = createTag('div', null, 'alignEobNums', null);
	numsDiv.appendChild(inputElement);
	numsDiv.appendChild(createTag('br'));
	numsDiv.appendChild(exampleSpan);
	eobDiv.appendChild(numsDiv);
	//end effort field, start item field
	exampleSpan = createTag('span', 'itemFormat', null, document.createTextNode('0000'));
	inputElement = createDOM('input', {'type':'text', 'name':'itemLayer','id':'itemLayer','size':'4','maxLength':'4','autocomplete':'off','value':item});
	numsDiv = createTag('div', null, 'alignEobNums', null);
	numsDiv.appendChild(inputElement);
	numsDiv.appendChild(createTag('br'));
	numsDiv.appendChild(exampleSpan);
	eobDiv.appendChild(numsDiv);
	// end item field
	var goButt = createDOM('input', {'type':'submit', 'name':'eobGo', 'id':'eobGo', 'class':'button', 'value':'Go'});
	eobDiv.appendChild(goButt);
	eobDiv.appendChild(createTag('br'));
	formTag.appendChild(eobDiv);
	divElement.appendChild(h5Element);
	divElement.appendChild(textElement);
	divElement.appendChild(formTag);
	area.appendChild(divElement);
}

function updateOutFits() {
	var select = $("alsoTab0");
	getOutFits(select);
}

function updateMonogramStyles(fontVal) {
	var selectMgmStyle = $("monogram_style");
	var selectMgmFont = $("monogram_font");
	if (fontVal == null) {
		fontVal = '-1';
	}
	getMonogramStyles(selectMgmStyle, fontVal);
}

function updateMonogramFonts(styleVal) {
	var textObj = $("monogramTextDiv_error");
	textObj.innerHTML = "&nbsp;";
	var selectMgmFont = $("monogram_font");

	if (styleVal > 0)
		enableDisplay($("preview_button"));
	else
		disableDisplay($("preview_button"));
	getMonogramFonts(selectMgmFont, styleVal);
}

function updateMonogramColors() {
	var selectMgmColor = $("monogram_color");
	getMonogramColors(selectMgmColor);
}

function validateStyle(selectedFontVal) {
	var selectMgmStyle = $("monogram_style");
	var selectMgmFont = $("monogram_font");
	if (selectedFontVal == null || selectedFontVal == -1) {
		gMonogramFontFlag = false;
		setContinueMonogramButton();
		if (selectMgmStyle != null && selectMgmStyle.selectedIndex == 0) {
			return false;
		}
	} else {
		gMonogramFontFlag = true;
	}
	setContinueMonogramButton();
	return true;
}

function resetPreviewBox(reset_type) {
	var previewObj = $("previewTextDt");
	if (previewObj != null && previewObj != undefined) {
	 //	previewObj.innerHTML = "&nbsp;"; Dont reset Dt now using images for text, will cause a error - Rick young
	}
}

function ClearPreviewBox() {
	var previewObj = $("previewTextDt");
	if (previewObj != null && previewObj != undefined) {
	 	previewObj.innerHTML = "&nbsp;"; // Clear Dt for Images - Rick young
	}
}

function displayMonogramTextFields(styleIndex) {
	//styleIndex is the selectedIndex and id of the Array element
	ClearPreviewBox();
	if (styleIndex > 0) {
		gMonogramInputFields = new Array();
		var monogram_notesText = $("monogram_notesText");
		var monogram_tipsText = $("monogram_tipsText");
		var selectMgmStyle = $("monogram_style");
		var styleInputLabelText = $("mgmStyleInputLabel");
		var styleIdSelected = selectMgmStyle.value;
		var numOfLines = 1;
		var numOfChars = 1;
		var displayText = 'Please enter the single initial you wish to appear';
		var INITIAL_NOTES_TEXT = "The letters are Upper case.";
		var DEFAULT_NOTES_TEXT = "The first letter is upper-case and all others are lower-case.";
		var DEFAULT_TIPS_TEXT = "<big>Tips:</big> Be creative. In addition to names or initials, you can monogram amusing phrases such as \"My Bag\", \"His\" or \"Hers\" and so on.";
		var INITIAL_TIPS_TEXT = " ";
		var initials_styleInputLabel_text = " ";
		var lines_styleInputLabel_text = "Enter Name or Word";
		var previewTextDtElement = $('previewTextDt');

		if (styleLineNums != null) {
			numOfLines = styleLineNums[styleIndex];
		}

		if (styleCharNums != null) {
			numOfChars = styleCharNums[styleIndex];
		}

		if (styleTexts != null) {
			displayText = styleTexts[styleIndex];
		}

		if (styleNames[styleIndex].indexOf("Initial") == -1) {
			monogram_notesText.innerHTML = DEFAULT_NOTES_TEXT;
			monogram_tipsText.innerHTML = DEFAULT_TIPS_TEXT;
			styleInputLabelText.innerHTML = lines_styleInputLabel_text;
		} else {
			monogram_notesText.innerHTML = INITIAL_NOTES_TEXT;
			monogram_tipsText.innerHTML = INITIAL_TIPS_TEXT;
			styleInputLabelText.innerHTML = initials_styleInputLabel_text;
		}

		var mgmDisplayTextDivElement = $("monogram_displaytext");
		if (mgmDisplayTextDivElement != null && displayText != null) {
			mgmDisplayTextDivElement.innerHTML = "";
			mgmDisplayTextDivElement.innerHTML += displayText;
		}

		divElement = $("monogramTextDiv");
		divElement.innerHTML = "&nbsp;";
		var firstNote = "first";
		var middleNote = "middle";
		var lastNote = "last";

		if (styleIdSelected == 2) {
			// 1 Initial
			if (divElement != null) {
				//construct DOM for single initial.
				var inputElement = createDOM('input', {'type':'text','class':'textinput initial', 'name':'initial_1','id':'initial_1','maxLength':'1','size':'1','tabindex':'4','onFocus':'this.select();','onKeyUp':'Monogram_Preview(this);'});
				divElement.appendChild(inputElement);
				divElement.appendChild(createDOM('input', {'type':'hidden', 'name':'mgminstruction','id':'mgminstruction','value':'INITIALS, ALL CAPS'}));
				gMonogramInputFields[0] = inputElement;

				var initial_1_img = createDOM('img', {'class':'mgmInitialImage'});
				initial_1_img.id = "initial_1_img";
				initial_1_img.src = image_path + "blank.gif";
				initial_1_img.height = 93;
				previewTextDtElement.appendChild(initial_1_img);
			}
		} else if (styleIdSelected == 4 || styleIdSelected == 5 || styleIdSelected == 9 || styleIdSelected == 10 || styleIdSelected == 12 || styleIdSelected == 13) {
			// 4 -> Up to 7
			// 5 -> Up to 9
			if (divElement != null) {
				//construct DOM for single initial.
				var inputElement = createDOM('input', {'type':'text','class':'textinput', 'name':'lines','id':'lines','maxLength':numOfChars,'size':numOfChars,'tabindex':'4','onFocus':'this.select();','onKeyUp':'Monogram_Preview(this);'});
				divElement.appendChild(inputElement);
				divElement.appendChild(createDOM('input', {'type':'hidden', 'name':'mgminstruction','id':'mgminstruction','value':''}));
				gMonogramInputFields[0] = inputElement;

				// build totalChars images

						var initial_div = createDOM('div', {'class':'mgmInitialImageDiv'});
						initial_div.id = "initial_"+1+"_div";
						previewTextDtElement.appendChild(initial_div);

					for (var i=1; i<=(numOfChars); i++) {

						var initial_i_img = createDOM('img', {'class':'mgmInitialImageLine'});
						initial_i_img.id = "initial_"+i+"_img";
						initial_i_img.src = image_path +"blank.gif";
						initial_i_img.visibility = "hidden";
						previewTextDtElement.appendChild(initial_i_img);

						var initial_count = createDOM('input', {'class':'mgmInitialCount'});
						initial_count.id = "mgmImageCount";
						initial_count.type = "hidden";
						initial_count.value = numOfChars;
						previewTextDtElement.appendChild(initial_count);
					}

			}
		} else if (styleIdSelected == 11) {
			// 2 Initial, Equal Size
			if (divElement != null) {
				//construct DOM for single initial.
				var divInitialElement = createDOM('div', {'class':'mgmInitialInput'});
				var inputElement = createDOM('input', {'type':'text','class':'textinput initial', 'name':'initial_1','id':'initial_1','maxLength':'1','size':'1','tabindex':'4','onFocus':'this.select();','onKeyUp':'Monogram_Preview(this);'});
				divElement.appendChild(divInitialElement);
				divInitialElement.appendChild(inputElement);
				gMonogramInputFields[0] = inputElement;

				divInitialElement = createDOM('div', {'class':'mgmInitialInput'});
				inputElement = createDOM('input', {'type':'text','class':'textinput initial', 'name':'initial_2','id':'initial_2','maxLength':'1','size':'1','tabindex':'5','onFocus':'this.select();','onKeyUp':'Monogram_Preview(this);'});
				divElement.appendChild(divInitialElement);
				divInitialElement.appendChild(inputElement);
				gMonogramInputFields[1] = inputElement;
				divElement.appendChild(createDOM('input', {'type':'hidden', 'name':'mgminstruction','id':'mgminstruction','value':'INITIALS, ALL CAPS'}));

				var initial_1_img = createDOM('img', {'class':'mgmInitialImage'});
				initial_1_img.id = "initial_1_img";
				initial_1_img.src = image_path + "blank.gif";
				previewTextDtElement.appendChild(initial_1_img);

				var initial_2_img = createDOM('img', {'class':'mgmInitialImage'});
				initial_2_img.id = "initial_2_img";
				initial_2_img.src = image_path + "blank.gif";
				previewTextDtElement.appendChild(initial_2_img);
			}
		} else if (styleIdSelected == 3) {
			// 3 Initial, Lg middle
			if (divElement != null) {
				//construct DOM for single initial.
				var divInitialElement = createDOM('div', {'class':'mgmInitialInput'});
				var brElement = createDOM('br');
				var spanTextElement = createDOM('span', {'class':'note'});
				var inputElement = createDOM('input', {'type':'text','class':'textinput initial', 'name':'initial_1','id':'initial_1','maxLength':'1','size':'1','tabindex':'4','onFocus':'this.select();','onKeyUp':'Monogram_Preview(this);'});
				divElement.appendChild(divInitialElement);
				divInitialElement.appendChild(inputElement);
				gMonogramInputFields[0] = inputElement;
				brElement = createDOM('br');
				divInitialElement.appendChild(brElement);
				spanTextElement = createDOM('span', {'class':'note'});
				divInitialElement.appendChild(spanTextElement);
				spanTextElement.innerHTML = firstNote;

				divInitialElement = createDOM('div', {'class':'mgmInitialInput', 'id':'tall'});
				divElement.appendChild(divInitialElement);
				inputElement = createDOM('input', {'type':'text','class':'textinput initial initial_tall', 'name':'initial_3','id':'initial_3','maxLength':'1','size':'1','tabindex':'6','onFocus':'this.select();','onKeyUp':'Monogram_Preview(this);'});
				divInitialElement.appendChild(inputElement);
				gMonogramInputFields[2] = inputElement;
				brElement = createDOM('br');
				divInitialElement.appendChild(brElement);
				spanTextElement = createDOM('span', {'class':'note'});
				divInitialElement.appendChild(spanTextElement);
				spanTextElement.innerHTML = lastNote;

				divInitialElement = createDOM('div', {'class':'mgmInitialInput'});
				divElement.appendChild(divInitialElement);
				inputElement = createDOM('input', {'type':'text','class':'textinput initial', 'name':'initial_2','id':'initial_2','maxLength':'1','size':'1','tabindex':'5','onFocus':'this.select();','onKeyUp':'Monogram_Preview(this);'});
				divInitialElement.appendChild(inputElement);
				divElement.appendChild(createDOM('input', {'type':'hidden', 'name':'mgminstruction','id':'mgminstruction','value':''}));
				gMonogramInputFields[1] = inputElement;
				brElement = createDOM('br');
				divInitialElement.appendChild(brElement);
				spanTextElement = createDOM('span', {'class':'note'});
				divInitialElement.appendChild(spanTextElement);
				spanTextElement.innerHTML = middleNote;

				var initial_1_img = createDOM('img', {'class':'mgmInitialImage'});
				initial_1_img.id = "initial_1_img";
				initial_1_img.src = image_path + "blank.gif";
				initial_1_img.height = 93;
				previewTextDtElement.appendChild(initial_1_img);

				var initial_3_img = createDOM('img', {'class':'mgmInitialImageLg'});
				initial_3_img.id = "initial_3_img";
				initial_3_img.src = image_path + "blank.gif";
				initial_3_img.height = 130;
				previewTextDtElement.appendChild(initial_3_img);

				var initial_2_img = createDOM('img', {'class':'mgmInitialImage'});
				initial_2_img.id = "initial_2_img";
				initial_2_img.src = image_path +"blank.gif";
				initial_2_img.height = 93;
				previewTextDtElement.appendChild(initial_2_img);
			}
		} else if (styleIdSelected == 6) {
			// 3 Initial, Equal Size
			if (divElement != null) {
				//construct DOM for single initial.
				var divInitialElement = createDOM('div', {'class':'mgmInitialInput'});
				divElement.appendChild(divInitialElement);
				var inputElement = createDOM('input', {'type':'text','class':'textinput initial', 'name':'initial_1','id':'initial_1','maxLength':'1','size':'1','tabindex':'4','onFocus':'this.select();','onKeyUp':'Monogram_Preview(this);'});
				divInitialElement.appendChild(inputElement);
				gMonogramInputFields[0] = inputElement;
				var brElement = createDOM('br');
				brElement = createDOM('br');
				divInitialElement.appendChild(brElement);
				var spanTextElement = createDOM('span', {'class':'note'});
				divInitialElement.appendChild(spanTextElement);
				spanTextElement.innerHTML = firstNote;

				divInitialElement = createDOM('div', {'class':'mgmInitialInput'});
				divElement.appendChild(divInitialElement);
				inputElement = createDOM('input', {'type':'text','class':'textinput initial', 'name':'initial_2','id':'initial_2','maxLength':'1','size':'1','tabindex':'5','onFocus':'this.select();','onKeyUp':'Monogram_Preview(this);'});
				divInitialElement.appendChild(inputElement);
				gMonogramInputFields[1] = inputElement;
				brElement = createDOM('br');
				divInitialElement.appendChild(brElement);
				spanTextElement = createDOM('span', {'class':'note'});
				divInitialElement.appendChild(spanTextElement);
				spanTextElement.innerHTML = middleNote;

				divInitialElement = createDOM('div', {'class':'mgmInitialInput'});
				divElement.appendChild(divInitialElement);
				inputElement = createDOM('input', {'type':'text','class':'textinput initial', 'name':'initial_3','id':'initial_3','maxLength':'1','size':'1','tabindex':'6','onFocus':'this.select();','onKeyUp':'Monogram_Preview(this);'});
				divInitialElement.appendChild(inputElement);
				gMonogramInputFields[2] = inputElement;
				brElement = createDOM('br');
				divInitialElement.appendChild(brElement);
				spanTextElement = createDOM('span', {'class':'note'});
				divInitialElement.appendChild(spanTextElement);
				spanTextElement.innerHTML = lastNote;

				divElement.appendChild(createDOM('input', {'type':'hidden', 'name':'mgminstruction','id':'mgminstruction','value':'INITIALS, ALL CAPS'}));

				var initial_1_img = createDOM('img', {'class':'mgmInitialImage'});
				initial_1_img.id = "initial_1_img";
				initial_1_img.src = image_path + "blank.gif";
				previewTextDtElement.appendChild(initial_1_img);

				var initial_2_img = createDOM('img', {'class':'mgmInitialImage'});
				initial_2_img.id = "initial_2_img";
				initial_2_img.src = image_path +"blank.gif";
				previewTextDtElement.appendChild(initial_2_img);

				var initial_3_img = createDOM('img', {'class':'mgmInitialImage'});
				initial_3_img.id = "initial_3_img";
				initial_3_img.src = image_path + "blank.gif";
				previewTextDtElement.appendChild(initial_3_img);
			}
		} else if (styleIdSelected == 8 || styleIdSelected == 7) {
			// 8 -> 2 lines, max 20 each
			// 7 -> 4 lines, max 20 each
			var totalChars = numOfLines * numOfChars;
			var areaWidth = '50%';
			var areaHeight = '50%';
			var newStyle = 'width:50%;height:50%;';
			if (styleIdSelected == 8) {
				areaWidth = '100%';
				newStyle = 'width:100%;height:50%;';
			} else if (styleIdSelected == 7) {
				areaWidth = '100%';
				areaHeight = '80%';
				newStyle = 'width:100%;height:80%;';
			}
			var textLimitFn = 'limitTextarea(this,' + numOfLines + ',' + numOfChars + ')';

			if (divElement != null) {
				//construct DOM for single initial.
				var textAreaElement = createDOM('textarea', {'onKeyUp':textLimitFn,'style':newStyle, 'name':'lines','id':'lines','maxLength':totalChars,'size':totalChars,'wrap':'off','tabindex':'4'});
				divElement.appendChild(textAreaElement);
				divElement.appendChild(createDOM('input', {'type':'hidden', 'name':'mgminstruction','id':'mgminstruction','value':''}));
				gMonogramInputFields[0] = textAreaElement;

				// build totalChars images
				for (var j=1; j<=(numOfLines); i++) {

						var initial_div = createDOM('div', {'class':'mgmInitialImageDiv'});
						initial_div.id = "initial_"+j+"_div";
						previewTextDtElement.appendChild(initial_div);

					for (var i=1; i<=(numOfChars); i++) {

						var initial_i_img = createDOM('img', {'class':'mgmInitialImageLine'});
						initial_i_img.id = "initial_"+i+"_img";
						initial_i_img.src = image_path +"blank.gif";
						initial_i_img.visibility = "hidden";
						previewTextDtElement.appendChild(initial_i_img);

						var initial_count = createDOM('input', {'class':'mgmInitialCount'});
						initial_count.id = "mgmImageCount";
						initial_count.type = "hidden";
						initial_count.value = numOfChars;
						previewTextDtElement.appendChild(initial_count);
					}
				}
			}
		}
		var ids = divElement.childNodes;
		YAHOO.util.Event.addListener(ids, 'keyup', setPreviewButton);
	}
}

function isMonogramTextStyleSelected() {
	var textStyleObj = $("monogram_font");
	if (textStyleObj != null && textStyleObj != undefined) {
		if (textStyleObj.value != -1) {
			return true;
		}
		return false;
	}
	return true;
}

function validateMonogram() {
	var hasMonogramErrors = false;
	var styleObj = $("monogram_style");
	var styleErrorObj = $("monogram_style_error");
	if (styleObj != null || styleObj != undefined) {
		if (styleObj.selectedIndex < 1) {
			enableDisplay(styleErrorObj);
			hasMonogramErrors = true;
		} else {
			disableDisplay(styleErrorObj);
		}
	}

	var colorObj = $("monogram_color");
	var colorErrorObj = $("monogram_color_error");
	if (colorObj != null || colorObj != undefined) {
		if (colorObj.selectedIndex < 1) {
			enableDisplay(colorErrorObj);
			hasMonogramErrors = true;
		} else {
			disableDisplay(colorErrorObj);
		}
	}

	// Validate the text style
	var textStyleErrorObj = $("monogram_font_error");
	if (textStyleErrorObj != undefined && textStyleErrorObj != null) {
		if (isMonogramTextStyleSelected()) {
			disableDisplay(textStyleErrorObj);
		} else {
			enableDisplay(textStyleErrorObj);
			hasMonogramErrors = true;
		}
	}

	return hasMonogramErrors;
}


var firstDelay = false;

function Monogram_color_Select(input){

 if (input.options[input.selectedIndex].value != "")
   {
     monogram_color=input.options[input.selectedIndex].value;
	 Monogram_Preview();
   }

}

function Monogram_Style_Select(input){

 if (input.options[input.selectedIndex].value != "")
   {
     monogram_style=input.options[input.selectedIndex].value;
	 Monogram_Preview();
   }

}

function Monogram_Swatch_Select(input){

 if (input.options[input.selectedIndex].value != "")
   {
     monogram_Swatch=input.options[input.selectedIndex].value;
	 Swatch_url = 'url("' + image_path  + 'bg_' + monogram_Swatch + '.jpg") repeat';
	 document.getElementById('monogramming_preview').style.background = Swatch_url;

   }

}

function Monogram_Preview(Initial_id) {
	// Get Monogramming letters

    displayPreviewText();

}

function Monogram_case(initial, CharType){
 var initial = initial;
 monogram_case = ""; //reset case flag
 matchFlag = false;

if (CharType == "number" || CharType == "both" && matchFlag == false){

	var n = /[0-9]/g
	if(initial.match(n)) {
		monogram_case = "number";
		matchFlag = true;
	}
}

if (CharType == "letters" || CharType == "both" && matchFlag == false){

 var r = /[a-z]/g
	if(initial.match(r)) {
		monogram_case = "lc";
		matchFlag = true;
	}

 var R = /[A-Z]/g
	if(initial.match(R)) {
		monogram_case = "uc";
		matchFlag = true;
	}
}


if (CharType == "special" || CharType == "both" && matchFlag == false){

	monogram_case = "Special";
	matchFlag = true;

}

 if (initial == null || initial == '' || initial == ' '){
	monogram_case = "Space";
 }

	return monogram_case;

}

function Monogramming_Image(Monogramming_Image_ID, Letter, CharType) {
	var monogram_font = "gb"; // default font German Block
	var monogram_color = "brown"; // default Stiching color

	if ($("monogram_font").options[$("monogram_font").selectedIndex].value != ""){
		monogram_selected_font = $("monogram_color").options[$("monogram_color").selectedIndex].text;

			// Monogramming Fonts
			var x = monogram_selected_font;
			switch (x) {
			case "w_german block":
				monogram_font = "gb";
				break;
			case "diamond block":
				monogram_font = "db";
				break;
			case "connecting_script block":
				monogram_font = "cs";
				break;
			case "diana_script block":
				monogram_font = "ds";
				break;

			}

    }

	if ($("monogram_color").options[$("monogram_color").selectedIndex].value != ""){
     monogram_color = $("monogram_color").options[$("monogram_color").selectedIndex].text.toLowerCase();
    }

	monogram_case = Monogram_case(Letter, CharType);

	// Get image size info here
	for (var j=0; j< (characters.length); j++) {

		if (characters[j][0] == Letter){
			Letter_height = characters[j][1];
			Letter_width = characters[j][2];
		}

	}

	if (monogram_case == "Special" || monogram_case == "number"){
		// special characters
			var x = Letter;
			switch (x) {
			case "&":
				Letter = "ampersand";
				break;
			case ",":
				Letter = "comma";
				break;
			case "'":
				Letter = "apostrophe";
				break;
			case "-":
				Letter = "hyphen";
				break;
			case ".":
				Letter = "period";
				break;
			case "#":
				Letter = "pound";
				break;
			case '"':
				Letter = "quote";
				break;
			case "/":
				Letter = "slash";
				break;
			}

			Monogramming_Image_ID.src = image_path + monogram_color + "/" + Letter + "_" + monogram_font + ".gif";
			Monogramming_Image_ID.height = Letter_height;
			Monogramming_Image_ID.width = Letter_width;
			Monogramming_Image_ID.visibility = "visible";

	}else if (monogram_case == "uc" || monogram_case == "lc"){
			Monogramming_Image_ID.src = image_path + monogram_color + "/" + Letter + "_" + monogram_font + "_" + monogram_case + ".gif";
			Monogramming_Image_ID.height = Letter_height;
			Monogramming_Image_ID.width = Letter_width;
			Monogramming_Image_ID.visibility = "visible";

	}else if (monogram_case == "Space"){
			Monogramming_Image_ID.src = image_path + "blank.gif";
			Monogramming_Image_ID.height = Letter_height;
			Monogramming_Image_ID.width = Letter_width;
			Monogramming_Image_ID.visibility = "visible";
	}

}


function displayPreviewText() {
	if (!loadItemsOnAjaxComplete.updateFontsAjaxCompleted && !firstDelay && mode == 'edit') {
		firstDelay = true;
		doPoll = setTimeout("displayPreviewText()", 100);
	}
	var hasMonogramErrors;
	hasMonogramErrors = validateMonogram();

	if (hasMonogramErrors)
		return;

	// current Style Id
	var selectMgmStyle = $("monogram_style");
	var styleIdSelected = selectMgmStyle.value;
	var textObj = $("monogramTextDiv_error");
	var previewTextDtElement = document.getElementById("previewTextDt");

	if (textObj != null || textObj != undefined) {
		disableDisplay(textObj);
	}
	if (styleIdSelected == 3) {

		// 3 Initials, Lg Middle
		var initial_1 = $("initial_1").value;
		var initial_2 = $("initial_2").value;
		var initial_3 = $("initial_3").value;

		// set letter cases
		initial_1 = initial_1.toUpperCase();
		$("initial_1").value = initial_1;
		initial_2 = initial_2.toUpperCase();
		$("initial_2").value = initial_2;
		initial_3 = initial_3.toUpperCase();
		$("initial_3").value = initial_3;

		var previewText = initial_1 + initial_2 + initial_3;

		var Initial1ID = $("initial_1_img");
		Monogramming_Image(Initial1ID, initial_1,'letters');

		var Initial3ID = $("initial_3_img");
		Monogramming_Image(Initial3ID, initial_3,'letters');

		var Initial2ID = $("initial_2_img");
		Monogramming_Image(Initial2ID, initial_2,'letters');

		changeMonogramColorMode = "true";

	} else if (styleIdSelected == 6) {
		// 3 Initials, Equal Size
		var initial_1 = $("initial_1").value;
		var initial_2 = $("initial_2").value;
		var initial_3 = $("initial_3").value;

		// set letter cases
		initial_1 = initial_1.toUpperCase();
		$("initial_1").value = initial_1;
		initial_2 = initial_2.toUpperCase();
		$("initial_2").value = initial_2;
		initial_3 = initial_3.toUpperCase();
		$("initial_3").value = initial_3;

		var previewText = initial_1 + initial_2 + initial_3 ;

		var Initial1ID = $("initial_1_img");
		Monogramming_Image(Initial1ID, initial_1,'letters');

		var Initial2ID = $("initial_2_img");
		Monogramming_Image(Initial2ID, initial_2,'letters');

		var Initial3ID = $("initial_3_img");
		Monogramming_Image(Initial3ID, initial_3,'letters');

		changeMonogramColorMode = "true";

	} else if (styleIdSelected == 11) {
		// 2 Initials
		var initial_1 = $("initial_1").value;
		var initial_2 = $("initial_2").value;

		// set letter cases
		initial_1 = initial_1.toUpperCase();
		$("initial_1").value = initial_1;
		initial_2 = initial_2.toUpperCase();
		$("initial_2").value = initial_2;

		var previewText = initial_1 + initial_2;

		var Initial1ID = $("initial_1_img");
		Monogramming_Image(Initial1ID, initial_1,'letters');

		var Initial2ID = $("initial_2_img");
		Monogramming_Image(Initial2ID, initial_2,'letters');

		changeMonogramColorMode = "true";

	} else if (styleIdSelected == 2) {
		// 1 Initial
		var initial_1 = $("initial_1").value;
		// set letter cases
		initial_1 = initial_1.toUpperCase();
		$("initial_1").value = initial_1;

		var previewText = initial_1;

		var Initial1ID = $("initial_1_img");
		Monogramming_Image(Initial1ID, initial_1,'letters');

		changeMonogramColorMode = "true";

	} else {
		var linesVal = '';
		var newLines = '';
		if ($("lines") != null)
			linesVal = $("lines").value;
		if (!containsValidWords(linesVal)) {
			displayErrorMessage(getMonogramErrorMessage("monogram.validationError.invalidMonogram"));
			return;
		}
		linesVal = linesVal.replace(/\r\n/, "|");
		linesVal = linesVal.replace(/\n/, "|");
		linesVal = linesVal.replace(/\r/, "|");


		// build images for lines
			var letter = '';
			// reset line
			var letterCount = parseInt($("mgmImageCount").value);
			for (var i=1; i<=(letterCount); i++) {
				var ImageID = $("initial_" + i + "_img");
				ImageID.src = image_path +"empty.gif";
				ImageID.visibility = "hidden";
			}

				for (var i=0; i<=(linesVal.length); i++) {

					// check here to see if end of line
					if (linesVal.charAt(i) == '|'){	 //end of line

					}else{

						// Remarked out case switching - Rick Young
						 if (i == 0){
							letter = linesVal.charAt(i).toUpperCase();
						 }else{
							letter = linesVal.charAt(i).toLowerCase();
						 }

						// letter = linesVal.charAt(i); Remarked out case switching - Rick Young

						imageIndex = i+1;
						var ImageID = $("initial_" + imageIndex + "_img");
						if (ImageID != null){
							newLines = newLines + letter;
							Monogramming_Image(ImageID, letter,'both');
						}
						$("lines").value = newLines;
					}

					changeMonogramColorMode = "true";
				}


	}
}

function limitTextarea(textarea, maxLines, maxChar) {
	var lines = textarea.value.replace(/\r/g, '').split('\n'),lines_removed,char_removed,i;
	if (maxLines && lines.length > maxLines) {
		alert('You can not enter\nmore than ' + maxLines + ' lines');
		lines = lines.slice(0, maxLines);
		lines_removed = 1;
	}
	if (maxChar) {
		i = lines.length;
		while (i-- > 0)if (lines[i].length > maxChar) {
			lines[i] = lines[i].slice(0, maxChar);
			char_removed = 1;
		}
		if (char_removed)
			alert('You can not enter more\nthan ' + maxChar + ' characters per line');
	}
	if (char_removed || lines_removed)
		textarea.value = lines.join('\n');
}


var mode = 'add';
var quantitySelected = -1;
var currentQtyForGiftBox = -1;
var productId = -1;

var ensembleName = '';
var productStyleName = '';
var colorIdSelected = -1;
var sizeIdSelected = -1;
var currentCatId = -1;
var giftBoxFrom = '';
var giftBoxTo = '';
var giftBoxMsg = '';
var catName = '';
var hemStyle = '';
var inseamLength = '';
var showSizes = '';

var monogramIgnoredFlag = false;
var monogramStyle = '';
var monogramTextColor = '';
var monogramTextStyle = '';
var monogramText = '';
var monogram_initial_1 = null;
var monogram_initial_2 = null;
var monogram_initial_3 = null;
var monogram_lines = null;
var monogram_instructions = '';
var monogramContent = "";
// are these being used?
var mgmEnabledFlag = "N";
var giftboxEnabledFlag = "N";

//additional variables requeried for the eob page
var itemType = '';
var pageType = '';
var dept = '';
var effort = '';
var firstEffort = '';
var item = '';
var deptIndex = '';
var eobSource = '';
var eobFlag = 'false';
var webEnsembleId;
var skuEobCatalogOnly;

function initializeMonogramFields() {
	updateMonogramStyles(-1);
	updateMonogramColors();
}

function reloadParentPage(e) {

	var currentUrl = window.location;
	var currentPath = currentUrl.pathname;
	var currentSearch = currentUrl.search;

	if (e && e.srcElement) {
		if (e.srcElement.id == 'goBackFromAdded') {
			// Let us generate the cm tag
			// alert('Function: reloadParentPage: generate cmLinkClick Tag');
			var newTargetUrl = currentPath + currentSearch;
			cmCreateManualLinkClickTag(newTargetUrl , e.srcElement.id);
		}
	}

   window.location.replace(currentPath + currentSearch);
}

function gotoCheckOutPage() {
	var currentUrl = window.location;
	var bagPath = getShoppingBagUrl();
	var currentSearch = currentUrl.search;

    // Remove any ?, & from currentSearch
    if (currentSearch.indexOf('?') ==0 || currentSearch.indexOf('&') == 0) {
        currentSearch = currentSearch.substring(1);
    }

    // Remove the bm query param from currentSearch if any.
    var bmStr = 'bm=wishlist';
    if ( currentSearch != undefined && currentSearch != ''){
        var bmIndex = currentSearch.indexOf(bmStr);
        if (bmIndex >= 0) {
            currentSearch = currentSearch.substring(0,bmIndex) + currentSearch.substring(bmIndex + bmStr.length);
        }
    }

    if (isEditedItemFromWishList == true) {
        bagPath = bagPath + '?' +bmStr;
    }

    if (currentSearch != '' && currentSearch != undefined) {
        if (currentSearch.indexOf('#') == 0){
            bagPath = bagPath + currentSearch;
        } else {
            if (bagPath.indexOf('?') >0) {
                bagPath = bagPath + '&' + currentSearch;
            } else {
                bagPath = bagPath + '?' + currentSearch;
            }
        }
    }

    window.location = bagPath;
}

function gotoWishListPage() {
    var currentUrl = window.location;
    var wishListPagePath = getWishListPageUrl();
    var currentSearch = currentUrl.search;
    window.location = wishListPagePath + currentSearch;
}

function getValue(source) {
	var fld = document.getElementById(source);
	if ((fld != null) && (fld.value != null))
		return fld.value;
	else
		return '';
}

// This function is responsible for rotating the image.
function buildRotatableImage() {
	var swfFileName = $("swfRotateFile").value;
	var offset = 0;
	var startframe = 1;
	var productId = getProductId();
	var vars = {style_id:productId,offset:offset,startframe:startframe};
	var params = {wmode:'transparent',quality:'high',bgcolor:'#FFFFFF',menu:'false',align:'middle',allowscriptaccess:'sameDomain'};
	swfobject.embedSWF(swfFileName, "prodImageContainer", "400", "500", "8", vars, params);
}

// Enables the rotate flash movie.
function enableRotatableImage() {
	// handles button highlighting..
	if (selectedButtonObj != "") {
		selectedButtonObj.style.background = "#CC6601";
		selectedButtonObj.style.color = "white";
	}
	buildRotatableImage();
	selectedButtonObj = $("rotate");
	selectedButtonObj.style.background = "white";
	selectedButtonObj.style.color = "#CC6601";
}


function enableDisplay(element) {
	if (element != null)
		element.className = "errorShow";
}

function disableDisplay(element) {
	if (element != null)
		element.className = "errorHide";
}

function isEnableDisplay(element) {
	var returnFlag = false;
	if (element != null && element.className == "errorShow")
		returnFlag = true;
	return returnFlag;
}

function isDisableDisplay(element) {
	var returnFlag = false;
	if (element != null && element.className == "errorHide")
		returnFlag = true;
	return returnFlag;
}

function enablePopupDisplay(element) {
	if (element != null)
		element.className = "popupLayerShow";
}

function disablePopupDisplay(element) {
	if (element != null)
		element.className = "popupLayerHide";
}

function isEnablePopupDisplay(element) {
	var returnFlag = false;
	if (element != null && element.className == "popupLayerShow")
		returnFlag = true;
	return returnFlag;
}

function isDisablePopupDisplay(element) {
	var returnFlag = false;
	if (element != null && element.className == "popupLayerHide")
		returnFlag = true;
	return returnFlag;
}


function isSoldOut(size, color) {
	var returnFlag = true;
	try {
		if (size != null && size.options != null && size.selectedIndex != -1 && size.options[size.selectedIndex].text != null) {
			var sizeText = size.options[size.selectedIndex].text;
			var colorText = color.options[color.selectedIndex].text;
			if (sizeText.indexOf(getSoldOutDescription()) > 0 || colorText.indexOf(getSoldOutDescription()) > 0) {
				var humpColorErrorField = $("hump_color");
				if (humpColorErrorField != null) {
					var errorText = humpColorErrorField.innerHTML;
					if (errorText != null && errorText.indexOf("COLOR_VALUE") > 0) {
						var replaceText = "";
						if (colorText.indexOf(getInStockDescription()) > 0)
							replaceText = colorText.substring(0, colorText.indexOf(getInStockDescription()));
						else if (colorText.indexOf(getInStockWithFewDescription()) > 0)
							replaceText = colorText.substring(0, colorText.indexOf(getInStockWithFewDescription()));
						else if (colorText.indexOf(getSoldOutDescription()) > 0)
							replaceText = colorText.substring(0, colorText.indexOf(getSoldOutDescription()));
						else if (colorText.indexOf(getBODescription()) > 0)
							replaceText = colorText.substring(0, colorText.indexOf(getBODescription()));
						else
							replaceText = colorText;

						if (replaceText.indexOf(" - ") > 0)
							replaceText = replaceText.substring(0, replaceText.indexOf(" - "));

						errorText = errorText.replace("COLOR_VALUE", replaceText);
					}
					if (errorText != null && errorText.indexOf("SIZE_VALUE") > 0) {
						var replaceText = "";
						if (sizeText.indexOf(getInStockDescription()) > 0)
							replaceText = sizeText.substring(0, sizeText.indexOf(getInStockDescription()));
						else if (sizeText.indexOf(getInStockWithFewDescription()) > 0)
							replaceText = sizeText.substring(0, sizeText.indexOf(getInStockWithFewDescription()));
						else if (sizeText.indexOf(getSoldOutDescription()) > 0)
							replaceText = sizeText.substring(0, sizeText.indexOf(getSoldOutDescription()));
						else if (sizeText.indexOf(getBODescription()) > 0)
							replaceText = sizeText.substring(0, sizeText.indexOf(getBODescription()));
						else
							replaceText = sizeText;

						if (replaceText.indexOf(" - ") > 0)
							replaceText = replaceText.substring(0, replaceText.indexOf(" - "));

						errorText = errorText.replace("SIZE_VALUE", replaceText);
					}
					humpErrorField = $("hump");
					humpErrorField.innerHTML = errorText;
					enableDisplay(humpErrorField);
					returnFlag = false;
				}
			} else {
				var humpErrorField = $("hump");
				if (isEnableDisplay(humpErrorField) && humpErrorField.innerHTML.indexOf("Please try a different color or size") > 0) {
					disableDisplay(humpErrorField);
				}
			}
		}
	} catch(exception) {

	}
	return returnFlag;
}


function isSoldOutClx(colorsize) {
	var returnFlag = true;
	try {
		if (colorsize != null && colorsize.options != null && colorsize.selectedIndex != -1 && colorsize.options[colorsize.selectedIndex].text != null) {
			var colorsizeText = colorsize.options[colorsize.selectedIndex].text;

			if (colorsizeText.indexOf(getSoldOutDescription()) > 0) {
				var humpColorErrorField = $("hump_colorsize");
				if (humpColorErrorField != null) {
					var errorText = humpColorErrorField.innerHTML;
					if (errorText != null && errorText.indexOf("COLORSIZE_VALUE") > 0) {
						var replaceText = "";
						if (colorsizeText.indexOf(getInStockDescription()) > 0)
							replaceText = colorsizeText.substring(0, colorsizeText.indexOf(getInStockDescription()));
						else if (colorsizeText.indexOf(getInStockWithFewDescription()) > 0)
							replaceText = colorsizeText.substring(0, colorsizeText.indexOf(getInStockWithFewDescription()));
						else if (colorsizeText.indexOf(getSoldOutDescription()) > 0)
							replaceText = colorsizeText.substring(0, colorsizeText.indexOf(getSoldOutDescription()));
						else if (colorsizeText.indexOf(getBODescription()) > 0)
							replaceText = colorsizeText.substring(0, colorsizeText.indexOf(getBODescription()));
						else
							replaceText = colorsizeText;

						if (replaceText.indexOf(" - ") > 0)
							replaceText = replaceText.substring(0, replaceText.indexOf(" - "));

						errorText = errorText.replace("COLORSIZE_VALUE", replaceText);
					}
					humpErrorField = $("hump");
					humpErrorField.innerHTML = errorText;
					enableDisplay(humpErrorField);
					returnFlag = false;
				}
			} else {
				var humpErrorField = $("hump");
				if (isEnableDisplay(humpErrorField) && humpErrorField.innerHTML.indexOf("Please try a different color or size") > 0) {
					disableDisplay(humpErrorField);
				}
			}
		}
	} catch(exception) {

	}
	return returnFlag;
}

function isAllSizesSoldOut(size, color) {
	var returnFlag = false;
	if (size != null && size.options != null && size.length > 0) {
		var sizeText = "";
//		size.options[size.selectedIndex].text;
		for (var i = 0; i < size.options.length; i++) {
			sizeText = size.options[i].text;
			if (sizeText.indexOf(getInStockDescription()) > 0 || sizeText.indexOf(getInStockWithFewDescription()) > 0 || sizeText.indexOf(getBODescription()) > 0) {
				returnFlag = true;
				break;
			}
		}
		if (returnFlag) {
			var humpErrorField = document.getElementById("hump");
			if (isEnableDisplay(humpErrorField) && humpErrorField.innerHTML.indexOf("COLOR SOLD OUT") > 0) {
				disableDisplay(humpErrorField);
			}
		} else {
			var humpColorErrorField = document.getElementById("hump_size");
			if (humpColorErrorField != null) {
				var errorText = humpColorErrorField.innerHTML;
				humpErrorField = document.getElementById("hump");
				humpErrorField.innerHTML = errorText;
				enableDisplay(humpErrorField);
			}
		}
	}
	return returnFlag;
}


function isBackOrderable(size, color) {
	var returnFlag = false;
	if (size != null && size.options != null && size.options[size.selectedIndex].text != null) {
		var sizeText = size.options[size.selectedIndex].text;
		if (sizeText.indexOf("(BO)") > 0) {
			var humpColorErrorField = document.getElementById("hump_colorsize_bo");
			if (humpColorErrorField != null) {
				var errorText = humpColorErrorField.innerHTML;

				if (errorText != null && errorText.indexOf("DATE") > 0) {
					errorText = errorText.replace("DATE", sizeText.substring(sizeText.indexOf("(BO)") + 1));
				}
				humpErrorField = document.getElementById("hump");
				humpErrorField.innerHTML = errorText;
				enableDisplay(humpErrorField);
				returnFlag = true;
			}
		} else {
			var humpErrorField = document.getElementById("hump");
			if (isEnableDisplay(humpErrorField) && humpErrorField.innerHTML.indexOf("Due to popular demand, this item is on back order") > 0) {
				disableDisplay(humpErrorField);
			}
		}
	}
	return returnFlag;
}

var gLayerIndex = -1;

//these two functions are old methods that we need to keep in case any old content is still calling them
//they were most commonly being used to close size chart layers or switch between states on the size chart layer
function openProductInfoLayer(sectionId, sectionName, index) {
	YAHOO.ebauer.layerbox.openContentLayer();
}

function closeProductInfoLayer() {
	YAHOO.ebauer.layerbox.closeInfoLayer();
}


function setBackToButton(name) {
	gBackToCat = name;
}

function setEobSource(name) {
	eobSource = name;
}

function getMonogramEnabledFlag() {
	var monogramDiv = $("monogram_div");
	var returnFlag = "N";
	if (monogramDiv != null && monogramDiv != undefined) {
		if (monogramDiv.style.display == 'block') {
			returnFlag = "Y";
		}
	}
	return returnFlag;
}

function getGiftBoxEnabledFlag() {
	var giftboxDiv = $("giftbox_div");
	var returnFlag = "N";
	if (giftboxDiv != null && giftboxDiv != undefined) {
		if (giftboxDiv.style.display == 'block') {
			returnFlag = "Y";
		}
	} else {
		returnFlag = "Y";
	}
	return returnFlag;
}

function availableInfo(selectedString) {
	if (selectedString && selectedString == "color") {
		//if we made a color selection, wait for the size ajax call to load before evaluating the messaging
		YAHOO.util.Event.onContentReady('size', YAHOO.ebauer.productUtils.availabilityDisplay, 'color');
	} else if (selectedString && selectedString == "size") {
		//if we made a size selection, wait for the color ajax call to load before evaluating the messaging
		YAHOO.util.Event.onContentReady('color', YAHOO.ebauer.productUtils.availabilityDisplay, 'size');
	} else {
		//if nothing gets passed just call the function directly
		YAHOO.ebauer.productUtils.availabilityDisplay();
	}
}

var openSkuOnLoad = function() {
	var qs = YAHOO.tools.getQueryString();
	if ( qs.lookupOnLoad == 'true') {
		callSku(qs.dept, qs.effort, qs.item);
	} else {
		return;
	}
};


/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
	PRODUCT UTILS
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

YAHOO.ebauer.productUtils = function() {

	//	escape if less than ideal environment
	if (!document.getElementById) {
		return;
	}

	//	establish shortcuts to YAHOO
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;
	var $ = $D.get;

	var getHeight = function(el) {
		el = $(el);
		var h = $D.getStyle(el, 'height');
		if (h == 'auto') {
			el.style.zoom = 1;
			h = el.clientHeight + 'px';
		}
		return h;
	};

	var setGiftboxValues = function (productForm) {
		//set the gift box globals
		giftBoxEnsembleId = ensembleId;
		giftBoxSelectedValues[0] = getProductId();

		if (getValueFromElement('clearanceCategory') == 'Y') {
			var colorsize = productForm.colorsize.value;
			var colorsizeArr = colorsize.split('-');
			giftBoxSelectedValues[1] = colorsizeArr[0];
			giftBoxSelectedValues[2] = colorsizeArr[1];
		} else {
			giftBoxSelectedValues[1] = productForm.color.value;
			giftBoxSelectedValues[2] = productForm.size.value;
		}

		giftBoxSelectedValues[3] = productForm.quantity.value;
		giftBoxSelectedValues[4] = productForm.hemStyle.value;
		giftBoxSelectedValues[5] = productForm.inSeamLength.value;
	};

	var infoModuleVisible = null; //holds the currently visible infoModule
	var infoModuleShow = function (idx) {
		var infoModuleActive = $("infoModule" + idx);
        if (infoModuleActive != null) {
        	if(idx != 0 ) {
        		document.getElementById("infoModule" + idx).style.height = getHeight('canvas-palette-wrap').replace('px','') - $('infoModule').offsetTop - 10 +'px';
        	}
            if (infoModuleVisible == null) {
                //infoModuleVisible = $("infoModule0");

                infoModuleActive.className = "active";
                infoModuleVisible = infoModuleActive;
            }else{
	            infoModuleVisible.className = "hidden";
	            infoModuleActive.className = "active";
	           	            infoModuleVisible = infoModuleActive;
            }
        }
        $("infoModule0").className = "active";
    };


	var errorClass = 'error';
	var hasErrorClass = function (el) {
		return $D.hasClass(el,errorClass);
	};
	var addErrorClass = function (el) {
		$D.addClass(el,errorClass);
	};
	var removeErrorClass = function (el) {
		$D.removeClass(el,errorClass);
	};

	var cutIndex = -1;

	//	______
	//	PUBLIC

	return {

		infoLoaded : false,
        infoLoading : false,
        completerLoaded : false,
		swatchesLoaded : false,
		eobLoaded : false,
		productLayerType : "REG",
		infoModuleComplete : false,
		basicMode : null, //true if we are on the impaired user version - set from loadStandalone
		isGiftBoxSelected : false,
		wasGiftBoxSelected : false, //holds the original state, used when editing a product with giftboxing on it
		giftBoxCompleted : false,
		isMonogramSelected : false,
		wasMonogramSelected : false, //holds the original state, used when editing a product with giftboxing on it
		monogramCompleted : false,
		isEOBProduct : false,
		passedItemUUID : "",
		passedIdObjForCancel : null,
		buyAnotherMode : false,
		editProductMode : false,
		editProductModeType : "",
		productPageMode : false,
		productImageShownColorId : "",
		soldOutColors : new Array(),
		soldOutSizes : new Array(),
		ggpCategoryId : null,
		pCategoryId : null,
		gpCategoryId : null,
        cmCategoryInfo : null,
        cmPathInfo : null,
        cmCategoryPath : null,
        queryString : "",// holds the value of webEnsembleId for the Eob ajax call
		//used for single size and/or single color values.
		isColorUpdatedonInventoryForSingleSize : false,
		isSizeUpdatedonInventoryForSingleColor : false,
		// used for default values on Edit
		isColorUpdatedforSelectedSize : false,

		availabilityDisplay : function(selStr) {
			//selStr is the id of the menu that most recently changed
			var selectSize = $("size");
			var sizeIdx = selectSize.selectedIndex;
			var sizeLen = selectSize.options.length;
			var selectColor = $("color");
			var colorIdx = selectColor.selectedIndex;
			var colorLen = selectColor.options.length;

			if ( (sizeIdx == 0 && colorIdx == 0) || sizeIdx == -1 || colorIdx == -1 )
				return;

			var colorInfoNode = $("available_color_info");
			var sizeInfoNode = $("available_size_info");

			sizeInfoNode.className = "availableInfoHide";
			colorInfoNode.className = "availableInfoHide";

			if (sizeIdx == 0 && colorIdx > 0 && sizeLen > 2)
				sizeInfoNode.className = "availableInfoShow";
			else if (sizeIdx > 0 && colorIdx == 0 && colorLen > 2)
				colorInfoNode.className = "availableInfoShow";
			else if (selStr == 'size' && sizeLen > 2)
				sizeInfoNode.className = "availableInfoShow";
			else if (selStr == 'color' && colorLen > 2)
				colorInfoNode.className = "availableInfoShow";
			else
				return;
		},

		basicStyleChange : function() {
			alert("The size you had selected is no longer valid.\r\nPlease select a new size.");
		},

		copyBasicStyleValues : function() {
			//get the index of the cut from one of the passed objects so we can use it for the non passed ones
			//cutIndex is only specified when switching cuts from the reload function, otherwise determine which cut is selected
			var productForm = $("productForm");
			var newCutIndex = -1;
			for (i = 0; i < productForm.cut.length; i++) {
				if (productForm.cut[i].checked == true) {
					newCutIndex = i + 1; //the elements are 1-based not 0-based
					break;
				}
			}

			if (newCutIndex >= 0 && newCutIndex != cutIndex) {
				cutIndex = newCutIndex;
				$("monogram_allowed").value = $("monogram_allowed_"+cutIndex).value;
				$("inseamFlag").value = $("inseamFlag_"+cutIndex).value;
				$("regPrice").value = $("regPrice_"+cutIndex).value;
				$("styleSelected").value = $("style"+cutIndex).value;
				$("desCode").value = $("desCode"+cutIndex).value;
				$("desCodeName").value = $("desCodeName"+cutIndex).value;
			}
		},

		colorOnChange : function(selValue, selIdx) {
			if (selIdx > 0) {
				YAHOO.ebauer.productUtils.availabilityDisplay('size');
				swatchSelect(selValue);
				changeProductLabel(selValue);
			}
			YAHOO.ebauer.productUtils.toggleAddToButton();
		},

		sizeOnChange : function(selValue, selIdx) {
			if (selIdx > 0) {
				YAHOO.ebauer.productUtils.availabilityDisplay('color');
				updateColors();
			}
			YAHOO.ebauer.productUtils.toggleAddToButton();
		},

        colorsizeOnChange : function(selValue, selIdx) {
            var colorsizeId;
            if (selIdx > 0) {
                colorsizeId = selValue.split('-');
                swatchColorSizeSelect(colorsizeId[0], null, colorsizeId[1]);
				changeProductLabel(colorsizeId[0]);
                var pvIdField = $("productVariantId");
                if (pvIdField != undefined && pvIdField != null) {
                    pvIdField.value = -1;   //TSK00626: Set the productvariant Id to -1, as the addItemToCart will figureout the correct PVID.
                }
            }
			YAHOO.ebauer.productUtils.toggleAddToButton();
		},

        hemOnChange : function() {
			YAHOO.ebauer.productUtils.toggleAddToButton();
			updateInseamLength();
		},

		inseamOnChange : function() {
			YAHOO.ebauer.productUtils.toggleAddToButton();
		},

		toggleFlag : function(id) {
			if (id == "giftbox") {
				YAHOO.ebauer.productUtils.isGiftBoxSelected = !YAHOO.ebauer.productUtils.isGiftBoxSelected;
			}
			if (id == "monogram") {
				YAHOO.ebauer.productUtils.isMonogramSelected = !YAHOO.ebauer.productUtils.isMonogramSelected;
			}
		},

		setAltImgIcon : function(el) {
			var parentDl = $("altImages");
			var childLen = 0;
			if (parentDl != null) {
				childLen = parentDl.childNodes.length;
				for (i = 0; i < childLen; i++)
					parentDl.childNodes[i].className = "not";

				// if an icon was clicked on, set it to hot
				if (el != null && el.parentNode) {
					var parentDd = el.parentNode;
					parentDd.className = "hot";
				}
			}
		},

		toggleAddToButton : function() {
            var colorSuccess = false;
			var sizeSuccess = false;
            var colorsizeSuccess = false;
            var inseamSuccess = true; //inseam is preset to true in case it's not an inseamable product
			var inseamFlag = isDisableDisplay($("inseamDetails")) ? false : isEnableDisplay($("inseamDetails")) ? true : false;
            if (getValueFromElement('clearanceCategory') == 'Y') {
                colorSuccess = true;
                sizeSuccess = true;
                var colorsizeSel = $('colorsize');
                if (colorsizeSel != null && colorsizeSel.selectedIndex > 0) {
                    colorsizeSuccess = true;
                    if (hasErrorClass('colorsize'))
                        removeErrorClass('colorsize');
                }
            } else {
                colorsizeSuccess = true;
                var colorSel = $('color');
                var sizeSel = $('size');
			var inseamFlag = isDisableDisplay($("inseamDetails")) ? false : isEnableDisplay($("inseamDetails")) ? true : false;
                if (colorSel != null && colorSel.selectedIndex > 0) {
                    colorSuccess = true;
                    if (hasErrorClass('color'))
                        removeErrorClass('color');
                }
                if (sizeSel != null && sizeSel.selectedIndex > 0) {
                    sizeSuccess = true;
                    if (hasErrorClass('size'))
                        removeErrorClass('size');
                }
            }

            if (inseamFlag) {
                var hemSel = $("hemStyle");
                var requiresInseam = false;
                if (hemSel != null && hemSel.selectedIndex <= 0)
                    inseamSuccess = false;
                if (hemSel.value != 'Unfinished')
                    requiresInseam = true;

                if (inseamSuccess) {
                    if (hasErrorClass('hemStyle'))
                        removeErrorClass('hemStyle');
                    if (!requiresInseam && hasErrorClass('inSeamLength'))
                        removeErrorClass('inSeamLength');
                }

                if (requiresInseam) {
                    var inseamLengthSel = $("inSeamLength");
                    if (inseamLengthSel != null && inseamLengthSel.selectedIndex <= 0)
                        inseamSuccess = false;
                    else {
                        if (hasErrorClass('inSeamLength'))
                            removeErrorClass('inSeamLength');
                    }
                }
            }
			if (colorSuccess && sizeSuccess && inseamSuccess && colorsizeSuccess) {
				$D.replaceClass('addToCart', 'buttonInactive', 'buttonActive');
				$D.replaceClass('addToWishList', 'buttonInactive', 'buttonActive');
				$D.replaceClass('hump', 'errorShow', 'errorHide');
			} else {
				$D.replaceClass('addToCart', 'buttonActive', 'buttonInactive');
				$D.replaceClass('addToWishList', 'buttonActive', 'buttonInactive');
			}
		},

		validateProductForm : function(productForm, isWishListItem) {
			var returnFlag = true;
            if (getValueFromElement('clearanceCategory') == 'Y') {
                if (productForm.colorsize.selectedIndex == 0) {
                    // enable the div for the color error
                    addErrorClass('colorsize');
                    returnFlag = false;
                } else {
                    // enable the div for the color error
                    if (hasErrorClass('colorsize'))
                        removeErrorClass('colorsize');
                }

            } else {
                if (productForm.color.selectedIndex == 0) {
                    // enable the div for the color error
                    addErrorClass('color');
                    returnFlag = false;
                } else {
                    // enable the div for the color error
                    if (hasErrorClass('color'))
                        removeErrorClass('color');
                }
                // Is Size chosen ?
                if (productForm.size.selectedIndex == 0) {
                    //errorField = $("size_error");
                    addErrorClass('size');
                    returnFlag = false;
                } else {
                    //errorField = $("size_error");
                    if (hasErrorClass('size'))
                        removeErrorClass('size');
                    var sizeText = productForm.size.options[productForm.size.selectedIndex].text;
                    if (sizeText.indexOf("(SOLDOUT)") > 0) {
                        return false;
                    }
                }
             }
            // Validate inseam details
			var inseamdetailFlag = isDisableDisplay($("inseamDetails")) ? false : isEnableDisplay($("inseamDetails")) ? true : false;
			if (inseamdetailFlag) {
				var hemSel = $("hemStyle");
				var requiresInseam = false;
				if (hemSel == undefined || hemSel.selectedIndex <= 0) {
					//enableDisplay(errorField);
					addErrorClass(hemSel);
					returnFlag = false;
				} else {
					if (hemSel.value != 'Unfinished')
						requiresInseam = true;
					if (hasErrorClass(hemSel)) {
						removeErrorClass(hemSel);
						//disableDisplay(lengthErrorField);//disable the inseam length error as well, in case unfinished hem was chosen
						}
				}
				var inseamLength = $("inSeamLength");
				if (requiresInseam && (inseamLength == undefined || inseamLength.selectedIndex <= 0)) {
					addErrorClass(inseamLength);
					returnFlag = false;
				} else {
					if (hasErrorClass(inseamLength))
						removeErrorClass(inseamLength);
				}
			}

			if (!returnFlag) {
				var humpErrorField = $("hump");
				var humpErrorGenericField = $("hump_generic");
                if (isWishListItem == true) {
                    humpErrorGenericField = $("hump_wishlist_generic");
                }
                if (humpErrorField != null && humpErrorGenericField != null) {
					humpErrorField.innerHTML = humpErrorGenericField.innerHTML;
					enableDisplay(humpErrorField);
				}
			}
			return returnFlag;
		},

		checkProductOptions : function(productForm, isEOBProduct, isWishListItem) {
			var hrefName = "Add To Basket";
			if (isWishListItem){
				hrefName = "Save To Wishlist";
			}
			var href = "YAHOO.ebauer.productUtils.checkProductOptions('" + productForm + "','" + isEOBProduct + "','" + isWishListItem +"');";
			cmCreateManualLinkClickTag(href ,hrefName);

			if (isEOBProduct) {
				YAHOO.ebauer.productUtils.isEOBProduct = true;
				eobFlag = productForm.eob.value;
				itemType = productForm.itemType.value;
				pageType = productForm.pageType.value;
				dept = productForm.dept.value;
				deptIndex = productForm.deptIndex.value;
				effort = productForm.effort.value;
				firstEffort = productForm.firstEffort.value;
				item = productForm.item.value;
				eobSource = productForm.eobSource.value;
				webEnsembleId = productForm.webEnsembleId.value;
				if (pageType == 'CATALOGONLY')
					skuEobCatalogOnly = productForm.SkuEobCatalogOnly.value;
			}
			giftboxEnabledFlag = getGiftBoxEnabledFlag();
			mgmEnabledFlag = getMonogramEnabledFlag();
			//check if selections were made
			var validateFlag = YAHOO.ebauer.productUtils.validateProductForm(productForm, isWishListItem);
			//then make sure the selections are not sold out
         if (validateFlag) {
             if (getValueFromElement('clearanceCategory') == 'Y') {
                 validateFlag = isSoldOutClx($('colorsize'));
             } else {
                 validateFlag = isSoldOut($('size'), $('color'));
             }
         }
         gBackToCat = productForm.catName.value;
			gCategoryId = productForm.categoryId.value;
			//gPathInfo = productForm.pathInfo.value;
			gCs = productForm.cs.value;
			gCatPath = productForm.catPath.value;
			gProductVariantId = productForm.productVariantId.value;
			gProductVariantType = productForm.productVariantType.value;
			gcmReferrer = productForm.cmReferrer.value;
			if (validateFlag) {
				quantitySelected = productForm.quantity.value;
				var selectedRadioBtnIndex = -1;
				if (productForm.cut.length == undefined) {
					if (productForm.cut.checked) {
						productId = productForm.cut.value;
						productStyleName = productForm.cut.label;
						selectedRadioBtnIndex = 0;
						// Zero, if there is only one radio button available, which does not have the selectedindex value.
						productStyleName = productForm.style.value;
					}
				} else {
					for (i = 0; i < productForm.cut.length; i++) {
						if (productForm.cut[i].checked) {
							productId = productForm.cut[i].value;
							productStyleName = productForm.cut[i].label;
							selectedRadioBtnIndex = i;
							productStyleName = productForm.style[selectedRadioBtnIndex].value;
						}
					}
				}

				if (getValueFromElement('clearanceCategory') == 'Y') {
					var colorsize = productForm.colorsize.value;
					var colorsizeArr = colorsize.split('-');
					colorIdSelected = colorsizeArr[0];
					sizeIdSelected = colorsizeArr[1];
				} else {
					colorIdSelected = productForm.color.value;
					sizeIdSelected = productForm.size.value;
				}

				ensembleId = productForm.ensembleId.value;
				gEnsembleId = ensembleId;
				ensembleName = productForm.ensembleName.value;
				catName = productForm.catName.value;
				showSizes = productForm.showSizes.value;
				inseamFlag = isDisableDisplay($("inseamDetails")) ? "N" : isEnableDisplay($("inseamDetails")) ? "Y" : "N";
				hemStyle = productForm.hemStyle.value;
				inseamLength = productForm.inSeamLength.value;

				//if (YAHOO.ebauer.productUtils.isGiftBoxSelected) {
					setGiftboxValues(productForm); //set the gift box globals
				//}

				if (YAHOO.ebauer.productUtils.editProductMode) {

					var submitBtn = $("addToCart");

					if (isWishListItem == true) {
					  submitBtn = $("addToWishList");
					  YAHOO.ebauer.productUtils.passedItemUUID = editedItemUserItemId;
					} else {
						YAHOO.ebauer.productUtils.passedItemUUID = editedItemUUID;
					}

					if (submitBtn != null && (submitBtn.value == 'Save' || submitBtn.value == 'Save To WishList')) {
						submitSaveBtnClicked = true;
					}
				} else {
					DelCookie("DESTINATION_URL");
				}
                YAHOO.ebauer.productUtils.siteCss = productForm.siteCss.value;

                YAHOO.ebauer.productUtils.performEdits(isWishListItem);
			}
		},
		performEdits : function(isWishListItem) {
			if ((isWishListItem == undefined || isWishListItem == false) && !YAHOO.ebauer.productUtils.monogramCompleted) {
				YAHOO.ebauer.productUtils.performMonogramEdits();
			} else if ((isWishListItem == undefined || isWishListItem == false) && !YAHOO.ebauer.productUtils.giftBoxCompleted) {
				YAHOO.ebauer.productUtils.performGiftboxEdits();
			} else {
				YAHOO.ebauer.productUtils.performProductEdits(isWishListItem);
			}
		},
		performProductEdits : function(isWishListItem) {
			if (YAHOO.ebauer.bagUtils) {
				try {
					if (gProductVariantId) {
						if (isWishListItem == true) {
							prepareWishListItemForm(YAHOO.ebauer.productUtils.isEOBProduct);
						} else {
							prepareItemForm(YAHOO.ebauer.productUtils.isEOBProduct);
						}
					} else {
						console.error("PRODUCT VARIENT ID");
						gotoCheckOutPage();
					}
				} catch(ex) {
					console.error("EXCEPTION " + ex);
					gotoCheckOutPage();
				}
			} else {
				 if (isWishListItem == true) {
					YAHOO.ebauer.layerbox.transition('addedToWishList');
				 } else {
                     if (isKioskMode() == 'true') {

                         YAHOO.ebauer.layerbox.transition('addedFromKiosk');
                     } else {
                         YAHOO.ebauer.layerbox.transition('added');
                     }
				 }
			}
		},
		performMonogramEdits : function() {
			if (YAHOO.ebauer.productUtils.wasMonogramSelected != YAHOO.ebauer.productUtils.isMonogramSelected) {
				if (YAHOO.ebauer.productUtils.wasMonogramSelected) {
					removeMonogram();
				} else {
					addMonogram();
				}
			} else {
				YAHOO.ebauer.productUtils.monogramCompleted = true;
				YAHOO.ebauer.productUtils.performEdits(false);
			}
		},
		performGiftboxEdits : function() {
			if (YAHOO.ebauer.productUtils.wasGiftBoxSelected != YAHOO.ebauer.productUtils.isGiftBoxSelected) {
				if (YAHOO.ebauer.productUtils.wasGiftBoxSelected) {
					removeGiftbox();
				} else {
					addGiftbox();
				}
			} else {
				YAHOO.ebauer.productUtils.giftBoxCompleted = true;
				YAHOO.ebauer.productUtils.performEdits(false);
			}
		},
		completer : function(passedEnsembleId) {
			// Clear the color selections in case we move to a new product
			colorValue = null;
			colorIndex = 0;
			selectedSwatchName = "";
			//BUG01119
			YAHOO.ebauer.productUtils.infoModuleComplete = false; 
			if (YAHOO.ebauer.layerbox.getLayerboxState() == 'added' || YAHOO.ebauer.layerbox.getLayerboxState() == 'addedFromKiosk' || YAHOO.ebauer.layerbox.getLayerboxState() == 'addedToWishList' ) {
				if (tabType == "CTL")
					pathInfo = "T427P" + parentEnsembleId;
				else if (tabType == "YMAL")
					pathInfo = "T426P" + parentEnsembleId;
			} else if (YAHOO.ebauer.layerbox.getLayerboxState() == 'product') {
				if (tabType == "CTL")
					pathInfo = "T281P" + parentEnsembleId;
				else if (tabType == "YMAL")
					pathInfo = "T147P" + parentEnsembleId;
			}

            if (YAHOO.ebauer.bagUtils) {
				// YMAL clicks from the bag
				var completerpathInfoNode = $('completerpathInfo');
				if(completerpathInfoNode != undefined)
					pathInfo = completerpathInfoNode.getAttribute("completerpathInfo");
				else
					pathInfo = "T148P" + passedEnsembleId;

				if (ensembleId == undefined || ensembleId == "")
					ensembleId = passedEnsembleId;

				YAHOO.ebauer.layerbox.transition('product', {ensembleId:passedEnsembleId,catName:'Shopping Bag'});
			} else if (YAHOO.ebauer.productUtils.productPageMode) {
				// YMAL clicks from the standalone product page
				var layerboxState = YAHOO.ebauer.layerbox.getLayerboxState();

				// clicks from the added interstitial, on top of the standalone product page
				if (layerboxState != "")
					YAHOO.ebauer.layerbox.hideLayer();

				if (ensembleId == undefined || ensembleId == "")
					ensembleId = passedEnsembleId;

				var categoryIdNode = $("catH");
				var categoryId = '';

				if (categoryIdNode != undefined)
					categoryId = categoryIdNode.innerHTML;

				YAHOO.ebauer.transitions.swapHtml(YAHOO.ebauer.layerbox.getConfigObject('product'), {ensembleId:passedEnsembleId,catId:categoryId,divOverride:'dossier_wrapper'});
			} else {
				// before the item is not added to the bag the gBackToCat is not assigned yet
				YAHOO.ebauer.productUtils.resetFlags();
				YAHOO.ebauer.layerbox.transition('product', {ensembleId:passedEnsembleId});
			}
		},
		editGiftBox : function(passedUUID, siteCss) {
            YAHOO.ebauer.productUtils.passedItemUUID = passedUUID;
			YAHOO.ebauer.productUtils.editProductMode = true;
			YAHOO.ebauer.productUtils.editProductModeType = "GB";
			YAHOO.ebauer.productUtils.isGiftBoxSelected = true;
            YAHOO.ebauer.productUtils.siteCss = siteCss;
            YAHOO.ebauer.layerbox.transition('giftbox');
		},
		editMonogram : function(passedUUID, siteCss) {
			YAHOO.ebauer.productUtils.passedItemUUID = passedUUID;
			YAHOO.ebauer.productUtils.editProductMode = true;
			YAHOO.ebauer.productUtils.editProductModeType = "MGM";
			YAHOO.ebauer.productUtils.isMonogramSelected = true;
            YAHOO.ebauer.productUtils.siteCss = siteCss;
            YAHOO.ebauer.layerbox.transition('monogram');
		},
		buyAnotherItem : function(passedUUID, passedCategoryId, imgName, imgTypeCode, isWishListItem) {
			// reset the flags to prevent buying another monogram or giftbox
			//flags specific to color and size drop downs

            YAHOO.ebauer.productUtils.resetFlags();
			editedItemUUID = null;//clears the global in case edit was attempted before buy another
			editedItemUserItemId = null;
			mode = 'add';//clears edit mode in case we edited before buyingAnother
			YAHOO.ebauer.productUtils.isGiftBoxSelected = false;
			YAHOO.ebauer.productUtils.isMonogramSelected = false;
			YAHOO.ebauer.productUtils.editProductMode = false;
			YAHOO.ebauer.productUtils.buyAnotherMode = true;

			var key = 'uuid=';
			if (isWishListItem == true) {
				key = 'useritemid=';
                buyAnotherWishListItemFlag = true;
            } else {
                buyAnotherItemFlag = true;
            }

			var cObj = YAHOO.ebauer.utilities.asyncRequest('GET', getBaseURL() + '/ajax/loadItemDetailsForEdit.jsp?' + key + passedUUID+ '&imageName=' + imgName + '&imageTypeCode=' + imgTypeCode, callbackLoadBuyAnotherItemForEdit);
		},
		loadStandalone : function(basic) {
			YAHOO.ebauer.productUtils.productPageMode = true;
			if (basic == true)
				YAHOO.ebauer.productUtils.basicMode = true;
			if (YAHOO.ebauer.layerbox != undefined) {
				if (YAHOO.ebauer.productUtils.basicMode == true)
					YAHOO.util.Event.onAvailable("dash", YAHOO.ebauer.layerbox.showProductDataBasic);
				else
					YAHOO.util.Event.onAvailable("dash", YAHOO.ebauer.layerbox.showProductData);
				YAHOO.util.Event.addListener('goBack', 'click', YAHOO.ebauer.layerbox.showCategoryFromProductPage);
			} else
				var delayIt = setTimeout("YAHOO.ebauer.productUtils.loadStandalone()",300);
		},
		infoModuleInit : function() {
            YAHOO.ebauer.productUtils.infoLoading = true;
            var palWrap = $("palette-wrap");
			//BUG01119
            var heightPalWrap = parseFloat(getHeight(palWrap));
			$E.addListener('canvas-palette-wrap', 'mouseover', YAHOO.ebauer.productUtils.infoModuleHandler);
			var y1 = $D.getY(palWrap);
			var y2 = $D.getY("infoModule");
			var fixedHeight = y2-y1; //used to calculate the max height of palette-wrap
			var bottomPad = 15; //the amount of extra space between the bottom of the infoModules and the top of the dash

			var maxIMHeight = 0;
			var im = $("infoModule");
			var childLen = im.childNodes.length;
			var imArr = new Array(); //used to hold the infoModules
			for (i = 0; i < childLen; i++) {
                try {
                    var child = im.childNodes[i].id;
                    if (child.indexOf("infoModule") > -1) {
                        imArr.push(child);
                        var h = parseFloat(getHeight(child));
                        var pad = parseFloat($D.getStyle(child,"padding-top")) + parseFloat($D.getStyle(child,"padding-bottom"));
                        if ((h+pad) > maxIMHeight)
                            maxIMHeight = (h+pad);
                    }
                } catch (e) {
                }
           }
			//BUG01119
			if ((maxIMHeight + fixedHeight + bottomPad) > heightPalWrap) { 
				$D.setStyle(palWrap, 'height', ((maxIMHeight + fixedHeight + bottomPad) + "px"));
				$D.setStyle('infoModule0', 'position', 'absolute'); //change this to absolute after initial load to prevent a visible flash in height
				if (imArr.length > 0)
					$D.setStyle(imArr, 'height', (maxIMHeight + "px"));
			}		
			
			YAHOO.ebauer.productUtils.infoModuleComplete = true;
            //reset flags
            YAHOO.ebauer.productUtils.productLayerType = "REG";
            YAHOO.ebauer.productUtils.infoLoading = false;
            YAHOO.ebauer.productUtils.infoLoaded = false;
            YAHOO.ebauer.productUtils.swatchesLoaded = false;
            YAHOO.ebauer.productUtils.completerLoaded = false;
            YAHOO.ebauer.productUtils.eobLoaded = false;
            YAHOO.ebauer.flash.init();
            YAHOO.ebauer.canvas.init();
            global.jquery.utils.common.assignButtons();
        },
		infoModuleHandler : function(e) {
			var activeFlag = false;
			var elTarget = YAHOO.util.Event.getTarget(e);

			while (elTarget && elTarget.id != undefined && elTarget.id != 'palette') {
                if (elTarget.id.indexOf("copytext_") == 0) {
                    infoModuleShow(elTarget.id);
                    activeFlag = true;
					break;
                } else if (elTarget.id == 'infoModule') {
					activeFlag = true;
					break;
				} else {
					elTarget = elTarget.parentNode;
				}
			}

			if (!activeFlag) {
				if (infoModuleVisible != null && infoModuleVisible.id != "infoModule0") {
					infoModuleShow(0);
					// shows the infoModule default
				}
			}
		},
		resetFlags : function() {
			// reset single size and color values
			YAHOO.ebauer.productUtils.isColorUpdatedonInventoryForSingleSize = false;
			YAHOO.ebauer.productUtils.isSizeUpdatedonInventoryForSingleColor = false;
			YAHOO.ebauer.productUtils.isColorUpdatedforSelectedSize = false;
        },

        changeWeatheredgeCSS: function () {
            alert('hello');
            jQuery('#dossier.PPL .infoModule #tabs ul.details').removeClass('ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all');
            jQuery('#dossier.PPL .infoModule #tabs ul.details li').removeClass('ui-state-default ui-corner-top ui-tabs-selected ui-state-active ui-state-hover');
        },

		buyAnotherClearVars : function() {
			if (!YAHOO.ebauer.productUtils.productPageMode) {
			   // don't reset these if the call is coming from the stand alone product page
				colorValue = null;
            colorIndex = 0;
				highlightTabIndex = 0; //reset the active completer tab
				YAHOO.ebauer.productUtils.passedIdObjForCancel = null;
				YAHOO.ebauer.productUtils.isGiftBoxSelected = false; 	//reset the switch
				YAHOO.ebauer.productUtils.isMonogramSelected = false; //reset the switch
				YAHOO.ebauer.productUtils.productImageShownColorId = "";
				isMonogramSelectedOLD = 'N';
				gCs = null; //global Clearance Search flag
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
		}
	},
		hemStyleDisplay : function(hemCode) {
			if (hemCode == "Plain")
				return 'Without Cuffs';
			if (hemCode == "Cuffed")
				return 'With Cuffs';
			if (hemCode == "Unfinished")
				return 'Unfinished';
			else
				return;
		}
	};
}();

YAHOO.ebauer.utilities = function() {
    return {
        navigate : function(module, state, strFormat, passedIdObj){
				var layerStates, fqstate;
            if (!YAHOO.ebauer.utilities.isHistoryNeeded(strFormat)) {
					 //removes all occurances of the added layer from being written to history
                //this is done to globally fix the adding of duplicate items and the blank added layer in ie6 and ie7
                state = state.toString().replace("transition",strFormat);
                layerStates = [];
                layerStates.push(escape(module) + "=" + escape(state));
                fqstate = layerStates.join("&");
                YAHOO.ebauer.layerbox.transitionworker(strFormat, passedIdObj);
                top.location.hash = fqstate;
            } else {
					 YAHOO.util.History.navigate(module, state);
            }
        },

        isHistoryNeeded : function (strFormat) {
            return !(strFormat == 'addedToWishList' || strFormat == 'added' || strFormat == 'addedFromKiosk' || strFormat == 'removed' /* giftbox or removed */);
        },
        asyncRequest : function(method, uri, callback, postData) {
            var cmsSiteId = $('ebCM_CMSSiteId');
            if (cmsSiteId && cmsSiteId.value) {
                if (uri.indexOf("?") >= 0) {
                    uri += "&CMSSiteId=" + cmsSiteId.value;
                } else {
                    uri += "?CMSSiteId=" + cmsSiteId.value;
                }
            }
            return YAHOO.util.Connect.asyncRequest(method, uri, callback, postData);
        }
    };

}();