<?php
include("db.php");

if (isset($_POST['Dumpsubmit'])) {

    $dumpName = $_POST['dumpName'];
    $dumpLoca = $_POST['dumpLoca'];
    $dumpDesc = $_POST['dumpDesc'];


        // Insert into database
        $sql = "INSERT INTO dump (name, location, photo, description, status) 
                VALUES ('$dumpName', '$dumpLoca', '$targetFile', '$dumpDesc', 'Pending')";

        if ($con->query($sql) === TRUE) {
            echo "Complaint submitted successfully!";
        } else {
            echo "Database Error: " . $con->error;
        }
    } else {
        echo "File upload failed!";
    }


$conn->close();
?>
