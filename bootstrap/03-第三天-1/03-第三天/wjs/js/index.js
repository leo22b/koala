$(function() {
	function resize() {
		// 屏幕大小
		var screenW = $(window).width();

		// 什么是小屏幕
		var isSamll = screenW < 768;

		// 根据不同屏幕类型设置不同的图片
		$('#main-ad .slide .carousel-inner .item').each(function(index, element) {
			// element 是 DOM 对象
			var $element = $(element);

			// 获取自定义属性
			// $element.data('img-lg');

			// $element.css('backgroundImage', 'url(' + $element.data(isSamll ? 'img-xs' : 'img-lg')) + ')';
			
			
			if(isSamll){ // 小屏幕，小图，用img
				
				var imagepath = $element.data('img-xs');
				$element.html('<img src="' + imagepath + '" />');
				
			} else { // 大屏幕，大图，用背景
				$element.html('');
				$element.css('backgroundImage', 'url(' + $element.data('img-lg')) + ')';
			}
			
			

			//		console.log($element.data( isSamll ? 'img-xs' : 'img-lg' ));

		});
	}

	// 开始时，先调用一次
	// resize();

	// 当窗口大小发生改变时，触发该事件
	// window.onresize
	// 添加一个事件
	// $(window).on('resize', resize);
	
	// 添加事件，添加完事件之后，触发resize事件
	$(window).on('resize', resize).trigger('resize');


	// 产品推荐 -- 小图标
	$('[data-toggle="tooltip"]').tooltip();
	
	
	// 新闻标题切换
	$('#news .nav li a').on('click', function(){
		$('#news .row div h4').html( $(this).data('title') );
	});
});