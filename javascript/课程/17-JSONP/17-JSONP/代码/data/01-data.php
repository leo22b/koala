<?php
	header("Content-Type:text/html;charset=utf-8");
	
	// 数组
	$content = array('摘要新闻', '财经新闻', '娱乐新闻');
	
	
	// echo json_encode($content);
	
	// fn($content);	 函数调用，并且传递参数
	echo 'showNews(' . json_encode($content) . ')';
?>