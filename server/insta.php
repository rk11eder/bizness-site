<?php 

/*$userid = "a081fbed8cbd458a9621404a4c97f444";
$accessToken = "47804766.a081fbe.46ca524ac967482b8578fcdbba524b76";

https://api.instagram.com/v1/users/self/media/recent/?access_token=ACCESS-TOKEN

   $id = 47804766; 
$user_id   = "USER_ID"; 
$client_id = "CLIENT_ID";
$endpoint  = "https://api.instagram.com/v1/users/$user_id/media/recent/?client_id={$this->options['client_id']}";
$curl = curl_init($endpoint);
curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 3);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$data = curl_exec($curl);
echo json_decode($data);*/

$user_id = 47804766;
$client_id = a081fbed8cbd458a9621404a4c97f444 ;
$endpoint = "https://api.instagram.com/v1/users/self/media/recent/?access_token=47804766.a081fbe.46ca524ac967482b8578fcdbba524b76";

$curl = curl_init($endpoint);
curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 3);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$data = json_decode(curl_exec($curl), true);


echo json_encode($data);



?>