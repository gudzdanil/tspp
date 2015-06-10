<?php
	function getCatalogById(){


	include("../connect.php");
	$result = array();
	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$sql = "SELECT `id`, `name` FROM `catalog` WHERE `id`='$POST->id'";

	if($rez = mysqli_query($mysql,$sql)){
		if(mysqli_num_rows($rez)>0){
			while($r = mysqli_fetch_assoc($rez)){
				$result[] = $r;
			}
		}
		for($i=0;$i<count($result);$i++){
			$id = $result[$i]['id'];
			$sql = "SELECT `id_rule` FROM `catalogtorules` WHERE `id_catalog`='$id'";
			if($rez = mysqli_query($mysql,$sql)){
				if(mysqli_num_rows($rez)>0){
					while($r = mysqli_fetch_assoc($rez)){
						$result[$i]['characts'][] = $r['id_rule'];
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