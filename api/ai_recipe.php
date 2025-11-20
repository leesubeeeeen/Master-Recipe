<?php
require "key.php";

$ingredients = $_POST['ingredients'] ?? '';
$ruleFile = file_get_contents("../data/ai_rule.json");
$rule = json_decode($ruleFile, true);

$timeMin = $rule['timeMin'];
$timeMax = $rule['timeMax'];
$style = $rule['style'];
$format = $rule['format'];
$keyword = $rule['keyword'];

if (!$ingredients) {
  echo json_encode(["error" => "ingredients is required"]);
  exit;
}

$prompt = "
너는 요리 전문가 AI이다.

📌 관리자 설정:
- 추천 조리시간: {$timeMin}~{$timeMax} 분
- 설명 스타일: {$style}
- 응답 포맷 규칙: {$format}
- 자주 추천하고 싶은 재료: {$keyword}

사용자가 가진 재료: $ingredients

위 조건을 기반으로 사용자가 만들기 좋은 요리 5개를
무조건 JSON 형태로만 반환하라.
JSON 외의 글은 절대 금지한다.

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
