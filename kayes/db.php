<?php
    $conn = new mysqli("localhost", "root", "", "complaint_system");
    if($conn -> connect_error){
        die("Database connection failed");
    }

    $con = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($con->connect_error) {
        die("Connection failed: " . $con->connect_error);
    }
?>