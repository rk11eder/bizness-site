<?php
error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","on");

header('Content-Type: application/json');


require_once '../classes/database.class.php';



$database = new database();

$dados = json_decode(file_get_contents("php://input"));

$lang = $_GET['lang'];

$url = $dados->url;
$res = $database->query_simple_prepare("SELECT projetos.id, projetos.ativo, projetos.logo, projetos.cor, projetos.destaque FROM ".$database->array_tables[1]. " WHERE projetos.ativo=1 AND projetos.id=?  ORDER BY ?" ,array($url,"id"),"is");




$return_array = array();

if ($res != $database->flag_error) {

    $return_array["projetos"] = $res;
    $return_array['response'] = $database->flag_success;

    foreach ( $return_array["projetos"] as $key => $value) {
        $res_select_projectos_fotos = $database->query_simple_prepare("SELECT projetos_fotos_idiomas.titulo, projetos_fotos.foto ,projetos_fotos.id ,projetos_fotos.id_projeto FROM projetos_fotos,projetos_fotos_idiomas  WHERE projetos_fotos.id_projeto=? AND projetos_fotos_idiomas.id_projeto_foto=projetos_fotos.id AND projetos_fotos_idiomas.sigla = ?  ORDER BY ?  ", array($value["id"],$lang,"id"), "iss");


        $res_select_projectos_idiomas = $database->query_simple_prepare("SELECT * FROM projetos_idiomas WHERE projetos_idiomas.id_projeto=? AND projetos_idiomas.sigla=?  ORDER BY ?  ", array($value["id"],$lang,"id"), "iss");

        $return_array["projetos"][$key]["fotos"]=$res_select_projectos_fotos;

        //  $return_array["projetos"][$key]["fotos_idiomas"]=$res_select_projectos_fotos_idiomas;
        $return_array["projetos"][$key]["projectos_idiomas"]=$res_select_projectos_idiomas;
    }


} else {
    $return_array['response'] = $database->flag_error;
}
echo json_encode($return_array);
?>