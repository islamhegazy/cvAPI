<?php

$uploads_dir = "upload/";
$title = $link = $thum = $fullimage = $file = '';

$pname = $_FILES["thum"]["name"];
$tname = $_FILES["thum"]["tmp_name"];

$name = pathinfo($_FILES['thum']['name'], PATHINFO_FILENAME);
$extension = pathinfo($_FILES['thum']['name'], PATHINFO_EXTENSION);

$increment = 0;
$pname = $name . '.' . $extension;
while (is_file($uploads_dir . '/' . $pname)) {
	$increment++;
	$pname = $name . $increment . '.' . $extension;
}
move_uploaded_file($tname, $uploads_dir . '/' . $pname);

$uploads_dir2 = "upload/";

$pname2 = $_FILES["fullimage"]["name"];
$tname2 = $_FILES["fullimage"]["tmp_name"];

$name2 = pathinfo($_FILES['fullimage']['name'], PATHINFO_FILENAME);
$extension2 = pathinfo($_FILES['fullimage']['name'], PATHINFO_EXTENSION);

$increment2 = 0;
$pname2 = $name2 . '.' . $extension2;
while (is_file($uploads_dir2 . '/' . $pname2)) {
	$increment2++;
	$pname2 = $name2 . $increment . '.' . $extension2;
}
move_uploaded_file($tname2, $uploads_dir2 . '/' . $pname2);

$title = $_POST['title'];
$link = $_POST['link'];
$thum = $_FILES["thum"]["name"];
$fullimage = $_FILES["fullimage"]["name"];

require 'connect.php';

$sql = "INSERT INTO `portfolio`(`title`,`link`,`thum`,`fullimage`) VALUES ('{$title}','{$link}','{$thum}','{$fullimage}')";

if ($result = mysqli_query($con, $sql)) {

	echo json_encode($result);
} else {
	http_response_code(404);
}
?>