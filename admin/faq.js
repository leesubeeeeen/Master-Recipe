document.addEventListener("DOMContentLoaded", () => {
  // 관리자 페이지인지 확인
  const adminBox = document.getElementById("adminFaqBox");
  if (adminBox) {
    loadAdminFAQ();
  }
});

// 📌 관리자 화면 FAQ 불러오기
function loadAdminFAQ() {
  fetch("../data/faq.json")  // 관리자 기준 경로
    .then(res => res.json())
    .then(list => {
      const box = document.getElementById("adminFaqBox");

      if (!list || list.length === 0) {
        box.innerHTML = "<p>등록된 FAQ가 없습니다.</p>";
        return;
      }

      box.innerHTML = "";

      list.forEach(item => {
        const div = document.createElement("div");
        div.className = "faq-item";

        div.innerHTML = `
          <p><b>Q.</b> ${item.question}</p>
          <p><b>A.</b> ${item.answer}</p>
          <hr>
        `;

        box.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      document.getElementById("adminFaqBox").innerHTML =
        "<p style='color:red;'>FAQ를 불러올 수 없습니다.</p>";
    });
}

// 📌 FAQ 등록 기능
function addFAQ() {
  const q = prompt("FAQ 질문을 입력하세요:");
  if (!q) return;

  const a = prompt("FAQ 답변을 입력하세요:");
  if (!a) return;

  const data = { question: q, answer: a };

  fetch("save_faq.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.text())
    .then(msg => {
      alert("FAQ가 등록되었습니다!");
      loadAdminFAQ(); // 등록 후 목록 다시 로드
    })
    .catch(err => {
      console.error(err);
      alert("FAQ 저장 중 오류 발생");
    });
}
