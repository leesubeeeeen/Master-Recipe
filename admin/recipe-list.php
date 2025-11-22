<!--[추가] 관리자 전용 레시피 데이터(목록) 보기 페이지-->
<?php
session_start();
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
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

  <div class="top-row">
    <input type="text" class="search-input" placeholder="Search..." id="searchInput">
    <button class="btn-add" onclick="location.href='recipe-add.php'">레시피 추가</button>
  </div>

  <div class="recipe-grid" id="recipeGrid"></div>

</div>
</body>
</html>
