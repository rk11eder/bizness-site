<?php

error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","on");

header('Content-Type: application/json');


require_once '../classes/database.class.php';



$database = new database();


$res_select_projectos_fotos = $database->query_simple_prepare("SELECT * FROM projetos_fotos  ORDER BY ?" ,array("id"),"s");

echo json_encode($res_select_projectos_fotos);



?>
