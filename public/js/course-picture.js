define(['jquery','template','util','uploadify','Jcrop','form'], function ($, template, util) {
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

            var nowCrop = null;

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
                    $('.preview img').attr('src',obj.result.path);
                    $('#cropBtn').text('保存图片').attr('data-flag',true);
                    croppic();
                }
            })

            //处理封面裁切事件
            $('#cropBtn').click(function () {
                var flag = $(this).attr('data-flag');
                if(flag){
                    $('#cropForm').ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/picture',
                        data:{cs_id:csId},
                        datatype:'json',
                        success: function (data) {
                            if(data.code == 200){
                                alert('保存成功');
                                location.href='/course/lesson?cs_id='+data.result.cs_id;
                            }
                        }
                    })
                }else{//没有flag 第一次点击
                    $(this).text('保存图片').attr('data-flag',true);
                    //裁剪图片功能
                    croppic();
                }
            })

            //封装裁剪图片功能
            function croppic(){
                var $img = $('.preview img');
                $img.Jcrop({
                    aspectRatio:2
                }, function () {
                    //销毁之前的裁切实例对象
                    nowCrop&&nowCrop.destroy();
                    //保证只有一个裁切实例，不会冲突
                    nowCrop = this;

                    //获取图片的宽和高
                    var width = this.ui.stage.width;
                    var height = this.ui.stage.height;
                    var x = 0;
                    var y = (height-width/2)/2;
                    var w = width;
                    var h = width/2;
                    //初始化默认选区位置
                    var inpArr = $('#cropForm').find('input');
                    $(inpArr[0]).val(x);
                    $(inpArr[1]).val(y);
                    $(inpArr[2]).val(w);
                    $(inpArr[3]).val(h);
                    //动态创建剪切选区
                    this.newSelection();
                    this.setSelect([x,y,w,h]);
                    //初始化缩略预览图位置
                    this.initComponent('Thumbnailer',{width:240,height:120,mythumb:'.thumb'})
                    $('.jcrop-thumb').css({top:0});
                    //选区大小改变事件，记录选取位置
                    $('.preview').on('cropstart cropmove cropend', function (a, b, c) {
                        var inpArr = $('#cropForm').find('input');
                        $(inpArr[0]).val(c.x);
                        $(inpArr[1]).val(c.y);
                        $(inpArr[2]).val(c.w);
                        $(inpArr[3]).val(c.h);

                    } )
                });
            }

        }
    })
})