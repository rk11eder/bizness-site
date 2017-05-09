<?php


require_once('../classes/database.class.php');

$dados = json_decode(file_get_contents("php://input"));



//$lang="pt";
//$flag=15;


$database = new database();

$res = $database->query_simple_prepare("SELECT * FROM ".$database->array_tables[3]." WHERE ativo=1 ORDER BY id DESC",array(),"");


echo json_encode($res);


?>