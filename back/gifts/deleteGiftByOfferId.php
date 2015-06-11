<?php
	function deleteCatalog(){


        include("../connect.php");

        $postdata = file_get_contents("php://input");
        $POST = json_decode($postdata);

        $sql = "DELETE FROM `gifts` WHERE `offer_id`='$POST->offer_id'";
        mysqli_query($mysql,$sql);
	};

	deleteCatalog();
?>