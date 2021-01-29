<?php
/**
 * Returns a list of information or a single info
 */
require 'database.php';
    
$info = [];

$sql = "SELECT * FROM information";
if(isset($_POST['template'])){ 
  $sql = "SELECT * FROM information WHERE template = '".$_POST['template']."'"; 
}
if(isset($_POST['title']) &&  isset($_POST['template'])){ 
  $sql = "SELECT * FROM information WHERE title = '".$_POST['title']."' AND template = '".$_POST['template']."'"; 
}
if(isset($_POST['id'])){ 
  $sql = "SELECT * FROM information WHERE id = ".$_POST['id']; 
}

if($result = mysqli_query($con,$sql))
{
  if(mysqli_num_rows($result)>0){
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

    if(isset($_POST['id']) || ( $_POST['title'] && $_POST['template'] ) ){ 
      echo json_encode($info[0]); } else { echo json_encode($info); }

  } else { http_response_code(404); }
  
} else { http_response_code(404); }

?>