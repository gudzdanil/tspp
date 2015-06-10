<?php
	function addCatalog(){


	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$date = date("y.m.d");
	$sql = "INSERT INTO `gifts`(`offer_id`, `date`) VALUES ('$POST->offer_id','$date')";

	if(mysqli_query($mysql,$sql)){
		$id = mysqli_insert_id($mysql);

		echo json_encode($id);
	}
	else{
		echo json_encode(-1);	
	}
	};

	addCatalog();
?>