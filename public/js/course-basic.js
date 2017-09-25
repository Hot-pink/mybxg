define(['jquery','template','util','ckeditor','validate','form'], function ($, template, util) {
    //设置导航菜单选中
    util.setMenu('/course/add');
    //获取课程id
    var cs_id = util.qs('cs_id');
    //获取标志位，确定是修改还是添加
    var flag = util.qs('flag');
    //根据课程id查询相关基本信息
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        data:{'cs_id':cs_id},
        success: function (data) {
            if(flag){
               data.result.operate = '课程修改';
            }else{
                data.result.operate = '课程添加';
            }
            var html = template('basicTpl',data.result);
            $('#basicInfo').html(html);

            //处理二级分类下拉联动
            $('#firstType').change(function () {
                //获取选中的父级id
                var pid = $(this).val();
                //根据一级分类的id，调后端接口查询二级分类的数据
                $.ajax({
                    type:'get',
                    url:'/api/category/child',
                    data:{cg_id:pid},
                    datatype:'json',
                    success: function (data) {
                        console.log(data);
                        var tpl="<option value=''>请选择二级分类</option>{{each result}}<option value='{{$value.cg_id}}'>{{$value.cg_name}}</option>{{/each}}"
                        var html = template.render(tpl,data);
                        $('#twoType').html(html);
                    }
                })
            })

            //添加副文本功能
            CKEDITOR.replace('editor',{
                toolbarGroups : [
                    { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
                    { name: 'links', groups: [ 'links' ] },
                    { name: 'insert', groups: [ 'insert' ] }
                ]
            })

            //验证表单+保存功能
            $('#basicForm').validate({
                sendForm:false,
                valid: function () {
                    //处理副文本内容同步
                    for(var k in CKEDITOR.instances){
                        CKEDITOR.instances[k].updateElement();
                    }
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/course/update/basic',
                        data:{cs_id:cs_id},
                        datatype:'json',
                        success: function (data){
                            if(data.code == 200){
                                location.href='/course/picture?cs_id='+data.result.cs_id;
                            }
                        }
                    })
                }
            })


        }
    })
})