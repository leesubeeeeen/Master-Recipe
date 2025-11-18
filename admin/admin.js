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

      // ------------------------------------------------------
      // 2) header가 로드된 이후에 active 적용 실행!!
      // ------------------------------------------------------
      setActiveMenu();
    });
});

// ------------------------------------------------------
// 현재 메뉴 active 설정 함수
// ------------------------------------------------------
function setActiveMenu() {
  const current = window.location.pathname.split("/").pop(); // ex) recipe-list.php

  const links = document.querySelectorAll(".admin-subnav a");

  links.forEach(link => {
    let href = link.getAttribute("href");

    if (href === current) {
      link.classList.add("active");
    }
  });
}
