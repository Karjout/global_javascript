global.jquery.utils.zoomImage = new Object({
	init : function() {			
		// Zoom	
		if (jQuery.browser.msie  && parseInt(jQuery.browser.version, 10) === 7) {
		  	IE7Flag = true;			   
		} else {
			IE7Flag = false;
		}
		if(!IE7Flag){
			jQuery(".zoomIcon").mouseenter(function(){
				var eleTrigger = jQuery(this);
				eleTrigger.zoomFlag = 'false';
				//get image src and size
				if(eleTrigger.zoomFlag == 'false'){// animation not running go ahead and zoom image	
					eleTrigger.zoomFlag = 'true'; //set flag true and start animation				
					var zoomImage = jQuery(this);		
					var position = zoomImage.offset();							
					imageTagert = jQuery(this).closest('div.item').find('.imageProduct');
					imageSrc = jQuery(imageTagert).attr('rel');							
					imagePosX = jQuery(imageTagert).offset().left-11;	
					imagePosY = jQuery(imageTagert).offset().top-11;
					imageWidth = jQuery(imageTagert).width();
					imageHeight = jQuery(imageTagert).height();	
					jQuery('.zoomImageProduct').detach();	
					var zoomImageProduct = jQuery("<div class='zoomImageProduct'><img name='ZoomProduct' src='"+imageSrc+"'/></div>");
					zoomImage.append(zoomImageProduct);
					zoomImageHeight = zoomImageProduct.height();
					zoomImageWidth = zoomImageProduct.width();					
					jQuery('.zoomImageProduct').css({height: 0+'px' , width: 0+'px', border:'1px solid #ccc'});
					jQuery('.zoomImageProduct').animate({ height: zoomImageHeight+'px' , width: zoomImageWidth+'px' , border:'1px solid #ccc', opacity: 1},500, function(){		
						eleTrigger.zoomFlag = 'false'; // reset flag								
					});					
				}
		    }).mouseleave(function(){		    	
		    	 jQuery('.zoomImageProduct').dequeue().stop().animate({ height: "toggle" , width:"toggle", border:'1px solid #ccc', opacity: 0},500, function(){
					jQuery('.zoomImageProduct').detach();						
				 });		    	
		    });	
		
		}else{
			// if IE 7
			jQuery(".zoomIcon").mouseenter(function(){
				var eleTrigger = jQuery(this);
				eleTrigger.zoomFlag = 'false';
				//get image src and size
				if(eleTrigger.zoomFlag == 'false'){// animation not running go ahead and zoom image	
					eleTrigger.zoomFlag = 'true'; //set flag true and start animation				
					var zoomImage = jQuery(this);		
					var position = zoomImage.offset();							
					imageTagert = jQuery(this).closest('div.item').find('.imageProduct');
					imageSrc = jQuery(imageTagert).attr('rel');							
					imagePosX = jQuery(imageTagert).offset().left-11;	
					imagePosY = jQuery(imageTagert).offset().top-11;
					imageWidth = jQuery(imageTagert).width();
					imageHeight = jQuery(imageTagert).height();	
					jQuery('.zoomImageProduct').detach();	
					var zoomImageProduct = jQuery("<div class='zoomImageProduct'><img name='ZoomProduct' src='"+imageSrc+"'/></div>");
					jQuery('#content_wrapper').append(zoomImageProduct);											
					zoomImageHeight = zoomImageProduct.height();
					zoomImageWidth = zoomImageProduct.width();
					jQuery('.zoomImageProduct').css({height: 0+'px' , width: 0+'px', border:'1px solid #ccc', left: imagePosX+'px', top: imagePosY+'px', position: 'absolute'});
					jQuery('.zoomImageProduct').animate({ height: zoomImageHeight+'px' , width: zoomImageWidth+'px' , border:'1px solid #ccc'},500, function(){		
							eleTrigger.zoomFlag = 'false'; // reset flag								
						});
					
				}
		    }).mouseleave(function(){		    	
		    	jQuery(".zoomImageProduct").mouseenter(function(){}).mouseleave(function(){
					jQuery('.zoomImageProduct').dequeue().stop().animate({ height: "toggle" , width:"toggle", border:'1px solid #ccc'},500, function(){
						jQuery('.zoomImageProduct').detach();						
					});
				});	    	
		    });	
		
		}
		
	
	}
});