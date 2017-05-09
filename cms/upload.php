<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","off");
ini_set('error_log','my_file.log');

require '../classes/database.class.php';
$database = new database();



$file = $_FILES['file'];
$tipo = $_POST['tipo'];
$pasta = $_POST['pasta'];
$nome_pasta = $_POST['nome_pasta'];

$folder = "../".$pasta.$nome_pasta;
if(!file_exists("../".$pasta)){
	mkdir("../".$pasta,0777);
}	
if(!file_exists($folder)){
	mkdir($folder,0777);
}	
if ($tipo == 'imagem') {
	$altura = $_POST['altura'];
	$largura = $_POST['largura'];


	$files = preg_grep('/^([^.])/', scandir($folder)); 
	$total_files = count($files)+1;
	

	$imagem_nome_final = $total_files."-".date("Y-m-d h:i:s").$file['name'];
	echo $imagemNome = $database->CroppedThumbnail($file,$folder."/",$largura,$altura,$imagem_nome_final);	

}
else if($tipo == 'file'){

}







?>