//$(function(){
//	
//	// 默认下标位置
//	var index = 1;
//	
//	$('.jd_bgView').swipeLeft(function(){
//		index++;
//		changeView();
//	});
//	
//	$('.jd_bgView').swipeRight(function(){
//		index--;	
//		changeView();
//	});
//	
//	// 一张图片的宽度
//	var viewW = parseInt($('.jd_bgView li').eq(0).css('width'));
//	var length = $('.jd_bgView li').length;
//	function changeView(){
//		
//		if(index == length-1){
//			index = 1;
//		} else if(index == 0){
//			index = length-2;
//		}
//		
//		$('.jd_bgView').css('transform', 'translateX(-' + viewW*index + 'px)');
//		
//		
//		// 改变下标
//		$('.jd_pageView .active').removeClass('active');
//		$('.jd_pageView i').eq(index-1).addClass('active');
//	}
//});

window.onload = function() {
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		slidesPerView: 1,
		// 下标点击使能
		paginationClickable: true,
		// 图片的间距
		spaceBetween: 0,
		// 循环使能
		loop: true,
		// 自动播放
		autoplay: 2500
	});
}