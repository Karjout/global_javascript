var firstSwatch;
var swatchSelection;
var selectSwatchSrc = "";

var swatchSelect = function (idx, swatchPath) {
	/*
    This is a simplified routine to illustrate basic interaction:
    Selection of swatch will trigger primary image to synchronize to color selection.
    Form (select_color) select-option will also synchronize (and visa-versa).
    */
    var eobFlag = getValueFromElement('eob');
    var pageType = getValueFromElement('pageType');
    if (eobFlag != 'true' || pageType != "CATALOGONLY") {
        if (typeof swatchSelection == "undefined") {
            swatchSelection = $(firstSwatch);
        }
        if (idx != "null" && idx != null) {
            if (swatchSelection) {
                swatchSelection.className = "not";
            }
            swatchSelection = $("swatch" + idx);
            if (swatchSelection) {
                swatchSelection.className = "hot";
            }
            var select = $("color");
            var foundSelectedIndex = 0;
            for (var i = select.options.length - 1; i > 0; i--) {
                if (parseInt(select.options[i].value) == idx) {
                    foundSelectedIndex = i;
                    var humpErrorField = $("hump");
                    if (isEnableDisplay(humpErrorField) && humpErrorField.innerHTML.indexOf("Please select another color") > 0) {
                        disableDisplay(humpErrorField);
                    }
                    break;
                }
            }
            select.selectedIndex = foundSelectedIndex;
            updateSizes();
            // To change the prod Image image
            var newProdImg = $('image_src_' + idx).value;

            if (swatchSelection) {
                selectedSwatchName = swatchSelection.firstChild.title;
                changeMainImage(newProdImg, selectedSwatchName);
            } else {
                $("swatchName").innerHTML = "";
                changeMainImage(newProdImg, "");
            }
        } else {
            var select = $("color");
            select.selectedIndex = 0;
            selectedSwatchName = "";
            if (swatchSelection)
                swatchSelection.className = "not";
            changeMainImage($("defaultImageUrl").value, $("defaultColorName").value);
            selectedButtonObj = $("button0");
            if (selectedButtonObj != undefined) {
                selectedButtonObj.style.background = "white";
                selectedButtonObj.style.color = "#CC6601";
            }
        }
    } else {
        var select = $("color");
        var foundSelectedIndex = 0;
        for (var i = select.options.length - 1; i > 0; i--) {
            if (parseInt(select.options[i].value) == idx) {
                foundSelectedIndex = i;
                var humpErrorField = $("hump");
                if (isEnableDisplay(humpErrorField) && humpErrorField.innerHTML.indexOf("Please select another color") > 0) {
                    disableDisplay(humpErrorField);
                }
                break;
            }
        }
        select.selectedIndex = foundSelectedIndex;
        updateSizes();
    }
    var getswatch = $("swatch" + idx);
    if (getswatch != undefined) {
        $("selectedSwatch").innerHTML = "";
        $("selectedSwatch").appendChild(findImg(getswatch));
        selectSwatchSrc = findImg(getswatch).src;
    } else {
        if ($("selectedSwatch") != undefined)
            $("selectedSwatch").innerHTML = "&nbsp;";
    }
    //update the swatch name as well
    $("swatchName").innerHTML = selectedSwatchName;
    changeProductLabel(idx);
    YAHOO.ebauer.productUtils.setAltImgIcon(null);
};
var swatchColorSizeSelect = function(idx, swatchPath, sizeId)
{
	/*
	 This is a simplified routine to illustrate basic interaction:
	 Selection of swatch will trigger primary image to synchronize to color selection.
	 Form (select_color) select-option will also synchronize (and visa-versa).
 */
	var eobFlag = getValueFromElement('eob');
	var pageType = getValueFromElement('pageType');
    var clearanceCategory = getValueFromElement('clearanceCategory');

    if (typeof swatchSelection == "undefined") {
        swatchSelection = $(firstSwatch);
    }
    if (idx != "null" && idx != null) {
        if (swatchSelection) {
            swatchSelection.className = "not";
        }
        swatchSelection = $("swatch" + idx);
        if (swatchSelection) {
            swatchSelection.className = "hot";
        }
        var select = $("colorsize");
        var foundSelectedIndex = 0;
        for (var i = 0; i <= select.options.length - 1; i++)
        {
            var selectoption = select.options[i].value;
            var selectoptionArr = selectoption.split('-');
            if (parseInt(select.options[i].value) == idx) {
                if (sizeId != "null" && sizeId != null) {
                    if (selectoptionArr[1] == sizeId) {
                       foundSelectedIndex = i;
                        break;
                    }
                } else {
                    foundSelectedIndex = i;
                    break;
                }
            }
        }
        select.selectedIndex = foundSelectedIndex;
			// To change the prod Image image
        var newProdImg = $('image_src_' + idx).value;
        if (swatchSelection) {
            selectedSwatchName = swatchSelection.firstChild.title;
            changeMainImage(newProdImg, selectedSwatchName);
        } else {
            $("swatchName").innerHTML = "";
            changeMainImage(newProdImg, "");
        }
    }
	var getswatch = $("swatch" + idx);
	if (getswatch != undefined) {
		$("selectedSwatch").innerHTML = "";
		$("selectedSwatch").appendChild(findImg(getswatch));
		selectSwatchSrc = findImg(getswatch).src;
	} else {
		if($("selectedSwatch") != undefined)
			$("selectedSwatch").innerHTML = "&nbsp;";
	}
   changeProductLabel(idx);
    YAHOO.ebauer.productUtils.toggleAddToButton();
    YAHOO.ebauer.productUtils.setAltImgIcon(null);
};
var colorIdArr = null;
var priceArr = null;
function buildSwatches(x) {
	var swatches = "";
	var arrIndex = 0;
	var innerText = '';
	var eobFlag = getValueFromElement('eob');
	var pageType = getValueFromElement('pageType');
	var index = '';
	var isFirstTime = true;
	var isMultiProductPage = false;
	var limitedAvailArr = null;
	var limitedAvailIndex = 0;
	if (x.idx != undefined) {
		index = '_' + x.idx;
		isFirstTime = loadedFirstTime[x.idx];
		isMultiProductPage = true;
		firstSwatch = new Array;
	}
	if (isFirstTime) {
		colorIdArr = new Array();
		priceArr = new Array();
		limitedAvailArr = new Array();
	}
	var colorLength = 0;
	if (!(x.colors == undefined || x.colors.color == undefined)) {
		colorLength = x.colors.color.length;
	}
	var colText = $("change_col_text" + (isMultiProductPage ? index : ""));
	if (colText != undefined) {
		if (colorLength > 1 || (colorLength > 0 && isMultiProductPage)) {
			colText.style.display = 'block';
			if (isMultiProductPage) {
				innerText = "<dt class='changeSwatchText'>Change Product Color</dt>";
			}
		} else {
			colText.style.display = 'none';
		}
	}
	var shownClearance = false;
	var clearanceText = "";

	// prevent a JavaScript error by leaving at 0 if undefined
	var typeLength = (x.swatchImages == undefined) ? 0 : x.swatchImages.length;
	var numSwatches = 0;

	// count the total number of swatches
	for (var i = 0; i < typeLength; i++) {
		var currentType = x.swatchImages[i];
		if (currentType != undefined) {
			var currentPrices = currentType.value;

			if (currentPrices != undefined) {
				for (var j = 0; j < currentPrices.length; j++) {
					var currentPrice = currentPrices[j];
					if (currentPrice) {
						var currentSwatches = currentPrice.value;
						if (currentSwatches) {
							numSwatches += currentSwatches.length;
						}
					}
				}
			}
		}
	}

	var onlyOneSwatch = (numSwatches == 1);
	haveClearance = false;

	for (var typeIndex = 0; typeIndex < typeLength; typeIndex++) {
		var currentType = x.swatchImages[typeIndex];
		if (currentType != undefined) {
			var currentPrices = currentType.value;
			for (var i = 0; i < currentPrices.length; i++) {
				var price = currentPrices[i].key;
				var displayPriceTmp = "$" + price;
				var regPriceRange = currentPrices[i].regPrice;				
				if (displayPriceTmp != regPriceRange && regPriceRange != "") {
					if (YAHOO.ebauer.productUtils.basicMode == true) {
						displayPriceTmp = "<span class='basicWasPrice'>was " + regPriceRange + "</span> &nbsp;";
						displayPriceTmp += "<span class='discount'>now $" + price + "</span>";
					} else {
						displayPriceTmp = "<span class='strikethrough'>was " + regPriceRange + "</span> ";
						displayPriceTmp += "<span class='discount'>now $" + price + "</span>";
					}
				}				
				if (("$"+price) == regPriceRange && regPriceRange != "") {
					displayPriceTmp = "$" + price;
				}
				if (YAHOO.ebauer.productUtils.basicMode == true) {
					YAHOO.util.Dom.get("basicSwatchPrice").innerHTML = displayPriceTmp;
				} else {
					displayPrice = "<dt class='swatchName'>" + displayPriceTmp;
				}
					 // swatchName is set to not display on the MPP.  Proposed fixe is below.
                //                displayPrice = "<dt class='swatchPrice'>" + displayPrice;
				showDisplayPrice = false;
				swatches = currentPrices[i].value;
				var swatchAvail = true;
				var swatchTabIndex = 50; //tabIndex starts at 50
				for (var j = 0; j < swatches.length; j++) {
					if (isFirstTime) {
						colorIdArr[arrIndex] = swatches[j].key;
						priceArr[arrIndex] = price;
						arrIndex++;
						// Check for the colors which has to go under the header 'Limited availablility...' #BUG0537
						if (eobFlag == 'true' && pageType == 'MATCHMATCH') {
							if (swatches[j].value == "") {
								limitedAvailArr[limitedAvailIndex] = swatches[j].name;
								swatchAvail = false;
								limitedAvailIndex++;
							} else {
								swatchAvail = true;
							}
						}
					}
					if (swatchAvail && (eobFlag != 'true' || pageType != "CATALOGONLY")) {
						if (isFirstTime) {
							for (y = 0; y < x.colors.color.length; y++) {
								if (x.colors.color[y].pricetypecode == "C") {
									haveClearance = true;
								}
								if (x.colors.color[y].id == swatches[j].key) {
									var pricetypecode = x.colors.color[y].pricetypecode;
								}
							}
							if (pricetypecode == "C" && !shownClearance) {
								shownClearance = true;
								clearanceText = displayPrice;
								showDisplayPrice = true;
								if (eobFlag == 'true') {
									clearanceText += "<span class='clearance'>Clearance</span></dt>";
								} else {
									clearanceText += "</dt>";
								}
							}

							if (j == 0) {
								if (isMultiProductPage) {
									firstSwatch[x.idx] = "swatch" + index + "_" + swatches[j].key;
								} else {
									firstSwatch = "swatch" + swatches[j].key;
								}
							}
							if (!showDisplayPrice) {
								if (pricetypecode == "C") {
									clearanceText += displayPrice;
									if (eobFlag == 'true') {
										clearanceText += "<span class='clearance'>Clearance</span></dt>";
									} else {
										clearanceText += "</dt>";
									}
								} else {
									if (YAHOO.ebauer.productUtils.basicMode == true) {
										YAHOO.util.Dom.get("basicSwatchPrice").innerHTML = displayPrice;
									} else {
										innerText += displayPrice + "</dt>";
									}
								}
								showDisplayPrice = true;
							}
							if (isMultiProductPage) {
								if (onlyOneSwatch)
									if (pricetypecode == "C") {
										clearanceText += "<dd id='swatch" + index + "_" + swatches[j].key + "' class='hot'>";
									} else {
										innerText += "<dd id='swatch" + index + "_" + swatches[j].key + "' class='hot'>";
									}
								else {
									if (pricetypecode == "C") {
										clearanceText += "<dd id='swatch" + index + "_" + swatches[j].key + "' class='not'>";
									} else {
										innerText += "<dd id='swatch" + index + "_" + swatches[j].key + "' class='not'>";
									}
								}
								if (pricetypecode == "C") {
									clearanceText += "<a href='javascript:swatchSelectMPP(" + swatches[j].key + "," + x.idx + ");' title='" + swatches[j].name + "'><img src='" + swatches[j].value + "' alt='" + swatches[j].name + "' /></a></dd>";
								} else {
									innerText += "<a href='javascript:swatchSelectMPP(" + swatches[j].key + "," + x.idx + ");' title='" + swatches[j].name + "'><img src='" + swatches[j].value + "' alt='" + swatches[j].name + "' /></a></dd>";
								}
							} else {
								if (onlyOneSwatch) {
									if (pricetypecode == "C") {
										clearanceText += "<dd id='swatch" + swatches[j].key + "' class='hot'>";
									} else {
										innerText += "<dd id='swatch" + swatches[j].key + "' class='hot'>";
									}
								} else {
									if (pricetypecode == "C") {
										clearanceText += "<dd id='swatch" + swatches[j].key + "' class='not'>";
									} else {
										innerText += "<dd id='swatch" + swatches[j].key + "' class='not'>";
									}
								}
								if (pricetypecode == "C") {
									clearanceText += "<a href='javascript:swatchSelect(" + swatches[j].key + "," + '"' + swatches[j].value + '"' + ")' title='" + swatches[j].name + "'><img src='" + swatches[j].value + "' alt='" + swatches[j].name + "' onmouseover = \"changeColorText('" + swatches[j].name + "')\" onmouseout = 'revertColorText()' onclick = \"changeProductLabel('" + swatches[j].key + "')\" /></a></dd>";
								} else {
									innerText += "<a href='javascript:swatchSelect(" + swatches[j].key + "," + '"' + swatches[j].value + '"' + ")' title='" + swatches[j].name + "'><img src='" + swatches[j].value + "' alt='" + swatches[j].name + "' onmouseover = \"changeColorText('" + swatches[j].name + "')\" onmouseout = 'revertColorText()' onclick = \"changeProductLabel('" + swatches[j].key + "')\" /></a></dd>";
								}
							}
							swatchTabIndex++;
						}
					}
				}
			}
		}
	}

	innerText += clearanceText;
	if (isMultiProductPage) {
		if (isFirstTime) {
			innerText += "<dt class='swatchName' id='swatchName" + index + "'></dt>";
			swatches = document.getElementById('swatches' + index);
			if (swatches != null)
				swatches.innerHTML = innerText;
			loadedFirstTime[x.idx] = false;
		}
		displayImagesMPP(x.idx, x.images);
		var col = $("color" + index);
		var activeColor  = $("activeColorId_" + x.idx);
		if (col != undefined)
			swatchSelectMPP(activeColor.value, x.idx, "system");
	} else {
		if (eobFlag == 'true' && pageType == 'MATCHMATCH')
			displayLimitedAvailColor(limitedAvailArr);
		if (eobFlag != 'true' || pageType != "CATALOGONLY") {
			if (isFirstTime) {
				if (swatches.length == 1 && swatches[0].value != "")
					innerText += "<dt id='swatchName'>" + swatches[0].name + "</dt>";
				else
					innerText += "<dt id='swatchName'></dt>";
				writeSwatchInnerHtml(innerText);
			}
		}
		if (eobFlag != 'true' || pageType != "CATALOGONLY") {
			if (colorIndex != 0 && $("color").selectedIndex == colorIndex)
				swatchSelect(colors.options[colorIndex].value);
			displayImages(x.images, x.colors.color);
		}
		ajaxCompleteObject.completeEvent.fire("updateColorsMethod");
		updateCount += 1;
	}
	if (!YAHOO.ebauer.productUtils.infoModuleComplete) {
		YAHOO.ebauer.productUtils.swatchesLoaded = true;
		YAHOO.ebauer.layerbox.checkProductLayerModules();
	}
}

