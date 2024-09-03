<?php

include 'connection.php';

$id = $_GET['id'];
$grade = $_GET['grade'];
$payment = $_GET['payment'];

$sql = "INSERT INTO grade (id,grade,payment) VALUES (?,?,?)";

$stmt =$pdo->prepare($sql);
$stmt->bind_param('iss',$id,$grade,$payment);

if($stmt->execute()){
    echo 'super macha';
}else{
    echo 'error';
}

?>
