			/*
			 * obj: 操作的元素
			 * att: 需要操作的属性
			 * target: 改变的目标点
			 * endFn: 操作元素结束后，要调用的函数
			 */
			function startMove(obj, att, target, endFn) {
				clearInterval(obj.timer);

				var speed = 0; // 速度
				var currentValue = 0; // 需要操作属性的当前值
				obj.timer = setInterval(function() {
					// 1、先获取到当前对应属性值
					if(att == 'opacity') {
						currentValue = parseInt(getStyle(obj, att) * 100);
					} else {
						currentValue = parseInt(getStyle(obj, att));
					}

					// 2、计算速度
					speed = (target - currentValue) / 7;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

					// 3、判读运动/停止
					if(currentValue == target) {		// 停止
						clearInterval(obj.timer);
						
						// 元素操作完成
						if(endFn) endFn();
						
					} else {
						if(att == 'opacity') {
							obj.style.opacity = (currentValue + speed) / 100;
							obj.style.filter = 'alpha(opacity:' + (currentValue + speed) + ')';
						} else {
							obj.style[att] = currentValue + speed + 'px';
						}
					}
				}, 30);
			}

			// 获取属性名对应的属性值
			function getStyle(obj, att) {
				return window.getComputedStyle ? getComputedStyle(obj)[att] : obj.currentStyle[att];
			}