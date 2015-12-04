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

	$j('body.DELIVERY--EXTRAS #deliveryOptions').prepend('<div id="promoLink">Have a Promotion Code? <a href="#pc">Add it to your order now.</a></div>')
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