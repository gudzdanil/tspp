<?php
	function getCatalogById(){


	include("../connect.php");
	$result = array();
	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$sql = "SELECT `id`, `name`, `id_user`, `brand`, `img`, `price`, `url`, `catalog`, `status`, `additional` FROM `offer` WHERE `id_user`='$POST->user_id'";

	if($rez = mysqli_query($mysql,$sql)){
		if(mysqli_num_rows($rez)>0){
			while($r = mysqli_fetch_assoc($rez)){
				$result[] = $r;
			}
		}
		for($i=0;$i<count($result);$i++){
			$id = $result[$i]['id'];
			$sql = "SELECT `id_offer`, `id_rule`, `value` FROM `offertorule` WHERE `id_offer`='$id'";
			if($rez = mysqli_query($mysql,$sql)){
				if(mysqli_num_rows($rez)>0){
					while($r = mysqli_fetch_assoc($rez)){
						$result[$i]['values'][] = $r['id_rule'];
					}
				}
			}
		}
		echo json_encode($result);
	}
	else{
		echo json_encode(-1);	
	}
	};

	getCatalogById();
?>