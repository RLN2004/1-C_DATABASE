<?php
$dsn = 'mysql:host=localhost;dbname=1cdata';
$username = 'root';
$password = '';
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
$pdo = new PDO($dsn, $username, $password, $options);

$stmt = $pdo->query('SELECT * FROM 1cdata');
$contacts = $stmt->fetchAll();

header('Content-Type: application/json');
echo json_encode($contacts);