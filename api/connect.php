<?php

// db credentials
define('DB_HOST', 'c8u4r7fp8i8qaniw.chr7pe7iynqr.eu-west-1.rds.amazonaws.com');
define('DB_USER', 'f5bvkmwltrg7ks15');
define('DB_PASS', 'c4vuspk6l2y4zjzz');
define('DB_NAME', 'e8m6bibij2vmgn1z');

// Connect with the database.
function connect() {
	$connect = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

	if (mysqli_connect_errno($connect)) {
		die("Failed to connect:" . mysqli_connect_error());
	}

	mysqli_set_charset($connect, "utf8");

	return $connect;
}

$con = connect();
