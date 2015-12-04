// Drop Ship

/*function displayDropShipDetails(triggerEle) {
	var moveLeft = -40;
	var moveDown = 10;
	var $trigger = jQuery(triggerEle);
	var triggerPos = $trigger.offset();
	if (jQuery('body').hasClass('STANDALONE-PRODUCT-PAGE')) {
		var detailMessageWidth = triggerPos.left
				- (jQuery('div#drop_ship_item_restricted_shipping_details_src')
						.width() / 2);
		jQuery('div#drop_ship_item_restricted_shipping_details_src').css({
			"top" : (triggerPos.top + $trigger.height() + 5),
			"left" : detailMessageWidth
		}).show();
	} else {
		var detailMessageWidth = 
		 (jQuery('div#drop_ship_item_restricted_shipping_details_src')
				.width()/2 );
		jQuery('div#drop_ship_item_restricted_shipping_details').css({		
			"top" : (triggerPos.top + $trigger.height() - 200),
			"left" : detailMessageWidth
		}).show();
	}
	jQuery(triggerEle).click(function(event) {
		event.stopPropagation();
	});
}
function hideDropShipDetails() {
	if (jQuery('body').hasClass('STANDALONE-PRODUCT-PAGE')) {
		jQuery('div#drop_ship_item_restricted_shipping_details_src').hide();
	} else {
		jQuery('div#drop_ship_item_restricted_shipping_details').hide();
	}
}*/

/*	*********************************************************************************************************
 * 
 * 	01/11/2013 - OLD CODE FOR DROPSHIP ON CHECKOUT IS ABOVE.
 * 	NEW JQUERY FOR BAG.JS (CHECKOUT) PAGE IS BELOW.
 * 	USED WITH PAGE CONTENT IN CATALOG OF ALL PLACES. HERE'S HOW TO GET THERE TO EDIT IF NEED BE.
 * 	SITE SECTIONS :CATALOG :PRODUCT PAGE :DROP SHIP ITEM - RESTRICTED SHIPPING MESSAGE :CONTENT (02/08/2012):
 * 
 * 	*********************************************************************************************************/

