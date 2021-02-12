<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  // Validate.
  if (is_null($request->id) || (int)$request->id < 1 || 
      is_null(($request->title)) || trim($request->title) == '' || 
      is_null($request->content || trim($request->content) == '')) {
    return http_response_code(400);
  }

  // Sanitize.
  $id    = (int)$request->id;
  $title = trim(mysqli_real_escape_string($con, $request->title));
  $content = json_encode( $request->content );

  // Update.
  $sql = "UPDATE `information` SET `title`='".$title."', `content` = '".$content."' WHERE `id` = ".$id." LIMIT 1";

  //$information['sql'] = $sql;

  if(mysqli_query($con, $sql))
  {
    return http_response_code(200);
    
  }
  else
  {
    return http_response_code(422);
  }  

} else {return http_response_code(204);}

?>
