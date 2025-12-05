<?php
require "key.php";
/* OpenAI API KEY 불러오기 */

/* 사용자가 전달한 레시피 제목 */
$title = $_POST['title'] ?? '';

/* 관리자 AI 설정값 불러오기 (style, format 등) */
$ruleFile = file_get_contents("../data/ai_rule.json");
$rule = json_decode($ruleFile, true);

$style = $rule['style'];
$format = $rule['format'];

/* GPT에게 전달할 프롬프트 구성 */
$prompt = "
너는 전문 요리사이다.

📌 관리자 설정:
- 설명 스타일: {$style}
- 응답 포맷: {$format}

요리 '$title'에 대해 아래 JSON 형식만 반환하라.

{
 \"title\": \"요리명\",
 \"summary\": \"{$style}에 맞게 작성\",
 \"ingredients\": [...],
 \"steps\": [...],
 \"time\": \"조리시간\",
 \"level\": \"난이도\",
 \"tip\": \"{$style} 스타일 요리팁\",
 \"image_url\": \"...URL...\"
}

절대 JSON 이외의 텍스트 금지.
";

/* OpenAI API 요청 payload */
$data = [
  "model" => "gpt-4.1-mini",   /* 빠르고 저렴하며 JSON 구조화에 적합 */
  "messages" => [
    ["role" => "system", "content" => "당신은 전문 요리사입니다."],
    ["role" => "user", "content" => $prompt]
  ]
];

/* CURL 설정 및 실행 */
$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Authorization: " . "Bearer $OPENAI_API_KEY"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

/* GPT 응답 그대로 반환 */
echo curl_exec($ch);
