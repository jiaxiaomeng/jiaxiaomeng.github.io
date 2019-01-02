//get restTime
var resultA = sessionStorage.getItem('restTime');

var classDom = function(cla){
		return document.getElementsByClassName(cla);
	};
var result = classDom('result')[0];
var resultBtn = classDom('resultBtn')[0];
if(resultA == 0){
	alert('您的摇一摇次数已用完');
	var resultP = classDom('resultP')[0];
	arr = [resultBtn, resultP, result];
	for(var i=0; i<arr.length; i++){
		arr[i].style.display = 'none';
	}
	sessionStorage.removeItem("restTime");
}else if(resultA > 0){
	result.innerText = resultA
}

var audio1 = classDom('audio1')[0];

//navigateTo
resultBtn.onclick = function () {
	audio1.play();
	window.location.href='shake-game.html';
}

var returnHome = classDom('returnHome')[0];
returnHome.onclick = function(){
	audio1.play();
	window.location.href='index.html';
}

