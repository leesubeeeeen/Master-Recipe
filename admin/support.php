<!--관리자 전용 고객지원 페이지-->
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
  <title>관리자페이지 - 고객지원</title>
  <link rel="stylesheet" href="admin.css">
  <script src="admin.js" defer></script>
</head>

<body>
<div id="header"></div>
<script>
fetch("header.html")
  .then(r => r.text())
  .then(h => header.innerHTML = h);
</script>

<div class="support-container">

  <h2 class="support-title">고객지원</h2>

  <div class="support-list">

      <a href="notice.php" class="support-item">
        <span class="heart">♥</span> 공지사항
      </a>

      <a href="faq.php" class="support-item">
        <span class="heart">♥</span> FAQ
      </a>

      <a href="inquiry.php" class="support-item">
        <span class="heart">♥</span> 문의하기
      </a>

  </div>

</div>

</body>
</html>
