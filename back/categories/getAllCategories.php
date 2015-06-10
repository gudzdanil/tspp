<?php
	function getRules(){

	include("../connect.php");

	$sql = "SELECT `id_categorie`,`name`, `type`, `additional`,`id_rule` FROM `categories`";

	
	$result = array();
	if($rez = mysqli_query($mysql,$sql)){
		if(mysqli_num_rows($rez)>0){
			while($r = mysqli_fetch_assoc($rez)){
				$result[] = $r;
			}
		}

	}
	else{
		$result = -1;
	}
		echo json_encode($result);

	};

	getRules();

?>