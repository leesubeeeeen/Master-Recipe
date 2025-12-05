<?php
// 문의 읽음 처리 스크립트

// AJAX로 전달된 문의 ID
$id = $_POST["id"];

// 문의 데이터 파일 경로
$path = "../data/inquiries.json";

// JSON 파일 불러오기
$data = json_decode(file_get_contents($path), true);

// 해당 id의 문의 항목을 찾아 checked = true 로 변경
foreach ($data as &$item) {
    if ($item["id"] == $id) {
        $item["checked"] = true;   // 사용자(문의한 사람)가 읽었다는 표시
        break;
    }
}

// 변경된 데이터 다시 파일에 저장
file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// 결과 반환
echo "ok";
