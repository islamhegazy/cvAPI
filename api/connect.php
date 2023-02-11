<?php

// db credentials
define('DB_HOST', 'dfkpczjgmpvkugnb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com');
define('DB_USER', 'vvbw8cuko423qqv7');
define('DB_PASS', 'y9uijpgx9l66pjdn');
define('DB_NAME', 'zryl6m2xf3zfk870');

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
