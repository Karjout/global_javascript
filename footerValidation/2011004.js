$j(document).ready(function(){	
	/*$j.validator.addMethod("zipCode", function(zipCode, element) {
		return this.optional(element) || zipCode.match(/(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXYabceghjklmnpstvxy]{1}\d{1}[A-Za-z]{1}?\d{1}[A-Za-z]{1}\d{1})$/);
	}, "Please enter a valid to postal code.");
	$j.validator.addMethod("postalcode", function(postalcode, element) {
		return this.optional(element) || postalcode.match(/(^\d{5}(-\d{4})?$)|(^[ABCEGHJKLMNPRSTVXYabceghjklmnpstvxy]{1}\d{1}[A-Za-z]{1} ?\d{1}[A-Za-z]{1}\d{1})$/);
	},*/
	$j("form[name='catalogRequestForm']").validate({
		focusInvalid: true,
	    rules:{
			firstName:{required: true},
			lastName:{required: true},
			address1: {required: true},
			city: {required: true},
			state: {required: true},
			zipCode:  {required: true},
			countryCode:  {required: true},
			phone:	 {required: true,phonevalid: true},
			eveningPhone: {phonevalid: true},
			emailAddress: {email:true}
    	},
	    messages:{
		    firstName:"Please enter a bill to first name.",
		    lastName: "Please enter a bill to last name.",
		    address1: "Please enter a bill to address.",
		    city: "Please enter a bill to city.",
		    zipCode: "Please enter a valid to postal code.",
			state: "Please select a bill to state.",
			countryCode: "Please select a bill to country.",
			phone:	"Please enter a bill to daytime or evening phone number.",
			eveningPhone:	"Please enter a valid evening phone number.",
			emailAddress: "Please enter a valid email address"
		}
    });
	
	//validate signup form on keyup and submit
		$j("form[name='newAccountLoginForm']").validate({
			rules: {
			createAccount_fname: "required",
			createAccount_lname: "required",
			createAccount_email: {
				required: true,
				email: true
			},
			createAccount_pword: {
					required: true,
					minlength: 5
				},
			createAccount_pword2: {
					required: true,
					minlength: 5,
					equalTo: "#createAccount_pword"
				}
			},
			messages: {
				createAccount_fname: "Please enter the First Name.",
				createAccount_lname: "Please enter the Last Name.",
				createAccount_email: "Please enter a valid email address",
				createAccount_pword: {
					required: "Please enter a valid password.",
					minlength: "(Must be 5 or more characters with no spaces)"
				},
				createAccount_pword2 : {
					required: "Please provide a password",
					equalTo: "Password must match confirm password."
				}
			}
		});
		
			$j("form[name='loginForm']").validate( {
				rules : {
					accessAccount_email : {
						required : true,
						email : true
					},
					accessAccount_pword : {
						required : true,
						minlength : 5
					}
				},
				messages : {
					accessAccount_email : {
						required : "Please enter your email address.",
						email : "Invalid email address. Please try again."
					},
					accessAccount_pword : {
						required : "Please enter your password.",
						minlength : "(Must be 5 or more characters with no spaces)"
					}
				}
			}); 
			$j("form[name='giftCardItemForm']").validate({
				    rules:{
						nameTo:{required: true},
						nameFrom:{required: true},
						amount: {required: true},
						firstName: {required:true},
						lastName: {required: true},
						emailAddress: {
							required: true,
							email: true
						},
						reEmailAddress: {
							required: true,
							equalTo:"#emailAddress"
						}	
			    	},
				    messages:{
					    nameTo:"To: is a Required Field.",
					    nameFrom: "From: is a Required Field.",
					    amount: "Amount: is a Required Field.",
					    firstName: "Last Name: is a Required Field.",
					    lastName: "Last Name: is a Required Field.",
					    emailAddress: {
						    required:"Please enter recipient email address.",
						    email:"Please enter a valid email address."
						},
						reEmailAddress:{ 
							required:"Please re-enter recipient email address.",
							equalTo:"Email addresses must match"
						}
			    	}
			 });
			$j("form[name='editAddressForm']").validate({
				    rules:{
						firstName:{required: true},
						lastName:{required: true},
						address1: {required: true},
						city: {required: true},
						state: {required: true},
						zipCode: {required: true},
						countryCode:  {required: true},
						phone:	 {required: true,dayphonevalid: true},
						eveningPhone: {dayphonevalid: true}
			    	},
				    messages:{
					    firstName:"Please enter a bill to first name.",
					    lastName: "Please enter a bill to last name.",
					    address1: "Please enter a bill to address.",
					    city: "Please enter a bill to city.",
						state: "Please select a bill to state.",
						zipCode: "Please enter a valid to postal code.",
						countryCode: "Please select a bill to country.",
						phone:	
						{
							required:"Please enter a bill to daytime or evening phone number.",
							dayphonevalid: "Please enter a Valid daytime or evening phone number."
						},
						eveningPhone:	"Please enter a valid evening phone number."
					}
		         });
				$j("form[name='addAddressForm']").validate({
					
				    rules:{
						firstName:{required: true},
						lastName:{required: true},
						address1: {required: true},
						city: {required: true},
						state: {required: true},
						zipCode:  {required: true},
						countryCode:  {required: true},
						phone:	 {required: true,dayphonevalid: true},
						eveningPhone: {dayphonevalid: true}
			    	},
				    messages:{
					    firstName:"Please enter a ship to first name.",
					    lastName: "Please enter a ship to last name.",
					    address1: "Please enter a ship to address.",
					    city: "Please enter a ship to city.",
						state: "Please select a ship to state.",
						zipCode: "Please enter a valid to postal code.",
						countryCode: "Please select a ship to country.",
						phone:	
						{
							required:"Please enter a  to daytime or evening phone number.",
							dayphonevalid: "Please enter a Valid daytime or evening phone number."
						},
						eveningPhone:	"Please enter a valid evening phone number."
						    
					}
		         });
		         $j("form[name='AddUpdateOrDeleteAddressForm']").validate({
		 		    rules:{
		 				firstName:{required: true},
		 				lastName:{required: true},
		 				address1: {required: true},
		 				city: {required: true},
		 				state: {required: true},
		 				zipCode:  {required: true},
		 				countryCode:  {required: true},
		 				phone:	 {required: true,dayphonevalid: true},
		 				eveningPhone: {dayphonevalid: true}
		 	    	},
		 		    messages:{
		 			    firstName:"Please enter a bill to first name.",
		 			    lastName: "Please enter a bill to last name.",
		 			    address1: "Please enter a bill to address.",
		 			    city: "Please enter a bill to city.",
		 				state: "Please select a bill to state.",
		 				zipCode: "Please enter a valid to postal code.",
		 				countryCode: "Please select a bill to country.",
		 				phone:	
						{
							required:"Please enter a bill to daytime or evening phone number.",
							dayphonevalid: "Please enter a Valid daytime or evening phone number."
						},
						eveningPhone:	"Please enter a valid evening phone number."
		 			}
		          });
				$j("form[name='addUpdateDeleteAddressForm']").validate({
				    rules:{
						firstName:{required: true},
						lastName:{required: true},
						address1: {required: true},
						city: {required: true},
						state: {required: true},
						zipCode: {required: true},
						countryCode:  {required: true},
						phone:	 {
								required: true,
								dayphonevalid: true
						},
						eveningPhone: {dayphonevalid: true}
			    	},
				    messages:{
					    firstName:"Please enter a bill to first name.",
					    lastName: "Please enter a bill to last name.",
					    address1: "Please enter a bill to address.",
					    city: "Please enter a bill to city.",
						state: "Please select a bill to state.",
						zipCode: "Please enter a valid to postal code.",
						countryCode: "Please select a bill to country.",
						phone:	
						{
							required:"Please enter a bill to daytime or evening phone number.",
							dayphonevalid: "Please enter a Valid daytime or evening phone number."
						},
						eveningPhone:	"Please enter a valid evening phone number."
					}
		         });
				$j("form[name='personalProfileForm']").validate({
				    rules:{
						firstName:{required: true},
						lastName:{required: true},
						emailAddress: {
							required: true,
							email: true
						},
						loginNewPassword: {
								minlength: 5
						},
						loginConfirmPassword: {
								minlength: 5,
								equalTo: "#loginNewPassword"
						}
			    	},
				    messages:{
					    firstName:"Please enter a bill to first name.",
					    lastName: "Please enter a bill to last name.",
					    loginNewPassword: {
							minlength: "(Must be 5 or more characters with no spaces)"
						},
						loginConfirmPassword: {
							equalTo: "Password must match confirm password."
						} 
					}
		         });
				$j("form[name='emailUsForm']").validate({
					ignore:".ignore",
				    rules:{
				    	subject: {required: true},
						firstName:{required: true},
						lastName:{required: true},
						emailAddress: {
							required: true,
							email: true
						},
				    	orderNumber: {
				    	      required: function(element) {
					    	        return ($j('[name="address"]').val().length<1)&&
					    	        	   ($j('[name="city"]').val().length<1)&&
					    	        	   ($j('[name="state"]').val().length<1)&&
					    	        	   ($j('[name="zip"]').val().length<1) ;
					    	      },
					    	   minlength: 8   
					    	},
				    	address: {
				    	      required: function(element) {
				    	        return $j('[name="orderNumber"]').val().length<1 ;
				    	      }
				    	},
				    	city:  {required: function(elementCity) {
			    	        return $j('[name="orderNumber"]').val().length<1 ;
			    	      }},
				    	state:  {required: function(elementState) {
			    	        return $j('[name="orderNumber"]').val().length<1 ;
			    	      }},
				    	zip:  {required: function(elementZip) {
			    	        return $j('[name="orderNumber"]').val().length<1 ;
			    	      }},			    	
				    	adjReqOrderNumber: {required: function(element) {
			    	        return ($j('[name="adjReqAddress"]').val().length<1)&&
		    	        	   ($j('[name="adjReqCity"]').val().length<1)&&
		    	        	   ($j('[name="adjReqState"]').val().length<1)&&
		    	        	   ($j('[name="adjReqZip"]').val().length<1)&&
		    	        	   ($j('[name="adjustmentRequested"]').val().length<1);
			    	        },
					    	   minlength: 8
				    	},
				    	adjReqAddress: {required: function(elementReqAddress) {
			    	        return $j('[name="adjReqOrderNumber"]').val().length<1 ;
			    	      }},
				    	adjReqCity: {required: function(elementReqCity) {
			    	        return $j('[name="adjReqOrderNumber"]').val().length<1 ;
			    	      }},
				    	adjReqState: {required: function(elementReqState) {
			    	        return $j('[name="adjReqOrderNumber"]').val().length<1 ;
			    	      }},
				    	adjReqZip: {required: function(elementReqZip) {
			    	        return $j('[name="adjReqOrderNumber"]').val().length<1 ;
			    	      }},
				    	adjustmentRequested: {required: function(elementAdjRequested) {
			    	        return $j('[name="adjReqOrderNumber"]').val().length<1 ;
			    	      }},
			    	    reqAddedAddress: {required: true},
				    	reqAddedCity: {required: true},
				    	reqAddedState: {required: true},
				    	reqAddedZip: {required: true},
				    	blueBoxNbr: {required: function(elementBlueBox){
				    		return ($j('[name="reqRemovedAddress"]').val().length<1)&&
				    		      ($j('[name="reqRemovedCity"]').val().length<1)&&
				    		      ($j('[name="reqRemovedState"]').val().length<1)&&
				    		      ($j('[name="reqRemovedZip"]').val().length<1);
				    	  }
				    	},
				    	reqRemovedAddress: {required: function(elementReqRemAddress){
				    		return $j('[name = "blueBoxNbr"]').val().length<1;
				    	 }
				    	},
				    	reqRemovedCity: {required: function(elementReqRemCity){
				    		return $j('[name = "blueBoxNbr"]').val().length<1;
				    	 }
				    	},
				    	reqRemovedState: {required: function(elementReqRemState){
				    		return $j('[name = "blueBoxNbr"]').val().length<1;
				    	 }
				    	},
				    	reqRemovedZip: {required: function(elementReqRemZip){
				    		return $j('[name = "blueBoxNbr"]').val().length<1;
				    	 }
				    	},
				    	subscribe: {required : true},
				    	ebSubChkBx :{required : true},
						formerAddress: {required : true},
					    formerCity: {required : true},
					    formerState: {required : true},
					    formerZip: {required : true},
						newAddress: {required : true},
					    newCity: {required : true},
					    newState: {required : true},
					    newZip: {required : true},
						newPhoneNbr: {phonevalid : true},				    	
				    	retPhoneNbr: {phonevalid: true},
				    	webSitePhoneNbr: {phonevalid: true},
						ebFriendsNbr: {
							required : true,
							minlength: 9
						},
						ebFriendsAddress: {required : true},
					    ebFriendsCity: {required : true},
					    ebFriendsState: {required : true},
					    ebFriendsZip: {required : true},
					    ebFriendsPhoneNbr: {phonevalid : true},
				    	ebOtherPhoneNbr: {phonevalid: true},
				    	description:  {
							required: true, 
							maxlength:500
						}						
			    	},
				    messages:{
			    		subject:"Please enter a Subject.",
					    firstName:"Please enter a First name.",
					    lastName: "Please enter a Last name.",
					    emailAddress:{
					    		required:"Please enter an Email address",
					    		email: "Please enter a valid Email address"
			    	},
						orderNumber:{
							required:"Please enter a Order Number.",
							minlength: "Please enter a valid 8 digit Order number."
						},
					    address: "Please enter Address.",
					    city: "Please enter City.",
					    state: "Please enter State.",
					    zip: "Please enter Zip.",
					    adjReqOrderNumber:{
					    	required: "Please enter Order Number.",
							minlength: "Please enter a valid 8 digit Adjustment Request Order number."
					    	},
					    adjReqAddress: "Please enter Address.",
					    adjReqCity: "Please enter City.",
					    adjReqState: "Please enter State.",
					    adjReqZip: "Please enter Zip.",
					    adjustmentRequested: "Please enter Adjustment Requested.",
					    reqAddedAddress: "Please enter Address.",
					    reqAddedCity: "Please enter a City.",
					    reqAddedState: "Please enter a State.",
					    reqAddedZip: "Please enter a Zip.",
					    blueBoxNbr: "Please enter Blue Box Number.",
					    reqRemovedAddress: "Please enter Address.",
					    reqRemovedCity: "Please enter City.",
					    reqRemovedState: "Please enter State.",
					    reqRemovedZip: "Please enter Zip.",
					    subscribe: "Please select Subscribe or Unsubscribe",
					    ebSubChkBx: "Please select atlease one option.",
						formerAddress: "Please enter Address.",
					    formerCity: "Please enter a City.",
					    formerState: "Please enter a State.",
					    formerZip: "Please enter a Zip.",
						newAddress: "Please enter a Address.",
					    newCity: "Please enter a City.",
					    newState: "Please enter a State.",
					    newZip: "Please enter a Zip.",
						newPhoneNbr:	"Please enter a valid phone number.",
					    retPhoneNbr: "Please enter a valid Phone Number.",
					    webSitePhoneNbr: "Please enter a valid Phone Number.",
			    	    ebFriendsNbr:{
			    	    	required: "Please enter Eddie Bauer Friends Number.",
			    	    	minlength: "Please enter a valid 9 digit Eddie Bauer Friends Number."
			    	    },
						ebFriendsAddress: "Please enter Address.",
					    ebFriendsCity: "Please enter a City.",
					    ebFriendsState: "Please enter a State.",
					    ebFriendsZip: "Please enter a Zip.",
					    ebFriendsPhoneNbr: "Please enter a valid Phone Number.",					    
					    ebOtherPhoneNbr: "Please enter a valid Phone Number.",
						description:{
								required: "Please enter a description.",
								maxlength: "Sorry, there is a 500 character maximum for the message field. Please amend your message."
						}					    
					}
		         });
				/*$j("#zipCode").blur(function() {
					var city = $("#city");
					var countrycode = $("#countryCode").val();
					//var countrycode = "US";
					if (!city.val() && $(this).valid()) {
						$.getJSON("http://www.geonames.org/postalCodeLookupJSON?&country="+ countrycode +"&callback=?", {postalcode: this.value }, function(response) {
							if (!city.val() && response && response.postalcodes.length && response.postalcodes[0].placeName) {
								city.val(response.postalcodes[0].placeName);
							}
						})
					}
				}); */
				
				$j("form[name='wishlistemail']").validate({
				    rules:{
						
						userFirstName:{required: true},
						userLastName:{required: true},
						userEmailAddress: {
							required: true,
							email: true
						},
						description:  {
							recipientsEmailAddress: true, 
							email:true
						}
			    	},
				    messages:{
					   
			    		userFirstName:"Please enter a first name.",
					    userLastName: "Please enter a last name.",
					    userEmailAddress:{
					    		required:"Please enter an email address",
					    		email:"Please enter a valid email address"
			    	},
			    	recipientsEmailAddress:{
								required: "Please enter at least one email address for the recipient(s)",
								email: "Please enter a valid email address for the recipient(s)"
						}
					}
		         });

				
				
				$j("form[name='storelocator']").validate({
					focusInvalid: true,
				    rules:{
						txtZipcode:  {
							required: true
						}
					},
				    messages:{
						txtZipcode:"Please enter a valid Zip/Postal code."
					    
					}
				});
});
