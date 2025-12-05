<!--[추가] 관리자 전용 레시피 데이터(목록) 보기 페이지-->
<?php
/* 세션 시작 후 관리자 권한 체크 */
session_start();
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
  /* 관리자가 아니면 접근 차단 및 로그인 페이지로 이동 */
    echo "<script>
        alert('관리자 전용 페이지입니다.');
        window.location.href = '../login.html';
    </script>";
    exit;
}
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>관리자 - 레시피 목록</title>
  <link rel="stylesheet" href="admin.css">
  <script src="admin.js" defer></script>
  <script src="recipe-list.js" defer></script>

</head>

<body>
<div id="header"></div>
<script>
  fetch("header.html")
    .then(res => res.text())
    .then(h => header.innerHTML = h);
</script>

<div class="admin-container">
  <!-- 관리자 메인 컨테이너 -->

  <div class="top-row">
    <!-- 검색창 + 레시피 추가 버튼 영역 -->

    <input type="text" class="search-input" placeholder="Search..." id="searchInput">
    <!-- 레시피 검색 입력창 -->

    <button class="btn-add" onclick="location.href='recipe-add.php'">레시피 추가</button>
    <!-- 레시피 등록 페이지로 이동 -->
  </div>

  <!-- 레시피 목록이 출력될 영역 -->
  <div class="recipe-grid" id="recipeGrid"></div>

</div>
</body>
</html>
