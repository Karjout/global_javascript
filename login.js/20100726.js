if (!YAHOO.ebauer) {
	YAHOO.namespace("ebauer");
}

/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
	FUNDAMENTAL MODAL CODE
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

YAHOO.ebauer.loginUtils = function() {
	//	escape if less than ideal environment
	if (!document.getElementById) {
		return;
	}

	//	establish shortcuts to YAHOO
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;
	var $ = $D.get;

	var lastWishListUserItemIdAdded = -1;
	var loginLevel = 0;
	var emailAddress = '';
	var name = '';
	var destinationParam = '/user/wishlist.jsp?plFlag=true';
	var isProductLayerLogin = false;

	var processCheckLoginLevel = function(o) {

			var response = eval('(' + o.responseText + ')');
		YAHOO.ebauer.loginUtils.loginLevel = response.loginLevel;   
        loginLevel = response.loginLevel;

           emailAddress = response.emailAddress;
		   name = response.name;
			destinationParam = response.destParam;
		   isProductLayerLogin = eval(response.plFlag);

				if (loginLevel == 0 || loginLevel == 1) {
					YAHOO.ebauer.layerbox.transition('login');
				} else {
					if (isProductLayerLogin == true) {
						if (buyAnotherWishListItemFlag == true) {
                            // is this the wishlist page ?
                            if (location.href.indexOf('wishlist.jsp') > 0) {
                                gotoWishListPage();
                            } else {
                                showItemAddedToWishList();
                            }
                        } else {
                            showItemAddedToWishList();
                        }

					} else {
						// Could be wishlist page, or Home Page, or category page.
						location.href = destinationParam;
					}
				}
	  };

	var debugFailure = function(arg) {
		var p = arg.processType;
		if (p) {
			var newText = document.createTextNode("AJAX failure in processType:" + p);
			var alsoModule = $('alsoModule');
			var thumbs = $('thumbs');
			var parentNode = null;
			if (alsoModule) {
				parentNode = alsoModule.parentNode;
			} else if (thumbs) {
				parentNode = thumbs.parentNode;
			}
			if (parentNode) {
				parent.appendChild(newText);
			}
		}
	  };
	  
 

	var callBackFnCheckLoginLevel =	{
			success : processCheckLoginLevel,
			failure : debugFailure,
			argument: { processType:"checkLoginLevel" },
			timeout: 6000
	};

	return {
		getProductLayerLogin : function () {
			return isProductLayerLogin;
		},
		checkLoginLevel : function (productLayerFlag, destParam) {
			var cObj = YAHOO.ebauer.utilities.asyncRequest('POST', getBaseURL() + '/ajax/checkLoginLevel.jsp?plFlag='+productLayerFlag+'&destParam='+encodeURI(destParam), callBackFnCheckLoginLevel);
		},
		createLoginLayer : function () {
			var loginMode = "General";
			if (isProductLayerLogin) {
				loginMode = "productLayerLogin";
				contentName = "Login Layer Billboard - Wish List";
			} else {
				loginMode = "GeneralLayerLogin";
			}

			var top1 = $('layerbox');
			var hrTag = createTag("hr");
			top1.innerHTML = "";
			var aCloseElement = createDOM('a', {'href':'javascript:YAHOO.ebauer.layerbox.hideLayer();','title':'Close','id':'closeWishListBtnId' });
			aCloseElement.appendChild(document.createTextNode('Close'));
	
			var modal = createTag("div", "loginLayer");
			modal.appendChild(aCloseElement);
			var modalOuter = createTag("div",null,"modal",modal);

			if (isProductLayerLogin == false) {
				var loginTitleDiv = createDOM('div', {'id':'logintitle'});
				loginTitleDiv.innerHTML = '<INPUT class=\"button ui-button ui-widget ui-state-default ui-corner-all\" id=\"closeWindow\" type=\"button\" onclick=\"YAHOO.ebauer.layerbox.hideLayer();\" value=\"Close Window\"/>';
				modal.appendChild(loginTitleDiv);
			}

			var loginBillBoardDiv = createTag('div', 'loginHeaderBillBoard', 'login_content_wrap');
			var interstitialContentName = (contentName != '' && contentName) ? contentName : 'Login Layer Billboard - General';
			getInterstitialContent(interstitialContentName, 'loginHeaderBillBoard');
			modal.appendChild(loginBillBoardDiv);
			

			
			hrTag = createTag("hr");
			modal.appendChild(hrTag);

			var loginWrap = createTag('div','loginSignIn','login_content_wrap');
			var sectionHeaderDiv = createTag('div','sectionHeader');
			loginWrap.appendChild(sectionHeaderDiv);
			if (loginLevel === 0) {
				getInterstitialContent('Login Layer Header - Level0', 'sectionHeader');
			} else if (loginLevel === 1) {
				getInterstitialContent('Login Layer Header - Level1', 'sectionHeader');
			}

			if (loginLevel === 1 && name != '') {
				var loginNameInfoDiv = createDOM('div',{'id':'loginNameInfoDiv','class':'loginNameInfo'});
				var spanName = createTextTag('span',name);
				loginNameInfoDiv.appendChild(spanName);
				var anchorTag = createDOM('a',{'href':'/user/logout.cmd'});
				anchorTag.appendChild(document.createTextNode("Not you?"));
				loginNameInfoDiv.appendChild(anchorTag);
				loginWrap.appendChild(loginNameInfoDiv);
			}

			var loginCopyDiv = createDOM('div', {'id':'loginCopyDiv'});
			loginWrap.appendChild(loginCopyDiv);
			if (loginLevel === 0) {
				getInterstitialContent('Login Layer Copy - Level0', 'loginCopyDiv');
			} else if (loginLevel === 1) {
				getInterstitialContent('Login Layer Copy - Level1', 'loginCopyDiv');
			}

			var actionUrl = getSecureBaseURL() + '/user/login.cmd';
			var form = createDOM('form', {'action':actionUrl,'method':'post','id':'loginForm','name':'loginForm'});
			var fieldset = createTag("fieldset","layerSignIn");
			var inputLoginMode = createDOM('input', {'type':'hidden','name':'loginMode','id':'loginMode','value':loginMode});
			var inputDest = createDOM('input', {'type':'hidden','name':'dest','id':'dest','value':destinationParam});

			fieldset.appendChild(inputLoginMode);
			fieldset.appendChild(inputDest);

			if (emailAddress == 'undefined') {
				emailAddress = '';
			}

			var emailErrorDiv = createTag('div','emailErrorDiv','error');
			fieldset.appendChild(emailErrorDiv);
			fieldset.appendChild(buildDOMInputFieldWithDLStructure(1, 'accessAccount_email', '<strong>Email Address:</strong>','text',50,emailAddress,'blur',validateLoginEmailAddress));
			var passwordErrorDiv = createTag('div','passwordErrorDiv','error');
			fieldset.appendChild(passwordErrorDiv);
			fieldset.appendChild(buildDOMInputFieldWithDLStructure(2, 'accessAccount_pword', '<strong>Password:</strong><span class="hintText">(Case sensitive)</span>','password',20,'','keydown', validateLoginEmailAndPassword));
			
			

			var dl = createDOM('dl', {'class':'formforgotpassword'});
			var dt = createDOM('dt',null);
			var dd = createDOM('dd',null);
			var aTag = createDOM('a',{'href':'/user/forgot_password.jsp','class':'wishListLinkpad'});
			
			aTag.appendChild(document.createTextNode("Forgot your password?"));
			dd.appendChild(aTag);
			dl.appendChild(dt);
			dl.appendChild(dd);
			fieldset.appendChild(dl);


			var submitButtonsDiv = createTag('div', null, 'submitbuttons');
			submitButtonsDiv.innerHTML = '<INPUT class=\"button ui-button ui-widget ui-state-default ui-corner-all\" id=\"submitLogin\" type=\"submit\" onfocus=\"return validateLoginForm(this.form,false);\" onkeydown=\"return validateLoginForm(this.form,false);\" onclick=\"return validateLoginForm(this.form,true);\" value=\"Sign In\" tabIndex=\"3\" />';
			fieldset.appendChild(submitButtonsDiv);
			form.appendChild(fieldset);
			loginWrap.appendChild(form);
			modal.appendChild(loginWrap);

			hrTag = createTag("hr");
			modal.appendChild(hrTag);

			if (loginLevel === 0) {
				var loginCreateAccountDiv = createTag('div', 'loginCreateAccount', 'login_content_wrap');
				var createActionUrl = getSecureBaseURL() + '/user/login.jsp';
				var createAccountForm = createDOM('form', {'action':createActionUrl,'method':'post','id':'loginCreateAccount','name':'loginCreateAccount'});



				var newAccountDiv = createTag('div', 'newAccountDiv');
				createAccountForm.appendChild(newAccountDiv);
				getInterstitialContent('Login Layer Footer - NewAccount', 'newAccountDiv');

				submitButtonsDiv = createTag('div', null, 'submitbuttons');
				submitButtonsDiv.innerHTML = '<INPUT class=\"button ui-button ui-widget ui-state-default ui-corner-all\" id=\"submitCreateAccount\"  type=\"submit\" value=\"Create Account\" />';
				createAccountForm.appendChild(submitButtonsDiv);

				loginCreateAccountDiv.appendChild(createAccountForm);
				modal.appendChild(loginCreateAccountDiv);
			}

			if (isProductLayerLogin == true) {
				var aCancel = createDOM('a',{'href':'javascript:void(null);','id':'cancelLogin'});
				aCancel.appendChild(document.createTextNode('Cancel and go back to Product'));
				var pCancel = createTag('p', null, "cancelWrap", aCancel);
				hrTag = createTag("hr");
				modal.appendChild(hrTag);
				modal.appendChild(pCancel);
			}

			top1.appendChild(modalOuter);
		}
	};
}();