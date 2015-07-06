<?php
// Outputs all POST parameters to a text file. The file name is the date_time of the report reception

if(!$_GET["key"]){
    $arr = glob('*.txt');
    $count = count($arr);
    if(!empty($count)){
        $content = "";
        for($i = 0; $i < $count; $i++) {
            $content = $content."<div style = 'border-top: 2px solid crimson'>".substr($arr[$i], 0, -4)."</div>";
            $content = $content."<div style = 'margin-bottom: 20px '>".file_get_contents( $arr[$i])."</div>";
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

   // $reportLine = "<div style='border-bottom: 2px solid crimson; margin-bottom: 5px'></div>";
    fwrite($file, $reportLine);
    if (${'_'.$_SERVER['REQUEST_METHOD']}) {
        $kv = array();
        foreach (${'_'.$_SERVER['REQUEST_METHOD']} as $key => $value) {
            $str     =$value;
            $order   = array("\r\n", "\n", "\r");
            $replace = '<br />';
            $newstr = str_replace($order, $replace, $str);

            $kv[] = "$key=$value";
            ///echo "$key=$value";
            $reportLine ="<h4 style='margin-bottom: 0px; color: #ff6600'>". "$key"."</h4>";
            $reportLine = $reportLine.$newstr;
            //$newstr = str_replace($order, $replace, $str);


            fwrite($file, $reportLine);
           // echo "$key=$value";
        }
    }
    fclose($file);
}

?>