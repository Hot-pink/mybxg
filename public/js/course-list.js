define(['jquery','template','util'], function ($, template,util) {
    //���ò˵��б�ѡ�и�����չ��
    util.setMenu(location.pathname);

    //��ȡ���пγ��б�����
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