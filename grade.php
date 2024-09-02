<?php

include 'connection.php';

$id = $_GET['id'];
$grade = $_GET['grade'];
$payment = $_GET['payment'];

$sql = "INSERT INTO grade (id, grade, payment) VALUES ('$id', '$grade', '$payment')";
$result = mysqli_query($pdo, $sql);

if ($result) {
    echo 'Record Created Successfully';
} else {
    echo 'Error: ' . mysqli_error($pdo);
}

?>
