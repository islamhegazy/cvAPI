<?php

// db credentials
define('DB_HOST', 'dfkpczjgmpvkugnb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com');
define('DB_USER', 'xrnzgilyfc6m43ad');
define('DB_PASS', 'knlq9iy4r6330mfh');
define('DB_NAME', 'upe6l42sd679y83z');

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
