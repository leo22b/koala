<?php
	header("Content-type: text/html; charset=utf-8");
	// POST请求
    /**
     参数说明:
     user:账号
     password:密码
     */
	echo "\n用户名:".$_POST["user"]."\n";
	echo "密码:".$_POST["password"]."\n";
    
    if($_POST["user"]=="qingbuyaodianwo" && $_POST["password"]=="123321"){
        echo "\n登陆成功!";
    }else{
        echo "\n账号或密码错误，请重新输入!";
    }
?>




