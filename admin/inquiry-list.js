// [추가] 문의사항 list 보여주고, 답변 완료된 리스트는 제거하는 로직 js
document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/inquiries.json")
    .then(res => res.json())
    .then(list => {
      const box = document.getElementById("inquiryList");
      box.innerHTML = "";

      // 최신순
      list.reverse().forEach(item => {
        if (item.answered) return; // 🔥 답변 완료된 문의는 리스트에서 제거

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

      // answered=false 인 문의만 카운트
      const newCount = list.filter(item => !item.answered).length;

      countText.textContent = `총 ${newCount}건의 신규 문의사항이 있습니다`;

      //countText.textContent = `총 ${list.length}건의 신규 문의사항이 있습니다`; [삭제] 답변 완료된 문의사항은 카운트하지 않음
    });
});
