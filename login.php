<?php
session_start();

// GET 요청으로 login.php 직접 접근하면 바로 login.html로 이동
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: login.html");
    exit;
}

// 입력값 처리
$id = $_POST['id'] ?? '';
$pw = $_POST['pw'] ?? '';

if (!$id || !$pw) {
    echo "<script>alert('아이디와 비밀번호를 입력하세요.'); history.back();</script>";
    exit;
}

/* ========================================================
   1️⃣ 관리자 계정 검사
   ======================================================== */
$adminJson = file_get_contents("data/admin.json");
$admin = json_decode($adminJson, true);

if ($admin['id'] === $id && $admin['pw'] === $pw) {

    // PHP 세션 저장
    $_SESSION['role'] = 'admin';
    $_SESSION['name'] = $admin['name'];
    $_SESSION['id']   = $admin['id'];

    //  성공 시 JS로 sessionStorage에 저장
    echo "<script>
        sessionStorage.setItem('currentUser', JSON.stringify({
            id: '{$admin['id']}',
            name: '{$admin['name']}',
            role: 'admin'
        }));
        alert('관리자로 로그인되었습니다.');
        window.location.href = 'admin/recipe-list.php';
    </script>";
    exit;
}

/* ========================================================
   2️⃣ 일반 사용자 검사
   ======================================================== */
$usersPath = "data/users.json";
if (!file_exists($usersPath)) file_put_contents($usersPath, '[]');

$users = json_decode(file_get_contents($usersPath), true);

foreach ($users as $user) {
    if ($user['id'] === $id && $user['pw'] === $pw) {

        $_SESSION['role'] = 'user';
        $_SESSION['name'] = $user['name'];
        $_SESSION['id']   = $user['id'];

        echo "<script>
            sessionStorage.setItem('currentUser', JSON.stringify({
                id: '{$user['id']}',
                name: '{$user['name']}',
                role: 'user'
            }));
            alert('{$user['name']}님 환영합니다!');
            window.location.href = 'master_recipe.html';
        </script>";

        exit;
    }
}

/* ========================================================
   로그인 실패
   ======================================================== */
echo "<script>
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
    history.back();
</script>";
exit;
?>
