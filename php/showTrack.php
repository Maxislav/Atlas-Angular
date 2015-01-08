<?php

function valid($str){
    $pattern = '/[^(0-9)\w_]/i';
    $replace = "";
    $res = preg_replace($pattern, $replace, $str);
    return $res;
};
$imei = valid($_POST['imei']);
$from = valid($_POST['from']);
$to = valid($_POST['to']);
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
            //echo 'EXIST_CURRENT';

            echo  json_encode(getTrack($imei,$from,$to));

        }else{
            echo 'EXIST_OTHER';
            return null;
        }

    }
}

function getTrack($imei, $from, $to){
    $track = array();
    $sel =   "
        SELECT * FROM  log
        WHERE(
            imei='$imei'
            AND datetime>= $from
            AND datetime<=$to

        )
        ORDER BY datetime   ";
    $res = mysql_query($sel);
    while($row = mysql_fetch_array($res)){
        array_push($track,Array(
           'imei' =>$row['imei'],
            'dateTime'=>$row['datetime']
        ));
    }

    return $track;

}
