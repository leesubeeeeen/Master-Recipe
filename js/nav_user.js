
document.addEventListener("DOMContentLoaded", async () => {

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const loginArea = document.querySelector(".login-area");
  if (!loginArea) return;

  /* 로그인 UI 처리 (네 기존 코드) */
  if (currentUser && currentUser.name) {
    loginArea.innerHTML = `
      <span class="welcome" style="cursor:pointer;">${currentUser.name}님 환영합니다!</span>
      <button class="logout-btn">로그아웃</button>
    `;

    loginArea.querySelector(".welcome").addEventListener("click", () => {
      window.location.href = "mypage.html";
    });

    loginArea.querySelector(".logout-btn").addEventListener("click", () => {
      sessionStorage.removeItem("currentUser");
      alert("로그아웃되었습니다.");
      window.location.reload();
    });

    //-------------------------------------------------------
    // 🔥 여기서부터 “답변 도착 팝업” 기능 추가
    //-------------------------------------------------------
    
    // 문의 목록 불러오기
    const res = await fetch("/TP/data/inquiries.json");
    const inquiries = await res.json();

    // 로그인한 사용자에게 온 답변 찾기
    const myAnswered = inquiries.find(q =>
      q.userId === currentUser.id &&
      q.answered === true &&
      q.checked === false
    );

    if (myAnswered) {
      // 팝업 띄우기
      alert(`📬 문의에 대한 답변이 도착했어요!\n\n"${myAnswered.answer}"`);

      // 이제 checked = true로 서버에 저장 필요
      const form = new FormData();
      form.append("id", myAnswered.id);

      await fetch("/TP/api/inquiry_mark_checked.php", {
        method: "POST",
        body: form
      });
    }

  } else {
    // 로그인 안 한 상태
    loginArea.innerHTML = `
      <a href="login.html" class="link">로그인</a> /
      <a href="signup.html" class="link">회원가입</a>
    `;
  }
});
