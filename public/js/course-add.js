define(['jquery','template','util','form'], function ($,template,util) {
    //���ÿγ����ѡ�и�����չ��
    util.setMenu(location.pathname);

    //�󶨱��ύ�����¼�
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