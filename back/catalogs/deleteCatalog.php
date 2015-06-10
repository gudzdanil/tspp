<?php
	function deleteCatalog(){


        include("../connect.php");

        $postdata = file_get_contents("php://input");
        $POST = json_decode($postdata);

        $sql = "DELETE FROM `catalog` WHERE `id`='$POST->id'";
        mysqli_query($mysql,$sql);
        $sql = "DELETE FROM `catalogtorules` WHERE `id_catalog`='$POST->id'";
        mysqli_query($mysql,$sql);
	};

	deleteCatalog();
?>