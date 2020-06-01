<?php

// db credentials
define('DB_HOST', 'z12itfj4c1vgopf8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com');
define('DB_USER', 'kbf2dxt47dvfdbnv');
define('DB_PASS', 'bz1rj16lzhlhf0s9');
define('DB_NAME', 'v6bh103mtrr1js6o');

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