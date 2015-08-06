<?php
//SELECT * FROM `log` GROUP BY lat, lng HAVING COUNT(*)>20
function valid($str)
{
    $pattern = '/[^(0-9)\w_]/i';
    $replace = "";
    $res = preg_replace($pattern, $replace, $str);
    return $res;
}

;
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
    if (mysql_num_rows($res_d) > 0) {
        $usersIds = [];
        while ($row = mysql_fetch_array($res_d)) {

            array_push($usersIds, $row['iduser']);
            $iduser_d = $row['iduser'];
        }
        //if ($iduser_d == $iduser) {
        if (checkExist($usersIds, $iduser)) {
            //echo 'EXIST_CURRENT';

            echo json_encode(getTrack($imei, $from, $to));

        } else {
            echo 'EXIST_OTHER';
            return null;
        }

    }
}

function checkExist($array, $id)
{
    for ($i = 0; $i < count($array); $i++) {
        if ($array[$i] == $id) {
            return true;
        }
    }
    return false;

}

function getTrack($imei, $from, $to)
{
    $arrLatForDel = array();

    $sel =  "SELECT * FROM `log` GROUP BY lat, lng HAVING COUNT(*)>20";
    $res = mysql_query($sel);
    while ($row = mysql_fetch_array($res)) {
        array_push($arrLatForDel, $row['lat']);
    }


    for($i=0;$i<count($arrLatForDel); $i ++){
        $sql = mysql_query("DELETE FROM `log` WHERE `lat`='$$arrLatForDel[$i]'") or die(mysql_error());
    }


   /* $track = array();
    $sel = "
        SELECT * FROM  log
        WHERE(
            imei='$imei'
            AND datetime>= $from
            AND datetime<=$to
        )
        ORDER BY datetime   ";
    $res = mysql_query($sel);
    while ($row = mysql_fetch_array($res)) {
        array_push($track, Array(
            'imei' => $row['imei'],
            'dateTime' => $row['datetime'],
            'lat' => $row['lat'],
            'lng' => $row['lng'],
            'satellites' => $row['sputnik'],
            'speed' => $row['speed'],
            'zaryad' => $row['zaryad'],
            'azimuth' => $row['azimuth']
        ));
    }

    $sel = "
        SELECT * FROM  loghistory
        WHERE(
            imei='$imei'
            AND datetime>= $from
            AND datetime<=$to
        )
        ORDER BY datetime   ";

    // $res = mysql_query("SELECT * FROM  loghistory  WHERE imei='$selectUserImei' AND `datetime`>= $fromPeriod AND `datetime`<=$toPeriod  ORDER BY `datetime`   ");
    $res = mysql_query($sel);

    while ($row = mysql_fetch_array($res)) {
        array_push($track, Array(
            'imei' => $row['imei'],
            'dateTime' => $row['datetime'],
            'lat' => $row['lat'],
            'lng' => $row['lng'],
            'satellites' => $row['sputnik'],
            'speed' => $row['speed'],
            'zaryad' => $row['zaryad'],
            'azimuth' => $row['azimuth']
        ));
    }*/


    return $arrLatForDel;

}
