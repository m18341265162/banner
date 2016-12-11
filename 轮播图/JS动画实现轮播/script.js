window.onload = function() {

	// 轮播容器
	var container = document.getElementById('container');
	// 图片列表
	var list = document.getElementById('list');
	// 切换按钮组
	var buttons = document.getElementById('buttons').getElementsByTagName('span');
	// 左右箭头
	var prev = document.getElementById('prev');
	var next = document.getElementById('next');

	// 单幅图片宽度
	var imageWidth = 600;
	// 图片数量
	var imageCount = list.getElementsByTagName('img').length;
	// 当前索引
	var currIndex = 0;
	// 动画同步标识
	var isAnimate = false;

	// 左箭头单击事件
	prev.onclick = function() {

		//判断动画是否进行中
		if (isAnimate)
			return;

		// 索引递增
		currIndex --;

		if (currIndex < 0)
			currIndex = imageCount - 3;

		animate(imageWidth);//运动		
	}

	// 右箭头单击事件
	next.onclick = function() {

		//判断动画是否进行中
		if (isAnimate)
			return;

		// 索引递减
		currIndex ++;

		if (currIndex > imageCount - 3)
			currIndex = 0;

		animate(-imageWidth); //运行		
	}

	// 遍历切换按钮组
	for (var i = 0;i < buttons.length;i ++) {

		(function(index){

			buttons[i].onclick = function() {	

				//判断动画是否进行中
				if (isAnimate)
					return;		

				var offset = imageWidth * (currIndex - index); //计算偏移量

				currIndex = index;//记录当前索引		

				animate(offset); //运动								
			}

		})(i);
	}

	/*运动函数*/
	function animate(offset) {		

		// 计算出新的位置
		var newLeft = parseInt(list.style.left) + offset;

		// 运动参数
		var time = 800;//动画过渡时间
		var interval = 40;//每隔多少毫秒执行一次
		var speed = offset / (time / interval); //每次移动的像素数

		/*go函数*/
		function go() {

			// 获得当前位置
			var left = parseInt(list.style.left);

			// 判断是否到达目标位置
			if (speed > 0 && left >= newLeft || speed < 0 && left <= newLeft) {
				// 终止定时器
				clearInterval(timerId);
				// 动画终止
				isAnimate = false;
				//防止误差，直接设置到目标位置
				left = list.style.left = newLeft + 'px';

				// 判断是否到达替身图
				if (parseInt(left) == 0) {					
					list.style.left = -imageWidth * (imageCount - 2) + 'px';
				}

				if ( parseInt(left) == -imageWidth * (imageCount - 1) ) {
					list.style.left = -imageWidth + 'px';
				}

				return;
			}

			// 递增递减位置
			list.style.left = left + speed + 'px';
		}

		// 定时器
		var timerId = setInterval(go,interval);	
		// 动画进行中
		isAnimate = true;

		highlight();//高亮
	}

	/*高亮函数*/
	function highlight() {

		document.title = currIndex;

		// 去掉所有高亮
		for (var i = 0;i < buttons.length;i ++) {
			buttons[i].className = '';
		}		

		// 当前按钮高亮
		buttons[currIndex].className = 'on';

	}
}