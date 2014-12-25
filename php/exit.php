<?php
include_once 'connect.php';


function curPageURL() {
    $pageURL = 'http';
    if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
    $pageURL .= "://";
    if ($_SERVER["SERVER_PORT"] != "80") {
        $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"];
    } else {
        $pageURL .= $_SERVER["SERVER_NAME"];
    }
    return $pageURL;
}
$arr = explode('/', $_SERVER["REQUEST_URI"]);
$path = curPageURL().'/'.$arr[1].'/';
$obj = Array(
    'status' => 'OK',
    'path' => $path
);

//header("Location: ".$_SERVER["SERVER_NAME"].$arr[1]);
echo json_encode($obj);