<?php
header("Content-Type: application/json");
/* 응답을 JSON 형식으로 반환 */


/* POST로 전달된 관리자 AI 설정값들 */
$timeMin = $_POST['timeMin'] ?? '';
$timeMax = $_POST['timeMax'] ?? '';
$style   = $_POST['style'] ?? '';
$format  = $_POST['format'] ?? '';
$keyword = $_POST['keyword'] ?? '';


/* 저장할 AI 규칙 배열 구성 */
$rule = [
    "timeMin" => $timeMin,   /* 조리시간 최소 */
    "timeMax" => $timeMax,   /* 조리시간 최대 */
    "style"   => $style,     /* 설명 스타일 */
    "format"  => $format,    /* 출력 포맷 규칙 */
    "keyword" => $keyword    /* 추천하고 싶은 키워드 */
];


/* ai_rule.json 파일에 새로운 규칙 저장 */
file_put_contents(
    "../data/ai_rule.json",
    json_encode($rule, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);


/* 관리자에게 성공 메시지 반환 */
echo json_encode([
    "message" => "AI 추천 로직이 업데이트되었습니다."
]);
