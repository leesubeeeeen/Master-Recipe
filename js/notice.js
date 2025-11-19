document.addEventListener("DOMContentLoaded", () => {
  fetch("data/notice.json")
    .then(res => res.json())
    .then(notice => {
      const box = document.getElementById("noticeBox");

      if (!notice.message) {
        box.innerHTML = "<p>등록된 공지사항이 없습니다.</p>";
        return;
      }

      box.innerHTML = `
        <div class="notice-item">
          <p class="notice-message">${notice.message}</p>
          <p class="notice-date">📅 ${notice.date}</p>
        </div>
      `;
    })
    .catch(() => {
      document.getElementById("noticeBox").innerHTML = 
        "<p>공지사항을 불러올 수 없습니다.</p>";
    });
});
