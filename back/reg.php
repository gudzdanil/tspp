<?php 
function registration(){
	include("connect.php");

	$result = 0;

	$email = $_POST['email'];
	$login = $_POST['login'];
	$password = md5($_POST['password']);
	$name = $_POST['name'];
	$lastname = $_POST['lastname'];
	$roleUser = 0;
	$roleSeller = 0;
	if(intval($_POST['role'])==1){
		$roleSeller = 1;
	}
	else{
		$roleUser = 1;
	}
	//role  0 -user,1 - seller,2-admin

	$sql = "INSERT INTO `users`(`email`, `login`, `name`, `lastname`, `password`, `roleUser`, `roleSeller`)
	 VALUES ('$email','$login','$name','$lastname','$roleUser','$roleSeller');";

	 if(mysqli_query($mysql,$sql)){
	 	$registration = 1;
	 }
	 echo json_encode($result);
	mysqli_close($mysql);
	};

registration();

?>