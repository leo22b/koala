function ajax(method, url, successFn) {
	// 1、打开浏览器
	var request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	// 2、输入地址
	request.open(method, url, true);
	// 3、发送
	request.send();
	// 4、 获取到数据
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if(request.status == 200) {
				successFn && successFn(request.response);
			} else {
				alert('获取数据失败');
			}
		}
	}
}

var oul = document.getElementById("oul");
var isLoad = true;
var page = 1;
getList();
// 如何加载第二页的内容？
// 当滑动到底部时，就应该去获取第二页的数据，获取到数据就将数据解析显示到界面中
function getList() {
	ajax('get', './json/ajax.json', function(response) {
		// 1、json数据解析
		var dataSource = JSON.parse(response);
		// 2、获取商品的数组
		var shops = dataSource.details;
		// 3、遍历(先打印，再说添加到界面中)
		for(var i = 0; i < shops.length; i++) {
			// li
			var oli = document.createElement('li');
			oul.appendChild(oli);
			// a1
			var a1 = document.createElement('a');
			a1.href = '#';
			oli.appendChild(a1);
			// a1 > img1
			var img1 = document.createElement('img');
			img1.src = shops[i].imgleftop;
			a1.appendChild(img1);
			// a2
			var a2 = document.createElement('a');
			a2.href = '#';
			oli.appendChild(a2);
			// a2 > img2
			var img2 = document.createElement('img');
			img2.src = shops[i].imgsrc;
			a2.appendChild(img2);
			// div
			var matter = document.createElement('div');
			matter.className = 'matter';
			oli.appendChild(matter);
			// matter > h3
			var oh3 = document.createElement('h3');
			matter.appendChild(oh3);
			// matter > h3 > a
			var oh3a = document.createElement('a');
			oh3a.href = '#';
			oh3a.innerHTML = shops[i].describe;
			oh3.appendChild(oh3a);
			// matter > p1
			var op1 = document.createElement('p');
			matter.appendChild(op1);
			// matter > p1 > a
			var op1a = document.createElement('a');
			op1a.href = '#';
			op1a.innerHTML = shops[i].gold;
			op1.appendChild(op1a);
			// matter > p2
			var op2 = document.createElement('p');
			matter.appendChild(op2);
			// matter > p2 > span
			var op2span = document.createElement('span');
			op2span.href = '#';
			op2span.innerHTML = shops[i].actprice;
			op2.appendChild(op2span);
			// matter > p2 > b
			var op2b = document.createElement('b');
			op2b.href = '#';
			op2b.innerHTML = shops[i].dollar;
			op2.appendChild(op2b);
			// matter > p2 > i
			var op2i = document.createElement('i');
			op2i.href = '#';
			op2i.innerHTML = shops[i].price;
			op2.appendChild(op2i);
			// matter > p2 > span1
			var op2span1 = document.createElement('span');
			op2span1.href = '#';
			op2span1.innerHTML = shops[i].dollar;
			op2.appendChild(op2span1);
			// matter > p2 > del
			var odel = document.createElement('del');
			odel.href = '#';
			odel.innerHTML = shops[i].deleteline;
			op2.appendChild(odel);
			// matter > a
			var mattera = document.createElement('a');
			mattera.href = '#';
			mattera.innerHTML = shops[i].buynow;
			matter.appendChild(mattera);
		}
		// 4、数据已经获取完成，可以再次获取数据
		isLoad = true;
	});
}