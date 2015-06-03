<?php 
function registration(){
	include("connect.php");

	$postdata = file_get_contents("php://input");
	$POST = json_decode($postdata);

	$result = 0;
	$email = $POST->email;
	$login = $POST->login;
	$password = md5($POST->pass);
	$name = $POST->name;
	$lastname = $POST->lastname;
	$roleUser = 0;
	$roleSeller = 0;
	if(intval($POST->role)==1){
		$roleSeller = 1;
	}
	else{
		$roleUser = 1;
	}
	//role  0 -user,1 - seller,2-admin

	$sql = "INSERT INTO `users`(`email`, `login`, `name`, `lastname`, `password`, `roleUser`, `roleSeller`)
	 VALUES ('$email','$login','$name','$lastname','$password','$roleUser','$roleSeller')";

	 if(mysqli_query($mysql,$sql)){
	 	$result = 1;
	 }
	 else{
	 	echo mysqli_error($mysql);
	 }
	 echo json_encode($result);
	mysqli_close($mysql);
	};

registration();

?>