jQuery(document).ready(function () {
	
	if (jQuery('body#cat27411.EB').length > 0) {
		jQuery('.toolTip').hover(function() {
			this.contentHref = jQuery(this).attr("href");
			jQuery(this).addClass('over');
			var contentOffset = jQuery(this).position();
			var contentXpos = contentOffset.left;
			var contentYpos = contentOffset.top;
			this.contentOverlay = '#overlay_' + this.contentHref.replace('#','');
			if (jQuery(this).attr('href') == "#DropShip") {
				jQuery(this).append(
						'<div id="ToolTipOverlay" class="toolTipWrapper" style="z-index:9999;position:relative;">'		
						+'</div>'
					);
			} else {
				jQuery(this).append(
					'<div id="ToolTipOverlay" class="toolTipWrapper" style="z-index:9999;width:250px">'		
					+'</div>'
				);
			}
			if (jQuery(this).attr('href') == "#DropShip") {
				jQuery('#ToolTipOverlay').html( jQuery(this.contentOverlay).html() );
				if (PPL) {
					jQuery('#ToolTipOverlay').css({marginLeft: contentXpos-40, marginTop: contentYpos-268, width: 320});
				} else {
					jQuery('#ToolTipOverlay').css({marginLeft: contentXpos-120, marginTop: contentYpos-124, width: 320});
					jQuery('#footer .footer_content_spacer').css('display', 'none');
				}
				jQuery('.toolTipWrapper').fadeIn(300);
			} else {
				jQuery('#ToolTipOverlay').html( jQuery(this.contentOverlay).html() );
				if (contentXpos > 100 && contentXpos < 120) {
					jQuery('#ToolTipOverlay').css({left: contentXpos-100, top: contentYpos+15});
				} else if (contentXpos > 120 && contentXpos < 130) {
					jQuery('#ToolTipOverlay').css({left: contentXpos-110, top: contentYpos+15});
				} else if (contentXpos > 130 && contentXpos < 150) {
					jQuery('#ToolTipOverlay').css({left: contentXpos-130, top: contentYpos+15});
				} else if (contentXpos > 150) {
					jQuery('#ToolTipOverlay').css({left: contentXpos-150, top: contentYpos+15});
				} else {
					jQuery('#ToolTipOverlay').css({left: contentXpos, top: contentYpos+15});
				}
				jQuery('.toolTipWrapper').fadeIn(300);
				jQuery('div#ToolTipOverlay').next().remove();
			}
		},function() {
			jQuery('.toolTipWrapper').fadeOut(100);
			jQuery(this).removeClass('over');
			jQuery(this).children().remove();
			jQuery('#footer .footer_content_spacer').css('display', 'block');
		});
		var itemDataTitles = [];
		var itemDataNumbers = [];
		if (jQuery('.column2 .wrap .itemNumber span').length > 0) {
        	jQuery('.productOptions .size').find('.text').each(function (i, value) {
        		var result = '';
        		var str = jQuery(this).html();
        		var n = str.indexOf(',');
        		result = str.substring(n + 1);
        		itemDataTitles.push(result.trim());
        	});
        	var titleValue = jQuery(itemDataTitles).map(function(index, title) {
        		return title;
        	});
        	jQuery('.itemNumber').find('span').each(function(i, text) {
        		titleValue;
        		titleValue[i] === '' ? titleValue[i] = 'One Size' : '';
        		var eachNumber = jQuery(this).text();
    			var allNumbers = eachNumber.replace(/^i/, 'I').split(/#/).join('\xa0#\xa0:');
    			jQuery(this).replaceWith(titleValue[i] + ' ' + allNumbers);  
        	});
    	}
		jQuery.fn.disable = function() {
			return this.replaceWith( '<a href="javascript:internationalDelivery(' + 40 + ');">International Delivery Information</a>' );
		}
		jQuery.fn.disableDeliverFAQ = function() {
			return this.replaceWith( '<a href="javascript:deliverySix(' + 6 + ');">Delivery</a>' );
		}
		
		var browser = navigator.userAgent;
		var isIE9 = (browser.indexOf( 'MSIE 9' ) !== -1) ? true : false;
        if (isIE9) {
        	jQuery(window).load(function() {
        		jQuery.fn.disable = function() {
        			return this.replaceWith( '<a href="javascript:internationalDelivery(' + 40 + ');">International Delivery Information</a>' );
        		}
        		jQuery.fn.disableDeliverFAQ = function() {
        			return this.replaceWith( '<a href="javascript:deliverySix(' + 6 + ');">Delivery</a>' );
        		}
            	var deliverSix = jQuery('#orderSummary #delivery .label a');
        		var deliver = jQuery('.international .container .note a');
            	var ship = jQuery('body.CHECKOUT #middle #deliveryOptions #shipTo a');
            	deliverSix.disableDeliverFAQ();
            	ship.disable();
            	deliver.disable();
        	});
        } else {
        	var deliverSix = jQuery('#orderSummary #delivery .label a');
        	var deliver = jQuery('.international .container .note a');
        	var ship = jQuery('body.CHECKOUT #middle #deliveryOptions #shipTo a');
        	deliverSix.disableDeliverFAQ();
        	ship.disable();
    		deliver.disable();
        }
        deliverySix = function(section) {
        	var faqId = section;
			fb.start('/assets/html/modalContent/faq/faq_' + faqId + '.html', 'type:ajax height:460 width:500 autoFitHTML:true scrolling:no outerClose:true controlsPos:tr');
        }
		internationalDelivery = function(section) {			
			var faqId = section;
			fb.start('/assets/html/modalContent/faq/faq_' + faqId + '.html', 'type:ajax height:460 width:472 autoFitHTML:true scrolling:no outerClose:true controlsPos:tr');
		}
	}
});