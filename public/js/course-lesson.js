define(['jquery','template','util'], function ($, template, util) {
    util.setMenu('/course/add');
    //获取课程id查询课时相关信息
    var csId = util.qs('cs_id');
    $.ajax({
        type:'get',
        url:'/api/course/lesson',
        data:{cs_id:csId},
        datatype:'json',
        success: function (data) {
            console.log(data);
            var html = template('lessonTpl',data.result);
            $('#lessonInfo').html(html);
        }
    })
})