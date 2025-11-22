<!--관리자 전용 공지사항 등록 페이지-->
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
</head>

<body>
<div id="header"></div>

<script>
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(r => r.text())
    .then(html => {
      document.getElementById("header").innerHTML = html;
    })
    .catch(err => console.error("header load error:", err));
});
</script>

<div class="admin-container">

  <h2 class="notice-title">♥ 공지사항</h2>

  <div class="notice-box">
      <textarea id="noticeText" placeholder="공지사항을 입력해주세요"></textarea>

      <div class="btn-row">
          <button class="btn-submit" onclick="saveNotice()">등록하기</button>
      </div>
  </div>

</div>

<!-- admin.js 동작하기 위해 맨 마지막에 넣기-->
<script src="admin.js"></script>

</body>
</html>
