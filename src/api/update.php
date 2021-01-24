<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");
//$id = $_POST['id'];
//$title = $_POST['title'];

//$information['id'] = $id;
//$information['title'] = $title;

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  $fp = fopen('logs.txt', 'a');//opens file in append mode  

  $oDT = new DateTime('NOW');

  // Validate.
  if ((int)$request->id < 1 || trim($request->title) == '' || trim($request->template) == '') {
    fwrite($fp,"\r\n".$oDT->format("y:m:d h:i:s")." ");
    fwrite($fp,"postdata: ".$postdata);
    return http_response_code(400);
  }

  // Sanitize.
  $id    = (int)$request->id;
  $title = trim($request->title);

  fwrite($fp,"\r\n".$oDT->format("y:m:d h:i:s")." ");
  fwrite($fp,"id: ".$id." title: ".$title);

  $content = json_encode($request->content);
  $template = mysqli_real_escape_string($con, $request->template);
  fwrite($fp,"\r\n".$oDT->format("y:m:d h:i:s")." ");
  fwrite($fp,"request->content: ".$request->content." esc ".$content);
  fwrite($fp," request->template: ".$request->template." esc ".$template);

  fclose($fp);  


  if ((int)$id < 1 || is_null($id) || trim($title) == '' ){//|| trim($request->content) == '') {
    return http_response_code(400);
  }

  // Update.
  $sql = "UPDATE `information` SET `title`='".$title."', `content` = '".$content."', `template` = '".$template."' WHERE `id` = ".$id." LIMIT 1";

  //$information['sql'] = $sql;

  if(mysqli_query($con, $sql))
  {
    //echo json_encode($information);
    return http_response_code(200);
  }
  else
  {
    $information['code'] = 422;
    //echo json_encode($information);
    return http_response_code(422);
  }  
} else {echo json_encode($information);}

?>
