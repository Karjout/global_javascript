/* Common methods */
global.jquery.utils.common = new Object({
	verisignPopUp : function(){		
		$j('.veriSignLogo, .veriSignLogoSmall, .veriSignLogoLarge, .veriSignLogoSmallest').live('click', function(e) {
			openWindow("https://sealinfo.verisign.com/splash?form_file=fdf/splash.fdf&dn=www.eddiebauer.com&lang=en", "530", "460", "yes", "no");
			return false;
		});
	},
	consoleLog : function(text) {
		// this will leave all of the newwest content at the bottom
		$j('<p>'+text+'</p>').appendTo('#console_log');
	},
	assignButtons : function(context) {
		// uses context to narrow the scope of the jquery-ui buttonization
		// making sure value of context is not null but '' ensuring following selectors work
		context = (context) ? context : ""; 

		var selector = context + ' .button, .buttonActive, .buttonInactive';
		$j(selector).button();
		$j(context + ' .button.wishlist_print_list').button({
				icons: {
					primary: '/assets/ocp/icons/printer_icon.gif'
				}
		});
	},
	assignLayerButtons : function() {
		var buttonsPresent = $j('#layerbox').filter(':button.ui-button');
		// checking to see if the buttons are present
		
		if(buttonsPresent.length == 0){
			// if buttons not present to be buttonified then try three times
			
				var delay = 300;
				setTimeout(global.jquery.utils.common.assignButtons, delay);

		} else{
			global.jquery.utils.common.assignButtons();
		}
		
	},
	isFA : function() {
		return ($j('body').hasClass('FA') > 0);
	},
	isCustomerServicePage : function() {
		isCSP = false;
		if( $j('body').hasClass('CUSTOMER-SERVICE').length > 0 || $j('body').find('.rightColumn').length > 0 )
			isCSP = true;
		return isCSP;
	},
	isSearchPage : function() {
		var isSP = false;
		if($j('body').hasClass('SEARCH').length > 0 || $j('body').find('.searchBody').length > 0)
			isSP = true;
		return isSP;
	},
	setCustomerServicePage : function() {
		$j('body').addClass('CUSTOMER-SERVICE');
	},
	applyCarouselBehavior : function() {
		var submessageInited = false;
		function animateSubmessage(carousel) {
//			if (!submessageInited) {
//				var p = $j.jcarousel.intval(carousel.visible);
//				carousel.scroll(p);
				submessageInited = true;
//			}
			return false;
		};
		function setAuto(carousel) {
		    carousel.buttonNext.bind('click', function() {
		        carousel.startAuto(0);
		    });
		    carousel.buttonPrev.bind('click', function() {
		        carousel.startAuto(0);
		    });
		    carousel.clip.hover(function() {
		        carousel.stopAuto();
		    }, function() {
		        carousel.startAuto();
		    });
		    return false;
		};
		// use jcarousel for all ul tags with class submessage
		$j("ul.submessage").jcarousel({visible:3,scroll:3,auto:5,wrap:'circular',itemLoadCallback:animateSubmessage,initCallback:setAuto});
		// use jcarousel for all ul tags with class firstascent-submessage
		$j("ul.firstascent-submessage").jcarousel({visible:4,scroll:4,auto:5,wrap:'circular',itemLoadCallback:animateSubmessage,initCallback:setAuto});
	},
	applySlideshowBehavior : function() {
		// use slideshow for all div tags with class slidshow
		$j("div.slideshow").slideshow();
	},
	useFancyboxforAllPopUps : function() {
		// apply basic fancybox module behavior to all floatbox rel anchors
		$j("a[rel='floatbox'], area[rel='floatbox'], a.floatbox, area.floatbox").each(function(){
			global.jquery.utils.common.emulateFloatbox(this);
		});
		// apply basic fancybox module behavior to new generic fb class anchors
		$j("a[rel='fb'], area[rel='fb'], a.fb, area.fb").live('click',function(){
			return global.jquery.utils.common.doFancyboxApiCall(this);
		});
	},
	doFancyboxApiCall : function(e) {
		var cLog = global.jquery.utils.common.consoleLog;
		var href = $j(e).attr("href");
		if (href.indexOf("#"))
			href = "#" + href.split("#")[1];
		var defaults = {
			href:href,
			titleShow:false,
			autoDimensions:false,
			autoScale:false,
			showNavArrows:false,
			cyclic:true,
			showCloseButton:true,
			scrolling:'no',
			closeButtonClass:'fbOrangeCloseButton',
			leftArrowClass:'fbLeftArrow',
			rightArrowClass:'fbRightArrow',
			closeButtonTop:'',
			closeButtonRight:''
		};
		var params = global.jquery.utils.common.getFancyboxParams(e,defaults);
		$j.fancybox(params);
		return false;
	},
	emulateFloatbox : function(e,p) {
		var cLog = global.jquery.utils.common.consoleLog;
		var defaults = {
			titleShow:false,
			autoDimensions:true,
			autoScale:false,
			showNavArrows:false,
			cyclic:true,
			showCloseButton:true,
			scrolling:'no',
			closeButtonClass:'fbOrangeCloseButton',
			leftArrowClass:'fbLeftArrow',
			rightArrowClass:'fbRightArrow',
			closeButtonTop:'',
			closeButtonRight:''
		};
		var params = global.jquery.utils.common.getFancyboxParams(e,defaults);
		$j(e).fancybox(params);
	},
	getFancyboxParams : function(e,p) {
		var cLog = global.jquery.utils.common.consoleLog;
		var rev = new Object();
		var params = new Object();
		for( var param in p )
			params[param] = p[param];
		try {
			var raw = $j(e).attr('rev');
			var revArray = new Array();
			revArray = raw.split(" ");
			for (var r in revArray) {
				rev[revArray[r].split(':')[0]] = revArray[r].split(':')[1];
			}
		} catch(err) {
			cLog('Error: ' + err.message);
		}
		try {
			for( var r in rev ) {
				if ( r == 'overlayOpacity' )
					params[r] = Number(rev[r])/100;
				else if ( r == 'width' || r == 'height' || r == 'padding' || r == 'margin' )
					params[r] = Number(rev[r]);
				else if ( r == 'showCloseButton' || r == 'showNavArrows' || r == 'centerOnScroll' || r == 'cyclic' || r == 'autoDimensions' || r == 'autoScale' || r == 'titleShow' )
					params[r] = Boolean(rev[r]);
				else if ( r == 'closeButtonClass' || r == 'leftArrowClass' || r == 'rightArrowClass' || r == 'scrolling' )
					params[r] = rev[r];
				else if ( r == 'closeButtonTop' || r == 'closeButtonRight' )
					params[r] = rev[r];
			}
		} catch(err) {
			cLog('Error: ' + err.message);
		}
		params.onStart = function() {
			// close button position variable
			var closeButtonPosition = '';
			if(params.closeButtonClass)
				$j('#fancybox-close').removeClass().addClass(params.closeButtonClass);
			if(params.leftArrowClass)
				$j('#fancybox-left').removeClass().addClass(params.leftArrowClass);
			if(params.rightArrowClass)
				$j('#fancybox-right').removeClass().addClass(params.rightArrowClass);
			if(params.closeButtonTop){
				closeButtonPosition += 'top:'+ parseInt(params.closeButtonTop) + 'px !important;'
				$j('#fancybox-close').css("cssText", closeButtonPosition);
			}
			if(params.closeButtonRight){
				closeButtonPosition += ' right:'+ parseInt(params.closeButtonRight) + 'px !important;'
				$j('#fancybox-close').css("cssText", closeButtonPosition);
			}
		};
		return params;
	},
	checkOut : function(){
		var zoomImageFlag = 'false';
		// Zoom
		jQuery('body.SHOPPING-BAG .zoomIcon').bind("mouseenter", function(event){				
			//get image src and size
			if(zoomImageFlag == 'false'){// animation not running go ahead and zoom image	
				zoomImageFlag = 'true'; //set flag true and start animation				
				var zoomImage = jQuery(this);
				jQuery('.zoomIcon').unbind(event);
				var position = zoomImage.offset();							
				imageTagert = jQuery(this).closest('div.item').find('.imageProduct');
				imageSrc = jQuery(imageTagert).attr('rel');							
				imagePosX = jQuery(imageTagert).offset().left-1;	
				imagePosY = jQuery(imageTagert).offset().top-1;
				imageWidth = jQuery(imageTagert).width();
				imageHeight = jQuery(imageTagert).height();						
				var zoomImageProduct = jQuery("<div class='zoomImageProduct'><img name='ZoomProduct' src='"+imageSrc+"'/></div>");	
				zoomImage.append(zoomImageProduct);		
				zoomImageHeight = zoomImageProduct.height();
				zoomImageWidth = zoomImageProduct.width();
				jQuery('.zoomImageProduct').css({height: 0+'px' , width: 0+'px'});
				jQuery('.zoomImageProduct').animate({ height: zoomImageHeight+'px' , width: zoomImageWidth+'px' , opacity: 1 },500, function(){		
					zoomImageFlag = 'false'; // reset flag	
					zoomImageProduct.bind("mouseleave", function(){								
						jQuery('.zoomImageProduct').dequeue().stop().animate({ height: "toggle" , width:"toggle", opacity: 0 },500, function(){
							jQuery('.zoomImageProduct').detach();
						});								
					});
				});				
			}	
			
		});	
	},
	init : function() {
		global.jquery.utils.common.assignButtons();
		global.jquery.utils.common.verisignPopUp();
		global.jquery.utils.common.useFancyboxforAllPopUps();
		global.jquery.utils.common.assignLayerButtons();
		global.jquery.utils.common.applyCarouselBehavior();
		global.jquery.utils.common.applySlideshowBehavior();
		global.jquery.utils.common.checkOut();
	}
});