<?php
//require('dlufMemcache.php');
/*$memcache = new dlufMemcache('127.0.0.1',11211);
echo $memcache;
$memcache->set('memcache','come on dluf&baidu !!!!!!');
$ret = $memcache->get('memcache');
print_r($ret,true);*/
//phpinfo();
$dbms='mysql';
$host='localhost';
$dbName='demo';
$user='root';      //数据库连接用户名
$pass='yinrenlei00';
$dsn="$dbms:host=$host;dbname=$dbName";
header("Content-type: text/html; charset=utf-8");

/*phpinfo();*/
try {
    $dbh = new PDO($dsn, $user, $pass); //初始化一个PDO对象
  	$dbh->exec('set names utf8');
   	$sth = $dbh->prepare('SELECT * from food');
	$sth->execute();
	$result = $sth->fetchAll(PDO::FETCH_ASSOC);


	$memcache = memcache_connect('localhost', 11211);

	if ($memcache) {
		$memcache->set("str_key", "String to store in memcached");
		$memcache->set("num_key", 123);

		$object = new StdClass;
		$object->attribute = 'test';
		$memcache->set("obj_key", $object);


		$memcache->set("result", $result);

		$array = Array('assoc'=>123, 345, 567);
		$memcache->set("arr_key", $array);

		 header('Access-Control-Allow-Origin:*');
		exit(json_encode($memcache->get('obj_key')));
	}
	else {
		echo "Connection to memcached failed";
	}
    $dbh = null;
} catch (PDOException $e) {
    die ("Error!: " . $e->getMessage() . "<br/>");
}
?>