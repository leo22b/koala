// 产生一组随机数
function randomArr(iAll, iNow) {
	var arr = [];
	var newArr = [];

	for(var i = 0; i < iAll; i++) {
		arr.push(i);
	}

	for(var j = 0; j < iNow; j++) {
		var temp = parseInt(Math.random() * iAll);
		newArr.push(arr[temp]);
	}

	return newArr;
}


// 接收到消息，要做什么？
self.onmessage = function(ev){
	var arr = randomArr(ev.data['iAll'], ev.data['iNow']);
	
	
	self.postMessage(arr);
}
