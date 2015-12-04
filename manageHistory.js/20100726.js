var pplBookmarkedState = YAHOO.util.History.getBookmarkedState( "ppl" );
var pplInitialState = pplBookmarkedState || "pplDefaultState";
YAHOO.util.History.register("ppl", pplInitialState, pplStateChangeHandler);

function pplStateChangeHandler( state , bookmark ) {
	var pplCurrentState = YAHOO.util.History.getCurrentState( "ppl" );
	if(state != "pplDefaultState") {
		eval("var holder="+ unescape(state));
        if(holder.type == "hide") {
			YAHOO.ebauer.layerbox.hideLayerworker();
        }
		else if(holder.type == "transition") {
			ensembleId = holder.ensembleId;
			categoryId = holder.categoryId;
			colorId = holder.colorId;
			//Added for BUG963
			imageName = holder.imageName;
			imageTypeCode = holder.imageTypeCode;
			pathInfo = holder.pathInfo;
			catPath = holder.catPath;
			cs = holder.cs;
			productVariantId = holder.productVariantId;
			if (bookmark) {
				if(YAHOO.ebauer.layerbox.modal)
					YAHOO.ebauer.layerbox.transitionworker(holder.formatStr,holder.passedIdObj);
				else{
					YAHOO.ebauer.layerbox.onLayerInit.subscribe( function() {
						YAHOO.ebauer.layerbox.transitionworker(holder.formatStr,holder.passedIdObj);
					});
				}
			} else {
				YAHOO.ebauer.layerbox.transitionworker(holder.formatStr,holder.passedIdObj);
			}
		}
        else if (!YAHOO.ebauer.utilities.isHistoryNeeded(holder.type.toString())) {
            var HistoryHref;
            var destHref;
            destHref = GetCookie("DESTINATION_URL");
            if (destHref != null) {
                if (destHref.toString().indexOf('/checkout/bag.jsp') > 0) {
                    ensembleId = holder.ensembleId;
                    DelCookie("DESTINATION_URL");
                    YAHOO.ebauer.layerbox.transition('product', {'ensembleId':ensembleId});
                }
            }
        }
    }
	else
		YAHOO.ebauer.layerbox.hideLayerworker();
}

YAHOO.util.History.onLoadEvent.subscribe( function() {
	canLoadLayer = true;
	var pplCurrentState = YAHOO.util.History.getCurrentState( "ppl" );
	if(YAHOO.util.History.getBookmarkedState("ppl") != null)
		pplStateChangeHandler(YAHOO.util.History.getBookmarkedState("ppl"),true);
});

var blankPath = getBaseURL()+"/blank.jsp";
var bodyTag = YAHOO.util.Dom.getAncestorByTagName("above","BODY");
var histField = createDOM('input', {'type':'hidden','name':'yui-history-field','id':'yui-history-field','value':''});
var histFrame = createDOM('iframe', {'id':'yui-history-iframe','src':blankPath, 'style':'display:none'});
bodyTag.appendChild(histField);
bodyTag.appendChild(histFrame);

YAHOO.util.History.initialize(histField,histFrame);