<?php
session_start();

include 'connection.php';

// Get the student ID from the GET request
$TrainerId = isset($_GET['id']) ? intval($_GET['id']) : null;

// 

if (!$TrainerId) {
    echo json_encode(['error' => 'Trainer ID not provided']);
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
