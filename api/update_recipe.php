<?php
header("Content-Type: application/json; charset=utf-8");
/* JSON 형태로 응답하기 위한 헤더 설정 */


/* JS에서 보낸 수정 데이터(JSON)를 읽어옴 */
$input = json_decode(file_get_contents("php://input"), true);

$id = $input["id"];
/* 수정하려는 레시피 ID */


/* 레시피가 저장된 JSON 파일 경로 */
$file = "../data/recipes.json";

/* 기존 레시피 목록 로드 */
$data = json_decode(file_get_contents($file), true);


/* 
   전달받은 id가 recipes.json 안에서 몇 번째 인덱스인지 찾기
   array_column($data, "id") → 모든 레시피의 id 목록 배열
   array_search() → 일치하는 위치 반환 (못 찾으면 false)
*/
$index = array_search($id, array_column($data, "id"));

if ($index === false) {
    /* 레시피를 못 찾은 경우 */
    echo json_encode(["success" => false, "message" => "Recipe not found"]);
    exit;
}


/* 
   기존 레시피 데이터를 새로운 값으로 덮어쓰기
   $input 자체가 완성된 레시피 JSON이므로 그대로 저장
*/
$data[$index] = $input;


/* 수정된 전체 레시피 목록을 파일에 다시 저장 */
file_put_contents(
    $file,
    json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);


/* 성공 응답 반환 */
echo json_encode(["success" => true]);
?>
