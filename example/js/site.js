(function($) {
	var DragAndDrop = function( params, target ){
		/*GET INIT PARAMS*/
		var uploadUrl = params.uploadurl;
		var completeCallBack = params.complete;
		var uploadBox = target;
		var numFiles = 0;
		
		if( uploadUrl ) {
			init();
		}

		function init(){
			addEventListeners();
		}
		
		function addEventListeners(){
			uploadBox.bind("dragexit", dragExitHandler );
			uploadBox.bind("dragleave", dragExitHandler );
			uploadBox.bind("dragover", dragOverHandler );
			uploadBox.bind("drop", dropHandler );
		}
		
		function dragOverHandler( event ){
			killEvent( event );
			uploadBox.html("<h2>Now drop!</h2>");
			uploadBox.addClass("drag-over");
		}
		
		function dragExitHandler( event ){
			killEvent( event );
			uploadBox.html("<h2>Drag image files here to Upload</h2>");
			uploadBox.removeClass("drag-over");
		}
	
		function dropHandler( event ){
			killEvent( event );
			uploadBox.html( "<h2>Uploading...</h2><div class='progress progress-striped active'> <div class='bar' style='width: 0%;'></div></div>" );
			uploadBox.removeClass("drag-over");
			uploadBox.addClass("uploading");
	
			var files = event.originalEvent.dataTransfer.files;
			var count = files.length;
			if( count > 0 ){
				numFiles = 0;
				for( var i = 0; i < count; i++ ){
					var file = files[i];
					uploadFile( file );
					numFiles++;
				}
				uploadBox.find( "h2" ).html( "Uploading " + numFiles );
			}
		}
		
		function uploadFile( file ){
			var xhr = new XMLHttpRequest();
			if( xhr.upload ){
				xhr.upload.addEventListener("progress", function( event ) {  
				    var percentageLoaded = parseInt(100 - (event.loaded / event.total * 100));
				    percentageLoaded = percentageLoaded / numFiles;
			    	uploadBox.find('.bar').css('width', percentageLoaded + "%" );
				}, false);
				 
				xhr.onreadystatechange = function( event ) {  
				    if( xhr.readyState == 4 ){  
				    	uploadBox.find('.bar').css('width', (100 / numFiles) + "%" );
				    	uploadBox.find( "h2" ).html( "Uploading " + numFiles );
					    numFiles--;
				    	if( numFiles == 0 ){
				    		uploadBox.html("<h2>Uploads Complete</h2>");
				    		setTimeout( function(){
					    		if( completeCallBack ){
					    			completeCallBack.call();
					    		}
				    		},1000 );
				    	}
				    }  
				};  
					
				xhr.open("POST", uploadUrl, true);  
				xhr.setRequestHeader("X_FILENAME", file.name);
				xhr.send(file);  
			}  
		}
		
		function killEvent( event ){
			event.stopPropagation();
			event.preventDefault();
		}
		
		return target;
	}
	
	$.fn.dragDropUploader = function(params) {
		return new DragAndDrop( params, $(this) );

	};
})(jQuery);

