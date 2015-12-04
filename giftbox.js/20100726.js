function createGiftBox(passedUUID, siteCss) {
	if (passedUUID != "") {
		itemUUID = passedUUID;
		gBackToCat = 'Shopping Bag';
		queryString = 'uuid=' + itemUUID;
		var cObj = YAHOO.ebauer.utilities.asyncRequest('GET', getBaseURL() + '/ajax/loadGiftBoxDetails.jsp?uuid=' + passedUUID, callbackLoadGiftBox);
	}

	var top1 = $('layerbox');
	top1.innerHTML = "";
	var close = createDOM('a', { 'id': 'close', 'class': 'closeX', 'href': 'javascript:closeProductInfoLayer();' });
    top1.appendChild(close);
	var modal = createDOM('div', {'class':'modal giftbox ' + siteCss});
	top1.appendChild(modal);
	YAHOO.util.Dom.setStyle(top1, "background-color", "transparent");
	var matte = createDOM("div", {'id':'matte'});
	modal.appendChild(matte);
	var dialogSlat = createDOM('div', {'class':'dialog-slat clearfix'});
	matte.appendChild(dialogSlat);
	var img = createDOM('img', {'src':'/assets/giftbox_108x100.jpg'});
	var left = createDOM('div', {'class':'left'});
	dialogSlat.appendChild(img);
	dialogSlat.appendChild(left);
	var h5 = createDOM('h5', null);
	left.appendChild(h5);
	h5.appendChild(document.createTextNode("A wrapped presentation that's as thoughtful as the gift inside."));
	var bq = createDOM('blockquote', null);
	left.appendChild(bq);
	bq.appendChild(document.createTextNode("For just $5, our Gift Box arrives beautifully wrapped with an attractive ribbon and topped with a card containing your personalized greeting."));
	var lowerDialogSlat = createDOM('div', {'class':'dialog-slat clearfix'});
	matte.appendChild(lowerDialogSlat);
	var p = createDOM('p', {'class':'note'});
	lowerDialogSlat.appendChild(p);
	p.appendChild(document.createTextNode("One item per box. Please allow one additional day for shipping."));
	p = createDOM('p', {'class':'note'});
	lowerDialogSlat.appendChild(p);
	p.appendChild(document.createTextNode("* Required Field"));
	var form = createDOM('form', {'action':'','method':'post','id':'giftbox_form','name':'giftbox_form'});
	lowerDialogSlat.appendChild(form);
	var inputDept = createDOM('input', {'type':'hidden','name':'dept','id':'dept','value':'NEED TO FILL IN'});
	var inputEffort = createDOM('input', {'type':'hidden','name':'effort','id':'effort','value':'NEED TO FILL IN'});
	var inputItem = createDOM('input', {'type':'hidden','name':'item','id':'item','value':'NEED TO FILL IN'});
	var inputEOB = createDOM('input', {'type':'hidden','name':'eob','id':'eob','value':'NEED TO FILL IN'});
	var inputGiftBoxFlag = createDOM('input', {'type':'hidden','name':'giftboxflag','id':'giftboxflag','value':'Y'});
	var inputGiftBoxEnabledFlag = createDOM('input', {'type':'hidden','name':'giftboxenabledflag','id':'giftboxenabledflag','value':'Y'});
	form.appendChild(inputDept);
	form.appendChild(inputEffort);
	form.appendChild(inputItem);
	form.appendChild(inputEOB);
	form.appendChild(inputGiftBoxFlag);
	form.appendChild(inputGiftBoxEnabledFlag);
	var fieldset = createDOM('fieldset', null);
	form.appendChild(fieldset);
	var legend = createDOM('legend', {'class':'ignore'});
	var bqprompt = createDOM('blockquote', {'class':'prompt'});
	fieldset.appendChild(legend);
	fieldset.appendChild(bqprompt);
	legend.appendChild(document.createTextNode("Gift Box"));
	bqprompt.appendChild(document.createTextNode("Some of the required information is missing"));
	fieldset.appendChild(buildDOMInputFieldWithDLStructure(1, 'giftboxto', '<span class="asterisk">*</span>&nbsp;<strong>To</strong>','text',24,''));
	fieldset.appendChild(buildDOMInputFieldWithDLStructure(2, 'giftboxfrom', '<strong>From</strong>','text',24,''));
	fieldset.appendChild(buildDOMInputFieldWithDLStructure(3, 'giftboxmsg', '<strong>Personal Message</strong>&nbsp;<span class="note">20 character max</span>','text',20,''));

	// PROPER
	var inpparams = createDOM('input', {'type':'hidden','name':'giftbox_params','id':'giftbox_params','value':''});
	fieldset.appendChild(inpparams);

	var divsub = createDOM('div', {'class':'button_c'});
	divsub.innerHTML = '<INPUT class=\"buttonInactive ui-button ui-widget ui-state-default ui-corner-all\" id=\"submitGiftBox\" onfocus=\"return validateGiftBoxFields(this.form);\" onkeydown=\"return validateGiftBoxFields(this.form);\" onmouseover=\"return validateGiftBoxFields(this.form);\" onclick=\"javascript:saveGiftBox(this.form);\" type=\"button\" tabindex=\"5\" value=\"Continue with Gift Box\" />';
	fieldset.appendChild(divsub);
	if(passedUUID != "" && passedUUID != null) {
		var aCancel = createDOM('a',{'href':'javascript:editItemInCart("'+ passedUUID +'", true);'});
		if(YAHOO.ebauer.productUtils.editProductMode){
			aCancel.style.visibility = "hidden";
		}
	}
	else{
		var aCancel = createDOM('a',{'href':'javascript:void(null);','id':'cancelGiftBox'});
	}
	var ddCancel = createDOM('dd', null);                           
	var dtCancel = createDOM('dt', null);
	var dlCancel = createDOM('dl', {'class':'center'});
	aCancel.appendChild(document.createTextNode('Cancel and go back to Product'));
	ddCancel.appendChild(aCancel);
	dtCancel.appendChild(document.createTextNode(' '));
	dlCancel.appendChild(dtCancel);
	dlCancel.appendChild(ddCancel);
	fieldset.appendChild(dlCancel);
	var aContinue = createDOM('a', {'href':'javascript:void(null);','id':'continueWithout'});
	var ddContinue = createDOM('dd', null);
	var dtContinue = createDOM('dt', null);
	var dlContinue = createDOM('dl', {'class':'center'});
	aContinue.appendChild(document.createTextNode('Continue without Gift Box'));
	ddContinue.appendChild(aContinue);
	dtContinue.appendChild(document.createTextNode(' '));
	dlContinue.appendChild(dtContinue);
	dlContinue.appendChild(ddContinue);
	fieldset.appendChild(dlContinue);
}