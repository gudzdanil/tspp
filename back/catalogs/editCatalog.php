<?php
	function editCatalog(){


	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$sql = "UPDATE `catalog` SET `name`='$POST->name' WHERE `id`'$POST->id'";

	if(mysqli_query($mysql,$sql)){
		$id = $POST->id;
		$sql = "DELETE FROM `catalogtorules` WHERE `id_catalog`='$id'";
		mysqli_query($mysql,$sql);
				
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

	editCatalog();
?>