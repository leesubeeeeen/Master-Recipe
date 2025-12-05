<!--[추가] 관리자 전용 문의사항 저장 php-->
<?php

/* 문의 ID 및 답변 내용 가져오기 */
$id = $_POST["id"];
$answer = $_POST["answer"];

/* JSON 파일 경로 */
$path = "../data/inquiries.json";

/* 기존 문의 목록 불러오기 (배열로 디코딩) */
$data = json_decode(file_get_contents($path), true);

/* 해당 문의를 찾아 답변 저장 */
foreach ($data as &$item) {
    if ($item["id"] == $id) {
        /* 관리자 답변 업데이트 */
        $item["answer"] = $answer;

        /* answered: 답변완료 상태 표시 */
        $item["answered"] = true;

        /* checked: 사용자가 아직 답변을 안 읽었다는 의미 */
        $item["checked"] = false;

        break; /* 해당 문의 찾았으니 반복 종료 */
    }
}

/* 변경된 데이터를 JSON 파일에 다시 저장 */
file_put_contents(
    $path,
    json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);

/* 관리자에게 완료 메시지 전송 */
echo "답변이 저장되었습니다!";

?>
