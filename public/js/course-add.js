define(['jquery','template','util','form'], function ($,template,util) {
    //设置课程添加选中高亮，展开
    util.setMenu(location.pathname);

    //绑定表单提交单击事件
    $('#courseBtn').click(function () {
        $('#courseForm').ajaxSubmit({
            type:'post',
            url:'/api/course/create',
            datatype:'json',
            success: function (data){
                if(data.code == 200){
                    location.href='/course/basic?cs_id='+data.result.cs_id;
                }
            }
        })
    })
})