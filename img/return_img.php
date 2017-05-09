<?php

error_reporting(E_ALL|E_STRICT);
ini_set("display_errors","off");

$thumbnail_height = $_GET['height'];
$thumbnail_width = $_GET['width'];
$img = $_GET['img'];


list($width_orig, $height_orig) = getimagesize($img);  
	    			
$fileType = exif_imagetype($img);
	// GIF
if($fileType == 1)
    $myImage = imagecreatefromgif( $img );
// JPG
if($fileType == 2)
    $myImage = imagecreatefromjpeg( $img );
/*if($fileType == 2){
    $myImage = imagecreatefromjpeg( $img );
}*/
// PNG
if($fileType == 3)
    $myImage = imagecreatefrompng($img);
/*if($fileType == "image/png"){
    $myImage = imagecreatefrompng($img );}*/




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
	
// 	$sharpen = true;
//    			if($sharpen)
//    			{
   			
//    				$sharpenMatrix = array(
// 				      array(-1,-1,-1),
// 				      array(-1,16,-1),
// 				      array(-1,-1,-1)
// 				     );
// //0	1	0	    	-1	-1	-1	    	1	-2	1
// //1	-4	1	    	-1	8	-1	    	-2	4	-2
// //0	1	0	    	-1	-1	-1	    	1	-2	1

// 					$divisor = array_sum(array_map('array_sum', $sharpenMatrix));
// 					$offset = 0;
// 					imageconvolution($thumb, $sharpenMatrix, $divisor, $offset);
//    			}
	

	 // JPG
if($fileType == 2  )
{
	$process = imagecreatetruecolor(round($new_width), round($new_height));		
		imagecopyresampled($process, $myImage, 0, 0, 0, 0, $new_width, $new_height, $width_orig, $height_orig);
		$thumb = imagecreatetruecolor($thumbnail_width, $thumbnail_height);
		imagecopyresampled($thumb, $process, 0, 0, ($x_mid-($thumbnail_width/2)), ($y_mid-($thumbnail_height/2)), $thumbnail_width, $thumbnail_height, $thumbnail_width, $thumbnail_height);
		imagedestroy($process);
		imagedestroy($myImage);
		// imagejpeg( $thumb, $imgSrc.$this->generateFriendlyName($name,200).".jpg" );
		header('Content-Type: image/jpeg');

// Output the image
		imagejpeg($thumb,NULL,100);
	
}

// GIF
if($fileType == 1)
{
	$process = imagecreatetruecolor(round($new_width), round($new_height));			
		imagecopyresampled($process, $myImage, 0, 0, 0, 0, $new_width, $new_height, $width_orig, $height_orig);
		$thumb = imagecreatetruecolor($thumbnail_width, $thumbnail_height);
		imagecopyresampled($thumb, $process, 0, 0, ($x_mid-($thumbnail_width/2)), ($y_mid-($thumbnail_height/2)), $thumbnail_width, $thumbnail_height, $thumbnail_width, $thumbnail_height);
		imagedestroy($process);
		imagedestroy($myImage);
	// imagegif( $thumb, $imgSrc.$this->generateFriendlyName($name,200).".gif" );
	header('Content-Type: image/gif');

// Output the image
		imagegif($thumb,NULL,100);
	
}
   
// PNG
if($fileType == 3 )
{
	$tmp=imagecreatetruecolor($new_width,$new_height);
       $src=imagecreatefrompng($img);
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

       // $con=imagepng($thumb, $imgSrc.$this->generateFriendlyName($name,200).".png");

       header('Content-Type: image/png');
       imagepng($thumb,NULL,100);
    
}


?>