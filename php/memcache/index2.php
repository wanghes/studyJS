<?php
$memcache = memcache_connect('localhost', 11211);

if ($memcache) {
	header('Access-Control-Allow-Origin:*');
	header("Access-Control-Allow-Credentials: true");
	if($_GET){
		$page = $_GET['page'];
		$pageSize = $_GET['pageSize'];
	}

	$result = $memcache->get('result');

	$offset = ($page-1)*$pageSize;

	$result = array_slice($result , $offset, $pageSize);
 	sleep(0); //设置延时

	exit(json_encode($result));

//header('Content-Type: text/xml');  //返回xml数据的接口header
/*$name="zhidao";
$age=10;

//构造xml数据格式
$xml = <<<XML
<?xml version="1.0" encoding="utf-8"?>
<baidu>
<name> {$name} </name>
<age>{$age}</age>
</baidu>
XML;
echo $xml;*/

}
else {
	echo "Connection to memcached failed";
}

?>