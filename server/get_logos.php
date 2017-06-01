<?php

error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","on");

header('Content-Type: application/json');


require_once '../classes/database.class.php';



$database = new database();


$res = $database->query_simple_prepare("SELECT * FROM logos WHERE ativo = 1 ORDER BY ?" ,array("id"),"s");

echo json_encode($res);



?>
