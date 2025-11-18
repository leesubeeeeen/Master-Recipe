<?php
require "key.php";

header("Content-Type: application/json; charset=utf-8");

// POST 값 읽기
$title = $_POST['title'] ?? '';

if (!$title) {
    echo json_encode(["error" => "title is required"]);
    exit;
}

// DALL-E 프롬프트
$prompt = "$title 음식 사진. 고화질, 실제 음식 사진 스타일, 조리된 요리 사진";

// OpenAI 요청 데이터
$data = [
    "model" => "gpt-image-1",
    "prompt" => $prompt,
    "size" => "1024x1024"
];

// CURL 실행
$ch = curl_init("https://api.openai.com/v1/images/generations");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: " . "Bearer $OPENAI_API_KEY"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// 오류 체크
if ($response === false || $status >= 400) {
    echo json_encode([
        "error" => "image_generation_failed",
        "message" => curl_error($ch),
        "fallback" => "assets/default_food.png"
    ]);
    exit;
}

echo $response;
