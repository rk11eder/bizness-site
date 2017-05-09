<?php
spl_autoload_register(function ($class) {
	include $class . '.class.php';
});

class globalstuff{

	public $flag_error = "error";
	public $flag_success = "ok";

	private $desenvolvimento_flag;
	public $pathgeral;

	function __construct(){
		include "config/global_config.php";

		$this->desenvolvimento_flag = $desenvolvimento_flag;
		$this->pathgeral = $pathgeral;
		$this->pathgeral_base = $pathgeral_base;

		if ($array_areas) {
			$this->array_areas = $array_areas;			
		}



		/*definir a zona horaria*/
 	   date_default_timezone_set('GMT');

	}

	function get_areas_conta($id_conta){
		$database = new database();
		$mysql_query = "SELECT id,ordem,nome,tabela,area_parent_id, tabela_multilang FROM ".$database->array_tables[3]." WHERE id_conta=? AND activo=1";	
   	$result = $database->query_simple_prepare($mysql_query,array($id_conta),'i');

   	$array_return = array();
   	foreach ($result as $key => $value) {
   		$array_return_item = array();
   		$array_return_item['nome'] = $value['nome'];
   		$array_return_item['url'] =  $this->generateFriendlyName($value['nome'],50);
   		$array_return_item['id_area'] = $value['id'];

   		$array_return_item['dependecias_listar'] = array();
   		$array_return_item['dependecias_listar'][] = $value['tabela'];

   		$array_return_item['dependecias_inserir'] = array();
   		$array_return_item['dependecias_inserir'][] = $value['tabela'];

   		$array_return_item['dependecias_editar'] = array();
   		$array_return_item['dependecias_editar'][] = $value['tabela'];
   		

   		$mysql_query = "SELECT id,tabela_varios,tabela_externa FROM ".$database->array_tables[4]." WHERE id_area=? AND activo=1";	
   		$result_campos = $database->query_simple_prepare($mysql_query,array($value['id']),'i');

   		foreach ($result_campos as $key_campo => $value_campo) {
   			if ($value_campo['tabela_varios'] != '') {
   				$array_return_item['dependecias_listar'][] = $value_campo['tabela_varios'];
   				$array_return_item['dependecias_inserir'][] = $value_campo['tabela_varios'];
   				$array_return_item['dependecias_editar'][] = $value_campo['tabela_varios'];
   			}

   			if ($value_campo['tabela_externa'] != '') {
   				$array_return_item['dependecias_listar'][] = $value_campo['tabela_externa'];
   				$array_return_item['dependecias_inserir'][] = $value_campo['tabela_externa'];
   				$array_return_item['dependecias_editar'][] = $value_campo['tabela_externa'];
   			}
   		}

   		$array_return_item['area_parent'] =  $value['area_parent_id'];

   		
   		$array_return[] = $array_return_item;
   			
		}

   	return $array_return;
	}

	function return_id_area($area){
		if ($_SESSION['id_conta'] != '') {
			$this->array_areas = $this->get_areas_conta($_SESSION['id_conta']);	
		}
		$id_area = '';
		foreach ($this->array_areas as $key => $value) {
			if ($value['url'] == $area) {
				$id_area = $value['id_area'];
			}
		}
		return $id_area;
	}

	function return_dependecies_editar($url){
		if ($_SESSION['id_conta'] != '') {
			$this->array_areas = $this->get_areas_conta($_SESSION['id_conta']);	
		}
		$array_dependecies = array();
		foreach ($this->array_areas as $key => $value) {
			if ($value['url'] == $url) {
				$array_dependecies = $value['dependecias_editar'];
			}
		}
		return $array_dependecies;
	}
	function return_dependecies_inserir($url){
		if ($_SESSION['id_conta'] != '') {
			$this->array_areas = $this->get_areas_conta($_SESSION['id_conta']);	
		}
		$array_dependecies = array();
		foreach ($this->array_areas as $key => $value) {
			if ($value['url'] == $url) {
				$array_dependecies = $value['dependecias_inserir'];
			}
		}
		return $array_dependecies;
	}
	function return_dependecies_listar($url){
		if ($_SESSION['id_conta'] != '') {
			$this->array_areas = $this->get_areas_conta($_SESSION['id_conta']);	
		}

		$array_dependecies = array();
		foreach ($this->array_areas as $key => $value) {
			if ($value['url'] == $url) {
				$array_dependecies = $value['dependecias_listar'];
			}
		}
		return $array_dependecies;
	}

