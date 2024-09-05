<?php 
  $debug == true;
  if($debug == true){
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);
  }
  
  function injectHTML($filename){
    $filepath = __dir__."/" .$filename;

    if(file_exists($filepath)){
      $html = file_get_contents($filepath);
      echo $html;
    }else{
      echo "Something went wrong displaying the page...";
    }
  }
?>
