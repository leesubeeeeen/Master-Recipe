<!--[추가] 관리자 전용 문의사항 저장 php-->
<?php
$id = $_POST["id"];
$answer = $_POST["answer"];

$path = "../data/inquiries.json";
$data = json_decode(file_get_contents($path), true);

foreach ($data as &$item) {
    if ($item["id"] == $id) {
        $item["answer"] = $answer;
        $item["answered"] = true;
        $item["checked"] = false; // 사용자는 아직 안 읽음
        break;
    }
}

file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "답변이 저장되었습니다!";
