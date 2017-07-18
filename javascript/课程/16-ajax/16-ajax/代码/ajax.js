/*
 * 参数1: method请求方式
 * 参数2: url 请求地址
 * 参数3: agrs需要传递的参数
 * 参数4: successFn 请求数据成功后要执行的代码
 */
function ajax(method, url, args, successFn){
	// 1、打开浏览器
	var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	
	// 2、输入网址
	if(method == 'get'){	// 需要将参数拼接到url中
		url = url + '?' + args;
	}
	request.open(method, url, true);
	
	// 3、发送
	if(method == 'get'){
		request.send();
	} else {	// post请求
		request.setRequestHeader('content-type','application/x-www-form-urlencoded');
		request.send(args);
	}
	
	
	
	// 获取到数据
	request.onreadystatechange = function(){
		if(request.readyState == 4){
			if(request.status == 200){
				 successFn && successFn(request.response);
			} else {
				alert('获取数据失败');
			}
		}
	}
}
