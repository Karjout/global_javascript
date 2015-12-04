/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
Article: Footer

Comment: Hides structural elements if there is no content entered in site manager
Assured: Firefox, IE 6/7, Safari, Opera
Pending:

Version: 2007.09.10
Revisor: Jim Scopacasa

-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

if ( !YAHOO.ebauer ) { YAHOO.namespace("ebauer"); }

YAHOO.ebauer.footer = function() {

/*	escape if less than ideal environment */
	if(!document.getElementById){ return; }
/*	_______
//	PRIVATE
*/

/*	establish shortcuts to YAHOO */
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;
	var $ = $D.get;

	var locator = new YAHOO.widget.Overlay("locator-over", {width: "220px", visible: false, zIndex: 903 });
	var quickOrder = new YAHOO.widget.Overlay("eob-over", {width: "220px",visible: false, zIndex: 903 });
	var manager = new YAHOO.widget.OverlayManager();

	/*	______
	//	PUBLIC
	*/
	return {
		init : function() {
			// Instantiate the Locator Overlay
			locator = new YAHOO.widget.Overlay("locator-over", {width: "220px", visible: false, zIndex: 903 });
			locator.cfg.setProperty("context", ["locatorLink", "bl", "tl"]);
			locator.render();

			// Instantiate the EOB/Catalog Quick Order Overlay
			//quickOrder = new YAHOO.widget.Overlay("eob-over", {width: "220px",visible: false, zIndex: 903 });
			quickOrder.cfg.setProperty("context", ["eobLink", "bl", "tl"]);
			quickOrder.render();

			//YAHOO.footer.manager = new YAHOO.widget.OverlayManager();
			manager.register([locator,quickOrder]);

			$E.addListener("locatorLink", "click", YAHOO.ebauer.footer.onLocatorclick);
			$E.addListener("eobLink", "click", YAHOO.ebauer.footer.onEOBclick);
		},

		onEOBclick : function() {
			quickOrder.show();
			$E.addListener("eobClose", "click", quickOrder.hide, quickOrder, true);
			$E.addListener(document, "mousedown", YAHOO.ebauer.footer.onDocumentMouseDown, null, true );
		},

		onLocatorclick : function() {
			locator.show();
			document.forms['store_query'].Footertxtpostalcode.focus(); //To get focus on the input text
			$E.addListener("locatorClose", "click", locator.hide, locator, true);
			$E.addListener(document, "mousedown", YAHOO.ebauer.footer.onDocumentMouseDown, null, true );
		},

		onDocumentMouseDown : function() {
			if (manager.getActive() == null) {
				manager.hideAll();
				$E.removeListener(document, "mousedown" );
			}
			manager.blurAll();
		}
	};
}();

YAHOO.util.Event.onDOMReady(YAHOO.ebauer.footer.init);