<?php

function authification(){
	include("connect.php");
	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$logName = $POST->login;
	$password = $POST->pass;
	$role = intval($POST->role);
	
	$rUser = 0;
	$rSeller = 0;
	$rAdmin = 0;
	//role  0 -user,1 - seller,2-admin

	switch ($role) {
		case 0:
			$rUser = 1;
			break;
		case 1:
			$rSeller = 1;
			break;
		case 2:
			$rAdmin = 1;
			break;
	}

	$sql = "SELECT `id`, `email`, `login`, `name`, `lastname`, `roleUser`, `roleAdmin`, `roleSeller` FROM `users`
	 WHERE `login` = '$logName' OR `email` = '$logName' AND `roleUser` = 'rUser' AND `roleAdmin` = 'rAdmin' AND `roleSeller` = 'rSeller'";

	$result = mysqli_query($mysql,$sql);

	if(mysqli_num_rows($result) > 0){
		while($row = mysqli_fetch_assoc($result)){
    		session_start();
    		$_SESSION["user"] = hash('md5',$row['email'].$row['login'].$row['roleUser'].$row['roleAdmin'].$row['roleSeller']);

			$resArr = array('id' => $row['id'],
				'email' => $row['email'],
				'login' => $row['login'],
				'name' => $row['name'],
				'lastname' => $row['lastname'],
				'roleUser' =>0);

			if($row['roleAdmin'] == 1){
				$resArr['roleUser'] = 2;
			}
			else if($row['roleSeller'] == 1){
				$resArr['roleUser'] = 1;
			}

			echo json_encode($resArr);
			mysqli_close($mysql);
			die;
		}
	}

	echo json_encode(-1);
	mysqli_close($mysql);

};

authification();

?>