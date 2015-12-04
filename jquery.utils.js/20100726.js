// Global jquery Functions and Scripts

var $j = jQuery.noConflict();//module reference to jquery

$j(document).ready(function(){
	global.jquery.utils.common.init();
	global.jquery.utils.customerService.init();
	global.jquery.utils.search.init();	
});

var global = new Object();
global.jquery = new Object();
global.jquery.utils = new Object();

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

		}else{
			global.jquery.utils.common.assignButtons();
		}
		
	},
	isFA : function() {
		return ($j('body').hasClass('FA') > 0);
	},
	isCustomerServicePage : function(setCSP) {
		isCSP = false;
		
		if($j('body').hasClass('CUSTOMER-SERVICE').length > 0 || $j('body').find('.rightColumn').length > 0)
			isCSP = true;
		
		return isCSP;
	},
	isProductLinePage : function() {
		var isPLP = false;

		if(!global.jquery.utils.common.isCustomerServicePage() && $j('#billboard_wrapper').find('dl.cell').find('.cmPoseImg').length) {
				isPLP = true;
		}
		
		return isPLP;
	},
	isSearchPage : function(setCSP) {
		isSP = false;
		
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
			if (!submessageInited) {
				var p = $j.jcarousel.intval(carousel.visible);
				carousel.scroll(p);
				submessageInited = true;
			}
			return false;
		}
		// use jcarousel for all ul tags with class submessage
		$j("ul.submessage").jcarousel({visible:3,scroll:3,wrap:'circular',itemLoadCallback:animateSubmessage});
		// use jcarousel for all ul tags with class firstascent-submessage
		$j("ul.firstascent-submessage").jcarousel({visible:4,scroll:4,wrap:'circular',itemLoadCallback:animateSubmessage});
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
	init : function() {
		global.jquery.utils.common.assignButtons();
		global.jquery.utils.common.verisignPopUp();
		global.jquery.utils.common.useFancyboxforAllPopUps();
		global.jquery.utils.common.assignLayerButtons();
		global.jquery.utils.common.applyCarouselBehavior();
		global.jquery.utils.common.applySlideshowBehavior();
	}
});

