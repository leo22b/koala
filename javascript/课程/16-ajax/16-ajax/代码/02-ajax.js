/*
 * 参数url
 */
function ajax(url){
	// 1、打开浏览器
	var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	
	// 2、输入网址
	request.open('GET', url, true);
	
	// 3、发送
	request.send();
	
	
	// 获取到数据
	request.onreadystatechange = function(){
		if(request.readyState == 4){
			if(request.status == 200){
//				console.log(request.response);
				return request.response;
			} else {
				alert('获取数据失败');
			}
		}
	}
}
