document.addEventListener("DOMContentLoaded", () => {
  // 로그인 정보 읽기 (sessionStorage 사용)
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  // 로그인 영역 요소 선택
  const loginArea = document.querySelector(".login-area");

  // 요소 자체가 없으면 실행 안 함
  if (!loginArea) return;

  // 로그인한 상태라면
  if (currentUser && currentUser.name) {
    loginArea.innerHTML = `
      <span class="welcome" style="cursor:pointer;">${currentUser.name}님 환영합니다!</span>
      <button class="logout-btn">로그아웃</button>
    `;

    // 환영 메시지 클릭 → 마이페이지로 이동
    loginArea.querySelector(".welcome").addEventListener("click", () => {
      window.location.href = "mypage.html";
    });

    // 로그아웃 버튼 클릭
    loginArea.querySelector(".logout-btn").addEventListener("click", () => {
      sessionStorage.removeItem("currentUser");
      alert("로그아웃되었습니다.");
      window.location.reload();
    });

  } else {
    // 로그인 안 한 상태
    loginArea.innerHTML = `
      <a href="login.html" class="link">로그인</a> /
      <a href="signup.html" class="link">회원가입</a>
    `;
  }
});
