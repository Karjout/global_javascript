/* Tooltips methods */
global.jquery.utils.tooltips = new Object({
    init: function () {
        jQuery('.toolTip').live("click", function (event) {
            event.preventDefault(); // disable click event
        });
        jQuery('.toolTip').hover(
			function () {
			    this.contentHref = jQuery(this).attr("href");
			    jQuery(this).addClass('over');
			    var contentOffset = jQuery(this).position();
			    var contentXpos = contentOffset.left;
			    var contentYpos = contentOffset.top;
			    this.contentOverlay = '#overlay_' + this.contentHref.replace('#', '');
			    jQuery(this).append(
					'<div id="ToolTipOverlay" class="toolTipWrapper">'
					+ '</div>'
				);
			    jQuery('#ToolTipOverlay').html( jQuery(this.contentOverlay).html() );
				jQuery('#ToolTipOverlay').css({left: contentXpos, top: contentYpos+15});		
				jQuery('.toolTipWrapper').fadeIn(300);
			},
			function () {
			    jQuery('.toolTipWrapper').fadeOut(100);
			    jQuery(this).removeClass('over');
			    jQuery(this).children().remove();
			}
		);
    }
});
