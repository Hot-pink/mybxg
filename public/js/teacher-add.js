define(['jquery','template','util'], function ($, template,util) {
    //调用封装的工具函数获取url里的get提交的id参数
    var tcId = util.qs("tc_id");
    if(tcId){
        //有id就是编辑操作
        $.ajax({
            url:'/api//teacher/edit',
            data:{tc_id:tcId},
            datatype:'json',
            success: function (data) {
                var html = template('teacherTpl',data.result)
                $('#teacherInfo').html(html);
            }
        })
    }else{
        //没有id添加操作
        var html = template('teacherTpl',{})
        $('#teacherInfo').html(html);

    }
})

