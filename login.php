<?php
session_start();

// 입력값 받기
$id = $_POST['id'] ?? '';
$pw = $_POST['pw'] ?? '';

if (!$id || !$pw) {
    echo "<script>alert('아이디와 비밀번호를 입력하세요.'); history.back();</script>";
    exit;
}

// ================================
// ⭐ 1) 관리자 계정 확인
// ================================

$adminJson = file_get_contents("data/admin.json");
$admin = json_decode($adminJson, true);

if ($admin['id'] === $id && $admin['pw'] === $pw) {

    // PHP 세션 저장
    $_SESSION['role'] = 'admin';
    $_SESSION['name'] = $admin['name'];
    $_SESSION['id'] = $admin['id'];

    // ⭐ JS sessionStorage에도 저장 (nav_user.js 동작 위해 필수)
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

// ================================
// ⭐ 2) 일반 사용자 계정 확인 (users.json)
// ================================

$usersJsonPath = "data/users.json";

if (!file_exists($usersJsonPath)) {
    file_put_contents($usersJsonPath, '[]'); // 파일 없으면 생성
}

$usersJson = file_get_contents($usersJsonPath);
$users = json_decode($usersJson, true);

// 이용자 목록에서 검색
foreach ($users as $user) {
    if ($user['id'] === $id && $user['pw'] === $pw) {

        // PHP 세션 저장
        $_SESSION['role'] = 'user';
        $_SESSION['name'] = $user['name'];
        $_SESSION['id'] = $user['id'];

        // ⭐ JS sessionStorage에도 저장
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

// ================================
// 로그인 실패
// ================================
echo "<script>
    alert('아이디 또는 비밀번호가 잘못되었습니다.');
    history.back();
</script>";
exit;

?>
