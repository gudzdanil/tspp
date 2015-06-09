<?php
	function editRule(){

	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);


	$sql = "UPDATE `rules` SET `name`='$POST->name',`type`='$POST->type',`additional`='$POST->additional' WHERE `id`='$POST->id'";

	if(mysqli_query($mysql,$sql)){
		$result = $POST->id;
	}
	else{
		$result = -1;
	}

	echo json_encode($result);

	};

	editRule();

?>