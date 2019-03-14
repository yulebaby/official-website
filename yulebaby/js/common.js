 //页面滚动条导航添加样式
//$(window).on('scroll',function(){
//	if($(this).scrollTop()>250){
//		$('.header-main').addClass('hactive');
//	}else{
//		$('.header-main').removeClass('hactive');
//	}
//})
 $('.visualizeShow').hover(function(){
	$(this).find('.shopListBox').show();
},function(){
	$(this).find('.shopListBox').hide();
});
$('.concatUs').hover(function(){
	$(this).find('.phoneBox').show();
},function(){
	$(this).find('.phoneBox').hide();
});