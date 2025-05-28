<?php
mysqli_connect('hostname','usename','password','story')
header('Content-Type: application/json');

$response = array('success' => false, 'message' => 'An unknown error occurred.');

// Database credentials
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = "";     // Default XAMPP password (often empty)
$dbname = "furniture_store_db"; // The database name we'll use

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    $response['message'] = "Database connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

// Get form data
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

// Basic validation
if (empty($name)  empty($email)  empty($subject) || empty($message)) {
    $response['message'] = "Please fill in all required fields.";
    echo json_encode($response);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $response['message'] = "Invalid email format.";
    echo json_encode($response);
    exit();
}

// Prepare and bind for 'inquiries' table
$stmt = $conn->prepare("INSERT INTO inquiries (name, email, subject, message_text) VALUES (?, ?, ?, ?)");
if ($stmt === false) {
    $response['message'] = "Failed to prepare statement: " . $conn->error;
    echo json_encode($response);
    exit();
}

$stmt->bind_param("ssss", $name, $email, $subject, $message);

// Execute the statement
if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = "Your inquiry has been sent successfully! We'll get back to you soon.";
} else {
    $response['message'] = "Error submitting inquiry: " . $stmt->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);
?>