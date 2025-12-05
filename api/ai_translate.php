<?php
/* 
   Pexels 이미지 검색 정확도를 높이기 위해
   한국어 요리명을 영어 요리명으로 번역하는 목적의 API.
*/

require "key.php";  /* OpenAI API KEY 로드 */


/* 클라이언트에서 전달된 텍스트(요리명) */
$text = $_POST["text"] ?? "";

if (!$text) {
  /* 요리명이 전달되지 않았을 경우 에러 반환 */
  echo json_encode(["error" => "text required"]);
  exit;
}


/* 
   GPT에게 보낼 프롬프트:
   - 설명 없이 순수 영어 요리명만 반환하도록 강제
*/
$prompt = "다음 요리 이름을 이미지 검색에 적합한 영어 요리명으로만 번역해줘. 설명 금지.\n\n$text";


/* OpenAI API 요청 데이터 */
$data = [
  "model" => "gpt-4.1-mini",  /* 번역/단문 작업에 빠르고 경제적인 모델 */
  "messages" => [
    ["role" => "user", "content" => $prompt]
  ]
];


/* CURL로 OpenAI 번역 실행 */
$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Content-Type: application/json",
  "Authorization: " . "Bearer $OPENAI_API_KEY"
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$res = curl_exec($ch);
/* GPT 응답 원본 JSON */

$decoded = json_decode($res, true);
/* 배열로 변환하여 번역된 텍스트만 추출 */


/* 번역된 영어 요리명만 반환 */
echo json_encode([
  "text" => $decoded["choices"][0]["message"]["content"] ?? ""
]);
