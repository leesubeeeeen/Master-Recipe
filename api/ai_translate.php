<?php
require "key.php";

$text = $_POST["text"] ?? "";
if (!$text) {
  echo json_encode(["error" => "text required"]);
  exit;
}

$prompt = "다음 요리 이름을 이미지 검색에 적합한 영어 요리명으로만 번역해줘. 설명 금지.\n\n$text";

$data = [
  "model" => "gpt-4.1-mini",
  "messages" => [
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

$res = curl_exec($ch);
$decoded = json_decode($res, true);

echo json_encode([
  "text" => $decoded["choices"][0]["message"]["content"] ?? ""
]);
