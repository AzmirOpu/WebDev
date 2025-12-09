<?php 
include "db.php";
$result = $conn->query("SELECT * FROM complaints ORDER BY id DESC");
?>

<!DOCTYPE html>
<html>
<head>
    <title>Complaints Panel</title>
    <style>
        body {font-family: Arial;background: #f4f4f4;padding: 20px;}
        h2{margin-bottom: 20px;}
        table {width: 100%;background: white;border-collapse: collapse;box-shadow: 0 0 5px rgba(0,0,0,0.1);}  
        th, td {border: 1px solid #ddd;padding: 12px;text-align: center;}
        th {background: #222;color: white; }
        .btn {padding: 6px 10px;text-decoration: none;color: white;border-radius: 5px;font-size: 14px;}
        .accept { background: green; }
        .reject { background: red; }
        .pending { background: orange; }
        .delete { background: black; }
    </style>
</head>
<body>

<h2>All Complaints</h2>

<table>
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Service</th>
    <th>Description</th>
    <th>Status</th>
    <th>Action</th>
</tr>

<?php while($row = $result->fetch_assoc()) { ?>
<tr>
    <td><?= $row['id'] ?></td>
    <td><?= $row['name'] ?></td>
    <td><?= $row['email'] ?></td>
    <td><?= $row['service'] ?></td>
    <td><?= $row['description'] ?></td>
    <td><?= ucfirst($row['status']) ?></td>

    <td>
        <a class="btn accept" href="update_status.php?id=<?= $row['id'] ?>&status=accepted">Accept</a>
        <a class="btn reject" href="update_status.php?id=<?= $row['id'] ?>&status=rejected">Reject</a>
        <a class="btn pending" href="update_status.php?id=<?= $row['id'] ?>&status=pending">Pending</a>
        <a class="btn delete" onclick="return confirm('Delete this complaint?')" href="delete.php?id=<?= $row['id'] ?>">Delete</a>
    </td>
</tr>
<?php } ?>
</table>

</body>
</html>
