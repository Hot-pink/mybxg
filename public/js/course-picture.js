define(['jquery','template','util','uploadify'], function ($, template, util) {
    util.setMenu('/course/add');
    var csId = util.qs('cs_id');

    //请求接口 渲染课程图片
    $.ajax({
        type:'get',
        url:'/api/course/picture',
        data:{cs_id:csId},
        datatype:'json',
        success: function (data) {
            var html = template('pictureTpl',data.result);
            $('#pictureInfo').html(html);

            //处理图片上传功能
            $('#myFile').uploadify({
                width:80,
                height:'auto',
                buttonText:'上传图片',
                itemTemplate:'<span></span>',
                buttonClass:'btn btn-success btn-sm',
                swf:'/public/assets/uploadify/uploadify.swf',
                uploader:'/api/uploader/cover',
                fileObjName:'cs_cover_original',
                formData:{cs_id:csId},
                onUploadSuccess: function (a, b, c) {
                    var obj = JSON.parse(b);
                    $('.preview img').attr('src',obj.result.path)
                }
            })
        }
    })
})