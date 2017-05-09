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

$res_next = $database->query_simple_prepare("
		(SELECT 
	 	".$database->array_tables[8].".id as id, 
	 	".$database->array_tables[8].".foto as foto,
	 	".$database->array_tables[8].".url as url,
		".$database->array_tables[10].".nome as nome
	 	FROM
		".$database->array_tables[8].",
	 	".$database->array_tables[10]."
	 	WHERE 
	 	".$database->array_tables[8].".id > ".$res[0]['id']." ORDER BY id ASC LIMIT 0,1)
	 	UNION
	 	(SELECT
	 	".$database->array_tables[8].".id as id, 
		".$database->array_tables[8].".foto as foto,
		".$database->array_tables[8].".url as url,
		".$database->array_tables[10].".nome as nome
		FROM
	 	".$database->array_tables[8].",
		".$database->array_tables[10]."
	 	ORDER BY id ASC LIMIT 0,1) 
	 	LIMIT 0,2",array(),"");

$res_prev = $database->query_simple_prepare("
		(SELECT 
	 	".$database->array_tables[8].".id as id, 
	 	".$database->array_tables[8].".foto as foto,
	 	".$database->array_tables[8].".url as url,
		".$database->array_tables[10].".nome as nome
	 	FROM
		".$database->array_tables[8].",
	 	".$database->array_tables[10]."
	 	WHERE 
	 	".$database->array_tables[8].".id < ".$res[0]['id']." ORDER BY id DESC LIMIT 0,1)
	 	UNION
	 	(SELECT
	 	".$database->array_tables[8].".id as id, 
		".$database->array_tables[8].".foto as foto,
		".$database->array_tables[8].".url as url,
		".$database->array_tables[10].".nome as nome
		FROM
	 	".$database->array_tables[8].",
		".$database->array_tables[10]."
	 	ORDER BY id DESC LIMIT 0,1) 
	 	LIMIT 0,2",array(),"");


$return_array = array();
$return_array['portfolio'] = $res;
$return_array['prev'] = $res_prev[0];
$return_array['next'] = $res_next[0];



// echo $res;

 echo json_encode($return_array);


?>