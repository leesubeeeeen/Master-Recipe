// 페이지가 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {

  // FAQ 데이터를 JSON 파일에서 불러오기
  fetch("data/faq.json")
    .then(res => res.json())
    .then(list => {

      const box = document.getElementById("faqBox");

      // FAQ가 비어 있거나 없는 경우 메시지 표시
      if (!list || list.length === 0) {
        box.innerHTML =
          "<p style='padding:20px; color:#777;'>등록된 FAQ가 없습니다.</p>";
        return;
      }

      // 기존 내용 제거 후 새 FAQ 목록 렌더링 준비
      box.innerHTML = "";

      // FAQ 리스트 반복 렌더링
      list.forEach(item => {

        const div = document.createElement("div");
        div.className = "faq-item";
        div.style.marginBottom = "20px";

        // 질문/답변 HTML 구성
        div.innerHTML = `
          <p><b>Q.</b> ${item.question}</p>
          <p><b>A.</b> ${item.answer}</p>
          <hr>
        `;

        // faqBox에 추가하기
        box.appendChild(div);
      });
    })

    // 오류 발생 시 콘솔 출력 + 사용자에게 안내 표시
    .catch(err => {
      console.error(err);
      document.getElementById("faqBox").innerHTML =
        "<p style='padding:20px; color:red;'>FAQ를 불러올 수 없습니다.</p>";
    });
});
