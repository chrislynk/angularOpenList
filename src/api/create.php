<?php
/**
 * Adds a single info
 */
require 'database.php';

$info = [];
$template = "List";
if(isset($_POST['title']) && !empty($_POST['title'])){
  if(isset($_POST['template']) && !empty($_POST['template'])){ $template = $_POST['template']; }
  $sql = "INSERT INTO `information` (`title`, `template`) VALUES ('".$_POST['title']."', '".$template."');";
  
  fwrite($myfile, "\n SQL = ".$sql);

  if(mysqli_query($con,$sql))
  {
    http_response_code(201);
    $info = [
      'title' => $_POST['title'],
      'template' => $template,
      'id'    => mysqli_insert_id($con)
    ];
    echo json_encode($info);
  }
  else
  {
    http_response_code(422);
  }
}
fclose($myfile);

?>
