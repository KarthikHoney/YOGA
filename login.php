<?php
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
        if ($role === 'individualstudent') {
            $sql = "SELECT * FROM individual_student WHERE name = :name AND password = :password";
        } else if ($role === 'trainerstudent') {
            $sql = "SELECT * FROM trainer WHERE name = :name AND password = :password";
        } else {
            echo json_encode([]);
            exit;
        }
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':password', $password);
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($users);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
}
?>
