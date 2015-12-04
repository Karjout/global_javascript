/* Search Module */
global.jquery.utils.search = new Object({
	init : function() {
		// check to make sure that we are on a product page
		if(global.jquery.utils.common.isSearchPage()) {
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
		//global.jquery.utils.products.rowStackManager('#productSelectForm', elmntsToIgnore);
	}
});
