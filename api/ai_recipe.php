<?php
require "key.php";
/* OpenAI API Key를 불러오는 파일 */

$ingredients = $_POST['ingredients'] ?? '';
/* 사용자가 입력한 재료 목록(문자열) */

$ruleFile = file_get_contents("../data/ai_rule.json");
/* 관리자 설정 파일 로드 (AI 추천 규칙) */

$rule = json_decode($ruleFile, true);
/* JSON → 배열로 변환 */

/* 관리자 설정값 가져오기 */
$timeMin = $rule['timeMin'];
$timeMax = $rule['timeMax'];
$style = $rule['style'];
$format = $rule['format'];
$keyword = $rule['keyword'];

if (!$ingredients) {
  /* 재료 입력값이 없으면 에러 반환 */
  echo json_encode(["error" => "ingredients is required"]);
  exit;
}

/* GPT에게 전달할 프롬프트 구성 */
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

/* OpenAI API 요청 데이터 */
$data = [
  "model" => "gpt-4.1-mini",  /* 빠른 요리 추천에 적합한 모델 */
  "messages" => [
    ["role" => "system", "content" => "당신은 요리 전문가입니다."],
    ["role" => "user", "content" => $prompt]
  ],
  "temperature" => 0.7  /* 다양성 확보 */
];

/* CURL 설정 및 호출 */
$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Authorization: Bearer $OPENAI_API_KEY"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);  /* GPT 응답 받기 */
curl_close($ch);

/* 결과 그대로 반환 (JS에서 JSON.parse() 하면 됨) */
echo $response;
