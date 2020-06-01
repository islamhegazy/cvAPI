<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';

$portfolios = [];
$sql = "SELECT id, title,link, thum,fullimage FROM portfolio";

if ($result = mysqli_query($con, $sql)) {
	$po = 0;
	while ($row = mysqli_fetch_assoc($result)) {

		$portfolios[$po]['id'] = $row['id'];
		$portfolios[$po]['title'] = $row['title'];
		$portfolios[$po]['link'] = $row['link'];
		$portfolios[$po]['thum'] = $row['thum'];
		$portfolios[$po]['fullimage'] = $row['fullimage'];
		$po++;
	}

	echo json_encode(['data' => $portfolios]);
} else {
	http_response_code(404);
}