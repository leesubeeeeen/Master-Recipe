/* ============================================================
   nav_user.js — 로그인 UI 전역 관리 (수빈용 완성본)
   ============================================================ */

document.addEventListener("DOMContentLoaded", async () => {

  const path = location.pathname.toLowerCase(); 
  // 예: "/tp/login.html"

  // 1️⃣ login / signup 페이지에서는 nav_user.js 완전히 비활성화
  if (path.includes("login.html") || path.includes("signup.html")) {
    console.log("⚠ nav_user.js skipped on login/signup page:", path);
    return;
  }

  // 2️⃣ 메인 로직 실행
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const loginArea = document.querySelector(".login-area");
  if (!loginArea) return;

  // ---------------------------
  // 🔐 로그인 상태일 때 UI
  // ---------------------------
  if (currentUser && currentUser.name) {

    loginArea.innerHTML = `
      <span class="welcome" style="cursor:pointer;">
        ${currentUser.role === "admin" ? "관리자 - " : ""}${currentUser.name}님 환영합니다!
      </span>
      <button class="logout-btn">로그아웃</button>
    `;

    // 마이페이지 이동
    loginArea.querySelector(".welcome").addEventListener("click", () => {
      window.location.href = "mypage.html";
    });

    // 🔥 로그아웃 (sessionStorage 확실히 삭제)
    loginArea.querySelector(".logout-btn").addEventListener("click", () => {
      sessionStorage.clear();
      alert("로그아웃되었습니다.");
      window.location.href = "login.html";  // reload() 금지
    });

    // ---------------------------
    // 🔥 문의 답변 도착 팝업
    // ---------------------------
    try {
      const res = await fetch("/TP/data/inquiries.json");
      const inquiries = await res.json();

      const myAnswered = inquiries.find(q =>
        q.userId === currentUser.id &&
        q.answered === true &&
        q.checked === false
      );

      if (myAnswered) {
        alert(`📬 문의에 대한 답변이 도착했어요!\n\n"${myAnswered.answer}"`);

        const form = new FormData();
        form.append("id", myAnswered.id);

        await fetch("/TP/api/inquiry_mark_checked.php", {
          method: "POST",
          body: form
        });
      }
    } catch (err) {
      console.error("문의 체크 실패:", err);
    }

  } else {
    // ---------------------------
    // 로그아웃 상태 UI
    // ---------------------------
    loginArea.innerHTML = `
      <a href="login.html" class="link">로그인</a> /
      <a href="signup.html" class="link">회원가입</a>
    `;
  }
});
