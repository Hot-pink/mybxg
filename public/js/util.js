define(['jquery'], function () {
    //���ߺ���
    return {
        //��װ���� ��ȡurl��ַ����ֵ
        qs: function (key) {
            var param = location.search.substr(1);
            if(param){
                param = param.split("&");
                var resule = null;
                $.each(param,function (index, item) {
                    var arr = item.split("=");
                    if(arr[0] == key){
                        resule = arr[1];
                        return false;
                    }
                })
                return resule;
            }
        },

        //��װ������ʾ����
        setMenu: function (path) {
            $('.aside .navs a[href="'+path+'"]').addClass('active').closest("ul").show();
        }
    }

})
