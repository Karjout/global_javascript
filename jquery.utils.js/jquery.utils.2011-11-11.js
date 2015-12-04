var $j = jQuery.noConflict(); //module reference to jquery

var global = new Object();
global.jquery = new Object();
global.jquery.utils = new Object();

global.jquery.utils.initialized = false;

global.jquery.utils.init = function() {
	if (!global.jquery.utils.initialized) {
		global.jquery.utils.initialized = true;
		global.jquery.utils.common.init();
		global.jquery.utils.customerService.init();
		global.jquery.utils.search.init();
		global.jquery.utils.products.init();
	}
};

$j(document).ready(function(){
	if ($j.browser == 'msie')
		setTimeout('global.jquery.utils.init()',300);
	else
		global.jquery.utils.init();
	$j("#deliveryWaysText").tabs();
	$j("a[href='"+ window.location.hash+"']").click();
	
	// promo code link on delivery options page
	$j('body.DELIVERY--EXTRAS #deliveryOptions').append('<a name="promoTitle"></a>');
	$j('body.DELIVERY--EXTRAS #deliveryOptions').prepend('<a id="promoLink" href="#promoTitle"></a>');
	// add 'remove' class to remove link for styling
	$j('.promotion_codes dd a:contains("Remove")').addClass('remove');
	
	// remove image when promo code is entered
	if ($j('.promotion_codes dd a').hasClass('remove')){
        $j('#promotionCodes').find('#promoCodeMessage').css('height','60px');
	}
	
	// add space on 'wishlist' login between 'password:' and '(case sensative)
	if ($j('span').hasClass('hintText')){
		$j('.hintText').css('margin-left','5px;')
		
	}
});

//if ($j.fn.hashchange) {
//	$j.fn.hashchange.src = '/blank.jsp';
//	$j.fn.hashchange.domain = document.domain;
//}

/* IE6 add roll overs to category cells	*/
$j('body.IE6 .cell .poseDiv a.pose, body.IE7 .cell .poseDiv a.pose').live('mouseover mouseout', function() {
	var main = $j(this).children('img.main');
	var rollover = $j(this).children('img.rollover');
	if (event.type == 'mouseover' && rollover.length) {
		main.hide();
		rollover.show();
	} else if (event.type == 'mouseout' && rollover.length) {
		main.show();
		rollover.hide();
	}
});

$j("#continue_pay #payNow").live('click', function(){
	if($j("form[name='paymentForm']").validate()){		
		submitPaymentForm(); 
	}	
});

//history management tab script
$j("#mgmdatatoggle #preview_button #inner_preview_button").button( "destroy" );