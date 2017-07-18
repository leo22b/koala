/*
 * 参数1: url 请求地址
 * 参数2: successFn 请求数据成功后要执行的代码
 */
function ajax(url, successFn){
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
				// 获取到数据  --- 进行数据解析等操作
//				if(successFn){
//					successFn(request.response);
//				}
				
				// &&
				// 0 && 1 ===> false  (只要第一个为0，后面的不会操作)
				// 1 && 0 ===> false
				// 1 && 1 ===> true
				 successFn && successFn(request.response);
			} else {
				alert('获取数据失败');
			}
		}
	}
}
