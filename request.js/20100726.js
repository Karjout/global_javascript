/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
Article: JS Request Object
Comment: Expects Yahoo Framework
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

if ( !YAHOO.ebauer ) { YAHOO.namespace("ebauer"); }

/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
	JAVASCRIPT EMULATION OF SERVER REQUEST OBJECT
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

YAHOO.ebauer.request = function() {
	
/*	escape if less than ideal environment */
	if(!document.getElementById){ return; } 
/*	_______
//	PRIVATE	
*/
/*	establish shortcuts to YAHOO */
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;
	var $ = $D.get;

/*	REQUEST OBJECT */
	var Request;
	var RequestObject = function(objToAppend) {

	/*	Constructor which emulates serverpage Request Object
	//	?param=value becomes Request["param"] = value || Request.param = value
	*/
		var glean = typeof objToAppend == "object" ? objToAppend : {};
		var query = window.location.search;	
		var pairs = query.match(/^\??(.*)$/)[1].split('&');
		for ( var i = 0; i < pairs.length; i++ )
		{
			var pos = pairs[i].indexOf('=');
			if ( pos < 0 ) { continue; }
			
			var param = pairs[i].substring(0,pos);
			var value = pairs[i].substring(pos+1);
			glean[param] = isNaN(value) ? unescape(value) : Number(value);
		}
		return glean;
	};
/*	______
//	PUBLIC
*/
	return {
		
		init : function() {
			Request = RequestObject();
		},

		syncFormToRequest : function(formId) {
		/*	compares all URL parameters to a form and populates form. 
		//	assumes form elements to be named same as URL arguments.
		*/
			var form = formId ? YAHOO.util.Dom.get(formId) : document.forms[0];
			var args = Request ? Request : RequestObject();
			for ( var param in args ) {
				if ( !!!form[param] ) {
				/*	param doesn't have corresponding element in form */
				} else if ( form[param].type == "select-one" ) {
					for ( var i = 0; i < form[param].options.length; i++ ) {
						if ( form[param].options[i].value == args[param] ) {
							form[param].selectedIndex = i; break;
						}			
					}				
				} else if ( form[param].type == "checkbox" ) {
					form[param].checked = !!args[param];
				} else if ( form[param].length && form[param][0].type == "radio" ) {
					for ( var i = 0; i < form[param].length; i++ ) {
						if ( args[param] == form[param][i].value ) {
							form[param][i].checked = true; break;
						}			
					}
				} else {
				/*	hidden or text */
					form[param].value = args[param];
				}
			}
		},

		syncNavListToRequest : function(navId,param) {
		/*	styles LIs with hot/not classes according to an URL argument. 
		//	assumes LIs to be in sequence (index) with argument value.
		*/
			var nav = $D.get(navId).getElementsByTagName("LI");
			var arg = RequestObject()[param] || 0;
			$D.hasClass(nav,"not") ? $D.replaceClass(nav,"hot","not") : $D.addClass(nav,"not");
			$D.replaceClass(nav[arg],"not","hot");
		},

		emailVerify : function(theForm) {

			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(theForm.email.value)) {
	
				return true;

			} else {

				var msgEle = $D.getElementsByClassName('message','DD',theForm);
				if( msgEle.length ) {
					msgEle[0].firstChild.nodeValue = 'That email address seems wrong. Please try again.';
					$D.addClass(msgEle,'error');
				}

				return false;
			}
		}
	};
}();

/*	pass the namespace object as scope, then pass true to use 'this' scope within namespace */
	YAHOO.util.Event.on(window, 'load', YAHOO.ebauer.request.init, YAHOO.ebauer.request, true);