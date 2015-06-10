<?php
	function getRuleById(){

	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);


	$sql = "SELECT `id_categorie`,`name`, `type`, `additional`,`id_rule` FROM `categories` WHERE `id_categorie` = '$POST->id'";

	if($rez = mysqli_query($mysql,$sql)){
		if(mysqli_num_rows($rez)>0){
			$result = array();
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

	getRuleById();

?>