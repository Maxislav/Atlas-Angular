<?php

$newOpt = Array(
    'mapType' => $_POST['map'],
    'timeZone' => $_POST['timeZone']
    //'startZoom' => $_POST['startZoom'],
   // 'startLat' => $_POST['startLat'],
    //'startLng' => $_POST['startLng'],
);

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
            $opt = Array(
                'mapType' => $row['mapType'],
                'timeZone' => $row['timeZone'],
                'startZoom' => $row['startZoom'],
                'startLat' => $row['startLat'],
                'startLng' => $row['startLng'],
            );
        }
        if(updateOpt($opt, $newOpt, $iduser)){
//            $timeZone = $newOpt['timeZone'];
//            mysql_query("UPDATE options SET timeZone='$timeZone' WHERE iduser='$iduser' ");
            echo json_encode($newOpt);
        }else{
            echo null;
        }



       // echo json_encode($obj);
    }else{
        setcookie('key', null, time() - 3600, '/');
        http_response_code(404);
    }
}else{
    setcookie('key', null, time() - 3600, '/');
    http_response_code(401);
}

function updateOpt($opt, $newOpt, $iduser){
    $update = false;
    if($opt['timeZone']!=$newOpt['timeZone']){
        $timeZone = $newOpt['timeZone'];
        mysql_query("UPDATE options SET timeZone='$timeZone' WHERE iduser='$iduser' ");
        $update = true;
    }
    if($opt['mapType']!=$newOpt['mapType']){
        $mapType = $newOpt['mapType'];
        mysql_query("UPDATE options SET mapType='$mapType' WHERE iduser='$iduser' ");
        $update = true;
    }

    return $update;

}