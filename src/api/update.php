<?php
/**
 * Updates an existing info
 */
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  $info = json_decode($postdata);

  // Validate.
  if ((int)$info->id < 1 || trim($info->title) == '' || trim($info->template) == '') {
    return http_response_code(400);
  }

  // Sanitize.
  $id    = (int)$info->id;
  $title = trim($info->title);
  $content = json_encode($info->content);
  $template = trim($info->template);  

  if ((int)$id < 1 || is_null($id) || trim($title) == '' ){
    return http_response_code(400);
  }

  // Update.
  $sql = "UPDATE `information` SET `title`='".$title."', `content` = '".$content."', `template` = '".$template."' WHERE `id` = ".$id." LIMIT 1";

  if(mysqli_query($con, $sql))
  {
    return http_response_code(200);
  }
  else
  {
    $information['code'] = 422;
    return http_response_code(422);
  }  
} else { return http_response_code(400); }

?>
