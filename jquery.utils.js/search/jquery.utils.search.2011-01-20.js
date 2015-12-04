/* Search Module */
global.jquery.utils.search = new Object({	
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
			var tallestItem = global.jquery.utils.search.getSizeOfTallest(elementList.not('input').filter(':lt('+ prodCellsPerRow +')'));
			
			// let's see how tall the subcat really is so we can know approx. how many rows of products should be in the first rowStackSubContainer
			var numRowsToContain = Math.ceil(leftElHeight/tallestItem);
			
			var maxAllowableWidth = 764;
				// calculating the maximum allowable width for the first rowStackSubContainer
//			if (leftElHeight == 0) {
//				maxAllowableWidth = MAXWIDTH - $j(elmntsToIgnore.left).outerWidth(true);
//			} else {
				// the width of a full row of product cells less the width including margin of the #subcat 
//				maxAllowableWidth = (prodCellsPerRow * prodCellWidth) - $j(elmntsToIgnore.left).outerWidth(true);
//			}
			
			// how many elements will fit inside of the also passing in elements to ignore at top of container
			subCntnrElements = global.jquery.utils.search.findSubCntnr(numRowsToContain, maxAllowableWidth, elementList, elmntsToIgnore.left);
			
			// wrap sub container elements
			var rowStackSubCntnr1 = $j('<div id="rowStackSubContainer_1" class="rowStackSubContainer"></div>');

			// setting width on container
			//rowStackSubCntnr1.css('cssText', 'width:' + maxAllowableWidth + 'px !important');
			
			// wrapping elements in a subcontainer
			$j(elementList).wrapAll(rowStackSubCntnr1);
			
			// call rowStack on elements in subcontainer
			global.jquery.utils.search.rowStack(rowStackSubCntnr1);
			
			// wrap rest of elements in a sub container
			//rowStackSubCntnr2 = $j('<div id="rowStackSubContainer_2" class="rowStackSubContainer"></div>');
			
			// setting width on sub container
			//rowStackSubCntnr2.css('cssText', 'width:' + maxAllowableWidth + 'px !important; margin-left:'+prodCellWidth+'px');
			
			//elementList.not(subCntnrElements).wrapAll(rowStackSubCntnr2);
			
			// rowStack these newly wrapped elements
			//global.jquery.utils.search.rowStack(rowStackSubCntnr2);
			
		} else {
			// wrapping other elements in a new container that will get rowStacked			
			var elmntCntr  = $j('<div id="rowStackContainer" class="rowStackSubContainer"></div>');  
			elementList.not(elmntsToIgnore.top).wrapAll(elmntCntr);
				
			// so #subcatHeight <= #firstSubcatHeight so we need to insert a rowSeparator before the to clear things
			$j('<dl class="rowSeparator"></dl>').insertBefore(elmntCntr);
			
			// call rowStack on elements			
			global.jquery.utils.search.rowStack(elmntCntr);
		}
		var hash = global.jquery.utils.common.parseHash();
		if ( hash.pid ) {
			var y = $j("#cell_"+hash.pid ).offset().top;
			$j(window).scrollTop(y);
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
	rowStack : function(container) {
		var container = $j("#"+container.attr('id'));
		var MAXWIDTH = container.outerWidth();
		var width = 0;
		container.children().each(function() {
			var el = $j(this);
			// only adding widths of elements that are visible... not hidden
			var currItmWidth = parseInt( el.width() );
			// special case for flash replaced divs
			if ( !el.is("div.cell") && el.children("div.nonflash").length ) {
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
	init : function() {		
		if(global.jquery.utils.common.isSearchPage()) {			
			var elmntsToIgnore = {
					'top'	: '.searchPagination',
					'right'	: '',
					'bottom': '.searchPagination',
					'left'	: '#searchNav',
					'outsideTop' : '',
					'outsideBottom' : ''
				};
			global.jquery.utils.search.rowStackManager('#productSelectForm', elmntsToIgnore);
		}		
	}
});
