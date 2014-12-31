<?php
/**
 * Created by PhpStorm.
 * User: maxim
 * Date: 12/27/14
 * Time: 10:05 AM
 */

include_once 'connect.php';

$key = $_COOKIE['key'];
$res = mysql_query("SELECT * FROM `session` WHERE `key`='$key' ORDER BY id");
if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $iduser = $row['iduser'];
    }
    $imeis = array();
    $names = array();
    $phones = array();
    $res_d = mysql_query("SELECT * FROM `devices` WHERE `iduser`='$iduser' ORDER BY id");
    if(mysql_num_rows($res_d) > 0){
        while ($row = mysql_fetch_array($res_d)) {
            array_push($imeis, $row['imei']);
            array_push($names,$row['name']);
            array_push($phones,$row['phone']);
        }

        $arr = formArr($imeis, $names, $phones);
        echo json_encode($arr);
    }else{
        echo null;
    }
}else{
    setcookie('key', null, time() - 3600, '/');
    http_response_code(401);
}

function formArr($imeis, $names, $phones){
    $arr = array();
    for($i=0; $i<count($imeis); $i++){
        $res = mysql_query("SELECT * FROM `log` WHERE `imei`='$imeis[$i]' ORDER BY datetime DESC limit 1");
        $dateTime = null;
        $lat = null;
        $lng = null;
        $satellites = null;
        $speed = null;
        $zaryad = null;
        if (mysql_num_rows($res) > 0) {
            while ($row = mysql_fetch_array($res)) {
                $imei = $row['imei'];
                $dateTime = $row['datetime'];
                $lat = $row['lat'];
                $lng = $row['lng'];
                $satellites = $row['sputnik'];
                $speed = $row['speed'];
                $zaryad = $row['zaryad'];
            }
        }
        array_push($arr, Array(
            'imei'=>$imei,
            'text'=>$names[$i],
            'phone'=>$phones[$i],
            'dateTime'=>$dateTime,
            'satellites' => $satellites,
            'lat'=>$lat,
            'lng'=>$lng,
            'speed'=>$speed,
            'zaryad'=>$zaryad
        ));

    }
    return $arr;

}