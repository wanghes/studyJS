<?php

$error_message[0] = "Unknown problem with upload.";
$error_message[1] = "Uploaded file too large (load_max_filesize).";
$error_message[2] = "Uploaded file too large (MAX_FILE_SIZE).";
$error_message[3] = "File was only partially uploaded.";
$error_message[4] = "Choose a file to upload.";

function getFileExt($file_name){
    while ( $dot = strpos ( $file_name , "." )) {
        $file_name = substr($file_name , $dot +1);
    }
    return $file_name ;
}

function createRandomStr($length){
    $str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';//62个字符
    $strlen = 62;
    while($length > $strlen){
        $str .= $str;
        $strlen += 62;
    }
    $str = str_shuffle($str);
    return substr($str,0,$length);
}
//exit(json_encode($_POST));
$upload_dir  = './tmp/';
$ext = getFileExt($_FILES['file']['name']);
$upload_file = $upload_dir . createRandomStr(15) .'.'. $ext;

if (!preg_match("/(gif|jpg|jpeg|png)$/",$_FILES['file']['name'])) {
    print "I asked for an image...";
} else {
    if (is_uploaded_file($_FILES['file']['tmp_name'])) {
        if (move_uploaded_file($_FILES['file']['tmp_name'], $upload_file)) {
            exit(json_encode(array('status'=>true)));
        } else {
            print $error_message[$_FILES['file']['error']];
        }
    } else {
        print $error_message[$_FILES['file']['error']];
    }
}






