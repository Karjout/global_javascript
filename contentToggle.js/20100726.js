/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
Article: Content Toggle

Comment: Hides structural elements if there is no content entered in site manager
Assured: Firefox, IE 6/7, Safari, Opera
Pending:

Version: 2007.09.10
Revisor: Jim Scopacasa

-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

if ( !YAHOO.ebauer ) { YAHOO.namespace("ebauer"); }

YAHOO.ebauer.contentToggle = function() {

/*	escape if less than ideal environment */
	if(!document.getElementById){ return; }
/*	_______
//	PRIVATE
*/

/*	establish shortcuts to YAHOO */
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;
	var $ = $D.get;
	/*	______
	//	PUBLIC
	*/
	return {
		init : function() {
			var contentKey = $D.getElementsByClassName("contentKey",null,"content");
			for (i = 0; i < contentKey.length; i++) {
				var parent = contentKey[i]; //start with the key element
				if (YAHOO.Tools.trim(contentKey[i].innerHTML) == "") {
					while (parent.className.indexOf("contentShow") == -1 ) {
						if (parent.id == "content")
							return; //don't go any higher than the content div
						parent = parent.parentNode; //if necessary, test parentNodes until the show/hide element is found
					}
					$D.replaceClass(parent,"contentShow","contentHide");
				}
			}
		}
	};
}();

/*	pass the namespace object as scope, then pass true to use 'this' scope within namespace */
YAHOO.util.Event.onDOMReady(YAHOO.ebauer.contentToggle.init);