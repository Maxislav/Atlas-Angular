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
include_once '../../php/connect.php';
$res = mysql_query("SELECT * FROM user WHERE name='$login' ORDER BY id");


if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $pass_bd = $row['pass'];
        $login_bd = $row['name'];
    }
    if($login_bd!= $login){
        echo 'NOT_EXIST';
    }else if($pass_bd == $pass ){

        $random = md5(rand(100, 10000)."".rand(0, 20));
        //SetCookie("key", $random, time()+3600*24);

        echo $_COOKIE['key'];
    }else{
        echo 'WRONG_PASS';
    }
}else{
    echo 'NOT_EXIST_01';
}