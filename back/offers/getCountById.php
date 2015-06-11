<?php
	function getCatalogById(){


	include("../connect.php");
	$result = array();
	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$sql = "SELECT COUNT(`id`) FROM `offer` WHERE `id_user` = '$POST->id'";

	if($rez = mysqli_query($mysql,$sql)){
        if($r = mysqli_fetch_assoc($rez)){
            $result['all'] = $r['COUNT(`id`)'];
        }

        $sql = "SELECT COUNT(`id`) FROM `offer` WHERE `id_user` = '$POST->id' AND `status` = 1";
        if($rez = mysqli_query($mysql,$sql)){
            if($r = mysqli_fetch_assoc($rez)){
                $result['confirmed'] = $r['COUNT(`id`)'];
            }
        }
        $sql = "SELECT COUNT(`id`) FROM `offer` WHERE `id_user` = '$POST->id' AND `status` = 0";
        if($rez = mysqli_query($mysql,$sql)){
            if($r = mysqli_fetch_assoc($rez)){
                $result['wait'] = $r['COUNT(`id`)'];
            }
        }
        $sql = "SELECT COUNT(`id`) FROM `offer` WHERE `id_user` = '$POST->id' AND `status` = -1";
        if($rez = mysqli_query($mysql,$sql)){
            if($r = mysqli_fetch_assoc($rez)){
                $result['canceled'] = $r['COUNT(`id`)'];
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