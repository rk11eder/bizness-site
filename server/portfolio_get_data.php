<?php

error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","on");

header('Content-Type: application/json');


require_once '../classes/database.class.php';



$database = new database();




$res_select_projectos = $database->query_simple_prepare("SELECT projetos.id, projetos.ativo, projetos.logo, projetos.cor, projetos.destaque, projetos_foto.foto FROM ".$database->array_tables[1].", ".$database->array_tables[2]." WHERE " .$database->array_tables[1].".id" ."=". $database->array_tables[2].".id_projeto",array(),"");

//$res = $database->query_simple_prepare("SELECT
//    projetos.id, projetos.activo, projetos.logo, projetos.cor, projetos.destaque, projetos_fotos.id, projetos_foto.foto
// 	FROM
// 	projetos,
// 	projetos_fotos
// 	WHERE
// 	projetos.id = projetos_fotos.id_destaque
//
//	",array(),"");

echo json_encode($res_select_projectos);


/*foreach ($res_select as $key => $value) {
    $res_select[$key]["perguntapt"]=utf8_encode($value["perguntapt"]);
    $res_select[$key]["perguntaen"]=utf8_encode($value["perguntaen"]);
}
*/



/*echo json_encode($res_select_projectos, JSON_UNESCAPED_UNICODE);*/



?>
