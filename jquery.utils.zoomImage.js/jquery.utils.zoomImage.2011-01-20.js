global.jquery.utils.zoomImage = new Object({
	init : function() {		
		var zoomImageFlag = 'false';
		// Zoom
			$j('.ticket_zoom_icon').live("mouseover", function(){
				//get image src and size
				if(zoomImageFlag == 'false'){// animation not running go ahead and zoom image	
					zoomImageFlag = 'true'; //set flag true and start animation	
					var zoomImage = $j(this);
					var position = zoomImage.offset();			
					imageTagert = $j(this).closest('li').find('.imageProduct');
					imageSrc = $j(imageTagert).attr('src');	
					imagePosX = $j(imageTagert).offset().left-1;	
					imagePosY = $j(imageTagert).offset().top-1;
					imageWidth = $j(imageTagert).width();
					imageHeight = $j(imageTagert).height();		
					$j('.zoomImage').css({height: imageHeight, width: imageWidth, left: position.left, top:position.top});
					$j('.zoomImage').html("<img name='ZoomProduct' src='"+imageSrc+"'/>");
			   		$j('.zoomImage').dequeue().stop().animate({ height: "toggle" , width:"toggle", opacity: 1 },500, function(){				
						zoomImageFlag = 'false'; // reset flag
						//ZoomCheck = setInterval("zoomCheck()", 1000);
			   		});
				}
			    
			});

			$j('.ticket_zoom_icon_WishList').live("mouseover", function(){
				//get image src and size
				if(zoomImageFlag == 'false'){// animation not running go ahead and zoom image	
					zoomImageFlag = 'true'; //set flag true and start animation	
					var zoomImage = $j(this);
					var position = zoomImage.offset();			
					imageTagert = $j(this).closest('dl').find('.cmPoseImg');
					imageSrc = $j(imageTagert).attr('src');	
					imagePosX = $j(imageTagert).offset().left-1;	
					imagePosY = $j(imageTagert).offset().top-1;
					imageWidth = $j(imageTagert).width();
					imageHeight = $j(imageTagert).height();		
					$j('.zoomImage').css({height: imageHeight, width: imageWidth, left: position.left, top:position.top});
					$j('.zoomImage').html("<img name='ZoomProduct' src='"+imageSrc+"'/>");
			   		$j('.zoomImage').dequeue().stop().animate({ height: "toggle" , width:"toggle", opacity: 1 },500, function(){				
						zoomImageFlag = 'false'; // reset flag
						//ZoomCheck = setInterval("zoomCheck()", 1000);
			   		});
				}
			    
			});
			
			$j(".zoomImage").live("mouseout", function(){
				if(zoomImageFlag == 'false'){	
					zoomImageFlag = 'true';
					$j('.zoomImage').dequeue().stop().animate({ height: "toggle" , width:"toggle", opacity: 0 },500, function(){				
						zoomImageFlag = 'false'; // reset flag
						//clearInterval(ZoomCheck);
			   		});			
				}
			});
	}
});