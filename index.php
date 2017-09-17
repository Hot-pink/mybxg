<?php

    header('Content-type:text/html;charset = utf-8');


    //设置默认目录名
    $dir = "main";
    $filename = "index";
    if(array_key_exists("PATH_INFO",$_SERVER)){
        // 如果有PATH_INFO属性，则获取
        $path = $_SERVER["PATH_INFO"]; // /main/index
        //截取字符串，去掉第一个/
        $str = substr($path,1);
        //分割成数组
        $ret = explode("/",$str);

        if(count($ret) == 2){
            //如果有两层 那么替换默认
            $dir = $ret[0];
            $filename = $ret[1];
        }else{
            //如果不够两层 转到登录页
            $filename = "login";
        }
    }

    //如果地址后没跟任何目录 也就是没有PATH_INFO属性，则转到默认目录名
    include('./views/'.$dir.'/'.$filename.'.html');
?>