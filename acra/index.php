<?php
// Outputs all POST parameters to a text file. The file name is the date_time of the report reception

if(!$_GET["key"]){
    $arr = glob('*.txt');
    $count = count($arr);
    if(!empty($count)){
        $content = "";
        for($i = 0; $i < $count; $i++) {
            $content = $content."<div>".substr($arr[$i], 0, -4)."</div>";
            $content = $content."<div style = 'margit-bottom: 20px'>".file_get_contents( $arr[$i])."</div>";

        }
        echo $content;
    }


}else{
    $date = new DateTime();


    $date->setTimezone(new DateTimeZone('Europe/Kiev'));

    $dateStr = $date->format('Y-m-d_H-i-s');
    $fileName =$dateStr.'.txt';
    $file = fopen($fileName,'w') or die('Could not create report file: ' . $fileName);
    chmod($fileName, 0777);
    fclose($file);
    $file = fopen($fileName,'w') or die('Could not create report file: ' . $fileName);
    $reportLine = "ololo";
    fwrite($file, $reportLine)  or die ('Could not write to report file ' . $reportLine); ;
    foreach($_POST as $key => $value) {
        $reportLine = $key." = ".$value."\n";
        fwrite($file, $reportLine) or die ('Could not write to report file ' . $reportLine);
    }
    fclose($file);
}

?>