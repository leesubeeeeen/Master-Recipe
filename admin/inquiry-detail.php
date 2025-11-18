<?php
session_start();
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    echo "<script>
        alert('관리자 전용 페이지입니다.');
        window.location.href = '../login.html';
    </script>";
    exit;
}

// 전달받은 id
$id = $_GET["id"] ?? null;

// JSON 불러오기
$data = json_decode(file_get_contents("../data/inquiries.json"), true);

// 해당 문의 찾기
$inquiry = null;
foreach ($data as $item) {
    if ($item["id"] == $id) {
        $inquiry = $item;
        break;
    }
}

if (!$inquiry) {
    echo "문의 정보를 찾을 수 없습니다.";
    exit;
}
?>


<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>문의사항 보기</title>
  <link rel="stylesheet" href="admin.css">
  <script src="admin.js" defer></script>
</head>

<body>

<div id="header"></div>
<script>fetch("header.html").then(r=>r.text()).then(h=>header.innerHTML=h);</script>

<div class="admin-container">

  <h2>문의사항</h2>

  <div class="inquiry-view-wrapper">

    <!-- 왼쪽 사용자 정보 -->
    <div class="inquiry-left">

      <label class="label-title">이름</label>
      <input type="text" class="input-box" value="<?= $inquiry['name'] ?>" readonly>

      <label class="label-title">이메일</label>
      <input type="text" class="input-box" value="<?= $inquiry['email'] ?>" readonly>

      <label class="label-title">파일첨부(선택)</label>
        <?php if ($inquiry['file']): ?>
          <a href="../uploads/<?= $inquiry['file'] ?>" download class="input-box" style="text-decoration:none;">
            <?= $inquiry['file'] ?>
          </a>
        <?php else: ?>
          <input type="text" class="input-box" value="첨부된 파일 없음" readonly>
        <?php endif; ?>


    </div>

    <!-- 가운데 개선사항 -->
    <div class="inquiry-middle">
      <label class="label-title">개선사항</label>
      <textarea class="textarea-box" readonly><?= $inquiry['message'] ?></textarea>
    </div>

    <!-- 오른쪽 답변 -->
    <div class="inquiry-right">
      <label class="label-title">답변 작성하기</label>
      <textarea class="textarea-box" placeholder="사용자에게 보낼 답변을 작성해주세요!"></textarea>
    </div>

  </div>

  <button class="btn-submit" style="margin-top: 24px;">등록하기</button>

</div>

</body>
</html>
