<?php
	function addCategorie(){

	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);


	$sql = "INSERT INTO `categories`(`name`, `type`, `additional`, `id_rule`) VALUES ('$POST->name','$POST->type','$POST->additional','$POST->link')";

	if(mysqli_query($mysql,$sql)){
		$result = mysqli_insert_id($mysql);
	}
	else{
		$result = -1;
	}

	echo json_encode($result);

	};

	addCategorie();

?>