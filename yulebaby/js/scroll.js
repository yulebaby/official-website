$(function(){
	var oliWidth = $('.scrollBox li').outerWidth(true);
	var liLen =  $('.scrollBox li').length;
	console.log(oliWidth);
	$('.scrollBox ul').css('width',oliWidth*liLen);
	$('.scrollBox').css('width',oliWidth*liLen);
	var scrollBoxWidth = $('.scrollBox').outerWidth(true)
})
var Timer = null;
//向左走
$(".pre_btn").on("click", function(){
	clearInterval(Timer);
	scroll()
	$(".wrap ul").children().last().prependTo(".wrap ul");
	$(".wrap ul").css( "margin-left", -291 );
	$(".wrap ul").not(":animated").animate({"margin-left": 0}, 500);
});
//向右走
$(".next_btn").on("click", function(){
	clearInterval(Timer);
	scroll()
	$(".wrap ul").not(":animated").animate({"margin-left": -291}, 500, function(){
		$(this).css("margin-left", 0);
		$(this).children().first().appendTo(".wrap ul");
	})
});
function scroll(){
	//定时器
	Timer = setInterval(function(){
		// $(".next_btn").click();
		$( ".wrap ul" ).not( ":animated" ).animate({"margin-left": -291}, 500, function(){
			$(this).css( "margin-left", 0 );
			$(this).children().first().appendTo(".wrap ul");
		})
	},3000);
}
scroll();
//移上去清除定时器，移开打开定时器
$(".wrap").hover(function(){
	clearInterval(Timer);
},function(){
	scroll();
});
$('.next_btn').hover(function(){
	$(this).addClass('on');
	$('.pre_btn').addClass('active')
},function(){
	$(this).removeClass('on');
	$('.pre_btn').removeClass('active')
});
//$('.pre_btn').hover(function(){
//	$(this).addClass('active');
//	$('.next_btn').addClass('on')
//},function(){
//	$(this).removeClass('active');
//	$('.next_btn').removeClass('on')
//})
