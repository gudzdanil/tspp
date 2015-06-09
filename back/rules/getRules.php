<?php
	function getRules(){

	include("connect.php");

	$sql = "SELECT `id,`name`, `type`, `additional` FROM `rules`";

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

	getRules();

?>