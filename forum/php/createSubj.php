<?php
$message = $_POST['message'];
$subject = $_POST['subject'];
include_once 'connect.php';
include_once 'permits.php';
$obj = getName();
$name = $obj['name'];
//echo $obj['name'];

if(!$name || empty($name)){
  $obj = array(
    'status'=>'NOt_AUTH'
  );
   echo json_encode($obj);
   return;
}



if($name){
    $obj = array(
        'status'=>'OK',
        'name'=> $name
    );


}






echo json_encode($obj);