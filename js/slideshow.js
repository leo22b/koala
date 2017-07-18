$(function() {
	//自动轮播
	var slides = $('.imgbox>img').length;
	var go = null;
	var curr = 0;
	var timer = setInterval(function() {
		go = (curr + 1) % slides;
		$("#icon a.present").eq(go).click();
	}, 3000);
	//鼠标移入清除时钟,移出重新执行
	$("#js,#next,#back").hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(function() {
			var go = (curr + 1) % slides;
			$("#icon a.present").eq(go).click();
		}, 3000);
	});
	//点击下一张
	$("#next").click(function() {
		if(curr == slides - 1) {
			var go = 0;
		} else {
			var go = (curr + 1) % slides;
		}
		$("#icon a.present").eq(go).click();
	});
	//点击上一张
	$("#back").click(function() {
		if(curr == 0) {
			var go = 4;
		} else {
			var go = (curr - 1) % slides;
		}
		$("#icon a.present").eq(go).click();
	});

	//移入下标
	$("#icon a.present").each(function(i) {
		$(this).click(function() {
			curr = i;
			$("#js img").eq(i).fadeIn("fast").siblings("img").fadeOut("fast");
			$(this).addClass("select").siblings().removeClass("select");
		});
		$(this).hover(function(){
			curr = i;
			$("#js img").eq(i).fadeIn("fast").siblings("img").fadeOut("fast");
			$(this).addClass("select").siblings().removeClass("select");
		});
		//鼠标移入显示按钮
		$(document).ready(function() {
			$(".area").hover(function() {
				$(this).find(".qq").show();
			}, function() {
				$(this).find(".qq").hide();
			});
		});
	});
});