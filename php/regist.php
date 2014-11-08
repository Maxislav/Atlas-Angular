<?php
$login = $_POST['login'];

include_once 'connect.php';
$res = mysql_query("SELECT * FROM user WHERE name='$login' ORDER BY id");

if(!$login || empty($login)){
    echo 'EMPTY_VAL';
}else if(strlen($login)<4){
    echo 'SHORT_VAL';
}else if (mysql_num_rows($res) > 0) {
    echo 'USER_EXIST';
}else{
    echo 'OK';
}