global.jquery.utils.products = new Object({
	billboardLoadTimer : function () {
	var cLog = global.jquery.utils.common.consoleLog;

		var billboards = $j('#middle div.billboard').find('img');
		var cells = $j('#middle dl.cell'); 

		// IE seems to stall when we start messing with the DOM until the images have loaded
		//if ($j('body').hasClass('IE')) {
		//	$j('<img />')
		//		.attr('src', $j(cells).eq(cells.length-1).find('div.cmPoseDiv').attr('srcOn') + '?noncached=' + new Date().getTime())
		//		.load(function() { 
				    // once this image is loaded then we can call rowStack
		//			setTimeout('global.jquery.utils.products.rowStackManager()', 500);
		//		});
		//} else if(billboards.length > 0) {
			// we have to trick webkit here and fetch the last billboard image again... uncached hence, 
			// the appending of an 'always' changing artifact the utc timestamp this forces webkit to always fetch the image
			// which should in turn give the proper time for the other 'heavier' images/swfs to be loaded and thus, rowStackable
			
			///TODO: need to make sure that the billboard we use to time things on is not a flash billboard, because they 
			
		//	$j('<img />')
		//		.attr('src', $j(billboards).eq(billboards.length-1).attr('src') + '?noncached=' + new Date().getTime())
		//		.load(function() { 
				    // once this image is loaded then we can call rowStack
		//			global.jquery.utils.products.rowStackManager();
		//		});
		//} else {
			// no billboards on this page then just rowStack
			setTimeout('global.jquery.utils.products.rowStackManager()', 300);
		//}
		
		
	},
	init : function() {
		// check to make sure that we are on a product page

			if(global.jquery.utils.common.isProductLinePage()) {
				global.jquery.utils.products.showAlternateProductImageonRollover();
				global.jquery.utils.products.lazyLoad();
				$j(window).scroll(global.jquery.utils.products.lazyLoad);
				global.jquery.utils.products.showNumProductCols();
				
					global.jquery.utils.products.billboardLoadTimer();
			}
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
	lazyLoad : function() {
		// getting viewable area
		var imgCell = $j("#billboard_wrapper dl.cell div.cmPoseDiv");
		// setting view area to include row above row in current view
		// making sure result is never less than 0
		var windowTop = ($j(window).scrollTop() - imgCell.outerHeight(true)) || 0;
		
		// window innerHeight and row below the fold as well
		var windowBottom = windowTop + $j(window).height() + imgCell.outerHeight(true);
		
		imgCell.not('.cached').each(function(){
			// getting top of image to see if it is in the viewable area of the page
			var imgTop = $j(this).offset().top;
			
			if(imgTop > windowTop && imgTop < windowBottom) {
				// if no bg url then use the scroff image
				var bgImageURL = $j(this).attr('srcOn') || $j(this).attr('srcOff');
				
				// making sure that srcOn value isn't 'null'; this happens in several categories
				if(bgImageURL == null || bgImageURL == 'null' || bgImageURL == '') {
					bgImageURL = $j(this).attr('srcOff');
				}
				// replacing all $amp;  them with &
				bgImageURL = bgImageURL.replace(/\&amp;/g,'&');
				// setting new background image
				$j(this).addClass('cached').css('background-image', "url('" + bgImageURL + "')");
			}
		});
	},
	rowStack : function() {
		// if not a CATEGORY or landing page then stack rows
		if(!$j("body").hasClass('CATEGORY')) {
			// remove all present rowSeparators
			//$j("#billboard_wrapper").children().remove('div.rowSeparator');			
			var width = 0;
			var MAXWIDTH = parseInt($j("#billboard_wrapper").outerWidth());
			
			$j("#billboard_wrapper>*").each(function() {
				// only adding widths of elements that are visible... not hidden
				if($j(this).is(":visible")) {
					var divChild = $j(this).children().eq(0);
					var currItmWidth = parseInt($j(this).outerWidth());
					
					if (divChild.hasClass('nonflash')) {
						// using css style width if present
						try {
							currItmWidth = parseInt(divChild.attr('style').replace(/width:(\d+).*/, '$1')); 
						} catch(err) {
							// if no css styling then use actual width of elmnt on page
							currItmWidth = parseInt(divChild.find('img').outerWidth());
						}
					}

					width += currItmWidth;
					
					if($j(this).hasClass('billboard')) {
						var widthText = $j(this).find('img').outerWidth();
					}
					
					if(width > MAXWIDTH) {
						width = currItmWidth;
						// add clear
						
						$j('<dl class="rowSeparator"></dl>').insertBefore(this);
						
						// handling case if the #subcat height is larger than that of the frstSubCatBrkr
						var frstSubCatBrkrPresent = $j(this).prev().prev().hasClass('first_subcategory');
						var subcatNavPresent = $j('#subcat');
						var frstSubCatBrkr = $j(this).prev().prev();
						if(frstSubCatBrkrPresent) {
							try {
								if($j("#subcat").height() - frstSubCatBrkr.height() > 0) {
										// remove rowSeparator
										frstSubCatBrkr.next().remove();
										// set width to #subcat.width only
										width = $j("#subcat").width() + currItmWidth;
									}
								} catch (err) {
									// nothing
								}
						}
					}
				}  
			});
		}
	},
	rowStackManager : function(contextContainer, ignoreList) {
		var cLog = global.jquery.utils.common.consoleLog;
		var startRSM = new Date().getTime();
		cLog('entering rowStackManager: ' + startRSM);

		var container, elmntsToIgnore , elmntsToIgnoreStr ="";
		
		// serves as a template of element positions to be ignored
		// comma delimited CSS selectors
		var elmntsToIgnore = {
				'top'	: '',
				'right'	: '',
				'bottom': '',
				'left'	: '',
				'outsideTop' : '',
				'outsideBottom' : ''
			};
			
		if(contextContainer) {
			container = $j(contextContainer);
			// merging customized ignore list into ignore list template			
			for(item in ignoreList) {
				elmntsToIgnore[item] = ignoreList[item];
			}
		}
		else {
			container = $j('#billboard_wrapper');
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
		for(ele in elmntsToIgnore) {
			if(elmntsToIgnore[ele] != "")
			elmntsToIgnoreStr += elmntsToIgnore[ele] + ' ';
		}
		elmntsToIgnoreStr = elmntsToIgnoreStr.replace(/\s$/,"").replace(/\s+/g, ', ');
		
		// before we can start rowStacking we need to clean up 'previous' rowStacker artifacts
		global.jquery.utils.products.cleanUpRowStackerArtifacts(container);
		
		var elementList = container.children().not(elmntsToIgnoreStr);
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
			cLog('numRowsToContain: ' + numRowsToContain + " maxAllowableWidth:"+maxAllowableWidth+" elementList:"+elementList.length+" elmntsToIgnore.left:"+elmntsToIgnore.left);
			// how many elements will fit inside of the also passing in elements to ignore at top of container
			subCntnrElements =  global.jquery.utils.products.findSubCntnr(numRowsToContain, maxAllowableWidth, elementList, elmntsToIgnore.left);
			cLog('subCntnrElements: ' + subCntnrElements+" subCntnrElements Length:"+subCntnrElements.length);
			// wrap sub container elements
			var rowStackSubCntnr1 = $j('<div id="rowStackSubContainer_1" class="rowStackSubContainer"></div>');
			
			// setting width on container
			//rowStackSubCntnr1.css('cssText', 'width:' + maxAllowableWidth + 'px !important');
			
			// wrapping elements in a subcontainer
			$j(subCntnrElements).wrapAll(rowStackSubCntnr1);
			
			// call rowStack on elements in subcontainer
			global.jquery.utils.products.rowStack2(rowStackSubCntnr1);
			
			// wrap rest of elements in a sub container
			rowStackSubCntnr2 = $j('<div id="rowStackSubContainer_2" class="rowStackSubContainer"></div>');
			elementList.not(subCntnrElements).wrapAll(rowStackSubCntnr2);
			
			// rowStack these newly wrapped elements
			global.jquery.utils.products.rowStack2(rowStackSubCntnr2);
			
		} else {
			// wrapping other elements in a new container that will get rowStacked
			var elmntCntr  = $j('<div id="rowStackContainer" class="rowStackSubContainer"></div>');  
			elementList.not(elmntsToIgnore.top).wrapAll(elmntCntr);
				
			// so #subcatHeight <= #firstSubcatHeight so we need to insert a rowSeparator before the to clear things
			$j('<dl class="rowSeparator"></dl>').insertBefore(elmntCntr);
			
			// call rowStack on elements
			global.jquery.utils.products.rowStack2(elmntCntr);
		}
		var endRSM = new Date().getTime();
		var durRSM = endRSM - startRSM;
		cLog('exiting rowStackManager: ' + endRSM);
		cLog('total rowStackManager time: ' + durRSM);
	},
	rowStack2 : function(container, elmntsToIgnore) {
		// making sure elmntsToIgnore has some value
		elmntsToIgnore = elmntsToIgnore || '';
		
		var MAXWIDTH = $j('#'+container.attr('id')).outerWidth();
		var prodCellWidth = $j('#'+container.attr('id')).children('dl.cell').eq(0).outerWidth();
		var width = 0;		
		$j('#'+container.attr('id')).not(elmntsToIgnore).children().each(function() {
			// only adding widths of elements that are visible... not hidden
			if($j(this).is(":visible")) {
				var currItmWidth;
				// check to see if this is a dl.cell
				if ($j(this).is('dl.cell')) {
					currItmWidth = prodCellWidth;
				}
				else {
					// not a dl.cell then it is a billboard
					var divChild = $j(this).children().eq(0);
					currItmWidth = parseInt($j(this).outerWidth());
					
					if (divChild.hasClass('nonflash')) {
						// using css style width if present storing in temp var
						var tempCurrWidth;
						try {
							tempCurrWidth = parseInt(divChild.attr('style').replace(/width:(\d+).*/, '$1'));
						} 
						catch (err) {
							// if no css styling then use actual width of element on page
							tempCurrWidth = parseInt(divChild.find('img').outerWidth());
						}
						
						// if any of the above are valid widths then use them
						if (!isNaN(tempCurrWidth)) 
							currItmWidth = tempCurrWidth;
					}
				}
				width += currItmWidth;
				//alert("width="+width+"  MaxWidth="+MAXWIDTH+"   currItmWidth="+currItmWidth);
				if(width > MAXWIDTH) {
					width = currItmWidth;
					// add clear					
					$j('<dl class="rowSeparator"></dl>').insertBefore(this);
				}
			}
		});
	},
	findSubCntnr : function(rows, maxWidth, elements, elToIgnoreString) {
		var currWidth = 0;
		var cLog = global.jquery.utils.common.consoleLog;
		var indexOfLastItem;
		cLog('traced elements: ' + elements.length );
		// finding out how many elements will be in this sub container
		elements.each(function(index) { 
			// ignoring the first_subcategory banner
			cLog('Element Width: ' + $j(this).outerWidth() );
			if($j(this).filter(elToIgnoreString).length == 0)
				currWidth += $j(this).outerWidth();
			if(currWidth > maxWidth) {
				rows--;
				currWidth = $j(this).outerWidth();
				if(rows == 0) {
					indexOfLastItem = index; 
					return false;
				}
			}
		});
		// now returning elements
		return elements.filter(':lt('+ indexOfLastItem +')');
	},
	cleanUpRowStackerArtifacts : function(container) {
		// need to remove all of the rowStackSubContainers and then remove the rowSeparators
		//container.find('.rowStackSubContainer').children().unwrap().remove('.rowSeparator');
	},
	showNumProductCols : function() {
		// adding column selector to #breadcrumb area
		if($j(".mpp, .spp, #dossier").length == 0) {
			// done this way because webkit for some odd reason doesn't like the .append method (as of jQuery 1.4.3)
			$j('<ul id="colNumSelector"><li>1</li><li>2</li><li>3</li><li>4</li><li class="selected">5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ul>').appendTo("#breadcrumb");
		}
		// adding listeners to column selectors
		$j("#colNumSelector").delegate('li', 'click', function() {
			// if the user clicks on the already selected one, nothing happens
			if(!$j(this).hasClass('selected')) {
				var cols = $j(this).text();
				$j(this).siblings().removeClass('selected').end().addClass('selected');
				global.jquery.utils.products.switchProductCols(cols);
			}
		});
	},
	showAlternateProductImageonRollover : function() {
		// set up cell listener to rotate image on mouseover and mouseout
		// excluding all images whose container does not have the class noRollover
		//if ($j('body').hasClass('IE')) {
		//	$j("#billboard_wrapper div.cmPoseDiv").each(function(){
		//		var jq_img = $j(this).find("img");
		//		$j(this).attr("srcOn", $j(this).find("var").html());
		//		$j(this).attr("srcOff",jq_img.attr("src"));
		//		$j(this).find("var").remove();
		//		
				// now setting mouseover and mouseout attributes on img elements
		//		$j(this)
		//			.attr('onmouseover', "this.children().getAttribute('class').replace(/(.*)/gi, '$1 invisible')")
		//			.attr('omouseout', "this.getAttribute('class').replace(/(.*)\sinvisible/gi, '$1')");
		//	});
		//}
		//else {
			$j("#billboard_wrapper div.cmPoseDiv").each(function(){
				$j(this).attr("srcOn", $j(this).find("var").html());
				// fix for premature launch of pagination server code
				$j(this).find("div.cmPoseImg").replaceWith('<img class="cmPoseImg" src="'+$j(this).find("div.cmPoseImg").attr("src")+'" />');
				$j(this).attr("srcOff", $j(this).find("img").attr("src"));
				$j(this).find("var").remove();
			}).bind({
				mouseenter: function(){
					$j(this).find("img.cmPoseImg").addClass('invisible');
				},
				mouseleave: function(){
					$j(this).find("img.cmPoseImg").removeClass('invisible');
				}
			});
		//}
	},
	switchProductCols : function(numCols) {
		// hiding billboards if number of cols is other than the default
		if(numCols != 5) {
			$j(".billboard").not('.billboard_19').css("display","none");
		} else {
			$j(".billboard").css("display","block");
		}
		
		// setting allowable max numCols to ten and minCols is 1
		numCols = (numCols > 10 ? 10 : (numCols < 1 ? 1 : numCols));
		
		// resize the images as well as the containing container the .cell
		$j("dl.cell").not("#subcat").each(function() {
			//removing existing 
			$j(this).attr('class', $j(this).attr('class').replace(/rsCell_\w*/i, ''));
			
			// regex for replace
			var replaceRegex = /(\$jcategory\$j|\&wid.*|\&hei.*|\&qlt.*|\&fmt.*)/gi;
			
			// replacing URL parameters for default img
			var src = $j(this).addClass('rsCell_'+numCols+'x1').find('.cmPoseImg').attr('src').replace(replaceRegex, '');
			
			var divWithImgSrc = $j(this).find('.pose');
			// srcOn img 
			var srcOn = divWithImgSrc.attr('srcOn').replace(replaceRegex, '');
			// and srcOff img
			var srcOff = divWithImgSrc.attr('srcOff').replace(replaceRegex, '');
			
			// resized image params
			var imgParams = '&fmt=png&qlt=90&wid=' +  $j(this).width() + '&hei=' + Math.floor($j(this).width() * 3/2);
			
			// changing img src of srcOn(rollover-state) and srcOff(default-state) to that of the resized imgs
			// remove cache class so that lazyload can take effect again
			$j(this).find('.cmPoseImg').attr('src', src + imgParams);
			
			var bgImageString = 'background-image: url(' + srcOn + imgParams + ')';
			
			if(srcOn == 'null' || srcOn == '') {
				bgImageString = '';
				$j(this).addClass('.noRollover');
			}
			divWithImgSrc.attr({ 
				srcOff: srcOff + imgParams,
				srcOn: srcOn + imgParams,
				style: bgImageString
			}).removeClass('cached');

		});

		// re-stack the rows
		global.jquery.utils.products.rowStackManager();
	}
});

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

global.jquery.utils.search = new Object({
	init : function() {
		// check to make sure that we are on a product page
		if(global.jquery.utils.common.isSearchPage()) {
			///TODO: there is an error here in the rowStackManager call, will be addressed after rowStack is fixed for products.
			global.jquery.utils.search.rowStack();
			//global.jquery.utils.search.showNumProductCols();
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
	},
	showNumProductCols : function() {
		// adding column selector to #breadcrumb area
		if($j(".mpp, .spp, #dossier").length == 0) {
			// done this way because webkit for some odd reason doesn't like the .append method (as of jQuery 1.4.3)
			$j('<ul id="colNumSelector"><li>1</li><li>2</li><li>3</li><li>4</li><li class="selected">5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ul>').appendTo("#breadcrumb");
		}
		// adding listeners to column selectors
		$j("#colNumSelector").delegate('li', 'click', function() {
			// if the user clicks on the already selected one, nothing happens
			if(!$j(this).hasClass('selected')) {
				var cols = $j(this).text();
				$j(this).siblings().removeClass('selected').end().addClass('selected');
				global.jquery.utils.products.switchProductCols(cols);
			}
		});
	},
	switchProductCols : function(numCols) {
		// hiding billboards if number of cols is other than the default
		if(numCols != 5) {
			$j(".billboard").not('.billboard_19').css("display","none");
		} else {
			$j(".billboard").css("display","block");
		}
		
		// setting allowable max numCols to ten and minCols is 1
		numCols = (numCols > 10 ? 10 : (numCols < 1 ? 1 : numCols));
		
		// resize the images as well as the containing container the .cell
		$j("dl.cell").not("#subcat").each(function() {
			//removing existing 
			$j(this).attr('class', $j(this).attr('class').replace(/rsCell_\w*/i, ''));
			
			// regex for replace
			var replaceRegex = /(\$jcategory\$j|\&wid.*|\&hei.*|\&qlt.*|\&fmt.*)/gi;
			
			// replacing URL parameters for default img
			var src = $j(this).addClass('rsCell_'+numCols+'x1').find('.cmPoseImg').attr('src').replace(replaceRegex, '');
			
			var divWithImgSrc = $j(this).find('.pose');
			// srcOn img 
			var srcOn = divWithImgSrc.attr('srcOn').replace(replaceRegex, '');
			// and srcOff img
			var srcOff = divWithImgSrc.attr('srcOff').replace(replaceRegex, '');
			
			// resized image params
			var imgParams = '&fmt=png&qlt=90&wid=' +  $j(this).width() + '&hei=' + Math.floor($j(this).width() * 3/2);
			
			// changing img src of srcOn(rollover-state) and srcOff(default-state) to that of the resized imgs
			// remove cache class so that lazyload can take effect again
			$j(this).find('.cmPoseImg').attr('src', src + imgParams);
			
			var bgImageString = 'background-image: url(' + srcOn + imgParams + ')'
			
			if(srcOn == 'null' || srcOn == '') {
				bgImageString = '';
				$j(this).addClass('.noRollover');
			}
			divWithImgSrc.attr({ 
				srcOff: srcOff + imgParams,
				srcOn: srcOn + imgParams,
				style: bgImageString
			}).removeClass('cached');

		});

		// re-stack the rows
		global.jquery.utils.products.rowStack();
	}
});

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


$j(function() {
	$j("#deliveryWaysText").tabs({

	});
	$j("a[href='"+ window.location.hash+"']").click();
});

$j("#continue_pay #payNow").live('click', function(){	
	if($j("form[name='paymentForm']").validate()){		
		submitPaymentForm(); 
	}	
});
//history management tab script
$j("#mgmdatatoggle #preview_button #inner_preview_button").button( "destroy" );