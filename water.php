<?php
$conn = new mysqli("localhost", "root", "", "complaint_system");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$address = $_POST['address'];
$issue = $_POST['issue'];
$description = $_POST['description'];

$sql = "INSERT INTO watercomp (address, issue, description) 
        VALUES ('$address', '$issue', '$description')";

if ($conn->query($sql) === TRUE) {
    header("Location: index.php?status=success");
    exit;
} else {
    header("Location: index.php?status=error");
    exit;
}
?>
