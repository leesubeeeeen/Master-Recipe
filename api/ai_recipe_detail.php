<?php
require "key.php";

$title = $_POST['title'] ?? '';

$prompt = "
너는 전문 요리사이다.
요리 '$title'에 대해 아래 JSON 형식만 반환하라.

{
  \"title\": \"요리명\",
  \"summary\": \"간단 설명\",
  \"ingredients\": [\"재료1\", \"재료2\", ...],
  \"steps\": [\"1단계 설명\", \"2단계 설명\", ...],
  \"time\": \"조리시간\",
  \"level\": \"난이도\",
  \"tip\": \"요리 팁\",
  \"image_url\": \"실존 음식 이미지 URL\"
}

절대 JSON 이외 설명 금지.
";

$data = [
  "model" => "gpt-4.1-mini",
  "messages" => [
    ["role" => "system", "content" => "당신은 전문 요리사입니다."],
    ["role" => "user", "content" => $prompt]
  ]
];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Authorization: " . "Bearer $OPENAI_API_KEY"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

echo curl_exec($ch);
