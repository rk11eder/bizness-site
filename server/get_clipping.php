<?php


require_once('../classes/database.class.php');

$dados = json_decode(file_get_contents("php://input"));
$lang = $_GET['lang'];


//$lang="pt";
//$flag=15;


$database = new database();


$res = $database->query_simple_prepare("SELECT 
	".$database->array_tables[4].".id as id, 
	".$database->array_tables[4].".foto as foto, 
	".$database->array_tables[5].".texto as texto, 
	".$database->array_tables[5].".titulo as titulo 
	FROM 
	".$database->array_tables[4].", 
	".$database->array_tables[5]." 
	WHERE 
	".$database->array_tables[4].".ativo=1 
	AND 
	".$database->array_tables[5].".id_clipping = ".$database->array_tables[4].".id 
	AND 
	".$database->array_tables[5].".sigla=? ORDER BY id DESC

	",array($lang),"s");

// echo $res;

 echo json_encode($res);


?>