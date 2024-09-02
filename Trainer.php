<?php
include 'connection.php';



if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    $action = $_GET['action'];
    try {
        if ($action === 'create') {
            $name = $_GET['name'];
            $gmail = $_GET['gmail'];
            $studio=$_GET['studio'];
            $number=$_GET['number'];
            $password=$_GET['password'];
            $wnumber = $_GET['wnumber'];
            $address = $_GET['address'];
            

            $sql = "INSERT INTO trainer (name, gmail,studio,address,password,wnumber,number) VALUES (:name, :gmail,:studio,:address,:password,:wnumber,:number)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['name' => $name, 'gmail' => $gmail,'studio'=>$studio,'address'=>$address,'password'=>$password,'wnumber'=>$wnumber,'number'=>$number]);
            echo json_encode(['message' => 'Record created successfully']);
        } elseif ($action === 'update') {
            $id = $_GET['id'];
            $name = $_GET['name'];
            $email = $_GET['email'];

            $sql = "UPDATE users SET name = :name, email = :email WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['id' => $id, 'name' => $name, 'email' => $email]);
            echo json_encode(['message' => 'Record updated successfully']);
        } elseif ($action === 'delete') {
            $id = $_GET['id'];

            $sql = "DELETE FROM users WHERE id = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(['id' => $id]);
            echo json_encode(['message' => 'Record deleted successfully']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    try {
        $sql = "SELECT * FROM individual_student";
        $stmt = $pdo->query($sql);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
