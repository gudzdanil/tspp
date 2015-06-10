<?php
	function editCatalog(){


	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$sql = "UPDATE `offer` `status`='$POST->status' WHERE `id`='$POST->id'";
	if(mysqli_query($mysql,$sql)){
		echo json_encode($id);
	}
	else{
		echo json_encode(-1);	
	}
	};

	editCatalog();
?>