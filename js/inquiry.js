document.getElementById("inquiryForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // 로그인 여부 확인
  const loginUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!loginUser) {
    alert("로그인 후 문의를 남길 수 있습니다.");
    return;
  }

  // 입력값 읽기
  const name = document.getElementById("inquiryName").value.trim();
  const email = document.getElementById("inquiryEmail").value.trim();
  const message = document.getElementById("inquiryMessage").value.trim();
  const file = document.getElementById("fileUpload").files[0];

  // 필수값 검증
  if (!name || !email || !message) {
    alert("이름, 이메일, 개선사항은 필수 입력입니다!");
    return;
  }

  // 서버로 보낼 FormData 구성
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);
  formData.append("userId", loginUser.id); // 사용자 ID 포함 (마이페이지 연결용)
  if (file) formData.append("file", file);

  // 서버로 전송
  const res = await fetch("/TP/api/inquiry_save.php", {
    method: "POST",
    body: formData
  });

  // 응답 JSON 파싱
  const result = await res.json();

  // 성공 여부 체크
  if (result.success) {
    alert("문의가 정상적으로 접수되었습니다!");

    // 입력값 초기화
    document.getElementById("inquiryForm").reset();

    // 문의 접수 후 이동
    window.location.href = "support_inquiry.html";
  } else {
    alert("오류가 발생했습니다. 다시 시도해주세요.");
  }
});
