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
  <title>관리자 - FAQ</title>
  <link rel="stylesheet" href="admin.css">
  <script src="admin.js" defer></script>
  <script src="faq.js" defer></script>
</head>

<body>

<div id="header"></div>
<script>
  fetch("header.html").then(r=>r.text()).then(h=>header.innerHTML = h);
</script>

<div class="admin-container faq-wrapper">

  <!-- 제목 + 등록하기 버튼 -->
  <div class="faq-topbar">
    <div class="faq-title">♥ FAQ</div>
    <button class="btn-add" onclick="addFAQ()">등록하기</button>
  </div>

  <!-- FAQ 내용 박스 -->
  <div class="faq-box">

    <div class="faq-section">
      <div class="faq-section-title">[회원 관련]</div>

      <p><b>Q.</b> 회원가입은 꼭 해야 하나요?<br>
         <b>A.</b> 비회원도 기본 레시피 검색은 가능하지만, AI 추천 기능과 저장 기능은 로그인 후 이용 가능합니다.</p>

      <p><b>Q.</b> 비회원도 사용 가능한 기능이 있나요?<br>
         <b>A.</b> 레시피 검색은 가능합니다.</p>
    </div>

    <div class="faq-section">
      <div class="faq-section-title">[AI 추천 관련]</div>

      <p><b>Q.</b> AI 추천은 어떤 기준으로 레시피를 보여주나요?<br>
         <b>A.</b> 사용자가 입력한 재료와 이전 선호 기록을 기반으로 추천합니다.</p>

      <p><b>Q.</b> 추천 결과가 마음에 들지 않아요. 다시 추천 받을 수 있나요?<br>
         <b>A.</b> 가능합니다.</p>
    </div>

  </div>

</div>

</body>
</html>

