<?php
$dsn = 'mysql:host=localhost;dbname=1cdata';
$username = 'root';
$password = '';
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
$pdo = new PDO($dsn, $username, $password, $options);

$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody);

$stmt = $pdo->prepare('UPDATE 1cdata SET name = ?, phone = ? WHERE id = ?');
$stmt->execute([$data->name, $data->phone, $data->id]);

header('Content-Type: application/json');
echo json_encode(['id' => $data->id]);