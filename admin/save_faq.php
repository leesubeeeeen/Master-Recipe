<!--[추가] 관리자 계정에서 문의사항 저장 php -->
<?php
// POST JSON 받기
$newFaq = json_decode(file_get_contents("php://input"), true);

$path = "../data/faq.json"; //저장할 파일 경로

// 기존 FAQ 불러오기
$oldFaq = [];
if (file_exists($path)) {
    $oldFaq = json_decode(file_get_contents($path), true);
}

// 새 FAQ 추가
$oldFaq[] = $newFaq;

// 저장
file_put_contents($path, json_encode($oldFaq, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

echo "success";
?>
