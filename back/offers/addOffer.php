<?php
	function addCatalog(){


	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$sql = "INSERT INTO `offer`(`name`,`id_user`, `brand`, `img`, `price`, `url`, `catalog`, `status`, `additional`) VALUES ('$POST->name','$POST->user','$POST->brand','$POST->img','$POST->price','$POST->url','$POST-catalog','0','$POST->additional')";

	if(mysqli_query($mysql,$sql)){
		$id = mysqli_insert_id($mysql);
		for($i = 0;$i< count($POST->values);$i++){
			$sql = "INSERT INTO `offertorule`(`id_offer`, `id_rule`, `value`) VALUES ('$id','".$POST->values[$i]->charact."','".$POST->values[$i]->val."')";
			mysqli_query($mysql,$sql);
		}

		echo json_encode($id);
	}
	else{
		echo json_encode(-1);	
	}
	};

	addCatalog();
?>