	function return_subareas($url){
		if ($_SESSION['id_conta'] != '') {
			$this->array_areas = $this->get_areas_conta($_SESSION['id_conta']);	
		}
		$array_subareas = array();
		foreach ($this->array_areas as $key => $value) {
			if ($value['area_parent'] == $url) {
				$array_subareas[] = $value;
			}
		}
		return $array_subareas;
	}

	function return_parent($url){
		if ($_SESSION['id_conta'] != '') {
			$this->array_areas = $this->get_areas_conta($_SESSION['id_conta']);	
		}
		$parent = '';
		foreach ($this->array_areas as $key => $value) {
			if ($value['url'] == $url) {
				$parent = $value['area_parent'];
			}
		}
		return $parent;
	}
	

	function error_report($error_string){
		if (!is_dir('error_log')) {
			mkdir('error_log',0777);
		}
		if ($this->desenvolvimento_flag == 1) {
			// echo $error_string;
			

			$fh = fopen('error_log/'.basename($_SERVER["SCRIPT_FILENAME"])."_error_log.txt", (file_exists('error_log/'.basename($_SERVER["SCRIPT_FILENAME"])."_error_log.txt")) ? 'a' : 'w');
			fwrite($fh, date("Y-m-d H:i:s").": ".$error_string."\n\n");
			fclose($fh);


			
		}
		else{
			$fh = fopen('error_log/'.basename($_SERVER["SCRIPT_FILENAME"])."_error_log.txt", (file_exists('error_log/'.basename($_SERVER["SCRIPT_FILENAME"])."_error_log.txt")) ? 'a' : 'w');
			fwrite($fh, date("Y-m-d H:i:s").": ".$error_string."\n\n");
			fclose($fh);

			$mail_class = new mail();
			$mail_class->send_email($mail_class->email_developer,$mail_class->email_smtp,'admin',$mail_class->email_smtp,basename($_SERVER["SCRIPT_FILENAME"])." : ".$error_string,"Erro ".$mail_class->clienturl,2);
		}
	}

	function generateFriendlyName($phrase, $maxLength)
	{
		$result = preg_replace('/ã/', 'a', $phrase);
		$result = preg_replace('/Ã/', 'a', $result);
		$result = preg_replace('/á/', 'a', $result);
		$result = preg_replace('/Á/', 'a', $result);
		$result = preg_replace('/à/', 'a', $result);
		$result = preg_replace('/À/', 'a', $result);
		$result = preg_replace('/Â/', 'a', $result);
		$result = preg_replace('/â/', 'a', $result);
		
		$result = preg_replace('/Ç/', 'c', $result);
		$result = preg_replace('/ç/', 'c', $result);
		
		$result = preg_replace('/õ/', 'o', $result);
		$result = preg_replace('/Õ/', 'o', $result);
		$result = preg_replace('/ó/','o',$result);
		$result = preg_replace('/Ó/','o',$result);

		$result = preg_replace('/é/','e',$result);
		$result = preg_replace('/É/','e',$result);
		$result = preg_replace('/ê/','e',$result);
		$result = preg_replace('/Ê/','e',$result);



		$result = preg_replace('/í/','i',$result);
		$result = preg_replace('/Í/','i',$result);		
		
		$result = preg_replace('/ú/','u',$result);
		$result = preg_replace('/Ú/','u',$result);


		$result = strtolower($result);

		$result = preg_replace("/[^a-z0-9\s-]/", "", $result);
		$result = trim(preg_replace("/[\s-]+/", " ", $result));
		$result = trim(substr($result, 0, $maxLength));
		$result = preg_replace("/\s/", "-", $result);

		return $result;
	}

