<?php
	header("Content-Type:text/html;charset=utf-8");
	
	
	// 获取参数
	$t = $_GET['t'];
	
	// 调用的函数名称
	$callBack = $_GET['callBack'];
	
	if($t == 'news'){
		$content = json_encode(array('摘要新闻', '财经新闻', '娱乐新闻'));
	} else if($t == 'num'){
		$content = "123456789";
	} else if($t == 'str'){
		$content = "'hello123123'";
	}
	
	
	echo $callBack . '(' . $content . ')';
?>