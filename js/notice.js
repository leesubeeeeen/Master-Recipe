// 공지사항 불러오기
document.addEventListener("DOMContentLoaded", () => {

  // notice.json 파일 요청
  fetch("data/notice.json")
    .then(res => res.json())
    .then(notice => {
      const box = document.getElementById("noticeBox");

      // 공지사항이 없을 때 처리
      if (!notice.message) {
        box.innerHTML = "<p>등록된 공지사항이 없습니다.</p>";
        return;
      }

      // 공지 출력
      box.innerHTML = `
        <div class="notice-item">
          <p class="notice-message">${notice.message}</p>
          <p class="notice-date">📅 ${notice.date}</p>
        </div>
      `;
    })

    // fetch 실패 시 오류 출력
    .catch(() => {
      document.getElementById("noticeBox").innerHTML =
        "<p>공지사항을 불러올 수 없습니다.</p>";
    });
});
