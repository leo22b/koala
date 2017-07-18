//倒计时
$(document).ready(function() {
	var ozero = document.getElementsByClassName('zero')[0];
	var ospan = ozero.getElementsByTagName('span');
	var timer = setInterval(function() {
		var time = new Date();
		var nowtime = time.getTime();
		time.setDate(7);
		time.setHours(13);
		time.setMinutes(0);
		time.setSeconds(0);
		var endtime = time.getTime();
		var zero = (endtime - nowtime) / 1000;
		console.log(zero);
		var s = parseInt(zero % 60);
		var m = parseInt(zero / 60 % 60);
		var h = parseInt(zero / 60 / 60);
		if(h < 10) {
			var oh = h.toString().split('');
			ospan[0].innerHTML = 0;
			ospan[1].innerHTML = oh[0];
		} else {
			var oh = h.toString().split('');
			ospan[0].innerHTML = oh[0];
			ospan[1].innerHTML = oh[1];
		}
		if(m < 10) {
			var om = m.toString().split('');
			ospan[2].innerHTML = 0;
			ospan[3].innerHTML = om[0];
		} else {
			var om = m.toString().split('');
			ospan[2].innerHTML = om[0];
			ospan[3].innerHTML = om[1];
		}
		if(s < 10) {
			var os = s.toString().split('');
			ospan[4].innerHTML = 0;
			ospan[5].innerHTML = os[0];
		} else {
			var os = s.toString().split('');
			ospan[4].innerHTML = os[0];
			ospan[5].innerHTML = os[1];
		}
		if (zero==0||zero<0) {
			clearInterval(timer);
			ospan[1].innerHTML = 0;
			ospan[3].innerHTML = 0;
			ospan[5].innerHTML = 0;
		}
	}, 1000);
});