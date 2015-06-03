<?php
	function addRule(){

	include("connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);


	$sql = "INSERT INTO `rules`(`name`, `type`, `additional`) VALUES ('$POST->name','$POST->type','$POST->additional')";

	if(mysqli_query($mysql,$sql)){
		$result = mysql_insert_id($mysql);
	}
	else{
		$result = -1;
	}

	echo json_encode($result);

	};

	addRule();

?>