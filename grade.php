<?php

include 'connection.php';


$id = $_POST['id'];
$grade = $_POST['grade'];
$payment = $_POST['payment'];


$sql = "INSERT INTO grade (id, grade, payment) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($sql);


if ($stmt->execute([$id, $grade, $payment])) {
    echo 'super macha';
} else {
    echo 'error: ' . $stmt->errorInfo()[2];
}

?>
