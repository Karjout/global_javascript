// Global jquery Functions and Scripts

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

/* Common methods */
global.jquery.utils.common = new Object({
	verisignPopUp : function(){		
		$j('.veriSignLogo, .veriSignLogoSmall, .veriSignLogoLarge').live('click', function(e) {
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
		params.onClosed = function() {
			var closeButtonPosition = '';
			if(params.closeButtonClass)
				$j('#fancybox-close').removeClass(params.closeButtonClass);			
			if(params.leftArrowClass)
				$j('#fancybox-left').removeClass(params.leftArrowClass);
			if(params.rightArrowClass)
				$j('#fancybox-right').removeClass(params.rightArrowClass);
		};
		return params;
	},
	init : function() {
		global.jquery.utils.common.assignButtons();
		global.jquery.utils.common.verisignPopUp();
		global.jquery.utils.common.useFancyboxforAllPopUps();
		global.jquery.utils.common.assignLayerButtons();
		global.jquery.utils.common.applyCarouselBehavior();
		global.jquery.utils.common.applySlideshowBehavior();
	}
});

/* Tooltips methods */
global.jquery.utils.tooltips = new Object({
	init : function() {
		$j('.toolTip').live("click", function(event) {
			event.preventDefault(); // disable click event
		});
		$j('.toolTip').hover(
			function() {
				this.contentHref = $j(this).attr("href");
				$j(this).addClass('over');
				var contentOffset = $j(this).position();
				var contentXpos = contentOffset.left;
				var contentYpos = contentOffset.top;		
				this.contentOverlay = '#overlay_' + this.contentHref.replace('#','');		
				$j(this).append(
					'<div id="ToolTipOverlay" class="toolTipWrapper">'		
					+'</div>'
				);		
				$j('#ToolTipOverlay').html( $j(this.contentOverlay).html() );
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

/* Product module */ 
global.jquery.utils.products = new Object({
	lazyLoadInProgress : false,
	lazyLoadCells : [],
	lazyLoadInitCallback : function() {
		global.jquery.utils.products.lazyLoadScrollCallback();
		global.jquery.utils.products.rowStackManager("#billboard_wrapper");	
	},
	lazyLoadScrollCallback : function() {
		global.jquery.utils.products.lazyLoadCells = global.jquery.utils.products.lazyLoadCells.not(".cached");
	},
	getSizeOfTallest : function(eleList) {
		var sizeOfTallest = 0;
		$j(eleList).each(function() {
			var currHeight = $j(this).outerHeight();
			if(currHeight > sizeOfTallest) {
				sizeOfTallest = currHeight;
			}
		});
		return sizeOfTallest;
	},
	hasBgImage : function(ele) {
		// place holder
	},
	lazyLoad : function(cells,callback) {
		var cLog = global.jquery.utils.common.consoleLog;
		// setting view area to include row above row in current view
		if (global.jquery.utils.lazyLoadInProgress)
			return;
		else
			global.jquery.utils.lazyLoadInProgress = true;
		var bufferTop = cells.outerHeight(true) * 2;
		var bufferBottom = cells.outerHeight(true) * 2;
		var windowTop = $j(window).scrollTop() - bufferTop || 0;
		var windowBottom = $j(window).scrollTop() + $j(window).height() + bufferBottom;
		cells.each(function(){
			var el = $j(this);
			// getting top of image to see if it is in the viewable area of the page
			var imgTop = el.offset().top;
			if( imgTop > windowTop && imgTop < windowBottom ) {
				var dl = el.parent('dl.cell');
				var imgDiv = el.find('div.cmPoseImg');
				// attach rollover behavior				
				var defaultImageURL = imgDiv.attr('src');
				var rolloverImageURL = el.find("var").html() || defaultImageURL;
				// replacing all &amp; with &
				defaultImageURL = defaultImageURL.replace(/\&amp;/g,'&');
				rolloverImageURL = rolloverImageURL.replace(/\&amp;/g,'&');				
				var img = $j('<img src="'+defaultImageURL+'"></img>');
				imgDiv.replaceWith(img);
				if (defaultImageURL != rolloverImageURL) {
					el.css('background-image', "url('" + rolloverImageURL + "')");
					el.bind("mouseenter mouseleave", function(){
						img.toggleClass('invisible');
					});
				};
				dl.bind("mouseenter mouseleave", function(){
					dl.toggleClass('active');
				});
				el.addClass('cached');
			}
		});
		global.jquery.utils.lazyLoadInProgress = false;
		if (callback)
			callback.call();
	},
	rowStackManager : function(contextContainer, ignoreList) {
		var container, elmntsToIgnore , elmntsToIgnoreStr ="";
		
		// serves as a template of element positions to be ignored
		// comma delimited CSS selectors
		elmntsToIgnore = {
			'top'	: '',
			'right'	: '',
			'bottom': '',
			'left'	: '',
			'outsideTop' : '',
			'outsideBottom' : ''
		};

		var contextContainer = contextContainer || "#billboard_wrapper";
		container = $j(contextContainer);
			
		if(ignoreList) {
			// merging customized ignore list into ignore list template			
			for(item in ignoreList) {
				elmntsToIgnore[item] = ignoreList[item];
			}
		}
		else {
			elmntsToIgnore = {
				'top'	: 'div.first_subcategory',
				'right'	: '',
				'bottom': 'div.billboard_34',
				'left'	: '#subcat',
				'outsideTop' : 'div.paginator,div.billboard_19',
				'outsideBottom' : 'div.paginator'
			};
		}
		
		// constructing string of elements to remove from flow
		for(el in elmntsToIgnore) {
			if(elmntsToIgnore[el] != "")
			elmntsToIgnoreStr += elmntsToIgnore[el] + ' ';
		}
		elmntsToIgnoreStr = elmntsToIgnoreStr.replace(/\s$/,"").replace(/\s+/g, ', ');
		
		// before we can start rowStacking we need to clean up 'previous' rowStacker artifacts
		global.jquery.utils.products.cleanUpRowStackerArtifacts(container);
		
		var elementList = container.children(":visible").not(elmntsToIgnoreStr);
		var leftElHeight = $j(elmntsToIgnore.left).outerHeight();
		var topIgElHeight = $j(elmntsToIgnore.top).outerHeight();
			
		// making sure that there aren't any 'flowing' issues before rowStacking			
		if (leftElHeight == 0) {
			$j('<dl class="rowSeparator"></dl>').insertAfter(elmntsToIgnore.top);
		}
		
		if(leftElHeight > topIgElHeight) {
			// using the first dl.cell to set as the width of all cells on the page
			var prodCellWidth = elementList.filter('.cell:eq(0)').outerWidth(true);
			
			// this is the maximum width of the container
			var MAXWIDTH = container.outerWidth();
			
			// important to know because it will help figure out the container width of the first set of elements
			var prodCellsPerRow = Math.floor(MAXWIDTH / prodCellWidth);
			
			// getting tallest item of the first rowStackSubContainer 
			var tallestItem = global.jquery.utils.products.getSizeOfTallest(elementList.not('input').filter(':lt('+ prodCellsPerRow +')'));
			
			// let's see how tall the subcat really is so we can know approx. how many rows of products should be in the first rowStackSubContainer
			var numRowsToContain = Math.ceil(leftElHeight/tallestItem);
			
			var maxAllowableWidth;
			// calculating the maximum allowable width for the first rowStackSubContainer
			if (leftElHeight == 0) {
				maxAllowableWidth = MAXWIDTH - $j(elmntsToIgnore.left).outerWidth(true);
			} else {
				// the width of a full row of product cells less the width including margin of the #subcat 
				maxAllowableWidth = (prodCellsPerRow * prodCellWidth) - $j(elmntsToIgnore.left).outerWidth(true);
			}
			
			// how many elements will fit inside of the also passing in elements to ignore at top of container
			subCntnrElements = global.jquery.utils.products.findSubCntnr(numRowsToContain, maxAllowableWidth, elementList, elmntsToIgnore.left);
			
			// wrap sub container elements
			var rowStackSubCntnr1 = $j('<div id="rowStackSubContainer_1" class="rowStackSubContainer"></div>');

			// setting width on container
			rowStackSubCntnr1.css('cssText', 'width:' + maxAllowableWidth + 'px !important');
			
			// wrapping elements in a subcontainer
			$j(subCntnrElements).wrapAll(rowStackSubCntnr1);
			
			// call rowStack on elements in subcontainer
			global.jquery.utils.products.rowStack(rowStackSubCntnr1);
			
			// wrap rest of elements in a sub container
			rowStackSubCntnr2 = $j('<div id="rowStackSubContainer_2" class="rowStackSubContainer"></div>');
			elementList.not(subCntnrElements).wrapAll(rowStackSubCntnr2);
			
			// rowStack these newly wrapped elements
			global.jquery.utils.products.rowStack(rowStackSubCntnr2);
			
		} else {
			// wrapping other elements in a new container that will get rowStacked
			var elmntCntr  = $j('<div id="rowStackContainer" class="rowStackSubContainer"></div>');  
			elementList.not(elmntsToIgnore.top).wrapAll(elmntCntr);
				
			// so #subcatHeight <= #firstSubcatHeight so we need to insert a rowSeparator before the to clear things
			$j('<dl class="rowSeparator"></dl>').insertBefore(elmntCntr);
			
			// call rowStack on elements
			global.jquery.utils.products.rowStack(elmntCntr);
		}
	},
	rowStack : function(container) {
		var container = $j("#"+container.attr('id'));
		var MAXWIDTH = container.outerWidth();
		var width = 0;
		container.children().each(function() {
			var el = $j(this);
			// only adding widths of elements that are visible... not hidden
			var currItmWidth = parseInt( el.width() );
			// special case for flash replaced divs
			if ( !el.is("dl.cell") && el.children("div.nonflash").length ) {
				// using css style width if present storing in temp var
				var divChild = el.children("div.nonflash").eq(0);
				var tempCurrWidth;
				try {
					tempCurrWidth = parseInt( divChild.attr('style').replace(/width:(\d+).*/, '$1'));
				} catch (err) {
					// if no css styling then use actual width of element on page
					tempCurrWidth = parseInt( divChild.find('img').outerWidth(true) );
				}
				// if any of the above are valid widths then use them
				if (!isNaN(tempCurrWidth)) 
					currItmWidth = tempCurrWidth;
			};
			width += currItmWidth;
			if( width > MAXWIDTH ) {
				width = currItmWidth;
				$j('<dl class="rowSeparator"></dl>').insertBefore(el);
			};
		});
	},
	findSubCntnr : function(rows, maxWidth, elements, elToIgnoreString) {
		var currWidth = 0;
		var indexOfLastItem;
		// finding out how many elements will be in this sub container
		elements.not(elToIgnoreString).each(function(index) { 
			var el = $j(this);
			currWidth += el.outerWidth();
			if( currWidth > maxWidth ) {
				rows--;
				currWidth = el.outerWidth();
				if( rows == 0 ) {
					indexOfLastItem = index; 
					return false;
				}
			}
		});
		// now returning elements
		return elements.filter(':lt('+ indexOfLastItem +')');
	},
	cleanUpRowStackerArtifacts : function(container) {
		return;
	},
	init : function() {
		global.jquery.utils.products.lazyLoadCells = $j("div.cmPoseDiv");
		// check to make sure that we are on a category page with products
		if( global.jquery.utils.products.lazyLoadCells.length && !global.jquery.utils.common.isCustomerServicePage() ) {
			global.jquery.utils.products.lazyLoad(global.jquery.utils.products.lazyLoadCells,global.jquery.utils.products.lazyLoadInitCallback);
			$j(window).scroll(function(){
				global.jquery.utils.products.lazyLoad(global.jquery.utils.products.lazyLoadCells,global.jquery.utils.products.lazyLoadScrollCallback);
			});
    	}
	}
});

/* Search Module */
global.jquery.utils.search = new Object({
	init : function() {
		// check to make sure that we are on a product page
		if( global.jquery.utils.common.isSearchPage() ) {
			///TODO: there is an error here in the rowStackManager call, will be addressed after rowStack is fixed for products.
			global.jquery.utils.search.rowStack();
		}
	},
	rowStack : function() {
		var elmntsToIgnore = {
				'top'	: '.searchPagination',
				'right'	: '',
				'bottom': '.searchPagination',
				'left'	: '#searchNav',
				'outsideTop' : '',
				'outsideBottom' : ''
			};
		global.jquery.utils.products.rowStackManager('#productSelectForm', elmntsToIgnore);
	}
});

/* Customer service module */
global.jquery.utils.customerService = new Object({
	fetchRightColumnInformation : function (itemsToRemove) {
	    var remove = false; 
	    
		if(itemsToRemove == 'remove'){
			remove = true;}
		
		var rightCol = $j(".rightColumn");
		if (rightCol.length == 0) {
			rightCol = $j("<div></div>").addClass("rightColumn");
			$j(rightCol).appendTo('#middle #content');  
		}

		var tempCntnr = $j('<div></div>');
		$j(tempCntnr).unwrap().load("/assets/html/customer_service_contact_container.html", function(itemsToRemove) {
			if(remove){$j('#emailBlock').addClass('hidden');}
			
		});
		
		tempCntnr.unwrap().prependTo(rightCol);
		
		setTimeout('global.jquery.utils.common.assignButtons(".rightColumn")', 400);
	
	},
	formatRightColumn : function(itemsToRemove) {
		
		global.jquery.utils.common.setCustomerServicePage();
		
		if(jQuery.browser.webkit && document.readyState != "complete") 
			$j(window).bind('load',  global.jquery.utils.customerService.fetchRightColumnInformation);
		else
			global.jquery.utils.customerService.fetchRightColumnInformation(itemsToRemove);
	},
	formValidation : function() {
		//form validation and feild styling
		$j("form").find("dd.error").next().children("input").addClass("errorField");
	},
	init : function() {		
		global.jquery.utils.customerService.formValidation();
		global.jquery.utils.customerService.tabbedPanel();
		global.jquery.utils.customerService.styleBillingAddress();
	},
	styleBillingAddress : function() {
		//Used in checkout to set the billing address to bold
		$j(".savedAddress input[type='radio']").click(function(event) {
			$j(".savedAddress input[type='radio']").siblings().removeClass("hot");
			$j(this).parent().find("label").addClass("hot");
		});
	},
	tabbedPanel : function() {
		//Customer Service Tabbed Panel
		$j("ul.tabWrap").click(function(event) {
			
			$j('ul.tabWrap').removeClass("hot");
			if ($j(this).hasClass("hot")){	
			}
			else
			{
				$j(this).addClass("hot");
			}
			var ID = $j(this).attr('id');
			
			var divID = ID.replace("tab","#returnWaysText");
			$j("div[id^='returnWaysText']").removeClass("show").addClass("hidden");
			$j(divID).removeClass("hidden").addClass("show");
			
			return false;
		});
		/*$j("ul.tabWrapDelivery").click(function(event) {
			
			$j('ul.tabWrapDelivery').removeClass("hotDel");
			if ($j(this).hasClass("hotDel")){	
			}
			else
			{
				$j(this).addClass("hotDel");
			}
			var ID = $j(this).attr('id');
			
			var divID = ID.replace("tab","#deliveryWaysText");
			$j("div[id^='deliveryWaysText']").removeClass("show").addClass("hidden");
			$j(divID).removeClass("hidden").addClass("show");
			
			return false;
		});*/
		
		$j("ul.tabWrap").mouseenter(function(event) {
			if ($j(this).hasClass("hot")){
				
			}
			else
			{
				$j(this).addClass("hoverTab");
			}
		}).mouseleave(function(event) {
			$j(this).removeClass("hoverTab");
		}).mouseup(function(event) {
			$j(this).removeClass("hoverTab");
		});
	}
});

global.jquery.utils.zoomImage = new Object({
	init : function() {		
		var zoomImageFlag = 'false';
		// Zoom
		$j('.ticket_zoom_icon').live("mouseover", function(){
			//get image src and size
			if(zoomImageFlag == 'false'){// animation not running go ahead and zoom image	
				zoomImageFlag = 'true'; //set flag true and start animation	
				var zoomImage = $j(this);
				var position = zoomImage.offset();			
				imageTagert = $j(this).closest('li').find('.imageProduct');
				imageSrc = $j(imageTagert).attr('src');	
				imagePosX = $j(imageTagert).offset().left-1;	
				imagePosY = $j(imageTagert).offset().top-1;
				imageWidth = $j(imageTagert).width();
				imageHeight = $j(imageTagert).height();		
				$j('.zoomImage').css({height: imageHeight, width: imageWidth, left: position.left, top:position.top});
				$j('.zoomImage').html("<img name='ZoomProduct' src='"+imageSrc+"'/>");
		   		$j('.zoomImage').dequeue().stop().animate({ height: "toggle" , width:"toggle", opacity: 1 },500, function(){				
					zoomImageFlag = 'false'; // reset flag
					//ZoomCheck = setInterval("zoomCheck()", 1000);
		   		});
			}		    
		});

		$j('.ticket_zoom_icon_WishList').live("mouseover", function(){
			//get image src and size
			if(zoomImageFlag == 'false'){// animation not running go ahead and zoom image	
				zoomImageFlag = 'true'; //set flag true and start animation	
				var zoomImage = $j(this);
				var position = zoomImage.offset();			
				imageTagert = $j(this).closest('dl').find('.cmPoseImg');
				imageSrc = $j(imageTagert).attr('src');	
				imagePosX = $j(imageTagert).offset().left-1;	
				imagePosY = $j(imageTagert).offset().top-1;
				imageWidth = $j(imageTagert).width();
				imageHeight = $j(imageTagert).height();		
				$j('.zoomImage').css({height: imageHeight, width: imageWidth, left: position.left, top:position.top});
				$j('.zoomImage').html("<img name='ZoomProduct' src='"+imageSrc+"'/>");
		   		$j('.zoomImage').dequeue().stop().animate({ height: "toggle" , width:"toggle", opacity: 1 },500, function(){				
					zoomImageFlag = 'false'; // reset flag
					//ZoomCheck = setInterval("zoomCheck()", 1000);
		   	});
		}
			    
		});
			
			$j(".zoomImage").live("mouseout", function(){
				if(zoomImageFlag == 'false'){	
					zoomImageFlag = 'true';
					$j('.zoomImage').dequeue().stop().animate({ height: "toggle" , width:"toggle", opacity: 0 },500, function(){				
						zoomImageFlag = 'false'; // reset flag
						//clearInterval(ZoomCheck);
			   		});			
				}
			});
	}
});

$j(document).ready(function(){
	if ($j.browser == 'msie')
		setTimeout('global.jquery.utils.init()',300);
	else
		global.jquery.utils.init();
	$j("#deliveryWaysText").tabs();
	$j("a[href='"+ window.location.hash+"']").click();
});

//IE6 add roll overs to category cells		
$j('body.IE6 .cell').live('mouseover mouseout', function() {
	if (event.type == 'mouseover') {
		$j(this).addClass('hover');
	}else{
		$j(this).removeClass('hover');
	}
 });

//flat roll overs		
$j('.cell').each( function() {
	var Rollover = false;
	Rollover = $j(this).find('img').hasClass('rollover');
	alert(Rollover);
	if( !Rollover ) {
		$j(this).addClass('flat');
	}
 });


$j("#continue_pay #payNow").live('click', function(){	
	if($j("form[name='paymentForm']").validate()){		
		submitPaymentForm(); 
	}	
});
//history management tab script
$j("#mgmdatatoggle #preview_button #inner_preview_button").button( "destroy" );