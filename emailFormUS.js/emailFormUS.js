var BaseEmailURL = "https://admin.instantservice.com/servlet/MailMessagePost?";
   var OracleEmailOptions = {
	"AccountID": "7841",
	"OracleId": "ai",
	"departments": [{
		"ID": "52745",
		"OracleId": "di",
		"Title": "Order Status",
		"Name": "Eddie Bauer Order Status Inquiry",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text"},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text"},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text"},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"},			
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text"},
			"CustomerPhone": { "OracleId": "phone", "formId": "phoneNbr", "value": "", "type": "text"},
			"CustomerOrderNumber": { "OracleId": "optionaldata1", "formId": "orderNumber", "value": "", "type": "text"},
			"CustomerAddress": { "OracleId": "optionaldata2", "formId": "address", "value": "", "type": "text"},
			"CustomerCity": { "OracleId": "optionaldata3", "formId": "city", "value": "", "type": "text"},
			"CustomerState": { "OracleId": "optionaldata4", "formId": "state", "value": "", "type": "dropdown"},
			"CustomerZipCode": { "OracleId": "optionaldata5", "formId": "zip", "value": "", "type": "text"}						
		}
	},
	{
		"ID": "52746",
		"OracleId": "di",
		"Title": "Adjustments",
		"Name": "Adjustment Request",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text"},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text"},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text"},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"},			
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text"},
			"CustomerOrderNumber": { "OracleId": "optionaldata1", "formId": "adjReqOrderNumber", "value": "", "type": "text"},
			"CustomerAddress": { "OracleId": "optionaldata2", "formId": "adjReqAddress", "value": "", "type": "text"},
			"CustomerCity": { "OracleId": "optionaldata3", "formId": "adjReqCity", "value": "", "type": "text"},
			"CustomerState": { "OracleId": "optionaldata4", "formId": "adjReqState", "value": "", "type": "dropdown"},
			"CustomerZipCode": { "OracleId": "optionaldata5", "formId": "adjReqZip", "value": "", "type": "text"},			
			"CustomerPromoCode": { "OracleId": "optionaldata6", "formId": "adjReqPromoCode", "value": "", "type": "text"},
			"CustomerAdjustment": { "OracleId": "optionaldata7", "formId": "adjustmentRequested", "value": "", "type": "text"}				
		}
	},
	{
		"ID": "52747",
		"OracleId": "di",
		"Title": "Catalog Mailing List",
		"Name": "Mailing List Request",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text"},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text"},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text"},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"},			
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text"},			
			"CustomerAddress": { "OracleId": "optionaldata2", "formId": "reqAddedAddress", "value": "", "type": "text"},
			"CustomerCity": { "OracleId": "optionaldata3", "formId": "reqAddedCity", "value": "", "type": "text"},
			"CustomerState": { "OracleId": "optionaldata4", "formId": "reqAddedState", "value": "", "type": "dropdown"},
			"CustomerZipCode": { "OracleId": "optionaldata5", "formId": "reqAddedZip", "value": "", "type": "text"},			
			"CustomerCatalogRequestAdd": { "OracleId": "optionaldata8", "formId": "ebReqAdded", "value": "", "type": "radio", "indexId":"0"},	
			"CustomerCatloagRequestRemove": { "OracleId": "optionaldata9", "formId": "ebReqRemove", "value": "", "type": "radio", "indexId":"0"},	
			"CustomerCatalogNumber": { "OracleId": "optionaldata10", "formId": "blueBoxNbr", "value": "", "type": "text"},
			"CustomerRemoveAddress": { "OracleId": "optionaldata22", "formId": "reqRemovedAddress", "value": "", "type": "text"},
			"CustomerRemoveCity": { "OracleId": "optionaldata23", "formId": "reqRemovedCity", "value": "", "type": "text"},
			"CustomerRemoveState": { "OracleId": "optionaldata24", "formId": "reqRemovedState", "value": "", "type": "dropdown"},
			"CustomerRemoveZipCode": { "OracleId": "optionaldata25", "formId": "reqRemovedZip", "value": "", "type": "text"}
		}
	},
	{
		"ID": "52748",
		"OracleId": "di",
		"Title": "Email - Subscribe/Unsubscribe",
		"Name": "Email Subscription Request",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text", "indexId":""},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text", "indexId":""},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text", "indexId":""},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"," indexId":""},			
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text", "indexId":""},
			"CustomerSubscribe": { "OracleId": "optionaldata11", "formId": "subscribe", "value": "", "type": "radio", "indexId":"0"},	
			"CustomerUnSubscribe": { "OracleId": "optionaldata12", "formId": "subscribe", "value": "", "type": "radio", "indexId":"1"},
			"CustomeEddieEmail": { "OracleId": "optionaldata13", "formId": "ebSubChkBx", "value": "", "type": "checkbox", "indexId":"0"},
			"CustomeEddieFriendsEmail": { "OracleId": "optionaldata14", "formId": "ebSubChkBx", "value": "", "type": "checkbox", "indexId":"1"},
			"CustomeEddieEmailBoth": { "OracleId": "optionaldata15", "formId": "ebSubChkBx", "value": "", "type": "checkbox", "indexId":"2"}						
		}
	},
	{
		"ID": "52749",
		"OracleId": "di",
		"Title": "Address Change",
		"Name": "Address Change Request",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text"},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text"},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text"},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"},			
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text"},			
			"CustomerAddress": { "OracleId": "optionaldata2", "formId": "formerAddress", "value": "", "type": "text"},
			"CustomerCity": { "OracleId": "optionaldata3", "formId": "formerCity", "value": "", "type": "text"},
			"CustomerState": { "OracleId": "optionaldata4", "formId": "formerState", "value": "", "type": "dropdown"},
			"CustomerZipCode": { "OracleId": "optionaldata5", "formId": "formerZip", "value": "", "type": "text"},
			"CustomerNewAddress": { "OracleId": "optionaldata16", "formId": "newAddress", "value": "", "type": "text"},
			"CustomerNewCity": { "OracleId": "optionaldata17", "formId": "newCity", "value": "", "type": "text"},
			"CustomerNewState": { "OracleId": "optionaldata18", "formId": "newState", "value": "", "type": "dropdown"},
			"CustomerNewZipCode": { "OracleId": "optionaldata19", "formId": "newZip", "value": "", "type": "text"},
			"CustomerPhone": { "OracleId": "phone", "formId": "newPhoneNbr", "value": "", "type": "text"}
		}
	},
	{
		"ID": "52750",
		"OracleId": "di",
		"Title": "Product Information",
		"Name": "Eddie Bauer Product Info Request",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text"},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text"},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text"},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"},			
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text"},
			"CustomerItemNumber": { "OracleId": "optionaldata20", "formId": "itemNumber", "value": "", "type": "text"}
		}
	},
	{
		"ID": "52751",
		"OracleId": "di",
		"Title": "Return Information",
		"Name": "Return Information Request",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text"},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text"},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text"},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"},			
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text"},
			"CustomerPhone": { "OracleId": "phone", "formId": "retPhoneNbr", "value": "", "type": "text"},
			"CustomerOrderNumber": { "OracleId": "optionaldata1", "formId": "retOrderNbr", "value": "", "type": "text"}				
		}
	},
	{
		"ID": "52752",
		"OracleId": "di",
		"Title": "Website Issues",
		"Name": "Website Inquiry",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text"},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text"},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text"},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"},	
			"CustomerPhone": { "OracleId": "phone", "formId": "webSitePhoneNbr", "value": "", "type": "text"},				
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text"}
		}
	},
	{
		"ID": "52753",
		"OracleId": "di",
		"Title": "Friends Rewards Program",
		"Name": "Eddie Bauer Friends Inquiry",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text"},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text"},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text"},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"},			
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text"},
			"CustomerPhone": { "OracleId": "phone", "formId": "phoneNbr", "value": "", "type": "text"},				
			"CustomerAddress": { "OracleId": "optionaldata2", "formId": "ebFriendsAddress", "value": "", "type": "text"},
			"CustomerCity": { "OracleId": "optionaldata3", "formId": "ebFriendsCity", "value": "", "type": "text"},
			"CustomerState": { "OracleId": "optionaldata4", "formId": "ebFriendsState", "value": "", "type": "dropdown"},
			"CustomerZipCode": { "OracleId": "optionaldata5", "formId": "ebFriendsZip", "value": "", "type": "text"},				
			"CustomerFriendsNmuber": { "OracleId": "optionaldata21", "formId": "ebFriendsNbr", "value": "", "type": "text"}		
		}
	},
	{
		"ID": "52754",
		"OracleId": "di",
		"Title": "Gift Card/Certificate Issue",
		"Name": "Gift Card Issue",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text"},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text"},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text"},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"},			
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text"},	
			"CustomerOrderNumber": { "OracleId": "optionaldata1", "formId": "giftOrderNbr", "value": "", "type": "text"}	
		}
	},
	{
		"ID": "52755",
		"OracleId": "di",
		"Title": "Other",
		"Name": "Eddie Bauer General Inquiry",
		"Route": "",
		"Data": {
			"CustomerFirstName": { "OracleId": "fname", "formId": "firstName", "value": "", "type": "text"},
			"CustomerLastName": { "OracleId": "lname", "formId": "lastName", "value": "", "type": "text"},
			"CustomerEmailAddress": { "OracleId": "fromaddr", "formId": "emailAddress", "value": "", "type": "text"},
			"CustomerSubject": { "OracleId": "subject", "formId": "subject", "value": "", "type": "dropdown"},			
			"CustomerComments": { "OracleId": "mailmessagetext", "formId": "description", "value": "", "type": "text"},	
			"CustomerPhone": { "OracleId": "phone", "formId": "ebOtherPhoneNbr", "value": "", "type": "text"},
			"CustomerAddress": { "OracleId": "optionaldata2", "formId": "ebOtherAddress", "value": "", "type": "text"},
			"CustomerCity": { "OracleId": "optionaldata3", "formId": "ebOtherCity", "value": "", "type": "text"},
			"CustomerState": { "OracleId": "optionaldata4", "formId": "ebOtherState", "value": "", "type": "dropdown"},
			"CustomerZipCode": { "OracleId": "optionaldata5", "formId": "ebOtherZip", "value": "", "type": "text"}
		}
	}]
   }
   var departmentsCount = OracleEmailOptions.departments.length;
   
    Object.size = function(obj) {
	   var size = 0, key;
	   for (key in obj) {
		   if (obj.hasOwnProperty(key)) size++;
	   }
	   return size;
	};
	
	var createEmailPost = function(){		
		var SelectedDepartment = jQuery('#subject').val();		
		var EmailURLString = "";		
		if (SelectedDepartment != "" && departmentsCount >0){			
			for (D=0;D<=departmentsCount-1;D++){
				if (OracleEmailOptions.departments[D].Name == SelectedDepartment){					
					var departmentID = OracleEmailOptions.departments[D];
					var departmentData = departmentID.Data;
					var departmentRoute = departmentID.Route;
					var checkDataLength = Object.size(departmentData);					
					//loop over data items to get value pairs				
					for(var index in departmentData) {				 
						var CustomerData = departmentData[index];
						var CustomerFormData = jQuery("#"+CustomerData.formId).val();
						var CustomerFormType = CustomerData.type;						
						if(CustomerFormData !="" && typeof CustomerFormData !== "undefined"){							
							if (CustomerFormType == "text"){
								EmailURLString = EmailURLString + "&" + CustomerData.OracleId + "=" + CustomerFormData;	
							}
							if (CustomerFormType == "dropdown"){
								EmailURLString = EmailURLString + "&" + CustomerData.OracleId + "=" + CustomerFormData;	
							}
						}						
						if(CustomerFormType =="radio" || CustomerFormType =="checkbox"){
							if (CustomerFormType == "radio"){								
								var radios = jQuery('input[name='+CustomerData.formId+']');								
								jQuery(radios).each(function(index){									
									if ( jQuery(this).is(":checked") && index == parseInt(CustomerData.indexId)){
										EmailURLString = EmailURLString + "&" + CustomerData.OracleId + "=yes";	
									}
								});	
							}else if (CustomerFormType == "checkbox"){									
								var boxes = jQuery('input[name='+CustomerData.formId+']');								
								jQuery(boxes).each(function(index){										
									if ( jQuery(this).is(":checked") && index == parseInt(CustomerData.indexId)){
										EmailURLString = EmailURLString + "&" + CustomerData.OracleId + "=yes";	
									}
								});							
							}
						}						
					}					
					//save post request to Oracle API in hidden input field
					var OracleURL = BaseEmailURL;
					var OralceAccountID = OracleEmailOptions.OracleId + "=" + OracleEmailOptions.AccountID;
					var OralceDepartmentID = "&" + OracleEmailOptions.departments[D].OracleId + "=" + OracleEmailOptions.departments[D].ID;
					var OralceSubjectID = "&subject=" + SelectedDepartment;
					OracleURL = OracleURL + OralceAccountID + OralceDepartmentID + OralceSubjectID + EmailURLString;					
					if (departmentRoute == ""){//route to Oracle 
						jQuery('#emailURL').val(encodeURI(OracleURL));	
						jQuery('#routeURL').val("");
					}else{
						jQuery('#emailURL').val("");	
						jQuery('#routeURL').val(encodeURI(departmentRoute));//route to other email address
					}
					return true;
				}
			};
		}	
	};        
		