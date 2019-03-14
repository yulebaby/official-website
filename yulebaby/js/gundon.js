$(function(){
	var oul = $('.wrapBox ul');
	var ali = $('.wrapBox ul li');
	var numLi = $('.wrapBox ol li');
	var aliWidth = $('.wrapBox ul li').eq(0).width();
	var _now = 0;	//这个是控制数字样式的计数器
	var _now2 = 0;	//这个是控制图片运动距离的计数器
	var timeId;
	var aimg = $('.wrapBox ul img');
	var op = $('.wrapBox p');

	numLi.click(function(){
		var index = $(this).index();
		_now = index;
		_now2=index;
		var imgAlt = aimg.eq(_now).attr('alt');
		op.html(imgAlt);
		$(this).addClass('current').siblings().removeClass();
		oul.animate({'left':-aliWidth*index},500);
	});

	/**
	 * [slider description] 图片运动的函数
	 * @return {[type]} [description] 无返回值
	 */
	function slider(){
		if(_now==numLi.size()-1){
			ali.eq(0).css({
					'position':'relative',
					'left': oul.width()
			});
			_now=0;
		}else{
			_now++;
		}

		_now2++;

		numLi.eq(_now).addClass('current').siblings().removeClass();

		var imgAlt = aimg.eq(_now).attr('alt');
		op.html(imgAlt);

		oul.animate({'left':-aliWidth*_now2},500,function(){
			if(_now==0){
				ali.eq(0).css('position','static');
				oul.css('left',0);
				_now2=0;
			}
		});


	}

	timeId = setInterval(slider,3000);

	/*$('.wrap').mouseover(function(){
		clearInterval(timeId);
	});

	$('.wrap').mouseout(function(){
		timeId = setInterval(slider,1500);
	});*/

	$('.wrapBox').hover(function(){
		clearInterval(timeId);
	},function(){
		timeId = setInterval(slider,3000);
	});
});