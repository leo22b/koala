			/*
			 * obj: 操作的元素
			 * attJSON: 属性json
			 */
			function startMove(obj, attJSON) {
				clearInterval(obj.timer);

				var speed = 0; // 速度
				var currentValue = 0; // 需要操作属性的当前值
				obj.timer = setInterval(function() {
					var isStop = true;
					// 修改属性值
					for(key in attJSON) {
						// 1、先获取到当前对应属性值
						if(key == 'opacity') {
							currentValue = parseInt(getStyle(obj, key) * 100);
						} else {
							currentValue = parseInt(getStyle(obj, key));
						}

						// 2、计算速度
						speed = (attJSON[key] - currentValue) / 7;
						speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

						// 3、判读运动
						if(key == 'opacity') {
							obj.style.opacity = (currentValue + speed) / 100;
							obj.style.filter = 'alpha(opacity:' + (currentValue + speed) + ')';
						} else {
							obj.style[key] = currentValue + speed + 'px';
						}
						
						// 4、时钟是否停止?
						if(attJSON[key] != currentValue){
							isStop = false;
						}

					}

					// 判断时钟是否停止
					if(isStop){
						clearInterval(obj.timer);
					}
				}, 30);
			}

			// 获取属性名对应的属性值
			function getStyle(obj, att) {
				return window.getComputedStyle ? getComputedStyle(obj)[att] : obj.currentStyle[att];
			}