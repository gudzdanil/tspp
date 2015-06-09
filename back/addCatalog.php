<?php
	function addCtalog(){


	include("connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$sql = "INSERT INTO `catalog`(`name`) VALUES ('$POST->name')";

	if(mysqli_query($mysql,$sql)){
		$id = mysqli_insert_id($mysql);
		for($i = 0;$i< count($POST->characts);$i++){
			$sql = "INSERT INTO `catalogtorules`(`id_catalog`, `id_rule`) VALUES ('$id','$POST->characts[$i]')";
			mysqli_query($mysql,$sql);
		}

		echo json_encode($id);
	}
	else{
		echo json_encode(-1);	
	}
	};

	addCtalog();
?>