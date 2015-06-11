<?php
	function getCatalogById(){


	include("../connect.php");
	$result = array();
	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$sql = "SELECT COUNT(`id`) FROM `offer` WHERE `status` = 0";

	if($rez = mysqli_query($mysql,$sql)){
        if($r = mysqli_fetch_assoc($rez)){
            $result = $r["COUNT(`id`)"];
        }
        echo $result;
	}
	else{
		echo json_encode(-1);	
	}
	};

	getCatalogById();
?>