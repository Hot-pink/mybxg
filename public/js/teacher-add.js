define(['jquery','template','util','datepicker','language','form','validate'], function ($, template,util) {
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
                submitForm('/api/teacher/update')
            }
        })
    }else{
        //没有id添加操作
        var html = template('teacherTpl',{})
        $('#teacherInfo').html(html);
        submitForm('/api//teacher/add');
    }

    //封装公用提交函数
    function submitForm(url){
        $('#tecInfo').validate({
            //禁用默认提交
            sendForm:false,
            //全部验证通过执行
            valid: function () {
                //用jQuery.form方式提交
                $(this).ajaxSubmit({
                    type:'post',
                    url:url,
                    datatype:'json',
                    success: function (data) {
                        if(data.code==200){
                            alert("提交成功");
                            location.href="/teacher/list"
                        }
                    }
                })
            },
            //验证结果描述
            description:{
                tcName:{
                    required:'*姓名不能为空'
                },
                tcPass:{
                    required:'*密码不能为空',
                    pattern:'*密码必须为6位数字'
                },
                tcJoinDate:{
                    required:'*日期不能为空'
                }
            }

        })
    }

    //function submitForm(url){
    //    $('.btn-sm').click(function () {
    //        $.ajax({
    //            type:'post',
    //            url:url,
    //            data:$('#tecInfo').serialize(),
    //            datatype:'json',
    //            success: function (data) {
    //                console.log(data);
    //                if(data.code == 200){
    //                    alert("提交成功");
    //                    location.href="/teacher/list";
    //                }
    //            }
    //        })
    //    })
    //
    //}
})

