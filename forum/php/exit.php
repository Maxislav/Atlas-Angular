<?php
$key = $_COOKIE['key'];
include_once 'connect.php';
$sql =mysql_query ("DELETE FROM `session` WHERE `key` =  '$key' ");
SetCookie("key", "", time()-100);
echo 'OK';