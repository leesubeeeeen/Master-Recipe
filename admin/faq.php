<!--[추가] 관리자 전용  faq 작성 페이지-->

<?php
session_start();
/* 세션을 시작하여 로그인 상태와 권한을 확인 */

/* 관리자 권한 검증 */
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    echo "<script>
        alert('관리자 전용 페이지입니다.');
        window.location.href = '../login.html';
    </script>";
    exit; 
    /* 관리자 아닐 경우 접근 차단 후 로그인 페이지로 이동 */
}
?>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>관리자 - FAQ</title>

  <!-- 관리자 전체 스타일 -->
  <link rel="stylesheet" href="admin.css">

  <!-- 관리자 공통 스크립트 -->
  <script src="admin.js" defer></script>

  <!-- FAQ 전용 JS (등록/조회 로직 포함) -->
  <script src="faq.js" defer></script>
</head>

<body>

<!-- 관리자 상단 헤더 로드 (네이게이션 포함) -->
<div id="header"></div>
<script>
  fetch("header.html").then(r=>r.text()).then(h=>header.innerHTML = h);
  /* header.html 파일을 불러와 상단 공통 헤더 삽입 */
</script>

<div class="admin-container faq-wrapper">
  <!-- FAQ 페이지 전체 레이아웃 컨테이너 -->

  <!-- 제목 + 등록 버튼 영역 -->
  <div class="faq-topbar">
    <div class="faq-title">♥ FAQ</div>
    <!-- FAQ 추가 버튼: 클릭 시 addFAQ() 실행 -->
    <button class="btn-add" onclick="addFAQ()">등록하기</button>
  </div>

  <!-- 🔥 FAQ 목록이 들어갈 영역 -->
  <div class="faq-box" id="adminFaqBox">
    <p style="color:#777;">FAQ를 불러오는 중입니다...</p>
    <!-- JS에서 자동으로 FAQ 목록 렌더링 -->
  </div>

</div>

</body>
</html>
