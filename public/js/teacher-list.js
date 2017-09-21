define(['jquery','template','bootstrap'],function($,template){
    $.ajax({
        type:'get',
        url:'/api/teacher',
        success:function(data){
            var html = template('teacherTpl',data);
            $('#teacherInfo').html(html);

            // 启用注销功能
            $('.eod').click(function () {
                var $that = $(this);
                var $td = $(this).closest("td");
                var tcId = $td.attr("data-tcId");
                var tcStatus = $td.attr("data-status");
                $.ajax({
                    type:'post',
                    url:'/api/teacher/handle',
                    datatype:'json',
                    data:{tc_id:tcId,tc_status:tcStatus},
                    success: function (data) {
                        if(data.code==200){
                            $td.attr("data-status",data.result.tc_status)
                            if(data.result.tc_status == 1){
                                $that.html("启用");
                            }else{
                                $that.html("注销");
                            }
                        }
                    }
                })
            });

            //讲师资料查看功能
            $('.preview').click(function () {
                var $td = $(this).closest("td");
                var tcId = $td.attr("data-tcId");
                $.ajax({
                    type:'get',
                    url:'/api/teacher/view',
                    data:{tc_id:tcId},
                    datatype:'json',
                    success: function (data) {
                        console.log(data);
                        var html = template('modalTpl',data.result);
                        $('#modalInfo').html(html);
                        $('#teacherModal').modal();
                    }
                })
            })
        }
    });
})