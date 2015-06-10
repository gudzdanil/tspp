<?php
	function editCatalog(){


	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$sql = "UPDATE `offer` `name`='$POST->name',`id_user`='$POST->id_user',`brand`='$POST->brand',`img`=='$POST->img',`price`=='$POST->price',`url`='$POST->url',`catalog`='$POST->catalog',`status`='$POST->status',`additional`='$POST->additional' WHERE `id`='$POST->id'";
	if(mysqli_query($mysql,$sql)){
		$id = $POST->id;
		$sql = "DELETE FROM `offertorule` WHERE `id_offer`='$id'";
		mysqli_query($mysql,$sql);
				
		for($i = 0;$i< count($POST->characts);$i++){
			$sql = "INSERT INTO `offertorule`(`id_offer`, `id_rule`, `value`) VALUES ('$id','".$POST->charact[$i]."','".$POST->val[$i]."')";
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