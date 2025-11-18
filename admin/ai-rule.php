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
  <title>관리자 - AI 추천 로직 업데이트</title>
  <link rel="stylesheet" href="admin.css">
  <script src="admin.js" defer></script>
  <script src="ai-rule.js" defer></script>
</head>

<body>

<div id="header"></div>
<script>
fetch('header.html')
  .then(r=>r.text())
  .then(h=>header.innerHTML=h);
</script>

<div class="admin-container">

  <div class="rule-wrapper">

    <h2 class="rule-title">AI 추천 로직 업데이트</h2>

    <div class="rule-row">
      <label>조리시간</label>
      <input id="timeMin" class="input-box small" placeholder="시간">
      <span class="tilde">~</span>
      <input id="timeMax" class="input-box small" placeholder="시간">
    </div>

    <div class="rule-row">
      <label>설명 스타일</label>
      <input id="style" class="input-box long">
    </div>

    <div class="rule-row">
      <label>응답 포맷</label>
      <textarea id="format" class="textarea-box"></textarea>
    </div>

    <div class="rule-row">
      <label>자주 추천하고 싶은 재료</label>
      <input id="keyword" class="input-box long">
    </div>

    <button class="btn-submit">업데이트</button>

  </div>

</div>
</body>
</html>