function buildColorSizeSwatches(x) {
	var swatches = "";
	var arrIndex = 0;
	var innerText = '';
	var eobFlag = getValueFromElement('eob');
	var pageType = getValueFromElement('pageType');
	var index = '';
	var isFirstTime = true;
	var isMultiProductPage = false;
	var limitedAvailArr = null;
	var limitedAvailIndex = 0;

	if (isFirstTime) {
		colorIdArr = new Array();
		priceArr = new Array();
		limitedAvailArr = new Array();
	}
	var colorLength = 0;
	if (!(x.colorsizes == undefined || x.colorsizes.colorsize == undefined)) {
		colorLength = x.colorsizes.colorsize.length;
	}
    var colText = $("change_col_text");
	if (colText != undefined) {
		if (colorLength > 1) {
			colText.style.display = 'block';
		} else {
			colText.style.display = 'none';
		}
	}
	var shownClearance = false;
	var clearanceText = "";

	// prevent a JavaScript error by leaving at 0 if undefined
	var typeLength = (x.swatchImages == undefined) ? 0 : x.swatchImages.length;
	var numSwatches = 0;
	// count the total number of swatches
	for (var i = 0; i < typeLength; i++) {
		var currentType = x.swatchImages[i];
		if (currentType != undefined) {
			var currentPrices = currentType.value;

			if (currentPrices != undefined) {
				for (var j = 0; j < currentPrices.length; j++) {
					var currentPrice = currentPrices[j];
					if (currentPrice) {
						var currentSwatches = currentPrice.value;
						if (currentSwatches) {
							numSwatches += currentSwatches.length;
						}
					}
				}
			}
		}
	}

	var onlyOneSwatch = (numSwatches == 1);
    haveClearance = false;

	for (var typeIndex = 0; typeIndex < typeLength; typeIndex++) {
		var currentType = x.swatchImages[typeIndex];
		if (currentType != undefined) {
			var currentPrices = currentType.value;
			for (var i = 0; i < currentPrices.length; i++) {
				var price = currentPrices[i].key;
				var displayPriceTmp = "$" + price;				
				if (displayPriceTmp != ("$" + regPrice) && regPrice != "") {
					displayPriceTmp = "<span class=\"strikethrough\">" + regPrice + "</span> ";
					displayPriceTmp += "<span class=\"discount\"> $" + price + "</span>";
				}
                displayPrice = "<dt class='swatchName'>" + displayPriceTmp;
                // swatchName is set to not display on the MPP.  Proposed fixe is below.
                //                displayPrice = "<dt class='swatchPrice'>" + displayPrice;
				showDisplayPrice = false;
				swatches = currentPrices[i].value;
				var swatchAvail = true;
				for (var j = 0; j < swatches.length; j++) {
					if (isFirstTime) {
						colorIdArr[arrIndex] = swatches[j].key;
						priceArr[arrIndex] = price;
						arrIndex++;
						// Check for the colors which has to go under the header 'Limited availablility...' #BUG0537
//						if (eobFlag == 'true' && pageType == 'MATCHMATCH') {
//							if (swatches[j].value == "") {
//								limitedAvailArr[limitedAvailIndex] = swatches[j].name;
//								swatchAvail = false;
//								limitedAvailIndex++;
//							} else {
//								swatchAvail = true;
//							}
//						}
					}
					if (swatchAvail && (eobFlag != 'true' || pageType != "CATALOGONLY")) {
						if (isFirstTime) {
							for (y = 0; y < x.colorsizes.colorsize.length; y++) {
								if (x.colorsizes.colorsize[y].pricetypecode == "C") {
									haveClearance = true;
								}
								if (x.colorsizes.colorsize[y].id == swatches[j].key) {
									var pricetypecode = x.colorsizes.colorsize[y].pricetypecode;
								}
							}
							if (pricetypecode == "C" && !shownClearance) {
								shownClearance = true;
								showDisplayPrice = true;
                                // ENH00577: Fixing the matching (instock/bo) colors shown in separate line.
                                if (innerText == null || trim(innerText).length == 0) {
                                    clearanceText = displayPrice;
                                    clearanceText += "</dt>";
                                }
                            }

							if (j == 0) {
                                firstSwatch = "swatch" + swatches[j].key;
							}
							if (!showDisplayPrice) {
								if (pricetypecode == "C") {
									clearanceText += displayPrice;
									if (eobFlag == 'true') {
										clearanceText += "<span class='clearance'>Clearance</span></dt>";
									} else {
										clearanceText += "</dt>";
									}
								} else {
									innerText += displayPrice + "</dt>";
								}

								showDisplayPrice = true;
							}

                            if (onlyOneSwatch) {
                                if (pricetypecode == "C") {
                                    clearanceText += "<dd id='swatch" + swatches[j].key + "' class='hot'>";
                                } else {
                                    innerText += "<dd id='swatch" + swatches[j].key + "' class='hot'>";
                                }
                            } else {
                                if (pricetypecode == "C") {
                                    clearanceText += "<dd id='swatch" + swatches[j].key + "' class='not'>";
                                } else {
                                    innerText += "<dd id='swatch" + swatches[j].key + "' class='not'>";
                                }
                            }
                            if (pricetypecode == "C") {
                                clearanceText += "<a href='javascript:swatchColorSizeSelect(" + swatches[j].key + "," + '"' + swatches[j].value + '"' + ")' title='" + swatches[j].name + "'><img src='" + swatches[j].value + "' alt='" + swatches[j].name + "' onmouseover = \"changeColorText('" + swatches[j].name + "')\" onmouseout = 'revertColorText()' onclick = \"changeProductLabel('" + swatches[j].key + "')\" /></a></dd>";
                            } else {
                                innerText += "<a href='javascript:swatchColorSizeSelect(" + swatches[j].key + "," + '"' + swatches[j].value + '"' + ")' title='" + swatches[j].name + "'><img src='" + swatches[j].value + "' alt='" + swatches[j].name + "' onmouseover = \"changeColorText('" + swatches[j].name + "')\" onmouseout = 'revertColorText()' onclick = \"changeProductLabel('" + swatches[j].key + "')\" /></a></dd>";
                            }
						}
					}
				}
			}
		}
	}

	innerText += clearanceText;


    if (eobFlag != 'true' || pageType != "CATALOGONLY") {
        if (isFirstTime) {
            if (swatches.length == 1 && swatches[0].value != "")
                innerText += "<dt id='swatchName'>" + swatches[0].name + "</dt>";
            else
                innerText += "<dt id='swatchName'></dt>";
            writeSwatchInnerHtml(innerText);
        }
    }
    if (eobFlag != 'true' || pageType != "CATALOGONLY") {
        if (colorIndex != 0 && $("colorsize").selectedIndex == colorIndex)
            swatchColorSizeSelect(colorsizes.options[colorIndex].value);
        displayImages(x.images, colorsizes.colorsize);
    }
    ajaxCompleteObject.completeEvent.fire("updateColorsMethod");
    updateCount += 1;

    if (!YAHOO.ebauer.productUtils.infoModuleComplete) {
		YAHOO.ebauer.productUtils.swatchesLoaded = true;
		YAHOO.ebauer.layerbox.checkProductLayerModules();
	}
}

