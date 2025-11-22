<!--관리자 전용 문의사항 보기 페이지-->

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
  <title>관리자페이지 - 고객지원(문의하기)</title>
  <link rel="stylesheet" href="admin.css">
  <script src="admin.js" defer></script>
  <script src="inquiry-list.js" defer></script>
</head>

<body>

<div id="header"></div>
<script>
fetch("header.html")
  .then(r => r.text())
  .then(h => header.innerHTML = h);
</script>

<div class="admin-container">

  <div class="page-title-area">
    <h2 class="page-title">❤ 문의하기</h2>
    <button class="btn-back" onclick="location.href='index.php'">돌아가기</button>
  </div>

  <p id="inquiryCount" class="inquiry-count-text">총 0건의 신규 문의사항이 있습니다</p>

  <!-- 문의 리스트 영역 -->
  <div id="inquiryList" class="inquiry-list-wrapper">
    <!-- inquiry-list.js가 이 안을 자동으로 채움 -->
  </div>

</div>

</body>
</html>
