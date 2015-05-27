<?php
	function session(){
		session_start();
		$quqie = array();
		if(isset($_SESSION["user"])){

			include("connect.php");

			$sql = "SELECT `id`, `email`, `login`, `name`, `lastname`, `roleUser`, `roleAdmin`, `roleSeller` FROM `users`";

			$result = mysqli_query($mysql,$sql);

			if ($result->num_rows > 0) {
		    	while($row = $result->fetch_assoc()) {
		    		if(md5($row["email"].$row["login"].$row["roleUser"].$row["roleAdmin"].$row["roleSeller"])==$_SESSION["user"]){
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
			}

		}
		echo json_encode(-1);
	};

	session();
?>