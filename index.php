<?php
  $lang = $_GET['lang'];
  if ($lang && ($lang == 'pt' || $lang == 'en' )) {
    unset($_COOKIE['cookiesBizness']);
    $cookie_name = "cookiesBizness";
    $cookie_value = $lang;
    setcookie($cookie_name, $cookie_value, time()+((3600 * 24)*30), "/");
  }
  else{
    if (isset($_COOKIE['cookiesBizness'])) {
      $lang = $_COOKIE['cookiesBizness'];
    }
    else{
      $lang2 = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
      switch ($lang2){
        case "pt":{
            $lang="pt";
            break;
        }
        case "en":{
            $lang="en";
            break;
        }

        default:{
            $lang="pt";
            break;
        }
      }
    }
  }


/*URL PARA BASE DO ANGULARJS*/
$url_base = $_SERVER['PHP_SELF'];
$url_base_array = explode('/',$url_base);
$url_base = "";
for ($i=0; $i < count($url_base_array)-1; $i++) {
    $url_base .= $url_base_array[$i]."/";
}

$desc_page = "";

?>
<!doctype html>
<html class="no-js" lang="<?php echo $lang?>" ng-app="biznessApp" ng-cloak >
  <head>
    <base href="<?php echo $url_base?>">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title ng-bind="titlePage">Bizness<?php echo $titulo_page?></title>

    <!-- for Facebook -->
    <meta property="og:title" content="Bizness<?php echo $titulo_page?>" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="<?php echo $imagem_final?>" />
    <meta property="og:url" content="<?php echo $url_final?>" />
    <meta property="og:description" content="<?php echo $desc_page?>" />

    <!-- for Google -->
    <meta name="description" content="<?php echo $desc_page?>" />
    <!-- <meta name="keywords" content="<?php echo $keywords_final?>" /> -->

    <meta name="author" content="Bizness" />
    <meta name="copyright" content="Bizness" />
    <meta name="application-name" content="Bizness<?php echo $titulo_page?>" />


    <!-- for Twitter -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Bizness<?php echo $titulo_page?>" />
    <meta name="twitter:url" content="<?php echo $url_final?>" />
    <meta name="twitter:description" content="<?php echo $desc_page?>" />
    <meta name="twitter:image" content="<?php echo $imagem_final?>" />

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="apple-touch-icon" href="apple-touch-icon.png">
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet">




    <script src="js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
  </head>
  <body >
      <div class="loading" ng-class="{loading_display: flag_loading == 1 || flag_loading == 2}">
          <div class="linha_loading_holder">
            <div class="linha_loading" ng-class="{linha_loading1: flag_loading == 1,linha_loading2: flag_loading == 2 }">
            </div>
        </div>
      </div>
    <!-- MENU -->
    <menu></menu>

    <!-- CONTAINER -->
    <div class="container_website col-xs-12 pd0"  ng-view autoscroll="true"></div>

    <!-- FOOTER -->
    <footer></footer>
  
    

   <script src='//maps.googleapis.com/maps/api/js?&key=AIzaSyBEsDaD7pRIfOpsO2w2V9UMQSucIl6Z6DU'></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
   
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>


    <script src="js/plugins.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.10.3/TweenMax.min.js"></script>
    
    <script src="js/user_scripts/lang/<?php echo $lang; ?>.js"></script>
    <?php
        $mydir = "js/user_scripts/";
        $d = dir($mydir);

        unlink("js/script.js");
        $myfile = fopen("js/script.js", "w") or die("Unable to open file!");

        // $content_file = file_get_contents("js/user_scripts/lang/".$lang.".js");
        // fwrite($myfile, $content_file);

        $content_file = file_get_contents($mydir."app.js");
        fwrite($myfile, $content_file);
        $content_file = file_get_contents($mydir."services.js");
        fwrite($myfile, $content_file);
        $content_file = file_get_contents($mydir."directives.js");
        fwrite($myfile, $content_file);

    while ($entry = $d->read()) {
        if ($entry != "." && $entry != ".DS_Store" && $entry != ".." && $entry != "app.js" && $entry != "services.js" && $entry != "directives.js" && $entry != "lang" && $entry != "minify") {
            // echo $entry;
            $array_nome_file = explode(".", $entry);
            // if ($array_nome_file[count($array_nome_file)-2] == 'min') {
            $content_file = file_get_contents($mydir . $entry);
            fwrite($myfile, $content_file);
            //}
        }
    }
        $d->close();

        fclose($myfile);

      ?><script src="js/script.js"></script>

    <script>
      var lang = '<?php echo $lang?>';
      var pathgeral = '<?php echo "http://".$_SERVER['HTTP_HOST'].$url_base ?>';

     
    </script>

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-12913211-62', 'auto');
  ga('send', 'pageview');

</script>
  </body>
</html>
