<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '/home/desicmi1/public_html/Exception.php';
require '/home/desicmi1/public_html/PHPMailer.php';
require '/home/desicmi1/public_html/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $firstName = $_POST['firstName'];
    $lastName = $_POST['lastName'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Create an instance of PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();                                      // Send using SMTP
        $mail->Host       = 'mail.desicmimarlik.com';         // Set the SMTP server
        $mail->SMTPAuth   = true;                             // Enable SMTP authentication
        $mail->Username   = 'muhammetalbustanli@desicmimarlik.com';     // SMTP username (your hosting email)
        $mail->Password   = '28031996Ms.';                   // SMTP password
        $mail->SMTPSecure = 'ssl';                            // Enable SSL encryption
        $mail->Port       = 465;                              // SMTP port

        // Recipients
        $mail->setFrom('muhammetalbustanli@desicmimarlik.com', 'Your Name'); // From email and name
        $mail->addAddress('byzgluosmann@gmail.com');    // The recipient (your private email)

        // Content
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = 'New Message from Website Contact Form';
        
        // Message Body
        $mail->Body    = "
            <h2>New Contact Form Submission</h2>
            <p><strong>First Name:</strong> $firstName</p>
            <p><strong>Last Name:</strong> $lastName</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        // Send the email
        $mail->send();
        echo 'Mesaj başarıyla gönderildi!';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
