<?php
/* 사용자가 관리자가 보낸 문의사항 답변을 확인했을 때 checked 상태를 true로 변경하는 API */

$id = $_POST["id"];
/* 읽음 처리할 문의 ID */

/* 문의 데이터가 저장된 JSON 파일 경로 */
$path = "../data/inquiries.json";

/* 기존 문의 전체 목록 불러오기 */
$data = json_decode(file_get_contents($path), true);


/* 전달받은 id와 일치하는 문의를 찾아 checked = true 로 변경 */
foreach ($data as &$item) {
    if ($item["id"] == $id) {
        $item["checked"] = true;   /* 사용자가 확인 완료 상태 */
        break;
    }
}


/* 변경된 내용을 다시 JSON 파일에 저장 */
file_put_contents(
    $path, 
    json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);


/* 성공 응답 반환 */
echo "ok";
