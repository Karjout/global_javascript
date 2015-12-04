var gMonogramFontFlag;
var setPreviewButton = function() {
	var continue_with_monogram_button = $("continue_with_monogram");
	var inner_preview_button = document.getElementById("inner_preview_button");
    inner_preview_button.disabled = true;
	 if (gMonogramMode == 'edit'){
		 populateMonogrammingInputFields();
	 }
	var size = gMonogramInputFields.length;
    if (size == 0)
        return false;
    for (var i=0; i<size; i++) {
        if (gMonogramInputFields[i].value != "") {
            inner_preview_button.disabled = false;
            YAHOO.util.Dom.replaceClass(inner_preview_button, 'buttonInactive', 'buttonActive');
            setContinueMonogramButton();
            return true;
        }
    }
    var textObj = $("monogramTextDiv_error");
    textObj.innerHTML="";
	if(isDefined(continue_with_monogram_button)){
		YAHOO.util.Dom.replaceClass(continue_with_monogram_button, 'buttonActive', 'buttonInactive');
	}
    return false;
};

var toggleMgmData = function() {
	if($("monogram_font").selectedIndex > 0 && $("monogram_color").selectedIndex > 0 && $("monogram_style").selectedIndex > 0){
		$("mgmdatatoggle").style.visibility = "visible";
	}
	else{
		$("mgmdatatoggle").style.visibility = "hidden";
	}
};

var setContinueMonogramButton = function() {
	var monogramColorFlag = true;
	var monogramInputFieldsFlag = true;
	var continue_with_monogram_button = $("submitMonogram");
	var size = gMonogramInputFields.length;
	for (var i=0; i<size; i++) {
		if (gMonogramInputFields[i].value == "") {
			monogramInputFieldsFlag = false;
			break;
		}
	}

	var colorObj =$("monogram_color");
	if(colorObj != null || colorObj != undefined){
		if(colorObj.selectedIndex < 1){
            monogramColorFlag = false;
        }
	}
	if(isDefined(continue_with_monogram_button)){
		if ($("monogram_style").value == -1 || monogramColorFlag == false || monogramInputFieldsFlag == false || gMonogramFontFlag == false) {
			YAHOO.util.Dom.replaceClass(continue_with_monogram_button, 'buttonActive', 'buttonInactive');
		}  else {
			YAHOO.util.Dom.replaceClass(continue_with_monogram_button, 'buttonInactive', 'buttonActive');
		}
	}
};