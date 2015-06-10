<?php
	function editRule(){

	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);


	$sql = "UPDATE `categories` SET `name`='$POST->name',`type`='$POST->type',`additional`='$POST->additional',`id_rule`='$POST->link' WHERE `id_categorie`='$POST->id'";

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