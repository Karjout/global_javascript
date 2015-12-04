$j(document).ready(function(){
    jQuery.validator.addMethod("basicpunc", function(value, element) {
        return this.optional(element) || /^[a-z0-9-.,()'\"\s\?\$\!]+$/i.test(value);
    }, "Letters or punctuation only please");

    /*$j("form[name='DeliveryExtrasForm']").validate({
        rules: {
           giftNumber:  { basicpunc: true }
        },
        messages:  {
           giftNumber: "Please enter only letters, numbers and basic punctuation."
        }
    });*/

    $j("form[name='giftCardItemForm']").validate({
        rules:{
            nameTo: { required: true },
            nameFrom:{ required: true },
            amount: { required: true },
            firstName: { required: true },
            lastName: { required: true },
            emailAddress: { required: true, email: true },
            reEmailAddress: {   required: true,
            					email: true,
            					equalTo:"#emailAddress" },
    		message:{ basicpunc: true }
    	},
    	messages:{
            nameTo: "Please enter the name of your recipient.",
            nameFrom: "Please enter your name.",
            amount: "Please enter an amount.",
            firstName: "Please enter your recipients First Name.",
            lastName: "Please enter your recipients Last Name.",
            emailAddress: {
			    required:"Please enter recipients email address.",
			    email:"Please enter a valid email address."
			},
			reEmailAddress:{
				required:"Please re-enter recipients email address.",
				equalTo:"Email addresses must match."
			},
    		message: "Please enter only letters, numbers and basic punctuation."
    	}
    });

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
		    firstName:"Please enter first name.",
		    lastName: "Please enter last name.",
		    address1: "Please enter address.",
		    city: "Please enter a city.",
		    zipCode: "Please enter a valid to postal code.",
			state: "Please select a state.",
			countryCode: "Please select a country.",
			phone:	"Please enter a daytime or evening phone number.",
			emailAddress: "Please enter a valid email address",
			dayphonevaild: "Please enter a valid daytime or evening phone number.",
			phone: "Please enter the Telephone Number associated with your credit card statement."
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
				createAccount_fname: "Please enter a First Name.",
				createAccount_lname: "Please enter a Last Name.",
				createAccount_email: "Please enter a valid email address",
				createAccount_pword: {
					required: "Please enter a password to create your new account. Your Password must be at least 5 Characters long with no spaces.",
					minlength: "Your password must be at least 5 characters long with no spaces."
				},
				createAccount_pword2 : {
					required: "Please re-enter your password to create your new account.",
					equalTo: "Password and Confirm Password must match."
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
						minlength : "Your password must be at least 5 characters long with no spaces."
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
			$j(".billingAddressInfo form[name='addAddressForm']").validate({
			    rules:{
					firstName:{required: true},
					lastName:{required: true},
					address1: {required: true},
					city: {required: true},
					state: {required: true},
					zipCode: {required: true},
					countryCode:  {required: true},
					phone:	 {required: true,dayphonevalid: true},
					eveningPhone: {dayphonevalid: true},
					emailAddress: { required: true }
		    	},
			    messages:{
				    firstName:"Please enter first name as it appears on your credit card.",
				    lastName: "Please enter last name as it appears on your credit card.",
				    address1: "Please enter the Street Address that appears on your credit card statement.",
				    city: "Please enter the City that appears on your credit card statement.",
					state: "Please select the State or Province that appears on your credit card statement.",
					zipCode: "Please enter the Zip Code that appears on your credit card statement.",
					countryCode: "Please select the Country associated with your credit card billing address.",
					emailAddress: "Please enter an email address.",
					dayphonevaild: "Please enter a valid daytime or evening phone number.",
					phone: "Please enter the Telephone Number associated with your credit card statement.",
					eveningPhone:	"Please enter a valid evening phone number."
				},
            invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                    if (errors) {
                        $j("div#globalErrorFE").show();
                        $j(window).scrollTop(0);
                        } else {
                        $j("div#globalErrorFE").hide();
                    }
            },
           submitHandler: function(form) {
   	                form.submit();
            }
     });
			$j(".shippingAddressInfo form[name='addAddressForm']").validate({

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
				    firstName:"Please enter the First Name of your recipient",
				    lastName: "Please enter the Last Name of your recipient",
				    address1: "Please enter the recipients Address",
				    city: "Please enter the recipients City",
					state: "Please select the recipients State",
					zipCode: "Please enter a valid ZIP code or Postal Code",
					countryCode: "Please select the name of the recipients Country",
                    dayphonevaild: "Please enter a valid daytime or evening phone number.",
					phone: "Please enter a telephone number where we can contact the recipient, if necessary, about the shipment.",
					eveningPhone:	"Please enter a valid evening phone number."
				},
				invalidHandler: function(form, validator) {
                    var errors = validator.numberOfInvalids();
                        if (errors) {
                            $j("div#globalErrorFE").show();
                            $j(window).scrollTop(0);
                            } else {
                            $j("div#globalErrorFE").hide();
                        }
                }
	         });
            $j(".billingAddressInfo form[name='editAddressForm']").validate({
			    rules:{
					firstName:{required: true},
					lastName:{required: true},
					address1: {required: true},
					city: {required: true},
					state: {required: true},
					zipCode: {required: true},
					countryCode:  {required: true},
					phone:	 {required: true,dayphonevalid: true},
					eveningPhone: {dayphonevalid: true},
					emailAddress: {required: true}
		    	},
			    messages:{
				    firstName:"Please enter first name as it appears on your credit card.",
				    lastName: "Please enter last name as it appears on your credit card.",
				    address1: "Please enter the Street Address that appears on your credit card statement.",
				    city: "Please enter the City that appears on your credit card statement.",
					state: "Please select the State or Province that appears on your credit card statement.",
					zipCode: "Please enter the Zip Code that appears on your credit card statement.",
					countryCode: "Please select the Country associated with your credit card billing address.",
					emailAddress: "Please enter an email address.",
					dayphonevaild: "Please enter a valid daytime or evening phone number.",
					phone: "Please enter the Telephone Number associated with your credit card statement.",
					eveningPhone:	"Please enter a valid evening phone number."
				},
                invalidHandler: function(form, validator) {
                    var errors = validator.numberOfInvalids();
                        if (errors) {
                            $j("div#globalErrorFE").show();
                            $j(window).scrollTop(0);
                            } else {
                            $j("div#globalErrorFE").hide();
                        }
                }
	         });
            $j(".shippingAddressInfo form[name='editAddressForm']").validate({
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
				    firstName:"Please enter the First Name of your recipient",
				    lastName: "Please enter the Last Name of your recipient",
				    address1: "Please enter the recipients Address",
				    city: "Please enter the recipients City",
					state: "Please select the recipients State",
					zipCode: "Please enter a valid ZIP code or Postal Code",
					countryCode: "Please select the name of the recipients Country",
                    dayphonevaild: "Please enter a valid daytime or evening phone number.",
					phone: "Please enter a telephone number where we can contact the recipient, if necessary, about the shipment.",
					eveningPhone:	"Please enter a valid evening phone number."
				},
                invalidHandler: function(form, validator) {
                    var errors = validator.numberOfInvalids();
                        if (errors) {
                            $j("div#globalErrorFE").show();
                            $j(window).scrollTop(0);
                            } else {
                            $j("div#globalErrorFE").hide();
                        }
                }
	         });
	         $j(".billingAddressInfo form[name='AddUpdateOrDeleteAddressForm']").validate({
	 		    rules:{
	 				firstName:{required: true},
	 				lastName:{required: true},
	 				address1: {required: true},
	 				city: {required: true},
	 				state: {required: true},
	 				zipCode:  {required: true},
	 				countryCode:  {required: true},
	 				phone:	 {required: true,dayphonevalid: true},
					eveningPhone: {dayphonevalid: true},
	 				emailAddress: {required: true}
	 	    	},
	 		    messages:{
	 	    		firstName:"Please enter first name as it appears on your credit card.",
				    lastName: "Please enter last name as it appears on your credit card.",
				    address1: "Please enter the Street Address that appears on your credit card statement.",
				    city: "Please enter the City that appears on your credit card statement.",
					state: "Please select the State or Province that appears on your credit card statement.",
					zipCode: "Please enter the Zip Code that appears on your credit card statement.",
					countryCode: "Please select the Country associated with your credit card billing address.",
					emailAddress: "Please enter an email address.",
					dayphonevaild: "Please enter a valid daytime or evening phone number.",
					phone: "Please enter the Telephone Number associated with your credit card statement.",
					eveningPhone:	"Please enter a valid evening phone number."
	 			},
                 invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                    if (errors) {
                        $j("div#globalErrorFE").show();
                        $j(window).scrollTop(0);
                        } else {
                        $j("div#globalErrorFE").hide();
                    }
            }
	          });
            $j(".shippingAddressInfo form[name='AddUpdateOrDeleteAddressForm']").validate({
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
	 	    		firstName:"Please enter the First Name of your recipient",
				    lastName: "Please enter the Last Name of your recipient",
				    address1: "Please enter the recipients Address",
				    city: "Please enter the recipients City",
					state: "Please select the recipients State",
					zipCode: "Please enter a valid ZIP code or Postal Code",
					countryCode: "Please select the name of the recipients Country",
                     dayphonevaild: "Please enter a valid daytime or evening phone number.",
                     phone: "Please enter a telephone number where we can contact the recipient, if necessary, about the shipment.",
					eveningPhone:	"Please enter a valid evening phone number."
	 			},
                 invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                    if (errors) {
                        $j("div#globalErrorFE").show();
                        $j(window).scrollTop(0);
                        } else {
                        $j("div#globalErrorFE").hide();
                    }
            }
	          });
	         $j(".billingAddressInfo form[name='addUpdateDeleteAddressForm']").validate({
				    rules:{
						firstName:{required: true},
						lastName:{required: true},
						address1: {required: true},
						city: {required: true},
						state: {required: true},
						zipCode: {required: true},
						countryCode:  {required: true},
						phone:	 {required: true,dayphonevalid: true},
						eveningPhone: {dayphonevalid: true},
						emailAddress: {required: true}
			    	},
				    messages:{
			    		firstName:"Please enter first name as it appears on your credit card.",
					    lastName: "Please enter last name as it appears on your credit card.",
					    address1: "Please enter the Street Address that appears on your credit card statement.",
					    city: "Please enter the City that appears on your credit card statement.",
						state: "Please select the State or Province that appears on your credit card statement.",
						zipCode: "Please enter the Zip Code that appears on your credit card statement.",
						countryCode: "Please select the Country associated with your credit card billing address.",
						emailAddress: "Please enter an email address.",
						dayphonevaild: "Please enter a valid daytime or evening phone number.",
					    phone: "Please enter the Telephone Number associated with your credit card statement.",
						eveningPhone:	"Please enter a valid evening phone number."
					},
                 invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                    if (errors) {
                        $j("div#globalErrorFE").show();
                        $j(window).scrollTop(0);
                        } else {
                        $j("div#globalErrorFE").hide();
                    }
            }
		         });
			$j(".shippingAddressInfo form[name='addUpdateDeleteAddressForm']").validate({
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
				    firstName:"Please enter the First Name of your recipient",
				    lastName: "Please enter the Last Name of your recipient",
				    address1: "Please enter the recipients Address",
				    city: "Please enter the recipients City",
					state: "Please select the recipients State",
					zipCode: "Please enter a valid ZIP code or Postal Code",
					countryCode: "Please select the name of the recipients Country",
                    dayphonevaild: "Please enter a valid daytime or evening phone number.",
					phone: "Please enter a telephone number where we can contact the recipient, if necessary, about the shipment.",
					eveningPhone:	"Please enter a valid evening phone number."
				},
                invalidHandler: function(form, validator) {
                var errors = validator.numberOfInvalids();
                    if (errors) {
                        $j("div#globalErrorFE").show();
                        $j(window).scrollTop(0);
                        } else {
                        $j("div#globalErrorFE").hide();
                    }
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
					submitHandler: function(form) {
						createEmailPost();
					   form.submit();
					},
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

				if( $j('body').hasClass('STORE-LOCATOR-AND-HOURS') ){

				}else {
					if($j('input:submit').hasClass('error')) {
						$j('input:submit').removeClass('error');
					} else {
					$j("form").find("dd.error").next().children("input:text").addClass("error");
					$j("form").find("dd.error").next().children("select").addClass("error");
					$j("form").find("dd.error").parent().next().children("input:text").addClass("error");
				}
		}
				if(jQuery('.SHOPPING-BAG #breadcrumb .globalError')){
				    jQuery('.SHOPPING-BAG #globalErrorFE .globalError').css('display','none')
				}
				
				/* strip spaces from promo codes */
                if($j(".DELIVERY--EXTRAS input[name='promotionOrSavingsCard']").length){
				    $j(".DELIVERY--EXTRAS input[name='promotion'], .DELIVERY--EXTRAS input[name='continue']").click(function(){
				        var promoValue = $j(".DELIVERY--EXTRAS input[name='promotionOrSavingsCard']").val().replace(/ /g,'');
                        $j(".DELIVERY--EXTRAS input[name='promotionOrSavingsCard']").val(promoValue);
				    });
                }
				 /* when you hit enter on the promo field, click 'apply to order' button automatically */
				 $j("input[name='promotionOrSavingsCard']").keypress(function(e) {
					    if(e.keyCode == 13) {
					    	e.preventDefault();
					        $j("input[name='promotion']").click();
					    }
					});

});
