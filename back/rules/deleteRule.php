<?php
	function deleteRule(){

	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);


	$sql = "DELETE FROM `rules` WHERE `id` = '$POST->id'";

	if(mysqli_query($mysql,$sql)){
		$result = $POST->id;
	}
	else{
		$result = -1;
	}

	echo json_encode($result);

	};

	deleteRule();

?>