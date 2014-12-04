<?php
$message = $_POST['message'];
$subject = $_POST['subject'];
$section = $_POST['section'];

include_once 'connect.php';
include_once 'permits.php';
$obj = getName();
$name = $obj['name'];
//echo $obj['name'];

if(!$name || empty($name)){
  $obj = array(
    'status'=>'NOT_AUTH'
  );
   echo json_encode($obj);
   return;
}

if($name){
    $obj = array(
        'status'=>'OK',
        'name'=> $name
    );
    $dat=gmdate('Y-m-d H:i:s') ;
    $sql = mysql_query("INSERT INTO  `monitoring`.`forum` (`id` ,`name`  ,`section` , `subject`, `message`, `date`)VALUES (NULL ,  '$name',  '$section', '$subject', '$message', '$dat')");
    if($sql){
        echo json_encode($obj);
    }else{
        echo 'ERR_INSERT_SQL';
    }
}else{
    $obj = array(
        'status'=>'NO_AUTH',
        'name'=> null
    );
    echo json_encode($obj);
}






