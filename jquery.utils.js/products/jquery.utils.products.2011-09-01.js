/* Product module */
global.jquery.utils.products = function() {
	// private
	var ppr =  4; // product per row
	var count, loading, wrap, container, cells, breakers, billboard_19, billboard_34;	
	
	// row stacker
	var rowStack = function() {		
		var containerWidth = container.width();
		var rowStackWidth = 0;
		var rowStackCount = 1;
		var rowSperator = "<div class='rowSperator'></div>";
		
		cells.each(function(){			
			var el = $j(this);						
			var wid = el.width();
			
			if (rowStackCount > ppr){
				jQuery(rowSperator).insertAfter(el);
				rowStackCount = 1;
			}
			rowStackCount ++;
		});		
		
	};
	
	// public
	return {
		init : function() {
			billboard_19 = $j(".billboard_19");
			billboard_34 = $j(".billboard_34");			
			wrap = $j("#categoryContentWrapper");
			container = $j("#categoryContent");			
			breakers = "div.first_subcategory,div.subcategory_banner";					
			cells = container.children().not(breakers);
			count = cells.filter("div.cell,div.billboard").length;
			
			if (cells.filter("div.cell").length) {				
				rowStack();				
			} 
		}
	}
}();