<?php
echo 'dsdsdcsd';
$file_handle = fopen("../config.txt", "r");
while (!feof($file_handle)) {
    $line =$line.fgets($file_handle);
}
fclose($file_handle);
$obj = json_decode($line);


$hostname = $obj->{'host'};
$username = $obj->{'root'};
$password = $obj->{'pass'};

$table_db = $obj->{'table'};

$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
or die('connect to database failed');
mysql_select_db($table_db)
or die('db not found');
mysql_query("SET NAMES utf8");
