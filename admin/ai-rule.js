//[추가] 관리자 계정에서 ai 로직 업데이트 시킬때 사용하는 js

document.addEventListener("DOMContentLoaded", () => {
  // HTML 문서가 완전히 로드된 후에 코드 실행

  const btn = document.querySelector(".btn-submit");
  // "저장하기" 역할의 버튼 요소 선택

  btn.addEventListener("click", async () => {
    // 버튼 클릭 시 AI 규칙 저장 작업 실행

    const timeMin = document.getElementById("timeMin").value.trim();
    // 최소 조리시간 입력값

    const timeMax = document.getElementById("timeMax").value.trim();
    // 최대 조리시간 입력값

    const style = document.getElementById("style").value.trim();
    // 말투 및 스타일 가이드 입력값

    const format = document.getElementById("format").value.trim();
    // GPT가 결과를 어떤 형식으로 반환할지에 대한 입력값

    const keyword = document.getElementById("keyword").value.trim();
    // GPT가 참고해야 하는 핵심 키워드

    const body = new FormData();
    // PHP로 전송할 POST 데이터 묶음(FormData 객체 생성)

    body.append("timeMin", timeMin);
    body.append("timeMax", timeMax);
    body.append("style", style);
    body.append("format", format);
    body.append("keyword", keyword);
    // 각각의 입력값을 FormData에 추가

    const res = await fetch("/TP/api/save_ai_rule.php", {
      method: "POST",
      body
    });
    // 서버의 save_ai_rule.php 로 POST 요청 보내기

    const json = await res.json();
    // 서버에서 반환한 JSON 데이터를 파싱

    alert(json.message);
    // 저장 완료 메시지를 사용자에게 표시
  });
});