	/*PESQUISA NUM ARRAY MULTIDIMENSIONAL POR KEY E VALUE*/
	function search($array, $key, $value)
	{
	    $results = array();

	    if (is_array($array)) {
	        if (isset($array[$key]) && $array[$key] == $value) {
	            $results[] = $array;
	        }

	        foreach ($array as $subarray) {
	            $results = array_merge($results, $this->search($subarray, $key, $value));
	        }
	    }

	    return $results;
	}

	/*DIVIDE TEXTO EM DUAS PARTES*/
	function divide_text($text){
		$array_text = explode(' ',$text);
		$text1 = "";
		$text2 = "";
		for ($i=0; $i < round(count($array_text)/2); $i++) { 
			$text1 .= $array_text[$i]." ";
		}
		for ($i=round(count($array_text)/2); $i < count($array_text); $i++) { 
			$text2 .= $array_text[$i]." ";
		}
		return array($text1, $text2);
	}

	/**
	
	5000000
	**/
	function CroppedThumbnail($file,$imgSrc,$thumbnail_width,$thumbnail_height,$name,$sharpen=true,$max_size=50000000) 
	{ 

	$result = "";

	if(!empty($file))
	{

		if ($file["error"] == 0 && $file["size"] < $max_size)
		{
			//echo $file['name'];
			$newname = $imgSrc.$file['name'];
			//if (!file_exists($newname)) 
			//{
			move_uploaded_file($file['tmp_name'], $imgSrc.$file['name']);
				//if(move_uploaded_file($file['tmp_name'], $imgSrc.$file['name']))
				//{
			
					//$imgSrc is a FILE - Returns an image resource.
	    			//getting the image dimensions 
	    			list($width_orig, $height_orig) = getimagesize($imgSrc.$file['name']);  
	    			
	    			$fileType = $file['type'];
	    			// GIF
					if($fileType == "image/gif")
					    $myImage = imagecreatefromgif( $imgSrc.$file['name'] );
					// JPG
					if($fileType == "image/jpeg")
					    $myImage = imagecreatefromjpeg( $imgSrc.$file['name'] );
					if($fileType == "image/pjpeg"){
					    $myImage = imagecreatefromjpeg( $imgSrc.$file['name'] );
					}
					// PNG
					if($fileType == "image/x-png")
					    $myImage = imagecreatefrompng($imgSrc.$file['name']);
					if($fileType == "image/png"){
					    $myImage = imagecreatefrompng($imgSrc.$file['name'] );}
					
					if($width_orig < $thumbnail_width){
						$thumbnail_width = $width_orig;
					}
	    			if($height_orig < $thumbnail_height){
						$thumbnail_height = $height_orig;
					}
					
	    			//$myImage = imagecreatefromjpeg($imgSrc);
						$ratio_orig = $width_orig/$height_orig;
		    			if ($thumbnail_width/$thumbnail_height > $ratio_orig) 
		    			{
		    			   $new_height = $thumbnail_width/$ratio_orig;
		    			   $new_width = $thumbnail_width;
		    			} 
		    			else 
		    			{
		    			   $new_width = $thumbnail_height*$ratio_orig;
		    			   $new_height = $thumbnail_height;
		    			}
					
	    			$x_mid = $new_width/2;  //horizontal middle
	    			$y_mid = $new_height/2; //vertical middle
	    			
	    			
	//    			if($sharpen)
	//    			{
	//    			
	//    				$sharpenMatrix = array(
	//				      array(-1,-1,-1),
	//				      array(-1,16,-1),
	//				      array(-1,-1,-1)
	//				     );
	////0	1	0	    	-1	-1	-1	    	1	-2	1
	////1	-4	1	    	-1	8	-1	    	-2	4	-2
	////0	1	0	    	-1	-1	-1	    	1	-2	1
	//
	//					$divisor = array_sum(array_map('array_sum', $sharpenMatrix));
	//					$offset = 0;
	//					imageconvolution($thumb, $sharpenMatrix, $divisor, $offset);
	//    			}
	    			
	    		
	    			 // JPG
					if($fileType == "image/jpeg" || $fileType == "image/pjpeg" )
					{
						$process = imagecreatetruecolor(round($new_width), round($new_height));		
		    			imagecopyresampled($process, $myImage, 0, 0, 0, 0, $new_width, $new_height, $width_orig, $height_orig);
		    			$thumb = imagecreatetruecolor($thumbnail_width, $thumbnail_height);
		    			imagecopyresampled($thumb, $process, 0, 0, ($x_mid-($thumbnail_width/2)), ($y_mid-($thumbnail_height/2)), $thumbnail_width, $thumbnail_height, $thumbnail_width, $thumbnail_height);
		    			imagedestroy($process);
		    			imagedestroy($myImage);
						imagejpeg( $thumb, $imgSrc.$this->generateFriendlyName($name,200).".jpg" );
						$result = $this->generateFriendlyName($name,200).".jpg";
					}
				
					// GIF
					if($fileType == "image/gif")
					{
						$process = imagecreatetruecolor(round($new_width), round($new_height));			
		    			imagecopyresampled($process, $myImage, 0, 0, 0, 0, $new_width, $new_height, $width_orig, $height_orig);
		    			$thumb = imagecreatetruecolor($thumbnail_width, $thumbnail_height);
		    			imagecopyresampled($thumb, $process, 0, 0, ($x_mid-($thumbnail_width/2)), ($y_mid-($thumbnail_height/2)), $thumbnail_width, $thumbnail_height, $thumbnail_width, $thumbnail_height);
		    			imagedestroy($process);
		    			imagedestroy($myImage);
						imagegif( $thumb, $imgSrc.$this->generateFriendlyName($name,200).".gif" );
						$result = $this->generateFriendlyName($name,200).".gif";
					}
					   
					// PNG
					if($fileType == "image/png" || $fileType == "image/x-png")
					{
						$tmp=imagecreatetruecolor($new_width,$new_height);
		                $src=imagecreatefrompng($imgSrc.$file['name']);
		                imagealphablending($tmp, false);
		                imagesavealpha($tmp,true);
		                $transparent = imagecolorallocatealpha($tmp, 255, 255, 255, 127);
		                imagefilledrectangle($tmp, 0, 0, $new_width, $new_height, $transparent); 
		                imagecopyresampled($tmp, $src, 0, 0, 0, 0, $new_width, $new_height, $width_orig, $height_orig);
						$thumb = imagecreatetruecolor($thumbnail_width, $thumbnail_height);
						imagealphablending($thumb, false);
		                imagesavealpha($thumb,true);
		                $transparent = imagecolorallocatealpha($thumb, 255, 255, 255, 127);
		                imagefilledrectangle($thumb, 0, 0, $new_width, $new_height, $transparent);
		    			imagecopyresampled($thumb, $tmp, 0, 0, ($x_mid-($thumbnail_width/2)), ($y_mid-($thumbnail_height/2)), $thumbnail_width, $thumbnail_height, $thumbnail_width, $thumbnail_height);
		                $con=imagepng($thumb, $imgSrc.$this->generateFriendlyName($name,200).".png");
					    $result = $this->generateFriendlyName($name,200).".png";
					}
					    
					
						
				
			//	}
			//}
			
			
		}
		else{
			$result = 1;
		}
	}
	else{
		$result = 2;
	}	
		
	return $result;
	}	
}
?>