/*-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
Article: Product Image (canvas) Controls
Primarily for the control of main Product Layer-Page Image.
Includes API for image swap, zoom and interactions.

Comment: Expects Yahoo Framework
Assured: IE6/7, Firefox, Safari

Version: 2010.07.27
Revisor: Keith Childers
-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~ */

if ( !YAHOO.ebauer ) { YAHOO.namespace('ebauer'); }

YAHOO.ebauer.canvas = function() {

/* PRIVATE */

/* establish shortcuts to YAHOO */
	var $E = YAHOO.util.Event;
	var $D = YAHOO.util.Dom;
	var $l = YAHOO.lang;
	var $  = $D.get;

	var displayElement;	/* reference to the image Dom element */
	var imgUrlString = '';
	
	//	zoomStatus =-1 = we are zoomed all the way out
	//	zoomStatus = 0 = we can zoom both in and out
	//	zoomStatus = 1 = we are zoomed all the way in
	//	zoomStatus = 2 || null = eliminate the zoom controls
	var zoomStatus = 0;

	var flash = false;	/* boolean, true if Flash is in use */
	var delay = 0; /* the timeout Id */
	var timesOut = 3; /* checks for Flash element insertion */

	var setFlash = function() {
		if(displayElement.setImage)
			displayElement.setImage(imgUrlString);
		else
			setDHTML();
	};

	var setDHTML = function() {
		clearTimeout(delay);
		var el = displayElement || $('prodImage') || null;
        if (el) {
            $D.addClass('zoomControls','ignore1');
            var h = $D.getY('dash')-$D.getY('canvas');
            el.src = imgUrlString+'&hei='+Math.round(h);           
        }
        //TODO set background spinner
        //$D.setStyle('prodImageContainer','display','none'); // hide flash
        $D.setStyle('prodImageContainerPrint','display','block'); //show images
        
        
    };

	var zoomFlash = function(way) {
		if(displayElement.setZoom)
			displayElement.setZoom(way);
		else
			alert('error in zoomFlash(): flash not loaded');
	};

/*  ______
//  PUBLIC
*/
    return {

		onCanvasInit : new YAHOO.util.CustomEvent('onCanvasInit'),

		getImageElement : function() {
            if ( !flash )
            	this.init(); 
            return displayElement;
        },

        setImage : function(_imgUrlString) {
			imgUrlString = _imgUrlString;
	        if (flash)
	             setFlash();
	        else
	             setDHTML();
		},

		zoomImage : function(z) {
			if (zoomStatus > 1)
				return;
			var way = $l.isUndefined(z) ? 1 : parseInt(z);
			cmCreateManualLinkClickTag('YAHOO.ebauer.canvas.zoomImage('+way+')','Zoom Controls');
			if (flash)
				zoomFlash(way);
		},

		getCanvasDim : function() {
		/*  this is public for remote Flash access (ExternalInterface) */
			var x = Math.round($D.getX('canvas'));
            var y = Math.round($D.getY('canvas'));
            var w = Math.round($D.getX('palette')-x);
			var h = Math.round($D.getY('dash')-y);

            var rgn = $D.getRegion('canvasControls');
            var ccw = Math.round(rgn.right-rgn.left);
            var cch = Math.round(rgn.bottom-rgn.top);

            return [w,h,ccw,cch];
		},

        setViewRectangle : function(w,h) { /* reserved for Manager : Image Tools */ },

        syncZoomControls : function(condition) {
		/*  this is public for remote Flash access (ExternalInterface) */
            var zoomControls = $('zoomControls');
            if(!zoomControls)
            	return;
            var zoomDD = zoomControls.getElementsByTagName('DD');
            if (zoomDD.length < 2) {
            	$D.addClass('zoomControls','ignore'); 
            	return; 
            }
			
			zoomStatus = condition ? parseInt(condition) : 2;
			//TODO zoom controls for flash
			switch (zoomStatus) {

				case -1 :

				/*  we are zoomed all the way out */
					$D.setStyle('instructions','display','none');
					$D.removeClass('zoomControls','disable');
					$D.replaceClass(zoomDD[0],'hot','not');
					$D.replaceClass(zoomDD[1],'not','hot');
					break;

				case  0 :

				/*  we are able to zoom in AND out */
					$D.setStyle('instructions','display','block');
					$D.removeClass('zoomControls','disable');
					$D.replaceClass(zoomDD[0],'hot','not');
					$D.replaceClass(zoomDD[1],'hot','not');
					break;

				case  1 :

				/*  we are zoomed all the way in */
					$D.setStyle('instructions','display','block');
					$D.removeClass('zoomControls','disable');
					$D.replaceClass(zoomDD[0],'not','hot');
					$D.replaceClass(zoomDD[1],'hot','not');
					break;

				default :

				/*  we are NOT able to zoom in or out */
					$D.setStyle('instructions','display','none');
					$D.addClass('zoomControls','disable');
			}
		},

		init : function() {
            timesOut = 3;
            delay = setTimeout(this.config,500);
        },

        config : function() {
            var canvasImageEl = $('prodImageContainer');
            flash = $D.hasClass('prodImageContainer','flash');
            clearTimeout(delay);
            if ( flash ){
				displayElement = canvasImageEl;
            } else if (timesOut > 0){
				timesOut--;
				delay = setTimeout(YAHOO.ebauer.canvas.config,500);
            } else {
				flash = false;
                displayElement = $('prodImage');
				YAHOO.ebauer.canvas.syncZoomControls();
			}
			YAHOO.ebauer.canvas.onCanvasInit.fire();
       }

    };
}();