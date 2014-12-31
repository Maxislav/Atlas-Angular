<?php
include_once 'connect.php';
$key = $_COOKIE['key'];
$res = mysql_query("SELECT * FROM `session` WHERE `key`='$key' ORDER BY id");
if (mysql_num_rows($res) > 0) {
    echo 'OK';
}else{

    setcookie('key', null, time() - 3600, '/');
   // http_response_code(401);
    echo 'NO';
}