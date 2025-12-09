<?php
header("Content-Type: application/json");

// DB CONNECT
$conn = new mysqli("localhost", "root", "", "healthcare_db");

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

// FORM DATA
$name    = $_POST["name"] ?? "";
$email   = $_POST["email"] ?? "";
$service = $_POST["service"] ?? "";
$date    = $_POST["date"] ?? "";
$phone   = $_POST["phone"] ?? "";
$message = $_POST["message"] ?? "";

if ($name == "") {
    echo json_encode(["status" => "error", "message" => "Name is required"]);
    exit;
}

// ▶ APPOINTMENT FORM (has service or phone)
if (!empty($service) || !empty($phone)) {

    $stmt = $conn->prepare(
        "INSERT INTO appointments (name, service, preferred_date, phone, email)
         VALUES (?, ?, ?, ?, ?)"
    );

    $stmt->bind_param("sssss", $name, $service, $date, $phone, $email);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Appointment saved"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to save appointment"]);
    }
    exit;
}

// ▶ CONTACT FORM
$stmt = $conn->prepare(
    "INSERT INTO contacts (name, email, message)
     VALUES (?, ?, ?)"
);
$stmt->bind_param("sss", $name, $email, $message);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Message sent"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to send message"]);
}
?>
