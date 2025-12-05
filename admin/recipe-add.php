<!-- [추가] 관리자 전용 레시피 추가 페이지 -->
<?php
session_start();
/* 세션을 시작하고 관리자 권한인지 확인 */

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    /* 관리자가 아닐 경우 경고 후 로그인 페이지로 이동 */
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

  <!-- 관리자 공통 CSS -->
  <link rel="stylesheet" href="admin.css">

  <!-- 관리자 공통 스크립트 -->
  <script src="admin.js" defer></script>

  <!-- 레시피 추가 기능 스크립트 -->
  <script src="recipe-add.js" defer></script>
</head>

<body>

<!-- 관리자 상단 헤더 영역 -->
<div id="header"></div>
<script>
  /* header.html 파일을 불러와 관리자 상단 메뉴 표시 */
  fetch("header.html")
    .then(res => res.text())
    .then(h => header.innerHTML = h);
</script>

<div class="admin-container">
  <!-- 레시피 추가 화면 전체 래퍼 -->

  <h2>레시피 추가</h2>
  <!-- 페이지 제목 -->

  <!-- 이미지 업로드 -->
  <input type="file" id="imageFile">
  <!-- 레시피 이름 입력 -->
  <input class="input-box" id="recipeName" placeholder="레시피 이름">
  <!-- 상세 설명 입력 -->
  <textarea class="textarea-box" id="recipeDesc" placeholder="상세 설명"></textarea>
  <!-- 재료 입력 -->
  <textarea class="textarea-box" id="recipeIngredients" placeholder="재료"></textarea>
  <!-- 조리 단계 입력 -->
  <textarea class="textarea-box" id="recipeSteps" placeholder="만드는 법"></textarea>

  <!-- 등록 버튼: 클릭 시 addRecipe() 실행 -->
  <button class="btn-submit" onclick="addRecipe()">등록하기</button>

</div>

</body>
</html>
