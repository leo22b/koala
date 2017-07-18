$.fn.extend = function() {
	$('#batch').each(function() {
		//获取元素
		var slidewidth = $('#batch').find(".batch_cont").width();
		var imgindex = $('#batch').find(".imgindex");
		var imgbox = $('#batch').find(".imgbox");
		//动态创建下标盒子
		var temp = "";
		for(var i = 0; i < imgbox.length; i++) {
			temp += "<div class ='index'>" + (i + 1) + "</div>"
		}
		imgindex.append(temp);
		//默认第一个的样式
		$('#batch').find(".index").eq(0).addClass("active");
		//动态设置下标居中位置     
		imgindex.css("marginLeft", (slidewidth - imgindex.width()) / 2 + "px");
		//动态设置包图片盒子宽度,即图片宽度
		imgbox.css("width", slidewidth);
		//下标移入渐变功能设置
		$('#batch').find(".index").on("mouseover", Toevevt);
		//给下标添加、移出样式
		function Toevevt() {
			var oIndex = $(this).index();
			$(this).addClass("active").siblings(".index").removeClass("active");
			//盒子渐变
			$('#batch').find(".imgbox").eq(oIndex).fadeIn().siblings(".imgbox").fadeOut()
			num = oIndex;
		}
		var num = 0;
		var timer = null;
		//显示隐藏盒子,解决渐变过程出现空白问题
		imgbox.css({
			"clear": "both",
			"position": "absolute",
			"left": "0",
			"top": "0"
		});
		imgbox.eq(0).show().siblings(".imgbox").hide()
		//开启自动播放及函数 
		timer = setInterval(plays, 4000);

		function plays() {
			num++;
			if(num >= imgbox.length) {
				num = 0
			}
			publicFn(); //调用渐变
		}
		//渐变功能		并给下标添加样式
		function publicFn() {
			$('#batch').find(".index").eq(num).addClass("active").siblings(".index").removeClass("active");
			$('#batch').find(".imgbox").eq(num).fadeIn().siblings(".imgbox").fadeOut()
		}
		//上一张点击功能
		$($('#batch').find('#back')).on("click", function() {
			if(num == 0) {
				num = imgbox.length;
			}
			num--;
			publicFn(); //调用渐变
		})
		//下一张点击功能
		$('#batch').find('#next').on("click", function() {
			num++;
			if(num >= imgbox.length) {
				num = 0;
			}
			publicFn()
		})
		//鼠标移入清除时钟
		$('#batch').find(".batch_cont").on("mouseover", function() {
			clearInterval(timer)
		});
		//鼠标移出开启时钟
		$('#batch').find(".batch_cont").on("mouseout", function() {
			timer = setInterval(plays, 4000)
		});
	});
	return this;
}