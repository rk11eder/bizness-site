<?php

error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","off");




require_once('../classes/mail.class.php');
$base = new mail();

$new_item = json_decode(file_get_contents("php://input"));
$new_item = (array) $new_item->item;

 // var_dump($new_item);

$body = '
<span style="font:12px arial;color:#333333"><span style="font-weight:bold;">Contacto</span><br /><br /><span style="font-weight:bold">Nome:</span> '.$new_item['nome']."\n\r<br />";
$body .= '<span style="font-weight:bold">Email:</span> '.$new_item['email']."\n\r<br />";
$body .= '<span style="font-weight:bold">Mensagem:</span> '.$new_item['mensagem']."\n\r<br />";


// $res1 = 1;

$res4 = $base->send_email('celso@spic.pt','noreply@bizness.pt','Bizness','noreply@bizness.pt',utf8_decode($body), 'Novo Contacto Bizness ',2);

$res1 = $base->send_email('joao@spic.pt','noreply@bizness.pt','Bizness','noreply@bizness.pt',utf8_decode($body), 'Novo Contacto Bizness ',2);





$body2 = '
<span style="font:12px arial;color:#333333">
<span style="font:bold 15px arial">Dados Inseridos / Inserted Data</span><br /><br />
<span style="font-weight:bold">Nome:</span> '.$new_item['nome']."\n\r<br />";
$body2 .= '
<span style="font:12px arial;color:#333333"><span style="font-weight:bold;">Contacto:</span>'.$new_item['email'].'\n\r<br />';
$body2 .= '<span style="font-weight:bold">Mensagem</span> '.$new_item['mensagem']."\n\r<br /></span>
<br /><br />
Iremos entrar em contacto consigo brevemente.
<br/>
Obrigado pela sua mensagem.<br />
<br />
We will contact you soon.<br />
Thank you for your message.
</span>";


$res3 = $base->send_email($new_item['email'],'noreply@bizness.pt','Bizness','noreply@bizness.pt',utf8_decode($body2),'Novo Contacto Bizness',2);

// echo $res4;
// echo $res1;
// echo $res3;


if ($res4 == 1 && $res1 == 1 && $res3 == 1) {
	echo "ok";

}
else{
	echo "error";
}

?>