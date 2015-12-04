/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~

Project: Remediation
Article: Fundamental Line Nav Control

Comment: Expects Yahoo Framework
Assured: IE6/7, Firefox, Safari, Opera
Pending: Allow another nav scope (for reset)

Version: 2007.12.07
Revisor: Jim Scopacasa
Revised: added function to set the searchbox helper text

Version: 2007.09.10
Revisor: Peter Sylwester
Revised: syncSubline()

Version: 2007.06.05
Revisor: Peter Sylwester
Revised: wrote

-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

if ( !YAHOO.ebauer ) { YAHOO.namespace('ebauer'); }

/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~

The stickyClick method provides tactile feedback of UL navs
by synchronizing 'hot' and 'not' classifications upon click.

Via event delegation, the parent UL hosts the listener,
and the event target is reassigned the 'hot' classification.

-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

YAHOO.ebauer.navigate = function() {

/*	escape if less than ideal environment */
	if(!document.getElementById){ return; }

/*	_______
//	PRIVATE
*/

/*	establish shortcuts to YAHOO */
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;
	var $ = $D.get;

	var scopeEle;
	var eventEle;
	var killEvent = false;

	var stickyClick = function(e) {

	/*	TO SYNC HOT-NOT CLASS ORIENTATION UPON CLICK
	//	IN ANTICIPATION OF A PAGE LOCATION CHANGE.
	//	ASSUMES UL NAV WITH HOT-NOT CLASSIFIED LI ITEMS. */

		if (killEvent) { $E.stopEvent(e); }

		scopeEle = this.getElementsByTagName('LI');
		$D.replaceClass(scopeEle,'hot','not');

		eventEle = $E.getTarget(e);

		while (eventEle.id != this.id) {

			if(eventEle.nodeName.toUpperCase() == 'LI') {

			/*	console.log('clicked: '+eventEle.firstChild.firstChild.nodeValue); */

				$D.replaceClass(eventEle,'not','hot');

				break;

			} else {

				eventEle = eventEle.parentNode;
			}
		}
	};

	var syncSubline = function(searchString) {

		var line = $D.getElementsBy
			(
				function(el){return(el && el.getAttribute('HREF') && el.getAttribute('HREF').indexOf(searchString)>-1 );}
				,'A'
				,'line'
			);

		var subline = $D.getElementsBy
			(
				function(el){return(el && el.getAttribute('HREF') && el.getAttribute('HREF').indexOf(searchString)>-1);}
				,'A'
				,'rail'
			);

		if (line.length && subline.length){

			$D.replaceClass(line[0].parentNode,'not','hot');
		}
	};

/*	______
//	PUBLIC
*/
	return {

		init : function() {

		/*	(parentElement,eventListener,method,scopeThis?) */

			$E.on( 'line', 'click', stickyClick, true );
			$E.on( 'cats', 'click', stickyClick, true );

			syncSubline('Shoes');
		}
	};
}();

/*	pass the namespace object as scope, then pass true to use 'this' scope within namespace */
YAHOO.util.Event.on(window, 'load', YAHOO.ebauer.navigate.init, YAHOO.ebauer.navigate, true);