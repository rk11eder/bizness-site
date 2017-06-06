<?php
error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","off");
ini_set('error_log','my_file.log');


require_once('../classes/database.class.php');

$dados = json_decode(file_get_contents("php://input"));
 $lang = $_GET['lang'];


//$lang="pt";
//$flag=15;


$database = new database();


$res = $database->query_simple_prepare("SELECT 
 	projetos.id as id, 
 	projetos.url as url,
 	projetos_idiomas.nome as titulo,
 	projetos_idiomas.destaque_home_tipo as tipo
 	FROM 
 	projetos, 
 	projetos_idiomas 
 	WHERE 
 	projetos.ativo=1 
 	AND 
 	projetos.destaque=1
 	AND
 	projetos_idiomas.id_projeto= projetos.id 
 	AND 
 	projetos_idiomas.sigla=? ORDER BY ordem ASC

	",array($lang),"s");

//imagem
foreach ( $res as $key => $value) {
        $res[$key]['imagens'] = $database->query_simple_prepare("SELECT projetos_fotos.foto as imagem, projetos_fotos.id as id FROM projetos_fotos WHERE projetos_fotos.id_projeto=? ORDER BY ? ", array($value["id"],"id"), "is");
}

foreach ( $res as $key => $value) {
    $res[$key]['titulo'] = explode(' ',$res[$key]['titulo']);
    if(count($res[$key]['titulo'])==1){
//        echo count($res[$key]['titulo']);
        $res[$key]['titulo'][1]="&nbsp;";
    }
}
echo json_encode($res);
?>