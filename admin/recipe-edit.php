<!--[추가] 관리자 전용 레시피 수정 페이지-->
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
  <title>관리자페이지 - 레시피 수정</title>
  <link rel="stylesheet" href="admin.css">
  <script src="admin.js" defer></script>
  <script src="recipe-edit.js" defer></script>
</head>

<body>
<div id="header"></div>
<script>
  fetch("header.html").then(res => res.text()).then(h => header.innerHTML = h);
</script>

<div class="admin-container">

  <div class="edit-wrapper">

      <div class="img-box">
        <img id="recipeImg" src="../assets/제육볶음.png" alt="레시피 이미지">
      </div>

      <div class="edit-info">

        <h2 class="edit-title">레시피 수정</h2>

        <label>레시피 이름</label>
        <input class="input-box" id="recipeName">

        <label>상세 설명</label>
        <textarea class="textarea-box" id="recipeDesc"></textarea>

        <label>재료</label>
        <textarea class="textarea-box" id="recipeIngredients"></textarea>

        <label>만드는 법</label>
        <textarea class="textarea-box" id="recipeSteps"></textarea>

        <button class="btn-submit" onclick="updateRecipe()">수정하기</button>

      </div>

  </div>

</div>

</body>
</html>
