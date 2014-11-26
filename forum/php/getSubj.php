<?php
$section = $_POST['section'];


include_once 'connect.php';
$res = mysql_query("SELECT * FROM  `forum` WHERE  `section` = '$section' GROUP BY `subject`");
//$res = mysql_query("SELECT * FROM  `forum` WHERE  `section` =  '$section' GROUP BY 'subject'");

$arr = [];
if (mysql_num_rows($res) > 0) {
    while ($row = mysql_fetch_array($res)) {
        array_push($arr, $row['subject']);
    }

}
echo json_encode($arr);