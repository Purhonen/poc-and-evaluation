
		var onPaint = function() {
			tmpctx.clearRect(0, 0, tmpcanvas.width, tmpcanvas.height);
			
			tmpctx.beginPath();	

			tmpctx.moveTo(x, y);
			tmpctx.lineTo(mouse.x, mouse.y);
			
			tmpctx.stroke();
		};

		var sources = {
			pohja: 'http://i2.wp.com/www.unelmatalosta.com/wp-content/uploads/2015/06/1krs-pohjapiirrustus-unelmatalosta.jpg',

		};
		
		var imagecanvas = document.getElementById('imageCanvas');
		var canvas = document.getElementById('myCanvas');
		var tmpcanvas = document.getElementById('tmpCanvas');
		
		var imagectx = imagecanvas.getContext('2d');
		var ctx = canvas.getContext('2d');
		var tmpctx = tmpcanvas.getContext('2d');

		var painting = document.getElementById('paint');
		var paint_style = getComputedStyle(painting);

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
				imagectx.drawImage(images.pohja, 100, 30, 500, 500);
			});
		}

		init();

		tmpcanvas.addEventListener('mousemove', function(e) {
			mouse.x = e.pageX - this.offsetLeft;
			mouse.y = e.pageY - this.offsetTop;
		}, false);

		tmpctx.lineWidth = 3;
		tmpctx.lineJoin = 'round';
		tmpctx.lineCap = 'round';
		tmpctx.strokeStyle = '#00CC99';

		tmpcanvas.addEventListener('mousedown', function(e) {
			tmpcanvas.addEventListener('mousemove', onPaint, false);
			
			mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
			mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
			
			x = mouse.x;
			y = mouse.y;
			
		}, false);

		tmpcanvas.addEventListener('mouseup', function() {
			tmpcanvas.removeEventListener('mousemove', onPaint, false);
			tmpctx.lineTo(mouse.x, mouse.y);
			tmpctx.stroke();
			ctx.drawImage(tmpcanvas, 0, 0);
			tmpctx.clearRect(0, 0, tmpcanvas.width, tmpcanvas.height);
		}, false);


		// bind event handler to clear button
		document.getElementById('clear').addEventListener('click', function() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			// init();
		}, false);
	  