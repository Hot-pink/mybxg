define(['jquery','template','util'], function ($, template,util) {
    //设置菜单列表选中高亮，展开
    util.setMenu(location.pathname);

    //获取所有课程列表数据
    $.ajax({
        type:"get",
        url:'/api/course',
        datatype:'json',
        success: function (data) {
            console.log(data);
            var html = template('courseTpl',data);
            $('#courseInfo').html(html);
        }
    })
})