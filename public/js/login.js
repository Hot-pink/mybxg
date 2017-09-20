    define(['jquery','cookie'],function($){
        $(".btn").click(function() {
            $.ajax({
                url:'/api/login',
                type: 'post',
                dataType: 'json',
                data: $("#loginForm").serialize(),
                success:function(data){
                    //登录成功后,把返回的用户名，和用户头像，保存到cookie里
                    $.cookie("logInfo",JSON.stringify(data.result),{path:"/"})
                    if(data.code == 200){
                        location.href = "/main/index";
                    }
                }
            })
            return false;
        })
    });


