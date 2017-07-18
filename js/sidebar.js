//侧边栏鼠标移入效果
window.onload=function() {
	//滚动固定区块 滚动条位置
	t = $('#sidebar').offset().top;
	mh = $('#main').height() + 250;
	fh = $('#sidebar').height();
	$(window).scroll(function(e) {
		s = $(document).scrollTop();
		if(s > 560) {
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
};