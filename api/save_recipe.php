<?php
header("Content-Type: application/json; charset=utf-8");

// 받아온 JSON 데이터
$input = json_decode(file_get_contents("php://input"), true);

// 기본 파일 경로
$file = "../data/recipes.json";

// 파일 읽기
$data = json_decode(file_get_contents($file), true);

// 배열 없으면 초기화
if (!$data) $data = [];

// 데이터 추가
$data[] = $input;

// 다시 JSON 저장
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(["success" => true]);
?>
