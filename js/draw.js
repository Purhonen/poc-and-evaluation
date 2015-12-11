
		var onPaint = function() {
			ctx.moveTo(x, y);
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
		};

		var sources = {
			pohja: 'http://i2.wp.com/www.unelmatalosta.com/wp-content/uploads/2015/06/1krs-pohjapiirrustus-unelmatalosta.jpg',

		};
		
		var canvas = document.getElementById('myCanvas');
		var ctx = canvas.getContext('2d');

		var painting = document.getElementById('paint');
		var paint_style = getComputedStyle(painting);
		// canvas.width = parseInt(paint_style.getPropertyValue('width'));
		// canvas.height = parseInt(paint_style.getPropertyValue('height'));
		var mouse = {x: 0, y: 0};
		var x;
		var y;

		function loadImages(sources, callback) {
			var images = {};
			var loadedImages = 0;
			var numImages = 0;
			// get num of sources
			for(var src in sources) {
			  numImages++;
			}
			for(var src in sources) {
			  images[src] = new Image();
			  images[src].onload = function() {
				if(++loadedImages >= numImages) {
				  callback(images);
				}
			  };
			  images[src].src = sources[src];
			}
		}

		function init (){
			loadImages(sources, function(images) {
				ctx.drawImage(images.pohja, 100, 30, 500, 500);
			});
		}

		init();

		canvas.addEventListener('mousemove', function(e) {
			mouse.x = e.pageX - this.offsetLeft;
			mouse.y = e.pageY - this.offsetTop;
		}, false);

		ctx.lineWidth = 3;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.strokeStyle = '#00CC99';

		canvas.addEventListener('mousedown', function(e) {
			ctx.beginPath();	
			ctx.moveTo(mouse.x, mouse.y);
			x = mouse.x;
			y = mouse.y;
			canvas.addEventListener('mousemove', onPaint, false);
		}, false);

		canvas.addEventListener('mouseup', function() {
			canvas.removeEventListener('mousemove', onPaint, false);
			ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
		}, false);


		// bind event handler to clear button
		document.getElementById('clear').addEventListener('click', function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			init();
		}, false);
	  