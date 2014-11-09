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
$pass = valid($pass);
include_once 'connect.php';
$res = mysql_query("SELECT * FROM user WHERE name='$login' ORDER BY id");


if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $pass_bd = $row['pass'];
        $login_bd = $row['name'];
    }
    if($login_bd!= $login){
        echo 'NOT_EXIST';
    }else if($pass_bd == $pass ){
        echo 'OK';
    }else{
        echo 'WRONG_PASS';
    }
}else{
    echo 'NOT_EXIST';
}