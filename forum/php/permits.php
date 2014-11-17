<?php






function getName(){
    $key = $_COOKIE['key'];

    if(empty($key)){
        $obj = array(
            'name'=>null,
            'status' => 'EMPTY_COOKIE'
        );
        return $obj;

    }


    $res = mysql_query("SELECT * FROM  `session` WHERE  `key` =  '$key'");

    if (mysql_num_rows($res) > 0) {
        while ($row = mysql_fetch_array($res)) {
            $id_user = $row['iduser'];
        }
        $res = mysql_query("SELECT * FROM user WHERE id='$id_user' ORDER BY id");
        if (mysql_num_rows($res) > 0){
            while ($row = mysql_fetch_array($res)) {
                $name = $row['name'];
            }
        }
        $obj = array(
            'name'=>$name,
            'status' => 'OK'
        );
        return $obj;
    }else{
        $obj = array(
            'name'=>null,
            'status' => 'NOj'
        );
        return $obj;
    }
}


