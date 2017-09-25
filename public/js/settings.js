define(['jquery','template','ckeditor','uploadify','region',,'datepicker','language','validate','form'], function ($,template) {
    //渲染信息中心页面
    $.ajax({
        url:'/api/teacher/profile',
        datatype:'json',
        success: function (data) {
            console.log(data);
            var html = template("settingTpl",data.result)
            $('#formInfo').html(html);

            //上传头像文件
            $('#upfile').uploadify({
                width:120,
                height:120,
                buttonText:'',
                itemTemplate:'<span></span>',
                swf:'/public/assets/uploadify/uploadify.swf',
                //后台接口位置
                uploader:'/api/uploader/avatar',
                fileObjName:'tc_avatar',
                onUploadSuccess: function (a, b, c) {
                    console.log(b);
                    var obj = JSON.parse(b);
                    $('.preview img').attr('src',obj.result.path);
                }
            })

            //省市县三级联动
            $('#pcd').region({
                url:'/public/assets/jquery-region/region.json'
            })
            
            //添加副文本功能
            CKEDITOR.replace('editor',{
                toolbarGroups : [
                    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                    { name: 'links', groups: [ 'links' ] },
                    { name: 'insert', groups: [ 'insert' ] }
                ]
            });

            //完成保存功能
            $('#settingsForm').validate({
                sendForm:false,
                valid: function () {
                    //拼接家乡信息
                    var p = $('#p').find('option:selected').text();
                    var c = $('#c').find('option:selected').text();
                    var d = $('#d').find('option:selected').text();
                    var homeTown = p+'|'+c+'|'+d;

                    //同步副文本内容
                    for(var k in CKEDITOR.instances){
                        CKEDITOR.instances[k].updateElement();
                    }

                    //提交表单
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/teacher/modify',
                        data:{tc_hometown:homeTown},
                        datatype:'json',
                        success: function (data) {
                            console.log(data);
                            if(data.code == 200){
                                //location.reload();
                            }
                        }
                    })
                }
            });
        }
    })
})