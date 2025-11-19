<?php
header("Content-Type: text/plain; charset=utf-8");

// JSON 저장 위치
$filePath = "../data/inquiries.json";

// JSON 파일 없으면 생성
if (!file_exists($filePath)) {
    file_put_contents($filePath, "[]");
}

// 기존 데이터 불러오기
$data = json_decode(file_get_contents($filePath), true);
if (!is_array($data)) $data = []; // 안전장치

// 업로드 파일 처리
$uploaded_file_path = "";
if (isset($_FILES['file']) && $_FILES['file']['error'] === 0) {
    $dir = "../uploads/";
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
    }

    $fileName = time() . "_" . basename($_FILES["file"]["name"]);
    $target = $dir . $fileName;

    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target)) {
        $uploaded_file_path = $fileName;
    }
}

// 사용자 입력값
$name = $_POST["name"];
$email = $_POST["email"];
$message = $_POST["message"];
$userId = $_POST["userId"] ?? "";   // 🔥 변경

// id 생성
$id = time();

// 새로운 문의 객체 (🔥 완전 버전)
$newInquiry = [
    "id" => $id,
    "name" => $name,
    "email" => $email,
    "userId" => $userId,
    "message" => $message,
    "file" => $uploaded_file_path ?: "",
    "created" => date("Y-m-d H:i:s"),
    "answer" => "",
    "answered" => false,
    "checked" => false
];

// JSON에 추가
$data[] = $newInquiry;

// 저장
file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "문의가 성공적으로 제출되었습니다!";
?>
