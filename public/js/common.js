define(['jquery','cookie'],function(){
    // NProgress.start();
    // NProgress.done();

    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    //实现退出功能
    $('#logOut').click(function(){
        $.ajax({
            type:"post",
            url:"api/logout",
            success:function(data){
                location.href="/main/login";
            }
        })
    })

    //实现没登录就不能访问主页
    var flag = $.cookie("PHPSESSID");
    if(!flag && location.pathname != '/main/login'){
        location.href = "/main/login";
    }

    //根据cookie传的参数，设置用户头像
    var logInfo =$.cookie("logInfo");
    logInfo =logInfo && JSON.parse(logInfo);
    $('.aside .avatar img').attr({
        "src": logInfo.tc_avatar
    });
    $('.aside h4').html(logInfo.tc_name)
})
