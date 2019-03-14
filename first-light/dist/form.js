$(function () {
	$('#scrollTop').on('click', function () {
		$('html,body').animate({scrollTop: 1600}, 500)
	});
	$('.birthday').datePicker({
	    hasShortcut: false,
	    format: 'YYYY-MM-DD'
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
					alert('提交成功');
				},
				error: function () { laoding = false; }
			})
		}
	})
})