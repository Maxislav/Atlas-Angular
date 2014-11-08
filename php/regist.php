<?php
$login = $_POST['login'];
$pass = $_POST['pass'];
function valid($str){
    $pattern = '/[^(0-9)\w_]/i';
    $replace ="";
    $res = preg_replace($pattern, $replace, $str);
    return $res;
}

$login = valid($login);

include_once 'connect.php';
$res = mysql_query("SELECT * FROM user WHERE name='$login' ORDER BY id");




if(!$login || empty($login)){
    echo 'EMPTY_VAL';
}else if(strlen($login)<4){
    echo 'SHORT_VAL';
}else if (mysql_num_rows($res) > 0) {
    echo 'USER_EXIST';
}else{

    $sql = mysql_query("INSERT INTO `user` (id,name,pass) VALUES (NULL,'$login','$pass')");

    if($sql)
    {
        echo 'OK';
    }
    else
    {
        echo 'failure' .mysql_error();
    }


    mysql_close();
}