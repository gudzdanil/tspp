<?php
	function getRuleById(){

	include("../connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);


	$sql = "SELECT `id,`name`, `type`, `additional` FROM `rules` WHERE `id` = '$POST->id'";

	$rez = mysqli_query($mysql,$sql;

	if(mysqli_num_rows($rez)>0){
		$result = array();
		while($r = mysqli_fetch_assoc($rez)){
			$result[] = $r;
		}
	}
	else{
		$result = -1;
	}

	echo json_encode($result);

	};

	getRuleById();

?>