// 如果想要使一个元素运动起来，一般情况下这个元素须要具有position属性absolute/relative
$(function(){
	var oul = $('.seamlessScroll ul');
	var oulHtml = oul.html();
	oul.html(oulHtml+oulHtml)
	var timeId = null;

	var ali = $('.seamlessScroll ul li');
	var aliWidth = ali.eq(0).outerWidth(true);
	var aliSize = ali.size();
	var ulWidth = aliWidth*aliSize;
	console.log(ulWidth)
	oul.width(ulWidth);	//1600px
	
	var speed = -2;

	function slider(){

		if(speed<0){
			if(oul.css('left')==-ulWidth/2+'px'){
	 		oul.css('left',0);
		 	}
		 	oul.css('left','+=-2px');
		}

	 	
		if(speed>0){
			if(oul.css('left')=='0px'){
	 		oul.css('left',-ulWidth/2+'px');
		 	}
		 	oul.css('left','+='+speed+'px');
		}
	 	
	 }
	
	// setInterval()函数的作用是：每隔一段时间，执行该函数里的代码
	 timeId = setInterval(slider,30);

	$('.seamlessScroll').mouseover(function(){
		// clearInterval()函数的作用是用来清除定时器
		clearInterval(timeId);
	});

	$('.seamlessScroll').mouseout(function(){
		timeId = setInterval(slider,30);
	});

	$('.goLeft').click(function(){
		speed=-2;
	});

	$('.goRight').click(function(){
		speed=2;
	});

});