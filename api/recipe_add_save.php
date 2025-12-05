<?php
header("Content-Type: text/plain; charset=utf-8");
/* 응답을 일반 텍스트로 반환 (alert()에서 출력됨) */


/* 레시피 데이터 저장 파일 경로 */
$filePath = "../data/recipes.json";

/* 파일이 없으면 기본 빈 배열 생성 */
if (!file_exists($filePath)) {
    file_put_contents($filePath, "[]");
}

/* 기존 레시피 데이터 가져오기 */
$data = json_decode(file_get_contents($filePath), true);
if (!is_array($data)) $data = [];


/* 업로드된 이미지 처리 */
$imageName = "";
if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {

    $dir = "../uploads/";
    /* 이미지 저장 폴더 */

    if (!file_exists($dir)) mkdir($dir, 0777, true);
    /* uploads 폴더가 없으면 생성 */

    /* 파일명: 현재시각_원본파일명 */
    $imageName = time() . "_" . basename($_FILES['image']['name']);
    $target = $dir . $imageName;

    /* 실제 파일 저장 */
    move_uploaded_file($_FILES['image']['tmp_name'], $target);
}


/* 새로운 레시피 데이터 구성 */
$newRecipe = [
    "id" => "recipe_" . time(),                    /* 레시피 ID */
    "title" => $_POST["name"],                     /* 레시피 이름 */
    "summary" => $_POST["desc"],                   /* 요약 설명 */
    "ingredients" => explode(",", $_POST["ingredients"]),   /* 재료 → 배열 */
    "steps" => explode(",", $_POST["steps"]),               /* 조리 과정 → 배열 */
    "tip" => "",                                   /* tip은 기본값 빈 문자열 */
    "image_url" => "/TP/uploads/".$imageName,       /* 업로드된 이미지 경로 */
    "createdAt" => date("c")                        /* 생성 시간 */
];


/* 기존 배열에 새 레시피 추가 */
$data[] = $newRecipe;


/* JSON 파일로 다시 저장 */
file_put_contents(
    $filePath,
    json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);


/* 성공 메시지 반환 */
echo "레시피가 성공적으로 추가되었습니다!";
?>
