<?php

error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","on");

header('Content-Type: application/json');


require_once '../classes/database.class.php';



$database = new database();

$lang = $_GET['lang'];






$res = $database->query_simple_prepare("SELECT projetos.id, projetos.ativo, projetos.url, projetos.logo, projetos.cor, projetos.destaque FROM ".$database->array_tables[1]. " WHERE projetos.ativo=1   ORDER BY ? ASC" ,array("ordem"),"s");


//$res_select_projectos_fotos = $database->query_simple_prepare("SELECT * FROM projetos_fotos  ORDER BY ?" ,array("id"),"s");


$return_array = array();
if ($res != $database->flag_error) {

    $return_array["projetos"] = $res;
    $return_array['response'] = $database->flag_success;

    foreach ( $return_array["projetos"] as $key => $value) {
        $res_select_projectos_fotos = $database->query_simple_prepare("SELECT * FROM projetos_fotos WHERE projetos_fotos.id_projeto=? ORDER BY ?  ", array($value["id"],"id"), "is");

        $res_select_projectos_fotos_idiomas = $database->query_simple_prepare("SELECT * FROM projetos_fotos_idiomas WHERE projetos_fotos_idiomas.id_projeto_foto=? AND projetos_fotos_idiomas.sigla= ?  ORDER BY ?  ", array($value["id"],$lang,"id_projeto_foto"), "iss");

        $res_select_projectos_idiomas = $database->query_simple_prepare("SELECT * FROM projetos_idiomas WHERE projetos_idiomas.id_projeto=? AND projetos_idiomas.sigla= ?  ORDER BY ?  ", array($value["id"],$lang,"id"), "iss");

       $imgUrl=$res[$key]["logo"];
       $imgid=$res[$key]["id"];

       $ext = pathinfo($imgUrl, PATHINFO_EXTENSION);

       if($ext=="svg"){
           $xml = simplexml_load_file('../img/projetos/'.$imgid.'/'.$imgUrl);
           $attr = $xml->attributes();
           $width=$attr->width;
           $height=$attr->height;
           $width= substr($width, 0, -2);
           $height= substr($height, 0, -2);

       }else{
           $data = getimagesize('../img/projetos/'.$imgid.'/'.$imgUrl);
           $width = $data[0];
           $height = $data[1];



       }


        $return_array["projetos"][$key]["width"]=$width;
        $return_array["projetos"][$key]["height"]=$height;
        $return_array["projetos"][$key]["fotos"]=$res_select_projectos_fotos;
        $return_array["projetos"][$key]["fotos_idiomas"]=$res_select_projectos_fotos_idiomas;
        $return_array["projetos"][$key]["projectos_idiomas"]=$res_select_projectos_idiomas;
    }


} else {
    $return_array['response'] = $database->flag_error;
}




echo json_encode ($return_array);







?>

