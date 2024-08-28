<?php
session_start();

$host = 'localhost';
$dbname = 'yoga';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die(json_encode(['error' => "Connection failed: " . $e->getMessage()]));
}

header('Content-Type: application/json');

if (isset($_SESSION['student_id'])) {
    $studentId = $_SESSION['student_id']; 

    try {
        $sql = "SELECT * FROM individual_student WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['id' => $studentId]);

        $student = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($student) {
            echo json_encode($student);
        } else {
            echo json_encode(['error' => 'Student not found']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Not logged in']);
}
?>
