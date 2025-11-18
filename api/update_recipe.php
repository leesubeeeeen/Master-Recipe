<?php
header("Content-Type: application/json; charset=utf-8");

$input = json_decode(file_get_contents("php://input"), true);
$id = $input["id"];

$file = "../data/recipes.json";
$data = json_decode(file_get_contents($file), true);

// 못 찾으면 error
$index = array_search($id, array_column($data, "id"));
if ($index === false) {
    echo json_encode(["success" => false, "message" => "Recipe not found"]);
    exit;
}

// 기존 데이터에 덮어쓰기
$data[$index] = $input;

file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(["success" => true]);
?>
