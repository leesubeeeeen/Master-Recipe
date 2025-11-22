<!--관리자 전용 레시피 추가 페이지-->
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
  <title>관리자 - 레시피 추가</title>
  <link rel="stylesheet" href="admin.css">
  <script src="admin.js" defer></script>
  <script src="recipe-add.js" defer></script>
</head>

<body>
<div id="header"></div>
<script>fetch("header.html").then(res=>res.text()).then(h=>header.innerHTML=h);</script>

<div class="admin-container">

  <h2>레시피 추가</h2>

  <input type="file" id="imageFile">
  <input class="input-box" id="recipeName" placeholder="레시피 이름">
  <textarea class="textarea-box" id="recipeDesc" placeholder="상세 설명"></textarea>
  <textarea class="textarea-box" id="recipeIngredients" placeholder="재료"></textarea>
  <textarea class="textarea-box" id="recipeSteps" placeholder="만드는 법"></textarea>

  <button class="btn-submit" onclick="addRecipe()">등록하기</button>

</div>
</body>
</html>
