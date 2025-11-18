<?php
header("Content-Type: application/json; charset=utf-8");

$apiKey = "PViFbTT7QZ9lS2SWPFQPYqm5UzWU99JunZTM2R0XAVPzP72o0EAGnMYl";

$query = $_GET["query"] ?? "";
if (!$query) {
  echo json_encode(["url" => ""]);
  exit;
}

$url = "https://api.pexels.com/v1/search?query=" . urlencode($query) . "&per_page=1";

$headers = [
    "Authorization: $apiKey"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);

if (!empty($data["photos"][0]["src"]["medium"])) {
    echo json_encode(["url" => $data["photos"][0]["src"]["medium"]]);
} else {
    echo json_encode(["url" => ""]);
}
