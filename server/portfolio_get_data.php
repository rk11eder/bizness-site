<?php

error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","on");

header('Content-Type: application/json');


require_once '../classes/database.class.php';



$database = new database();




$res_select_projectos = $database->query_simple_prepare("SELECT * FROM ".$database->array_tables[1],array(""),"");
$res_select_projectosFotos = $database->query_simple_prepare("SELECT * FROM ".$database->array_tables[1],array(""),"");



/*foreach ($res_select as $key => $value) {
    $res_select[$key]["perguntapt"]=utf8_encode($value["perguntapt"]);
    $res_select[$key]["perguntaen"]=utf8_encode($value["perguntaen"]);
}
*/



echo json_encode($res_select, JSON_UNESCAPED_UNICODE);
echo json_encode($res_select_projectosFotos, JSON_UNESCAPED_UNICODE);


?>
