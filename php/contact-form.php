<?php

	if(isset($_POST['sendMail'])) {

    $name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];

	$to = "christhiandperez@gmail.com";

	$email_subject = "New Form Submission";

	mail($to, $email_subject, "Email: " .$email, $message, "From: " . $name);

	echo "Your message has been sent"; 
}

?>