				/* 轮播图功能
				 * imageView: 图片标签(src)
				 * pageView: 下标容器
				 * imageNames: 图片数组
				 * spaceTime: 时间间隔
				 
					 HTML结构
					 <div id="box">
						<!-- 图片-->
						<img class="bigImg" />
				
						<!-- 下标-->
						<p idclass"page"> </p>
					</div>
				 */
				function scrollView(imageView, pageView, imageNames, spaceTime){
					// 默认显示图片
					imageView.src = imageNames[0];
					// 下标视图
					var temp = '';
					for(var i=0; i<imageNames.length; i++){
						if(i==0)	{
							temp += '<i class="active"></i>';
						} else {
							temp += '<i></i>';
						}
					}
					pageView.innerHTML = temp;
					
					
					// 时钟
					var timer = null;
					// 下标
					var index = 0;
					// 下标视图
					var aPage = pageView.getElementsByTagName('i');
					
					// 页面打开，即开启时钟
					startTimer();
					pageAdd();
					
					// 给下标视图添加事件
					function pageAdd(){
						for(var i=0; i<aPage.length; i++){
							// 自定义属性 -- 下标
							aPage[i].index = i;
							
							// 鼠标移入
							aPage[i].onmouseover = function(){
								// 停止时钟
								stopTimer();
								index = this.index;
								changeView();
							}
							
							// 鼠标移出
							aPage[i].onmouseout = function(){
								// 开启时钟
								startTimer();
							}
						}
					}
					
					// 改变视图
					function changeView(){
						// 改变图片视图
						imageView.src = imageNames[index];
						
						// 下标视图
						for(var i=0; i<aPage.length; i++){
							aPage[i].className = '';
						}
						aPage[index].className = 'active';
					}
					
					
					// 触发时钟事件
					function upDate(){
						index++;
						if(index > imageNames.length-1){
							index = 0;
						}
						changeView();
					}
					
					// 开启时钟
					function startTimer(){
						if(!timer){
							timer = setInterval(upDate, spaceTime);
						}
					}
					
					// 停止时钟
					function stopTimer(){
						clearInterval(timer);
						timer = null;
					}
				}