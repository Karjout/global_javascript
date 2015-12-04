// Place all jQuery calls that should happen on document ready inside the following block
// IMPORTANT NOTE: We noticed that though it id on document ready, but these functions are firing even before the document is loaded.
// Hence the event related functions used in catNavFilters are now changed to use jQuery live function.
jQuery(document).ready(function(){
	// run flash replacement
	YAHOO.ebauer.flash.generic();
	if (navigator.appVersion.indexOf("MSIE 7.")!= -1) {
		jQuery('body').css({
	        'overflow': 'hidden',
	        'height': '100%'
	    })
	}
	//jQuery.fn.catNavFilters(); //add event lisners if filters on page
	//jQuery.fn.adjustCategoryLinks() ;
});