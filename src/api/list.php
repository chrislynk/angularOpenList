<?php
/**
 * Returns the list of cars.
 */
require 'database.php';
    
$info = [];
$sql = "SELECT * FROM information";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $info[$i]['title'] = $row['title'];
    $info[$i]['template'] = $row['template'];
    $i++;
  }
    
  echo json_encode(['data'=>$cars]);
}
else
{
  http_response_code(404);
}

?>