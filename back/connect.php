<?php
	$mysql = mysqli_connect("localhost","root","root","gifts");

	mysqli_set_charset($mysql,"utf8");

	mysqli_error($mysql);

	error_reporting(E_ALL);
?>