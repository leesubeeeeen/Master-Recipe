document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/inquiries.json")
    .then(res => res.json())
    .then(list => {
      const box = document.getElementById("inquiryList");
      box.innerHTML = "";

      // 최신순
      list.reverse().forEach(item => {
        const row = document.createElement("div");
        row.className = "inquiry-row";

        row.innerHTML = `
          <div>문의 #${item.id}</div>
          <button class="inquiry-btn"
            onclick="location.href='inquiry-detail.php?id=${item.id}'">
            문의사항 보기
          </button>
        `;
        box.appendChild(row);
      });

      // 문의 개수 업데이트
      const countText = document.getElementById("inquiryCount");
      countText.textContent = `총 ${list.length}건의 신규 문의사항이 있습니다`;
    });
});
