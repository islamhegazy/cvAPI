<?php 
if($_FILES){
    $target_dir = "upload/";
    $target_file = $target_dir . basename($_FILES["myFile"]["name"]);
     move_uploaded_file($_FILES["myFile"]["tmp_name"],$target_file);
     echo"File Successfully Uploaded";
}
/*
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
if(isset($_POST)){
    $check = getimagesize($_FILES["myFile"]["tmp_name"]);
    if($check !== false){
        echo "File is an image - " . $check ["mime"] . ".";
        $uploadOk = 1;
    }else{
        echo "File is not an image.";
        $uploadOk = 0 ;
    }
}
*/

?>