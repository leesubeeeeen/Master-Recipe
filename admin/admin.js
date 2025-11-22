//[추가] 관리자 전용 admin 폴더에서 사용하는 admin.js. 관리자 계정이 이용한다.

// 로그아웃
function logout() {
  window.location.href = "../logout.php";
}

// ------------------------------------------------------
// 1) header.html을 먼저 로드한다
// ------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header").innerHTML = html;
      setActiveMenu();
    });
});

// ------------------------------------------------------
// 현재 메뉴 active 설정 함수
// ------------------------------------------------------
function setActiveMenu() {
  const current = window.location.pathname.split("/").pop();

  const links = document.querySelectorAll(".admin-subnav a");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
}

// ------------------------------------------------------
// 공지사항 저장 함수
// ------------------------------------------------------
function saveNotice() {
  const text = document.getElementById("noticeText").value.trim();

  if (!text) {
    alert("공지사항을 입력해주세요!");
    return;
  }

  const data = {
    message: text,
    date: new Date().toISOString().slice(0, 10)
  };

  fetch("save_notice.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(msg => {
      alert("공지사항이 등록되었습니다!");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("오류가 발생했습니다.");
    });
}
