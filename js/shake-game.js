var classDom = function(cla){
	return document.getElementsByClassName(cla);
}

var tempTime1;
var supportsVibrate = "vibrate" in navigator;
//requset
var request = function (){
	if (navigator.vibrate) {
		navigator.vibrate([2000, 800]);
	} else if (navigator.webkitVibrate) {
		navigator.webkitVibrate([2000, 800]);
	}
	
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

//deviceMotiion
var yyy;
if(!yyy){
	if(window.DeviceMotionEvent){
		var speed = 15;  
		var x = y = z = lastX = lastY = lastZ = 0;  
		window.addEventListener('devicemotion', function(){  
			var acceleration =event.accelerationIncludingGravity;  
			x = acceleration.x;  
			y = acceleration.y;  
			z = acceleration.z;
			if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed || Math.abs(z-lastZ) > speed+10) {  
				yyy = 1;
				request()
			}  
			lastX = x;  
			lastY = y;  
			lastZ = z;
		}, false);  
	}else{
		alert('您的手机检测不到重力感应')
	}
}


//click
var shakeGame = classDom('shake-game')[0];
if(navigator.userAgent.match(/(iPhone)/)[0] == 'iPhone'){
	shakeGame.addEventListener("touchstart", e => {
		e.preventDefault();
		tempTime1 = 1;
		request()
	})
}else{
	shakeGame.onclick = function () {
		//发送请求
		request()
	}	
}