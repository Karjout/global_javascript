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
		if( $j('body').hasClass('STORE-LOCATOR-AND-HOURS') ){			
		}else{
			$j("form").find("dd.error").next().children("input").addClass("error");
		}
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
