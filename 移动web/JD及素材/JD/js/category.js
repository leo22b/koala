window.onload = function() {
	var mySwiper = new Swiper('.jd_category_list', {
		freeMode: true,
		freeModeMomentumRatio: 0.5,
		slidesPerView: 'auto',
		direction : 'vertical'
	});

	mySwiper.on('tap', function(swiper){
		$('.jd_category_list .active').removeClass('active');
		$('.jd_category_list .swiper-slide').eq(swiper.clickedIndex).addClass('active');
	})
}