//[추가] 관리자 전용 admin폴더에서 사용하는 faq 등록 로직 js파일

document.addEventListener("DOMContentLoaded", () => {
  // 페이지 로드 후 실행

  const adminBox = document.getElementById("adminFaqBox");
  // 관리자 페이지에서만 FAQ 로딩하도록 체크

  if (adminBox) {
    loadAdminFAQ(); 
    // FAQ 목록 불러오기 실행
  }
});

// 📌 관리자 화면 FAQ 불러오기
function loadAdminFAQ() {
  fetch("../data/faq.json")  // 관리자 기준 경로
    .then(res => res.json())
    .then(list => {
      const box = document.getElementById("adminFaqBox");
      // FAQ 목록이 들어갈 박스 요소

      if (!list || list.length === 0) {
        box.innerHTML = "<p>등록된 FAQ가 없습니다.</p>";
        // FAQ가 없을 때 기본 문구 표시
        return;
      }

      box.innerHTML = "";
      // 기존 FAQ 초기화 후 다시 렌더링

      list.forEach(item => {
        const div = document.createElement("div");
        div.className = "faq-item";
        // FAQ 한 개의 묶음 div

        div.innerHTML = `
          <p><b>Q.</b> ${item.question}</p>
          <p><b>A.</b> ${item.answer}</p>
          <hr>
        `;
        // 관리자 UI에서 질문/답변 표시

        box.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      // FAQ 파일을 불러오지 못했을 때 오류 출력

      document.getElementById("adminFaqBox").innerHTML =
        "<p style='color:red;'>FAQ를 불러올 수 없습니다.</p>";
      // 사용자에게 오류 메시지 표시
    });
}

// 📌 FAQ 등록 기능
function addFAQ() {
  const q = prompt("FAQ 질문을 입력하세요:");
  // 새 FAQ 질문 입력받기
  if (!q) return;

  const a = prompt("FAQ 답변을 입력하세요:");
  // 새 FAQ 답변 입력받기
  if (!a) return;

  const data = { question: q, answer: a };
  // 서버로 전달할 FAQ 데이터 구조

  fetch("save_faq.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
    // JSON 형식으로 새 FAQ 전달
  })
    .then(res => res.text())
    .then(msg => {
      alert("FAQ가 등록되었습니다!");
      // 저장 완료 안내 메시지

      loadAdminFAQ(); 
      // FAQ 다시 불러와 목록 갱신
    })
    .catch(err => {
      console.error(err);
      alert("FAQ 저장 중 오류 발생");
      // FAQ 저장 실패 시 안내
    });
}
