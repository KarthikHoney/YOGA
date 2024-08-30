<?php
session_start();

header('Content-Type: application/json');

// Get the student ID from the GET request
$TrainerId = isset($_GET['id']) ? intval($_GET['id']) : null;

// 

if (!$TrainerId) {
    echo json_encode(['error' => 'Trainer ID not provided']);
    exit();
}

// Database connection details
$host = 'localhost';
$dbname = 'yoga';
$username = 'root';
$password = '';

try {
    // Establish a PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Handle connection error
    echo json_encode(['error' => "Connection failed: " . $e->getMessage()]);
    exit();
}

try {
    // SQL query to select student details by student ID
    $sql = "SELECT * FROM trainer WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $TrainerId, PDO::PARAM_INT);
    $stmt->execute();

    $trainer = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($trainer) {
        echo json_encode($trainer);
    } else {
        echo json_encode(['error' => 'Trainer not found']);
    }
} catch (PDOException $e) {
    // Handle query error
    echo json_encode(['error' => 'Query error: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Handle other errors
    echo json_encode(['error' => 'General error: ' . $e->getMessage()]);
}
?>
