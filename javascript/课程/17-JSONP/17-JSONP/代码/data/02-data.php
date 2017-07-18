<?php
	header("Content-Type:text/html;charset=utf-8");
	
	
	// 获取参数
	$t = $_GET['t'];
	
	
	if($t == 'news'){
		$content = array('摘要新闻', '财经新闻', '娱乐新闻');
		echo 'showData(' . json_encode($content) .')';
	} else if($t == 'num'){
		$content = "123456789";
		echo 'test(' . $content . ')';
	} else if($t == 'str'){
		$content = "'hello123123'";
		echo 'speak(' . $content . ')';
	}
	
?>