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
  <title>공지사항 등록</title>
  <link rel="stylesheet" href="admin.css">
  <script src="admin.js" defer></script>
</head>

<body>
<div id="header"></div>
<script>fetch("header.html").then(r=>r.text()).then(h=>header.innerHTML=h);</script>

<div class="admin-container">

  <h2 class="notice-title">♥ 공지사항</h2>

  <div class="notice-box">
      <textarea id="noticeText" placeholder="공지사항을 입력해주세요"></textarea>

      <div class="btn-row">
          <button class="btn-submit" onclick="saveNotice()">등록하기</button>
      </div>
  </div>

</div>
</body>
</html>
