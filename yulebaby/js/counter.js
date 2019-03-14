$('.btn div').click(function () {
    if(!$(this).hasClass('active')){
        $(this).addClass('active').children("img:first-child").addClass('hidden').siblings().removeClass('hidden');
        $(this).siblings().removeClass('active').children("img:last-child").addClass('hidden').siblings().removeClass('hidden');
    }
});
var area,meter,position,number,name,sex,off=true,flag=null;
$('.go').click(function () {
    $('input').val('')
    $('.city').each(function () {
        if($(this).hasClass('active')){
            area=$(this).attr('data-value')
        }
    })
    $('.meter').each(function () {
        if($(this).hasClass('active')){
            meter=$(this).attr('data-value')
        }
    })
    $('.area').each(function () {
        if($(this).hasClass('active')){
            position=$(this).attr('data-value')
        }
    })
    if(area==undefined){
        pop("请选择开店区域");
    }else if(meter==undefined){
        pop("请选择门店面积");
    }else if(position==undefined){
        pop("请选择门店位置");
    }else{
        $('.calc-1').fadeOut();
        $('.calc-2').delay(500).fadeIn();
        $('.gif img').attr('src','images/counter/monitor.gif')
    }
})
$('.reset').click(function () {
    area=null,meter=null,position=null,number=null,name=null,sex=null,flag=null;
    off=true;
    $('.calc-2').fadeOut();
    $('.calc-1').delay(500).fadeIn();
    setTimeout(function () {
        $('.gif img').attr('src','images/monitor-01.png')
        $('input').val('')
    },500)
})
function urlArgs(){
    var args = {};
    var query = document.referrer.substring(1);
    var pairs = query.split("&");
    for(var i=0; i<pairs.length; i++){
        var pos = pairs[i].indexOf("=");
        if(pos == -1) continue;
        var key = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos+1);
        value = decodeURIComponent(value);
        args[key] = value;
    }
    return args;
}
$('.submit-1').click(function () {
    if(flag==null){
        var isMob=/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
        var isName=/^[\u4e00-\u9fa5]{1,20}$/
        number=$('.number input').val().trim();
        name=$('.name input').val().trim();
        $('.sex').each(function () {
            if($(this).hasClass('active')){
                sex=$(this).attr('data-value')
            }
        })
        if(number==null||number==undefined||number==''){
            pop2("请填写您的手机号码");
        }else if(!isMob.test(number)){
        	pop2("请填写正确的手机号码");
        }else if(name==null||name==undefined||name==''){
            pop2("请告知我们您贵姓");
        }else if(!isName.test(name)){
        	pop2("姓名只能是中文");
        }else if(sex==undefined){
            pop2("请选择您是先生或女士");
        }else{
            if(off==true){
                var s,sousuo,word,args=urlArgs();
                if(args.wd!=undefined){
                    word=args.wd;
                    sousuo='百度';
                }else if(args.q!=undefined){
                    word=args.q;
                    sousuo='360';
                }else if((args.wd==undefined)&&(args.q==undefined)){
                    word='空';
                    sousuo='空'
                }
                console.log(word,sousuo);
                off=false;
                $.ajax({
                    type:"POST",
                    //url:"http://192.168.1.159:8081/s/calcShopCostNew",
                    url:"http://oac.beibeiyue.com/s/calcShopCost",
                    data:{name:name,mobile:number,sex:sex,area:area,measure:meter,position:position,source:'64',basepath:window.location.href,nodeThree:10001015},
                    datatype: "json",
                    success:function(msg){
                        flag=msg.flag
                        if(area=='2'){
                            s='加盟成本已发送至手机，或招商经理与您联系过加盟事宜，仍有疑问请拨打400-632-1531'
                        }else{
                            s='加盟成本已发送至手机，或招商经理与您联系过加盟事宜，仍有疑问请拨打400-632-1531'
                        }
                        if(flag==1){
                            pop2("请填写您的姓名");
                        }
                        if(flag==2){
                            pop2("请选择您是先生或女士");
                        }
                        if(flag==3){
                            pop2("请选择开店区域");
                        }
                        if(flag==4){
                            pop2("请选择门店面积");
                        }
                        if(flag==5){
                            pop2("请选择门店位置");
                        }
                        if(flag==6){
                            pop2("请填写正确的手机号码");
                        }
                        if(flag==7){
                            pop2(s)
                        }
                        if(flag==0){
                            pop2('加盟成本已发送，请注意查收。<br/>如未收到，请在5分钟后重试。')
                        }
                        if(flag==-1){
                            pop2('服务器开小差，请刷新页面，重试')
                        }
                    },
                    error: function(){
                        pop2('服务器开小差，请刷新页面，重试')
                    }
                })
            }
        }
    }else{
         pop2(s)
    }
})
$('.number input').focusin(function () {
    off=true;
    flag=null;
})
$('.pop-footer').click(function () {
    $('.op').hide()
    $('.pop').hide()
})
function pop2(str){
    $('.op').show()
    $('.pop').show()
    $('.pop span').html(str)
}