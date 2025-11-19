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

  <!-- 🔥 FAQ 목록이 들어갈 영역 -->
  <div class="faq-box" id="adminFaqBox">
    <p style="color:#777;">FAQ를 불러오는 중입니다...</p>
  </div>

</div>

</body>
</html>
