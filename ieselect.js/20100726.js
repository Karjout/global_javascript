/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
Article: IE Select Width Fix

Comment: Expand Width of Select-Options in IE
Assured: Firefox, IE 6/7, Safari, Opera
Pending: Accommodate keyboard-tab-focus

Version: 2007.08.01
Revisor: Peter Sylwester
Revised: Now uses min-width to store revert

-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

if ( !YAHOO.ebauer ) { YAHOO.namespace("ebauer"); }

/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~

	A FIX FOR THE FIXED-WIDTH SELECT-OPTION IN IE.
	THESE ARE THE REQUIRED CSS STYLES:

	select.expando
		{
		position: relative;
		width: 100%;
		}

	select.expanded
		{
		position: absolute;
		width: 200px !important;
		}

-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

YAHOO.ebauer.ieselect = function() {

/*	escape if less than ideal environment */
	if(!document.getElementById){ return; }
/*	_______
//	PRIVATE
*/

/*	establish shortcuts to YAHOO */
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;
	var $ = $D.get;

	var calculateOptionWidth = true; /* false relies on class styles */
	var originalWidth = '';

	var expand = function(e) {
		$E.stopEvent(e);
		var el = $E.getTarget(e);

	/*	IMPORTANT!

		If making just a class change (expando-to-expanded)
		then a class with a fixed-pixel width value works.

		However, if options have an unpredictable width
		then it might be necessary to calculate a width value.

		The routine below finds the longest option text
		and then multiplies that by 6 to guess an acceptable width.
	*/
		if ( calculateOptionWidth )
		{
			var maxChars = 20;
			var newWidth = 0;
			var oldWidth = $D.getStyle(el,'width');

			var opts = el.getElementsByTagName('OPTION');
			for ( var i = 0; i < opts.length; i++ ){
				maxChars = Math.max(maxChars,opts[i].firstChild.length);
			}
			newWidth = Math.ceil(maxChars*6);
            if (parseFloat(oldWidth) < newWidth) {
				$D.setStyle(el,'width',newWidth+'px');
			}
		} else {
			$D.replaceClass(el,'expando','expanded');
		}
		/*	addresses IE6 focus issues */
		$E.on( 'container', 'mouseover', contract, el );
		$E.on( el, 'blur', contract, el );
	};

	var contract = function(e,remote) {
		$E.stopEvent(e);
		var el = remote || $E.getTarget(e);
		/*	addresses IE6 focus issues */
		$E.removeListener( 'container', 'mouseover', contract );
		$E.removeListener( el, 'blur', contract );

		if ( calculateOptionWidth ) {
			$D.setStyle(el,'width','');
		} else {
			$D.replaceClass(el,'expanded','expando');
		}
	};
	/*	______
	//	PUBLIC
	*/
	return {
		init : function() {
			if ( navigator.userAgent.indexOf("MSIE") < 0 ){
			/*	if !IE don't bother */
				return;
			}
			var selects = $D.getElementsBy(function(el){ return $D.hasClass(el,'expando'); } ,'SELECT' ,'dash');
			$E.on( selects, 'mouseover', expand );
		/*	IMPORTANT!
		//	Keyboard-focus and accessibility should also be accommodated.
		*/
		}
	};
}();

/*	pass the namespace object as scope, then pass true to use 'this' scope within namespace */
//YAHOO.util.Event.onContentReady('dash', YAHOO.ebauer.ieselect.init, YAHOO.ebauer.ieselect, true);