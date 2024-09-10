<?php 
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
