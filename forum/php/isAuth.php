<?php


$key = $_COOKIE['key'];
//$key = '816da73c8c71403fe5a47a9e6a0d1fbc';
include_once 'connect.php';
$res = mysql_query("SELECT * FROM  `session` WHERE  `key` =  '$key'");

if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $id_user = $row['iduser'];
    }
    $res = mysql_query("SELECT * FROM user WHERE id='$id_user' ORDER BY id");
    if (mysql_num_rows($res) > 0){
        while ($row = mysql_fetch_array($res)) {
            $name = $row['name'];
        }
    }
    $obj = array(
        'name'=>$name,
        'status' => 'OK'
    );
    echo json_encode($obj);
}else{
    echo 'err'.'<br>';
    echo $key;
}