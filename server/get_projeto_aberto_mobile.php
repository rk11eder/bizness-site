<?php


require_once('../classes/database.class.php');

$dados = json_decode(file_get_contents("php://input"));

$lang = $_GET['lang'];

$url = $dados->id;


 $database = new database();



$res = $database->query_simple_prepare("SELECT 
	".$database->array_tables[8].".id as id, 
	".$database->array_tables[8].".foto as foto,
	".$database->array_tables[9].".foto as fotofoto,
	".$database->array_tables[10].".nome as nome,
	".$database->array_tables[10].".texto as texto
	FROM 
	".$database->array_tables[8].",
	".$database->array_tables[9].",
	".$database->array_tables[10]." 
	WHERE
	".$database->array_tables[8].".url = ?
	AND
	".$database->array_tables[8].".ativo=1 
	AND
	".$database->array_tables[9].".ativo=1 
	AND
	".$database->array_tables[8].".id = ".$database->array_tables[9].".id_portfolio 
	AND
	".$database->array_tables[8].".id = ".$database->array_tables[10].".id_portfolio
	AND
	".$database->array_tables[10].".sigla = ?"


	,array($url,$lang),"ss");




 echo json_encode($res);


?>