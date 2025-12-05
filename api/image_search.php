<?php
header("Content-Type: application/json; charset=utf-8");
/* 응답을 JSON 형태로 반환하도록 헤더 설정 */


/* Pexels API 키 */
$apiKey = "PViFbTT7QZ9lS2SWPFQPYqm5UzWU99JunZTM2R0XAVPzP72o0EAGnMYl";


/* 클라이언트에서 전달받은 검색어 */
$query = $_GET["query"] ?? "";

if (!$query) {
  /* 검색어가 없으면 빈 URL 반환 */
  echo json_encode(["url" => ""]);
  exit;
}


/* Pexels 이미지 검색 API URL 생성 */
$url = "https://api.pexels.com/v1/search?query=" . urlencode($query) . "&per_page=1";


/* 요청 헤더 (API 인증 포함) */
$headers = [
    "Authorization: $apiKey"
];


/* CURL 초기화 및 옵션 설정 */
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

/* localhost 개발 환경에서 SSL 경고를 피하기 위한 옵션 */
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);


/* API 요청 실행 */
$response = curl_exec($ch);
curl_close($ch);

/* JSON → 배열로 디코딩 */
$data = json_decode($response, true);


/* 검색 결과 중 첫 번째 이미지의 medium URL 반환 */
if (!empty($data["photos"][0]["src"]["medium"])) {
    echo json_encode(["url" => $data["photos"][0]["src"]["medium"]]);
} else {
    /* 검색 실패 시 빈 URL 반환 */
    echo json_encode(["url" => ""]);
}
