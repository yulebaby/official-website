$(function () {
	$('.nav-btn').on('click', function () {
		$('.nav-box').toggleClass('active');
	});
	$('.nav-box').on('click', function () {
		$(this).removeClass('active');
	});


	$('#scrollTop').on('click', function () {
		$('html,body').animate({scrollTop: 750}, 500)
	});

	var loading = false;
	$('#submit').on('click', function () {
		var phone = $('#phone').val();
		var babyName = $('#babyName').val();
		var birthday = $('#birthday').val();
		var phoneReg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
		if (!babyName) { $('#error').text('请输入宝宝昵称'); return; }
		if (!birthday) { $('#error').text('请输入宝宝生日'); return; }
		if (!phone || !phoneReg.test(phone)) { $('#error').text('请输入正确的联系电话'); return; }
		$('#error').text('');
		if (!loading) {
			loading = true;
			$.ajax({
				url: 'https://sale.beibeiyue.com/kb/manager/register',
				type: 'post',
				data: {
					spreadId: 10000040,
					phone: phone,
					babyName: babyName,
					birthday: birthday,
					typeStyle: 1
				},
				dataType: 'json',
				success: function (res) {
					loading = false;
					alert('提交成功')
				},
				error: function () { laoding = false; }
			})
		}
	})
})

$.ajax({
	url: 'http://tpay.beibeiyue.com/pay/wx/unifiedOrder/token?brandId=7&url=' + encodeURIComponent(location.href.split('#')[0]),
	type: 'get',
	dataType: 'json',
	success: function (res) {
		var result = JSON.parse(res.result)
		wx.config({
			debug: false,
			appId: result.appid, // 必填，公众号的唯一标识
			timestamp: result.timestamp, // 必填，生成签名的时间戳
			nonceStr: result.nonceStr, // 必填，生成签名的随机串
			signature: result.signature,// 必填，签名
			jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
		});
	}
});

wx.ready(function(){
    wx.onMenuShareTimeline({
	    title: 'Wislight初之光国际婴幼儿托育中心',
	    link: location.href.split('#')[0],
	    imgUrl: 'https://ylbb-system.oss-cn-beijing.aliyuncs.com/wislight.jpg'
	});
	wx.onMenuShareAppMessage({
	    title: 'Wislight初之光国际婴幼儿托育中心',
			desc: '专业五星级婴幼儿托育机构致力于为0-3岁宝宝提供科学的照顾和系统的引导教育', // 分享描述
	    link: location.href.split('#')[0],
	    imgUrl: 'https://ylbb-system.oss-cn-beijing.aliyuncs.com/wislight.jpg'	
	});
});