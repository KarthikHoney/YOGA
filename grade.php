<?php

include 'connection.php';


$id = $_GET['id'];
$grade = $_GET['grade'];
$payment = $_GET['payment'];


$sql = "INSERT INTO grade (id, grade, payment) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($sql);


if ($stmt->execute([$id, $grade, $payment])) {
    echo 'super macha';
} else {
    echo 'error: ' . $stmt->errorInfo()[2];
}

?>
