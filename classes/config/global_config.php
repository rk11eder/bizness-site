<?php

$url_base = $_SERVER['PHP_SELF'];
$url_base_array = explode('/',$url_base);
$url_base = "";
for ($i=0; $i < count($url_base_array)-1; $i++) { 
    $url_base .= $url_base_array[$i]."/";
} 
$pathgeral = "http://".$_SERVER['HTTP_HOST'].$url_base;

$pathgeral_base = $url_base;


$array_areas = array();

/*
	1 -> Em desenvolvimento
	0 -> Em Produção
 */
$desenvolvimento_flag = 1;

 
?>