var swatchTimeoutCount = 10;
var writeSwatchInnerHtml = function(innerText) {
	var swatchesEl = document.getElementById('swatches');
	if (swatchesEl != null) {
		swatchesEl.innerHTML = innerText;
		swatchTimeoutCount = 10;//reset the counter
	} else if (swatchTimeoutCount >= 0) {
		swatchTimeoutCount--;
		var swatch_timeout = setTimeout(function(){writeSwatchInnerHtml(innerText);},400);
	} else {
		//give up and reset
		swatchTimeoutCount = 10;
	}
}

function displayLimitedAvailColor(limitedAvailArr) {
	if (limitedAvailArr == null) {
		return;
	}
	var limitedVarObj = $("limited_avail_color");
	if (limitedVarObj != null && limitedVarObj != undefined) {
		limitedVarObj.innerHTML = "";
		var length = limitedAvailArr.length;
		if (length > 0) {
			var text = "";
			for (var i = 0; i < length; i++) {
				text += limitedAvailArr[i];
				if (i < length - 1)
					text += ',';
			}
			var temp = document.createElement('dt');
			temp.appendChild(document.createTextNode('Limited availability in the following colors:'));
			limitedVarObj.appendChild(temp);
			temp = document.createElement('dd');
			temp.appendChild(document.createTextNode(text));
			limitedVarObj.appendChild(temp);
			enableDisplay($("limited_avail_color"));
		} else {
			disableDisplay($("limited_avail_color"));
		}
	}
}

var findImg = function(elTarget) {
	while (elTarget && elTarget.hasChildNodes() || elTarget.nodeName.toUpperCase() == "IMG") {
		if (elTarget.nodeName.toUpperCase() == "IMG") {
			return elTarget.cloneNode(false);
		} else {
			elTarget = elTarget.childNodes[0];
		}
	}
};