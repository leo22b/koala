
// 接收消息
self.onmessage = function(ev){
	// 返回: hello + xxxx
	
	ev = ev || window.event;
	var str = 'hello ' + ev.data;
	
	document.title(str);
	
	
	// 发消息
	self.postMessage(str);
}
