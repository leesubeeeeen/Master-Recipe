// [추가] 문의사항 list 보여주고, 답변 완료된 리스트는 제거하는 로직 js
document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/inquiries.json")
  .then(res => res.json())
  .then(list => {

    const box = document.getElementById("inquiryList");
    box.innerHTML = "";

    // 🔥 신규 문의만 필터링(answered=false)
    const newList = list.filter(item => item.answered === false);

    // 🔥 화면 표시
    newList.forEach(item => {
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

    // 🔥 상단 개수 업데이트
    const countText = document.getElementById("inquiryCount");
    countText.textContent = `총 ${newList.length}건의 신규 문의사항이 있습니다`;
  });

});
