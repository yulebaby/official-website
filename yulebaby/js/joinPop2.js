$('.joinBtn').click(function(){
	$('#nameBox').val('');
	$('#phoneBox').val('');
	$('.errorTip').css('display','none');
	$('.popbg').show();
	$('.joinPop').show();
});
$('.closeBtn').click(function(){
	$('.popbg').hide();
	$('.joinPop').hide();
});
$('.closeSmall').click(function(){
	$('.popbg').hide();
	$('.popTips').hide();
})
	//验证名字
	var isName=/^[\u4e00-\u9fa5]{1,20}$/
	//验证手机号
	var isMob = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
	var clickTop = true;//初始化点击状态
	$('.getBtn').click(function(){
		if(!$('#nameBox').val()){
			$('.nameTip').css('display','block');
			$('.nameTip').html('请输入姓名');
			return
		}else if(!isName.test($('#nameBox').val())){
			$('.nameTip').css('display','block');
			$('.nameTip').html('姓名只能是中文');
			return
		}else{
			$('.nameTip').css('display','none');
			$('.nameTip').html('');
		}
		if(!$('#phoneBox').val()){
			$('.phoneTip').css('display','block');
			$('.phoneTip').html('请输入电话号码');
			return
		}else if(!isMob.test($('#phoneBox').val())){
			$('.phoneTip').css('display','block');
			$('.phoneTip').html('请输入正确的电话号码');
			return
		}else{
			$('.phoneTip').css('display','none');
			$('.phoneTip').html('');
			var checkedSex = $('.genderBox').find('input[type=radio]:checked').val();
			
			var params = {
				name:$('#nameBox').val(),
	            mobile:$('#phoneBox').val(),
	            sex:checkedSex,
	            area:1,
	            measure:1,
	            position:1,
	            source:3,
	            basepath:window.location.href,
	            nodeThree:10001016
			}
			if(clickTop){
				clickTop = false; 
				$.ajax({
//							url:'http://10.1.1.156:8100/s/calcShopCostNew',
					url:'https://oac.beibeiyue.com/s/calcShopCostNew',
			     	type: 'POST',
			     	dataType:"json",
			     	data:params,
			     	success:function(data){
			     		clickTop = true;
			     		flag=data.flag
		                if(flag==1){
		                    pop("请填写您的姓名");
		                    closeFn();
		                }
		                if(flag==2){
		                    pop("请选择您是先生或女士");
		                    closeFn();
		                }
		                if(flag==3){
		                    pop("请选择开店区域");
		                    closeFn();
		                }
		                if(flag==4){
		                    pop("请选择门店面积");
		                    closeFn();
		                }
		                if(flag==5){
		                    pop("请选择门店位置");
		                    closeFn();
		                }
		                if(flag==6){
		                    pop("请填写正确的手机号码");
		                    closeFn();
		                }
		                if(flag==7){
		                    pop('加盟成本已发送至手机，或招商经理与您联系过加盟事宜，仍有疑问请拨打400-632-1531');
		                    closeFn();
		                }
		                if(flag==0){
		                    pop('获取成功，将会有专业的招商经理为您提供详细分析报告400-632-1531');
		                    closeFn();
		                }
		                if(flag==-1){
		                    pop('服务器开小差，请刷新页面，重试');
		                    closeFn();
		                }
			     	},error:function(data){
			     		pop('服务器开小差，请刷新页面，重试');
			     		closeFn();
			     	}
				})
			}
		}
	});
	$('#nameBox').blur(function(){
		if(!$(this).val()){
			$('.nameTip').css('display','block');
			$('.nameTip').html('请输入姓名');
			return
		}else if(!isName.test($('#nameBox').val())){
			$('.nameTip').css('display','block');
			$('.nameTip').html('姓名只能是中文');
			return
		}else{
			$('.nameTip').css('display','none');
		}
	});
	$('#phoneBox').blur(function(){
		if(!$(this).val()){
			$('.phoneTip').css('display','block');
			$('.phoneTip').html('请输入电话号码');
			return
		}else if(!isMob.test($('#phoneBox').val())){
			$('.phoneTip').css('display','block');
			$('.phoneTip').html('请输入正确的电话号码');
			return
		}else{
			$('.phoneTip').css('display','none');
		}
	});
	
//弹出层提示
function pop(str){
	$('.popTips,.popbg').show();
    $('.popTips').addClass('activePop');
    $('.popTips span').html(str);
}
function closeFn(){
	setTimeout(function(){
		$('.popTips,.popbg').hide();
		$('.popbg').hide();
	    $('.popTips').addClass('activePop');
	},5000)
}