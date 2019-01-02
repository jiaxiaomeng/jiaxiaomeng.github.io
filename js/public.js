var classDom = function(cla){
	return document.getElementsByClassName(cla);
}

window.onload = function(){	
	var audio = classDom('audio')[0];
	audio ? audio.play() : false;
	var bgWidth =  window.innerWidth;
	var bgHeight = window.innerHeight;
	bgHeight < 1745 ? bgHeight = 1745 : false;
	var home = classDom('home')[0];
	var bg = classDom('bg')[0];
	var bgImg = classDom('bgImg')[0];
	var content = classDom('content')[0];
	
	var domArr = [home, bg, bgImg, content];
	for(var i=0; i<domArr.length; i++){
		domArr[i].style.width = bgWidth + 'px';
		domArr[i].style.height = bgHeight + 'px';
	}
}

//false data 
var falseDataSwitch = 2; // 3 only server data / 2 bind server data / 1 bind false data / 0 off 
var dataSpeed = 1;

var falseDataArr = [
	{prizeMobile: "18002222256", prizeName: "无人售卖机"},
	{prizeMobile: "18002223717", prizeName: "无人售卖机"},
	{prizeMobile: "18002228897", prizeName: "无人售卖机"}
];
var listUl = classDom('list-ul')[0];
var data = JSON.stringify({page: 1, size: 20000});

if(listUl){
	if(falseDataSwitch == 1){
		for(var i=0; i<falseDataArr.length; i++){
			var liDom = document.createElement("li"); 
			liDom.innerText = '尾号' +  falseDataArr[i].prizeMobile.substring(7,11) + '获得了' + falseDataArr[i].prizeName;
			listUl.appendChild(liDom);
		}
	}else if(falseDataSwitch == 2){
		// getMsg request
		var resultArr ;
		$.ajax({
			url: 'https://shake-game.ydt24.com/wxapp/api/back/awardlist.do',
			type: 'post',
			contentType: 'application/json',
			data: data,
			async: false,
			success: function(data) { 
				resultArr = data['data']['awardListItems']
			}
		});
		falseDataArr = falseDataArr.concat(resultArr)
		for(var i=0; i<falseDataArr.length; i++){
			var liDom = document.createElement("li"); 
			liDom.innerText = '尾号' +  falseDataArr[i].prizeMobile.substring(7,11) + '获得了' + falseDataArr[i].prizeName;
			listUl.appendChild(liDom);
		}
	}else if(falseDataSwitch == 3){
		var resultArr ;
		$.ajax({
			url: 'https://shake-game.ydt24.com/wxapp/api/back/awardlist.do',
			type: 'post',
			contentType: 'application/json',
			data: data,
			async: false,
			success: function(data) { 
				resultArr = data['data']['awardListItems']
			}
		});
		falseDataArr = resultArr;
		for(var i=0; i<falseDataArr.length; i++){
			var liDom = document.createElement("li"); 
			liDom.innerText = '尾号' +  falseDataArr[i].prizeMobile.substring(7,11) + '获得了' + falseDataArr[i].prizeName;
			listUl.appendChild(liDom);
		}
	}
}