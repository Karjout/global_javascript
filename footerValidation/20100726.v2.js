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
                  phone:      {required: true,phonevalid: true},
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
                  phone:      "Please enter a bill to daytime or evening phone number.",
                  eveningPhone:     "Please enter a valid evening phone number.",
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
                                    phone:      {required: true,phonevalid: true},
                                    eveningPhone: {phonevalid: true}
                        },
                            messages:{
                                  firstName:"Please enter a bill to first name.",
                                  lastName: "Please enter a bill to last name.",
                                  address1: "Please enter a bill to address.",
                                  city: "Please enter a bill to city.",
                                    state: "Please select a bill to state.",
                                    zipCode: "Please enter a valid to postal code.",
                                    countryCode: "Please select a bill to country.",
                                    phone:      "Please enter a bill to daytime or evening phone number.",
                                    eveningPhone:     "Please enter a valid evening phone number."
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
                                    phone:      {required: true,phonevalid: true},
                                    eveningPhone: {phonevalid: true}
                        },
                            messages:{
                                  firstName:"Please enter a ship to first name.",
                                  lastName: "Please enter a ship to last name.",
                                  address1: "Please enter a ship to address.",
                                  city: "Please enter a ship to city.",
                                    state: "Please select a ship to state.",
                                    zipCode: "Please enter a valid to postal code.",
                                    countryCode: "Please select a ship to country.",
                                    phone:      "Please enter a  to daytime or evening phone number.",
                                    eveningPhone:     "Please enter a valid evening phone number."
                                        
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
                                    phone:      {required: true,phonevalid: true},
                                    eveningPhone: {phonevalid: true}
                        },
                            messages:{
                                  firstName:"Please enter a bill to first name.",
                                  lastName: "Please enter a bill to last name.",
                                  address1: "Please enter a bill to address.",
                                  city: "Please enter a bill to city.",
                                    state: "Please select a bill to state.",
                                    zipCode: "Please enter a valid to postal code.",
                                    countryCode: "Please select a bill to country.",
                                    phone:      "Please enter a bill to daytime or evening phone number.",
                                    eveningPhone:     "Please enter a valid evening phone number."
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
                                    phone:      {
                                                required: true,
                                                phonevalid: true
                                    },
                                    eveningPhone: {phonevalid: true}
                        },
                            messages:{
                                  firstName:"Please enter a bill to first name.",
                                  lastName: "Please enter a bill to last name.",
                                  address1: "Please enter a bill to address.",
                                  city: "Please enter a bill to city.",
                                    state: "Please select a bill to state.",
                                    zipCode: "Please enter a valid to postal code.",
                                    countryCode: "Please select a bill to country.",
                                    phone:      "Please enter a bill to daytime or evening phone number.",
                                    eveningPhone:     "Please enter a valid evening phone number."
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
                            rules:{
                                    subject: {required: true},
                                    firstName:{required: true},
                                    lastName:{required: true},
                                    emailAddress: {
                                          required: true,
                                          email: true
                                    },
                                    description:  {
                                          required: true, 
                                          maxlength:500
                                    },
                                    phone:      {phonevalid: true}
                        },
                            messages:{
                                  subject:"Please enter a subject.",
                                  firstName:"Please enter a first name.",
                                  lastName: "Please enter a last name.",
                                  emailAddress:{
                                          required:"Please enter an email address",
                                          email:"Please enter a valid email address"
                        },
                                    description:{
                                                required: "Please enter a description.",
                                                maxlength: "Sorry, there is a 500 character maximum for the message field. Please amend your message."
                                    },
                                    phone:      "Please enter a phone number."
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

                        $j("form[name='paymentForm']").validate({                               
                            rules:{
                                    ccType:{required: true},
                                    ccNumber:{required: true},
                                    ccMonth:{required: true},
                                    ccYear:{required: true},
                                    ccSecurityCode:{required: true}
                              },
                            messages:{
                                    ccType:"Please select a \"card type\" from the drop-down menu.",
                                    ccNumber:"Please fill in the \"credit card number\" field.",
                                    ccMonth:"Please select card's \"expire month\" from the drop-down menu.",
                                    ccYear:"Please select card's \"expire year\" from the drop-down menu.",
                                    ccSecurityCode:"Please fill in the \"card verification number\" field."
                                  
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

