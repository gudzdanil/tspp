<?php
	function deleteCatalog(){


        include("../connect.php");

        $postdata = file_get_contents("php://input");
        $POST = json_decode($postdata);

        $sql = "DELETE FROM `offer` WHERE `id`='$POST->id'";
        mysqli_query($mysql,$sql);
        $sql = "DELETE FROM `offertorule` WHERE `id_offer`='$POST->id'";
        mysqli_query($mysql,$sql);
	};

	deleteCatalog();
?>