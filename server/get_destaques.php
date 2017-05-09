<?php


require_once('../classes/database.class.php');

$dados = json_decode(file_get_contents("php://input"));
$lang = $_GET['lang'];


//$lang="pt";
//$flag=15;


$database = new database();


$res = $database->query_simple_prepare("SELECT 
	".$database->array_tables[6].".id as id, 
	".$database->array_tables[6].".foto as foto, 
	".$database->array_tables[6].".link as link, 
	".$database->array_tables[7].".titulo as titulo 
	FROM 
	".$database->array_tables[6].", 
	".$database->array_tables[7]." 
	WHERE 
	".$database->array_tables[6].".ativo=1 
	AND 
	".$database->array_tables[7].".id_destaques = ".$database->array_tables[6].".id 
	AND 
	".$database->array_tables[7].".sigla=? ORDER BY id DESC

	",array($lang),"s");

	
  echo json_encode($res);


?>