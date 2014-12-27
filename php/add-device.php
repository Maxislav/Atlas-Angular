<?php
/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 12/26/14
 * Time: 10:46 PM
 */

function valid($str){
    $pattern = '/[^(0-9)\w_]/i';
    $replace = "";
    $res = preg_replace($pattern, $replace, $str);
    return $res;
};

$imei = valid($_POST['imei']);
$name = valid($_POST['name']);
$phone = valid($_POST['phone']);

include_once 'connect.php';
$key = $_COOKIE['key'];



$res = mysql_query("SELECT * FROM `session` WHERE `key`='$key' ORDER BY id");
if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $iduser = $row['iduser'];
    }
    $res_d = mysql_query("SELECT * FROM `devices` WHERE `imei`='$imei' ORDER BY id");
    if (mysql_num_rows($res_d) > 0){
        while ($row = mysql_fetch_array($res_d)) {
            $iduser_d = $row['iduser'];
        }
        if($iduser_d == $iduser){
            echo 'EXIST_CURRENT';
        }else{
            echo 'EXIST_OTHER';
        }
        return null;
    }




    $sql_opt = mysql_query("INSERT INTO `devices` (id,iduser,imei,name, phone) VALUES (NULL,'$iduser','$imei','$name','$phone')");
    if ($sql_opt) {
       echo 'OK';
    }
}else{
    setcookie('key', null, time() - 3600, '/');
    http_response_code(401);
}