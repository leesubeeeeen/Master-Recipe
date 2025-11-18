<?php
require "key.php";

$ingredients = $_POST['ingredients'] ?? '';

if (!$ingredients) {
  echo json_encode(["error" => "ingredients is required"]);
  exit;
}

$prompt = "
너는 요리 전문가 AI이다.
사용자가 가진 재료: $ingredients

이 재료로 만들 수 있는 요리 5개를
아래 JSON형태로만 반환해라.

[
  {
    \"title\": \"김치볶음밥\",
    \"summary\": \"간단한 한 줄 설명\",
    \"time\": \"20분\",
    \"level\": \"초급\",
    \"image_url\": \"https://example.com/sample.jpg\"
  }
]
";

$data = [
  "model" => "gpt-4.1-mini",
  "messages" => [
    ["role" => "system", "content" => "당신은 요리 전문가입니다."],
    ["role" => "user", "content" => $prompt]
  ],
  "temperature" => 0.7
];

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Authorization: Bearer $OPENAI_API_KEY"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
curl_close($ch);

echo $response;
