var classDom = function(cla){
	return document.getElementsByClassName(cla);
}

var audio = classDom('audio')[0];
audio ? audio.play() : false;

var tempTime1;
//submit
var btn = function(){
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
		var val1 = classDom('val1')[0].value;
		var val2 = classDom('val2')[0].value;
		sessionStorage.setItem('sessionMobile', val2);
		if(!val1){
			alert('请输入名称')
		}else if(!val2){
			alert('请输入电话号码')
		}else if(val2.substr(0,1) != 1){
			alert('请输入正确电话号码')
		}else{
			var audio = classDom('audio1')[0];
			audio.play();
			var data = JSON.stringify({'name': val1, 'mobile': val2});
			
			//request	
			var result;
			$.ajax({
				url: 'https://shake-game.ydt24.com/wxapp/api/yyy/submit.do',
				type: 'post',
				contentType: 'application/json',
				data: data,
				async: false,
				success: function(data) { 
					result = data['data']
				}
			})
			sessionStorage.setItem('userId',result.id)
			window.location.href='shake-game.html';	
		}
	}
}

