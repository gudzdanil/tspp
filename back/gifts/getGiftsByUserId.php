<?php
	function getCtalogs(){


	include("../connect.php");
	$result = array();
	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$sql = "SELECT gifts.id, `offer_id`, `date`,`name`, `id_user`, `brand`, `img`, `price`, `url`, `catalog`, `status`, `additional` FROM `gifts` INNER JOIN `offer` ON gifts.id=`offer_id` WHERE `id_user`='$POST->user_id'";

	if($rez = mysqli_query($mysql,$sql)){
		if(mysqli_num_rows($rez)>0){
			while($r = mysqli_fetch_assoc($rez)){
				$result[] = $r;
			}
		}
		for($i=0;$i<count($result);$i++){
			$id = $result[$i]['offer_id'];
			$sql = "SELECT `id_offer`, `id_rule`, `value` FROM `offertorule` WHERE `id_offer`='$id'";
			if($rez = mysqli_query($mysql,$sql)){
				if(mysqli_num_rows($rez)>0){
					while($r = mysqli_fetch_assoc($rez)){
						$result[$i]['characts'][] = $r;
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

	getCtalogs();
?>