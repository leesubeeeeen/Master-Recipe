<?php
header("Content-Type: application/json");

$timeMin = $_POST['timeMin'] ?? '';
$timeMax = $_POST['timeMax'] ?? '';
$style = $_POST['style'] ?? '';
$format = $_POST['format'] ?? '';
$keyword = $_POST['keyword'] ?? '';

$rule = [
    "timeMin" => $timeMin,
    "timeMax" => $timeMax,
    "style" => $style,
    "format" => $format,
    "keyword" => $keyword
];

file_put_contents("../data/ai_rule.json", json_encode($rule, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo json_encode(["message" => "AI 추천 로직이 업데이트되었습니다."]);
