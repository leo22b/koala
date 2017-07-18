<?php

	header("Content-type: text/html; charset=utf-8"); 

	// GET请求
    /**
     参数说明:
     user:账号
     password:密码
     */
	echo "\n用户名:".$_GET["user"]."\n";
	echo "密码:".$_GET["password"]."\n";
    
    // 账号:qingbuyaodianwo  密码:123321
    if($_GET["user"]=="qingbuyaodianwo" && $_GET["password"]=="123321"){
        echo "\n登陆成功!";
    }else{
        echo "\n账号或密码错误，请重新输入!";
    }
?>




