/* Tooltips methods */
global.jquery.utils.tooltips = new Object({
	init : function() {
		/* Make sure floatbox is available for the product layer */
		if(fb){
			fb.activateElements();
		}
		$j('.toolTip').live("click", function(event) {
			event.preventDefault(); // disable click event
		});
		$j('.toolTip').hover(
			function() {
				this.contentHref = $j(this).attr("name");
				$j(this).addClass('over');
				var contentOffset = $j(this).position();
				var contentXpos = contentOffset.left;
				var contentYpos = contentOffset.top;		
				this.contentOverlay = '#overlay_' + this.contentHref;					
				$j(this).append(
					'<div id="ToolTipOverlay" class="toolTipWrapper">'		
					+'</div>'
				);		
				var toolTipHTML = $j(this.contentOverlay).html();
				$j('#ToolTipOverlay').html( toolTipHTML );
				$j('#ToolTipOverlay').css({left: contentXpos, top: contentYpos+15});		
				$j('.toolTipWrapper').fadeIn(300);
				
			},
			function() {
				$j('.toolTipWrapper').fadeOut(100);				
				$j(this).removeClass('over');
				$j(this).children().remove();
			}
		);
	}
});
