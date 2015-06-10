<?php
	function deleteCatalog(){


        include("../connect.php");

        $postdata = file_get_contents("php://input");
        $POST = json_decode($postdata);

        $sql = "DELETE FROM `gifts` WHERE `id`='$POST->id'";
        mysqli_query($mysql,$sql);
	};

	deleteCatalog();
?>