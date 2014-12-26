<?php
/**
 * Created by PhpStorm.
 * User: mars
 * Date: 26.12.14
 * Time: 13:57
 */

include_once 'connect.php';

$key = $_COOKIE['key'];

$iduser = null;
$res = mysql_query("SELECT * FROM `session` WHERE `key`='$key' ORDER BY id");
if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $iduser = $row['iduser'];
    }
    $res = mysql_query("SELECT * FROM options WHERE iduser='$iduser' ORDER BY id");
    if (mysql_num_rows($res) > 0) {
        while ($row = mysql_fetch_array($res)) {
            $obj = Array(
                'mapType' => $row['mapType'],
                'timeZone' => $row['timeZone'],
                'startZoom' => $row['startZoom'],
                'startLat' => $row['startLat'],
                'startLng' => $row['startLng'],
            );
        }
        echo json_encode($obj);
    }else{
        setcookie('key', null, time() - 3600, '/');
        http_response_code(404);
    }
}else{
    setcookie('key', null, time() - 3600, '/');
    http_response_code(404);
}
