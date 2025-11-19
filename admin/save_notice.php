<?php
// JSON 입력 받기
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo "데이터 없음";
    exit;
}

$path = "../data/notice.json";

// 파일로 저장
file_put_contents($path, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

echo "success";
?>
