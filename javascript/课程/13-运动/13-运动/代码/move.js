				/*
				 obj: 操作对象
				 att: 操作的属性
				 target: 目标点
				 */
				function startMove(obj, att, target){
					clearInterval(obj.timer);
					
					// 速度
					var speed = 0;
					// 操作的属性值
					var currentValue = 0;
					obj.timer = setInterval(function(){
						// 1、当前值
						currentValue = getStyle(obj, att);
						
						// 2、速度
						speed = (target - currentValue) / 7;
						speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
						
						console.log(speed);
						
						// 3、运动处理
						currentValue += speed;
						if( currentValue == target ){
							clearInterval(obj.timer);
						} else {
							obj.style[att] = currentValue + 'px';
						}
					}, 30);
				}
				
				
				
				function getStyle(obj, att){
					return parseInt(window.getComputedStyle ? getComputedStyle(obj)[att] :  obj.currentStyle[att]);
				}