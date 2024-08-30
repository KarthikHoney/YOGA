<?php
session_start(); // Start the session

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

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action'])) {
    $role = $_GET['action'];
    $name = isset($_GET['name']) ? $_GET['name'] : '';
    $password = isset($_GET['password']) ? $_GET['password'] : '';

    try {
        // Prepare SQL based on the role
        if ($role === 'individualstudent') {
            $sql = "SELECT * FROM individual_student WHERE name = :name";
        } else if ($role === 'trainerstudent') {
            $sql = "SELECT * FROM trainer WHERE name = :name";
        } else {
            echo json_encode(['error' => 'Invalid role']);
            exit;
        }

        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

       

        if ($user && $user['password'] === $password) {
            
            $_SESSION['id'] = $user['id'];
            $_SESSION['role'] = $role;

            echo json_encode(['success' => true, 'user' => $user]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Invalid credentials']);
        }
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
} else {
    echo json_encode(['error' => 'Invalid request']);
}
?>
