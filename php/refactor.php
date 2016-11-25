<?php
$login = $_POST['login'];
$pass_l = $_POST['pass'];
//$login = "demo";
//$pass_l="demo";
//echo $config;
//echo $brr;

$config_sql = file_get_contents("../config_sql.txt");
$arr_config_sql = explode("!", $config_sql);

$hostname = "$arr_config_sql[1]";


$username = "$arr_config_sql[2]";


$password = "$arr_config_sql[3]";


$db = mysql_connect($hostname, $username, $password) //соединение с базой данных
    or die('connect to database failed');


//$table_db = 'monitoring';
$table_db = "$arr_config_sql[4]";
mysql_select_db($table_db) or die('db not found'); //соединение  с базой данных

$res = mysql_query("SELECT * FROM user WHERE name ='$login'");

if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        $pass_db = $row['pass'];
        $options = $row['options'];
        $device = $row['device'];
        $options = $row['options'];
    }
    // $devices =$device;
    $devices = json_encode($device);
    if ($pass_l == $pass_db) {

        $count = 0;
        $imeis;
        $res = mysql_query("SELECT imei FROM log GROUP BY imei");
        if (mysql_num_rows($res) > 0) {
            //  echo "refactor ok";
            while ($row = mysql_fetch_array($res)) {
                $imeis[$count] = $row['imei'];
                $count++;
            }
            $count = 0;
            $countM = 0;
            $_idM;
            $arr_id;

            for ($i = 0; $i < count($imeis); $i++) {
                $res = mysql_query("SELECT * FROM log WHERE imei='$imeis[$i]' AND datetime!=(select max(datetime) FROM log WHERE  imei='$imeis[$i]') ");

                while ($row = mysql_fetch_array($res)) {
                    $_id[$count] = $row['id'];
                    $count++;
                }

                $countM=0;
                $resm =  mysql_query("SELECT * FROM log WHERE imei='$imeis[$i]' AND datetime =(select max(datetime) FROM log WHERE  imei='$imeis[$i]') ");

                while ($row = mysql_fetch_array($resm)) {
                                    $_idM[$countM] = $row['id'];
                                    $countM++;
                                }
                                //echo " ".$countM;
                                if(1<$countM){
                                  for($k=0; $k<($countM-1); $k++){
                                   echo " ".$_idM[$k];
                                  mysql_query(" DELETE FROM `log` WHERE `id`='$_idM[$k]' ");

                                  }
                                }

            }



            for ($i = 0; $i < count($_id); $i++) {
                $res = mysql_query("INSERT INTO loghistory SELECT * FROM log WHERE id = '$_id[$i]'");
                $res = mysql_query("DELETE FROM log WHERE id = '$_id[$i]'");

            }

            mysql_close($db);
          //  echo "res ".json_encode($_idM);
        } else {
            mysql_close($db);
            echo 'null';
        }

        // include("start.php");
    } else {
        mysql_close($db);
        echo 'Server error1';
    }


} else {
    echo 'Server error2';
}
?>