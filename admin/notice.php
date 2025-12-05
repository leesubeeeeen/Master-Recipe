<!-- [추가] 관리자 전용 공지사항 등록 페이지 -->
<?php
session_start();
/* 세션을 시작하고 로그인 사용자 권한 체크 */

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    /* 관리자가 아닌 경우 접근 차단 후 로그인 페이지로 이동 */
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

  <!-- 관리자 공통 스타일 -->
  <link rel="stylesheet" href="admin.css">
</head>

<body>

<!-- 상단 헤더가 들어갈 컨테이너 -->
<div id="header"></div>

<script>
/* 페이지 로드 후 header.html을 불러와 상단 헤더 영역에 삽입 */
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
  <!-- 전체 페이지 내용 래퍼 -->

  <h2 class="notice-title">♥ 공지사항</h2>
  <!-- 공지사항 제목 -->

  <div class="notice-box">
      <!-- 공지사항 입력 박스 -->

      <textarea id="noticeText" placeholder="공지사항을 입력해주세요"></textarea>
      <!-- 관리자가 작성할 공지내용 입력창 -->

      <div class="btn-row">
          <!-- 공지 저장 버튼 -->
          <button class="btn-submit" onclick="saveNotice()">등록하기</button>
      </div>
  </div>

</div>

<!-- admin.js 는 페이지 제일 아래에서 로드해야 버튼 클릭 이벤트 등이 정상 동작 -->
<script src="admin.js"></script>

</body>
</html>
