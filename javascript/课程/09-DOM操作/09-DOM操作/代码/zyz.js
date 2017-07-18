// obj: 元素对象
// att: 获取的属性名
function getStyle(obj, att) {
	if(window.getComputedStyle) {
		return getComputedStyle(obj)[att];
	} else {
		return obj.currentStyle[att];
	}
}

// 通过id获取元素
//function getElement(id){
//	return document.getElementById(id);
//}
// 更简单，更方便 【jQuery中的写法】
function $(str){
	if(typeof str === 'string'){
		return document.getElementById(str);
	} else if(typeof str === 'function'){
		window.onload = str;
	}
}
