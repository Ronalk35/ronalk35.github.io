<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require 'vendor/autoload.php';


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize and validate input
    $name = htmlspecialchars(strip_tags(trim($_POST['name'])));
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(strip_tags(trim($_POST['subject'])));
    $message = htmlspecialchars(strip_tags(trim($_POST['message'])));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("El correo electrónico no es válido.");
    }

    
    $mail = new PHPMailer(true);

    try {
        
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';  
        $mail->SMTPAuth = true;
        $mail->Username = 'sam.ronaldurbano@gmail.com';  
        $mail->Password = '';  
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email content
        $mail->setFrom($email, $name);
        $mail->addAddress('sam.ronaldurbano@gmail.com');  
        $mail->addReplyTo($email, $name);

        $mail->isHTML(true);
        $mail->Subject = "Nuevo mensaje de contacto: $subject";
        $mail->Body    = "
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> $name</p>
            <p><strong>Correo Electrónico:</strong> $email</p>
            <p><strong>Asunto:</strong> $subject</p>
            <p><strong>Mensaje:</strong><br>$message</p>
        ";
        $mail->AltBody = "Nombre: $name\nCorreo: $email\nAsunto: $subject\nMensaje: $message";

        // Send email
        $mail->send();
        
       
        header("Location: send.html");
        exit();

    } catch (Exception $e) {
        
        die("Hubo un problema al enviar el correo: " . $mail->ErrorInfo);
    }
} else {
    http_response_code(405);
    die("Método no permitido");
}
