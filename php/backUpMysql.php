<?php
/**
 *
 *  @name php备份数据库
 *  @param string  $DbHost    连接主机
 *  @param string  $DbUser    用户名
 *  @param string  $DbPwd    连接密码
 *  @param string  $DbName    要备份的数据库
 *  @param string  $saveFileName 要保存的文件名, 默认文件保存在当前文件夹中,以日期作区分
 *  @return Null
 *  @example backupMySqlData('localhost', 'root', '123456', 'YourDbName');
 *
 */
function backupMySqlData($DbHost, $DbUser, $DbPwd, $DbName, $saveFileName = '')
{
    header("Content-type:text/html;charset=utf-8");
    error_reporting(0);
    set_time_limit(0);

    echo '数据备份中，请稍候......<br />';

    $link = mysql_connect($DbHost, $DbUser, $DbPwd) or die('数据库连接失败: ' . mysql_error());
    mysql_select_db($DbName) or die('数据库连接失败: ' . mysql_error());
    mysql_query('set names utf8');

    // 声明变量
    $isDropInfo   = '';
    $insertSQL   = '';
    $row      = array();
    $tables     = array();
    $tableStructure = array();
    $fileName    = ($saveFileName ? $saveFileName : 'MySQL_data_bakeup_') . date('YmdHis') . '.sql';

    // 枚举该数据库所有的表
    $res = mysql_query("SHOW TABLES FROM $DbName");
    while ($row = mysql_fetch_row($res)) {

        $tables[] = $row[0];

    }
    mysql_free_result($res);

    // 枚举所有表的创建语句
    foreach ($tables as $val) {

        $res = mysql_query("show create table $val", $link);
        $row = mysql_fetch_row($res);

        $isDropInfo   = "DROP TABLE IF EXISTS " . $val . ";\r\n";
        $tableStructure = $isDropInfo . $row[1] . ";\r\n";

        file_put_contents($fileName, $tableStructure, FILE_APPEND);
        mysql_free_result($res);
    }

    // 枚举所有表的INSERT语句
    foreach ($tables as $val) {

        $res = mysql_query("select * from $val");

        // 没有数据的表不执行insert
        while ($row = mysql_fetch_row($res)) {

            $sqlStr = "INSERT INTO ".$val." VALUES (";

            foreach($row as $v){

                $sqlStr .= "'$v',";

            }
            //去掉最后一个逗号
            $sqlStr = substr($sqlStr, 0, strlen($sqlStr) - 1);
            $sqlStr .= ");\r\n";

            file_put_contents($fileName, $sqlStr, FILE_APPEND);
        }
        mysql_free_result($res);
    }

    echo '数据备份成功！';
}
// 调用此方法
backupMySqlData('localhost', 'root', '', 'demo');

?>