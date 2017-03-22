<?php

 header('Access-Control-Allow-Origin:http://localhost:8084');
 header("Access-Control-Allow-Credentials: true");

$pst = $_POST;
$files = $_FILES;
$arr=array();
foreach ($pst as $key => $value) {
	$arr[] = $value;
}
$upfile = './upload';
$num =1 ;
foreach ($files as $key => $value) {

	$ext= substr($value['name'], strrpos($value['name'], '.')+1);
	//echo pathinfo($value['tmp_name']['extension']);
	$num++;
	$time = md5(time()+$num);
	if(is_uploaded_file($value['tmp_name']))
	{
	   if(!move_uploaded_file($value['tmp_name'], $upfile.'/'.$time.'.'.$ext))
	   {
	     echo '移动文件失败！';
	     exit;
	    }
	}
	else
	{
	   print_r($_COOKIE['aa']);
	   echo 'problem!';
	   exit;
	}
}




//exit(json_encode($arr))

?>