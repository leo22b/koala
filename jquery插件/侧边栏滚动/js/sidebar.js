//侧边栏鼠标移入效果
$(document).ready(function() {
	var oside = document.getElementById('sidebar');
	var temp = null;
	oside.onmouseover = function(ev) {
		ev = ev || window.event;
		var target = ev.target || ev.srcElement;
		if(target.tagName.toLowerCase() == 'a') {
			if(temp != null) {
				temp.style.backgroundColor = '#451398';
			}
			temp = target;
			temp.style.backgroundColor = '#3b0a8a';		}
	}
	//滚动固定区块 滚动条位置
	t = $('#sidebar').offset().top;
	mh = $('#main').height() + 250;
	fh = $('#sidebar').height();
	$(window).scroll(function(e) {
		s = $(document).scrollTop();
		if(s > 580) {
			$('#sidebar').css('display', 'block');
			$('#sidebar').css('top', '40px');
			$('#sidebar').css('position', 'fixed');
			if(s + fh > mh) {
				$('#sidebar').css('top', mh - s - fh + 'px');
			}
		} else {
			$('#sidebar').css('position', '');
			$('#sidebar').css('display', 'none');
		}
	})
});