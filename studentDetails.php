<?php
session_start();

header('Content-Type: application/json');

// Check if session ID is set
if (!isset($_SESSION['id'])) {
    echo json_encode(['error' => 'id not fetched ']);
    exit();
}

// Fetch and display the session ID for debugging
$studentId = $_SESSION['id'];
echo json_encode(['status' => 'Session ID fetched', 'id' => $studentId]);

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
    $sql = "SELECT * FROM individual_student WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $studentId, PDO::PARAM_INT);
    $stmt->execute();

    $student = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($student) {
        echo json_encode($student);
    } else {
        echo json_encode(['error' => 'Student not found']);
    }
} catch (PDOException $e) {
    // Handle query error
    echo json_encode(['error' => 'Query error: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Handle other errors
    echo json_encode(['error' => 'General error: ' . $e->getMessage()]);
}
?>
