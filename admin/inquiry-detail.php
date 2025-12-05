<!-- [추가] 관리자 전용 문의사항 상세보기 페이지-->
<?php
session_start();
/* 로그인 세션을 시작하고 관리자 권한인지 확인 */

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    /* 관리자가 아닐 경우 접근 차단 및 로그인 페이지로 이동 */
    echo "<script>
        alert('관리자 전용 페이지입니다.');
        window.location.href = '../login.html';
    </script>";
    exit;
}

/* 전달받은 문의 ID 확인 */
$id = $_GET["id"] ?? null;

/* 문의 전체 데이터 불러오기 */
$data = json_decode(file_get_contents("../data/inquiries.json"), true);

/* 해당 ID의 문의 데이터를 탐색 */
$inquiry = null;
foreach ($data as $item) {
    if ($item["id"] == $id) {
        $inquiry = $item;
        break;
    }
}

/* 문의 데이터가 존재하지 않을 경우 */
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

  <!-- 관리자 전용 CSS -->
  <link rel="stylesheet" href="admin.css">

  <!-- 상단 메뉴 및 공통 기능 JS -->
  <script src="admin.js" defer></script>
</head>

<body>

<!-- 관리자 헤더 영역 (fetch로 로딩) -->
<div id="header"></div>
<script>
  /* header.html 파일을 불러와 상단 공통 헤더 삽입 */
  fetch("header.html").then(r=>r.text()).then(h=>header.innerHTML=h);
</script>

<div class="admin-container">
  <!-- 본문 전체 컨테이너 -->

  <h2>문의사항</h2>

  <div class="inquiry-view-wrapper">
    <!-- 문의 상세 내용 레이아웃 (3열 구조: 왼/가운데/오른쪽) -->


    <!-- 왼쪽 사용자 정보 -->
    <div class="inquiry-left">
      <label class="label-title">이름</label>
      <input type="text" class="input-box" value="<?= $inquiry['name'] ?>" readonly>
      <!-- 문의자의 이름 표시 -->

      <label class="label-title">이메일</label>
      <input type="text" class="input-box" value="<?= $inquiry['email'] ?>" readonly>
      <!-- 문의자의 이메일 표시 -->

      <label class="label-title">파일첨부(선택)</label>
      <?php if ($inquiry['file']): ?>
          <?php $encoded = rawurlencode($inquiry['file']); ?>
          <!-- 파일 이름 URL 인코딩 처리 -->

          <a href="/TP/uploads/<?= $encoded ?>" download class="input-box" style="text-decoration:none;">
            <?= $inquiry['file'] ?>
          </a>
          <!-- 첨부파일이 있을 경우 다운로드 가능하도록 표시 -->

      <?php else: ?>
          <input type="text" class="input-box" value="첨부된 파일 없음" readonly>
          <!-- 첨부파일이 없는 경우 기본 문구 표시 -->
      <?php endif; ?>

    </div>


    <!-- 가운데: 개선사항(사용자가 보낸 메시지) -->
    <div class="inquiry-middle">
      <label class="label-title">개선사항</label>
      <textarea class="textarea-box" readonly><?= $inquiry['message'] ?></textarea>
      <!-- 사용자가 작성한 문의 메시지 -->
    </div>


    <!-- 오른쪽: 관리자 답변 작성 영역 -->
    <div class="inquiry-right">
      <label class="label-title">답변 작성하기</label>
      <textarea class="textarea-box" placeholder="사용자에게 보낼 답변을 작성해주세요!"></textarea>
      <!-- 관리자가 사용자에게 보낼 답변 작성 -->
    </div>

  </div>

  <!-- 답변 저장 버튼 -->
  <button class="btn-submit" id="saveAnswerBtn" style="margin-top: 24px;">등록하기</button>

  <script>
  /* 답변 저장 버튼 클릭 이벤트 */
  document.getElementById("saveAnswerBtn").addEventListener("click", async () => {

    const answer = document.querySelector(".inquiry-right textarea").value.trim();
    /* 답변 입력값 가져오기 */

    if (!answer) {
      alert("답변을 입력해주세요!");
      return;
    }

    /* 서버로 보낼 데이터 생성 */
    const form = new FormData();
    form.append("id", "<?= $inquiry['id'] ?>");
    form.append("answer", answer);

    /* 답변 저장 요청 */
    const res = await fetch("inquiry_answer_save.php", {
      method: "POST",
      body: form
    });

    /* 서버 응답 처리 */
    const text = await res.text();
    alert(text);

    /* 저장 후 문의 목록 페이지로 이동 */
    location.href = "inquiry.php";
  });
  </script>

</div>

</body>
</html>
