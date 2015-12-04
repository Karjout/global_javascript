// Define all functions in the global namespace
// THIS SCRIPT MUST BE LOADED BEFORE document.ready.js BUT AFTER jquery and all jquery modules

// module reference to jQuery
var $j = jQuery.noConflict();

// setting the window name globally to eb to allow external sites to refresh content in the eb window rather than opening new (Donnelly) 
window.name = "eb";

// No Cookie Script Message Call
function are_cookies_enabled()
{
	var cookieEnabled = (navigator.cookieEnabled) ? true : false;

	if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
	{ 
		document.cookie="testcookie";
		cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
	}
	return (cookieEnabled);
}
function checkCookie(){	
	if (!are_cookies_enabled()){
		document.write('<div class="siteNoScript"><div class="siteNoScriptWrapper"><div class="siteNoScriptIcon"></div><div class="siteNoScriptTitle">Cookies are not enabled in your browser.</div>		<p class="siteNoScriptMessage">You must have Cookies enabled for the best experience on our site and to make a purchase.</p><p class="siteNoScriptMessage"><a href="http://www.eddiebauer.com/custserv/custserv.jsp?sectionId=320#seventh" alt="Learn how to enable Cookies" title="Learn how to enable Cookies">Learn how to enable Cookies in your browser</a> or call 1-800-426-8020 for assistance.</p></div></div>');
    }
}

