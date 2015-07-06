<?php
// Outputs all POST parameters to a text file. The file name is the date_time of the report reception


$arr = glob('*.txt');
$count = count($arr);
if(!empty($count)){
    $content = "";
    for($i = 0; $i < $count; $i++) {
        $content = $content."<div style='border-top: 2px solid crimson; margin-bottom: 20px; padding-top: 10px'>".substr($arr[$i], 0, -4)."</div>";
        $content = $content."<div style = 'margin-bottom: 20px'>".file_get_contents( $arr[$i])."</div>";

    }
    echo $content;
}


?>