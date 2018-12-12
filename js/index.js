window.onload = function() {
	var winWidth = document.documentElement.clientWidth;
	winWidth > 1280 ? winWidth = 1280 : false;
	var imgDom = document.querySelectorAll('img');
	for (var i = 0; i < imgDom.length; i++) {
		imgDom[i].style.width = winWidth + 'px'
	}
	
	//按需加载图片
	function imgLoad(){
		var iArr = [];
		var winHeight = window.innerHeight || document.body.clientHeight;
		// var requireHeight = 1206 - winHeight + 200;
		var scrolltop = document.documentElement.scrollTop || document.documentElement.scrollTop;
		for(var i=2; i<18; i++){
			if(scrolltop >  (i -1) * 1206){
				iArr.push(i)
			}
		}
		console.log(iArr[iArr.length-1])
		if(iArr[iArr.length-1]){
			imgDom[iArr[iArr.length-1]-1].src = 'img/' + (iArr[iArr.length-1]) + '.png';
			imgDom[iArr[iArr.length-1]].src = 'img/' + (iArr[iArr.length-1]+1) + '.png';
			imgDom[iArr[iArr.length-1]+1].src = 'img/' + (iArr[iArr.length-1]+2) + '.png';
		}
	}
	imgLoad()
	
	window.onscroll= function(){
		imgLoad()
	}

	navigator.userAgent.match(
		/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
	) ? phone() : false;

	function phone() {
		var pages = function(obj) {
			var box = document.getElementById(obj.wrap),
				container = document.getElementById(obj.container),
				len = obj.len,
				n = obj.n,
				startY, moveY, cliH;
			box.style.height = 100 + '%';
			
			var pageDom = document.getElementsByClassName('page');
			pageDom[0].style.paddingTop = 35 +'px';
			for(var i=0; i<pageDom.length; i++){
				pageDom[i].style.width = 100 + '%';
				pageDom[i].style.height = 10 + '%';
				pageDom[i].style.background = 'black';
			}
				
			var getH = function() {
					cliH = document.body.clientHeight
				};
			getH();
			
			window.addEventListener('resize', getH, false);

			var touchstart = function(event) {
				if (!event.touches.length) {return}
				startY = event.touches[0].pageY;
				moveY = 0;
			};

			var touchmove = function(event) {
				if (!event.touches.length) {return}
				moveY = event.touches[0].pageY - startY;
				container.style.transform = 'translateY(' + (-n * cliH + moveY) + 'px)'; 
			};

			var touchend = function(event) {
				if (moveY < -50) n++;
				if (moveY > 50) n--;

				if (n < 0) n = 0;
				if (n > len - 1) n = len - 1;

				container.style.transform = 'translateY(' + (-n * 10) + '%)'; 
				if(n > 1){
					imgDom[n-1].src = 'img/' + n + '.png';
					imgDom[n].src = 'img/' + (n+1) + '.png';
					imgDom[n+1].src = 'img/' + (n+2) + '.png';
				}

			};
			
			box.addEventListener("touchstart", function(event) {touchstart(event)}, false);
			box.addEventListener("touchmove", function(event) {touchmove(event)}, false);
			box.addEventListener("touchend", function(event) {touchend(event)}, false);
		};
		
		pages({wrap: 'wrap', container: 'container', len: 17, n: 0 });
	}
}