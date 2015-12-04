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
			if (prodCellsPerRow =="NaN" || prodCellsPerRow =="" || prodCellsPerRow == undefined || prodCellsPerRow =="undefined"){
				prodCellsPerRow = 4; // set a default
			}
			
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
			//rowStackSubCntnr1.css('cssText', 'width:' + maxAllowableWidth + 'px !important');
			
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