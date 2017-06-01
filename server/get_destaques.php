<?php
error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","off");
ini_set('error_log','my_file.log');


require_once('../classes/database.class.php');

$dados = json_decode(file_get_contents("php://input"));
// $lang = $_GET['lang'];


//$lang="pt";
//$flag=15;


$database = new database();


$res = $database->query_simple_prepare("SELECT 
 	destaques.id as id, 
 	destaques.foto as imagem,
 	destaques_idiomas.nome as titulo,
 	destaques_idiomas.tipo as tipo
 	FROM 
 	destaques, 
 	destaques_idiomas 
 	WHERE 
 	destaques.ativo=1 
 	AND 
 	destaques_idiomas.id_destaque = destaques.id 
 	AND 
 	destaques_idiomas.sigla='pt' ORDER BY id DESC

	",array(),"");



foreach ( $res as $key => $value) {
    $res[$key]['titulo'] = explode(' ',$res[$key]['titulo']);
    if(count($res[$key]['titulo'])==1){
//        echo count($res[$key]['titulo']);
        $res[$key]['titulo'][1]="&nbsp;";
    }
}
echo json_encode($res);
?>