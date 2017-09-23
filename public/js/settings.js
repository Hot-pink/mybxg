define(['jquery','template'], function ($,template) {
    $.ajax({
        url:'/api/teacher/profile',
        datatype:'json',
        success: function (data) {
            console.log(data);
            var html = template("settingTpl",data.result)
            $('#formInfo').html(html);
        }
    })
})