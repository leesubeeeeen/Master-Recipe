<?php
// 입력값 받아오기
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$id = trim($_POST['id'] ?? '');
$pw = trim($_POST['pw'] ?? '');
$pw2 = trim($_POST['pw2'] ?? '');

// ==========================
// 입력 검증
// ==========================
if (!$name || !$email || !$id || !$pw || !$pw2) {
    echo "<script>alert('모든 항목을 입력해주세요.'); history.back();</script>";
    exit;
}

if ($pw !== $pw2) {
    echo "<script>alert('비밀번호가 일치하지 않습니다.'); history.back();</script>";
    exit;
}

// ==========================
// users.json 읽기
// ==========================
$path = "data/users.json";

if (!file_exists($path)) {
    file_put_contents($path, "[]");   // 파일 없으면 생성
}

$json = file_get_contents($path);
$users = json_decode($json, true);

// ==========================
// 아이디/이메일 중복 체크
// ==========================
foreach ($users as $u) {
    if ($u['id'] === $id) {
        echo "<script>alert('이미 존재하는 아이디입니다.'); history.back();</script>";
        exit;
    }
    if ($u['email'] === $email) {
        echo "<script>alert('이미 가입된 이메일입니다.'); history.back();</script>";
        exit;
    }
}

// ==========================
// 새 회원 추가
// ==========================
$newUser = [
    "id" => $id,
    "pw" => $pw,
    "name" => $name,
    "email" => $email,
    "phone" => "",
    "liked" => [],
    "recentSearch" => [],
    "createdAt" => date("Y-m-d H:i")
];

$users[] = $newUser;

// ==========================
// 파일에 다시 저장
// ==========================
file_put_contents($path, json_encode($users, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

echo "<script>
    alert('{$name}님, 회원가입이 완료되었습니다!');
    window.location.href = 'login.html';
</script>";

?>
