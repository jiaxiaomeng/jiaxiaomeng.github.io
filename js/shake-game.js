var classDom = function(cla){
	return document.getElementsByClassName(cla);
}

var tempTime1;
var supportsVibrate = "vibrate" in navigator;
//requset
var requset = function (){
	navigator.vibrate([2000, 800]);
	var audio1 = classDom('audio1')[0];
	audio1.play();
	if (tempTime1 == null){
            tempTime1 = new Date().getTime();
	}else{
		var t2 = new Date().getTime();
		if(t2 - tempTime1 < 500){
			tempTime1 = t2;
			return;
		}else{
			tempTime1 = t2;
		}
	}
	if (tempTime1) {
		var data = JSON.parse(sessionStorage.getItem("userId"));
		data = JSON.stringify({userId: data});
		var result ;
		$.ajax({
			url: 'https://shake-game.ydt24.com/wxapp/api/yyy/award/process.do',
			type: 'post',
			contentType: 'application/json',
			data: data,
			async: false,
			success: function(data) { 
				result = data['data']
			}
		});
		var restTime = result.restTime;
		var hasWon = result.hasWon;
		hasWon ? window.location.href='prize.html' : false;
		sessionStorage.setItem('restTime', restTime);
		window.location.href='remain.html'
	}
}



//click
var shakeGame = classDom('shake-game')[0];
shakeGame.onclick = function () {
	//发送请求
	requset()
}

if( navigator.userAgent.match(iphone) ) {
	shakeGame.addEventListener('touchstart', requset, false);
}

//deviceMotiion
if (window.DeviceMotionEvent) {
	var speed = 15;
	var x = y = z = lastX = lastY = lastZ = 0;
	window.addEventListener('devicemotion', function() {
		var acceleration = event.accelerationIncludingGravity;
		x = acceleration.x;
		y = acceleration.y;
		if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
			navigator.vibrate([2000, 800]);
			requset()
		}
		lastX = x;
		lastY = y;
	}, false);
}else{
	alert('您的手机检测不到重力感应')
}
