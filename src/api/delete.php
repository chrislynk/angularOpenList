<?php

require 'database.php';

// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? (int)$_GET['id'] : false;

if(!$id)
{
  return http_response_code(400);
}

// Delete.
$sql = "DELETE FROM `information` WHERE `id` ='{$id}' LIMIT 1";

if(mysqli_query($con, $sql))
{
  return http_response_code(204);
}
else
{
  return http_response_code(422);
}

?>
