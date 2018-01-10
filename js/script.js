$(function() {

	let mousedown = false;
	const gridParent = $('.the-grid');	
	const submit=$('.submit');
	const aspectRatio=$('.aspect-ratio');
	const toggleGrid=$('.toggle-grid');
	const download=$('.download');


	/** 
	* @description Toggles aspect ratio of the grid between 1:1 and 16:9 ratio
	*/
	function toggleAspectRatio() {
		let width= $('.the-grid').css('width');
		console.log('width before: '+width);
		if(width == '500px') {
			$('.the-grid').css('width','888px');
			console.log('width after: '+'888px');
		} else {
			$('.the-grid').css('width','500px');
			console.log('width after: '+'500px');	
		}
	}

	/**
	* @description Hover fills the grid blocks - MouseDown + Hover
	*/
	function HoverFill() {

		$('.the-grid').on('mousedown',function() {
			mousedown = true;
			console.log('mousedown: ' + mousedown );
			EnableHoverfill();
		});

		$('.the-grid').on('mouseup',function() {
			mousedown = false;
			console.log('mousedown: ' + mousedown );
			DisableHoverfill();
		});
 
		function EnableHoverfill() {
			$('.the-grid-box').mouseenter(function() {
				console.log('hovering');
				$(this).css('background',$('#color-picker').val());	
			});	
		}

		function DisableHoverfill() {
			console.log('Diabling hover event');
			$('.the-grid-box').off('mouseenter');
		}

	}
	
	/**
	* @description Makes the customizable grid by appending dynamic grid blocks into the grid div.
	*/
	function makeGrid() {
		$('.the-grid').css('border-width','0px');
		$('.the-grid-box').remove();
		let rows = $('#rows');
		let cols = $('#columns');
		let gridParent = $('.the-grid');
		let rowx = 100/(rows.val());
		let colx = 100/(cols.val());
		console.log(rowx,colx);
		rowx = String(rowx.toFixed(3)) + '%';
		colx = String(colx.toFixed(3)) + '%';
		console.log(rowx,colx);
		let rowValueString='';
		let colValueString='';
		
		for(let i=0;i<rows.val();i++){
			rowValueString=rowValueString+ ' ' +rowx;
			console.log(rowValueString);
		}

		for(let j=0;j<cols.val();j++){
			colValueString=colValueString+ ' ' +colx;
			console.log(colValueString);
		}

		for(let k=0;k<rows.val()*cols.val();k++){
			gridParent.append("<div class='the-grid-box'></div>");	
		}
		
		gridParent.css('grid-template-columns',colValueString);
		gridParent.css('grid-template-rows',rowValueString);

	}

	/**
	* @description Toggle between having (Grid Canvas) and not having grid block borders (Plain Canvas).
	*/
	function toggleGridBorder() {
		let disableGrid = $('.toggle-grid').prop('checked');
		console.log('Disable Grid: ' + disableGrid);
		if(disableGrid) {
			$('.the-grid-box').css('border-width','0px');
		} else {
			$('.the-grid-box').css('border-width','0.5px');
		}
	}

	/**
	* @description To get the screenshot of the cnavas for download purpose using html2canvas library
	*/
	function getImage() {
		html2canvas($('.the-grid'),{
			onrendered: function(canvas) {
				let canvasShot=canvas.toDataURL('image/jpeg','0.99').replace('image/jpeg', 'image/octet-stream');
				//window.open(canvasShot);
				let a=document.createElement('a');
				a.href=canvasShot;
				a.download = 'PixelArt.jpg';
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			}
		});
	}


	makeGrid();

	HoverFill();

	toggleGrid.click(toggleGridBorder);
	
	submit.click(makeGrid);

	gridParent.on('click','.the-grid-box',function() {
		$(this).css('background',$('#color-picker').val());
	});

	gridParent.on('dblclick','.the-grid-box',function() {
		$(this).css('background','#ffffff');
	});

	aspectRatio.click(toggleAspectRatio);

	download.click(getImage);


});


