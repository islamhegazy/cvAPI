<?php

// db credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'id13676396_islamapis');
define('DB_PASS', 'asd123ASD**++');
define('DB_NAME', 'id13676396_islamapi');

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