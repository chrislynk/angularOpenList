<?php
/**
 * Returns a list of information or a single info
 */
require 'database.php';
    
$info = [];

$sql = "SELECT * FROM information";
if(isset($_GET['template'])){ 
  $sql = "SELECT * FROM information WHERE template = '".$_GET['template']."'"; 
}
if(isset($_GET['title']) &&  isset($_GET['template'])){ 
  $sql = "SELECT * FROM information WHERE title = '".$_GET['title']."' AND template = '".$_GET['template']."'"; 
}
if(isset($_GET['id'])){ 
  $sql = "SELECT * FROM information WHERE id = ".$_GET['id']; 
}

$fp = fopen('logs.txt', 'a');//opens file in append mode  
$oDT = new DateTime('NOW');
fwrite($fp,"\r\n".$oDT->format("y:m:d h:i:s")." ".$sql."\r\n");


if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $info[$i]['id'] = $row['id'];
    $info[$i]['title'] = $row['title'];
    $info[$i]['content'] = json_decode($row['content']);
    $info[$i]['template'] = $row['template'];
    $info[$i]['updated'] = $row['updated'];
    $info[$i]['created'] = $row['created'];
    $i++;
  }

  if(isset($_GET['id']) || ( $_GET['title'] && $_GET['template'] ) ){ echo json_encode($info[0]); } else {
    echo json_encode($info);
  }
  
}
else
{
  http_response_code(404);
}

?>