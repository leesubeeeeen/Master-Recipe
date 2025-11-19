document.addEventListener("DOMContentLoaded", () => {
  fetch("data/faq.json")
    .then(res => res.json())
    .then(list => {
      const box = document.getElementById("faqBox");

      if (!list || list.length === 0) {
        box.innerHTML =
          "<p style='padding:20px; color:#777;'>등록된 FAQ가 없습니다.</p>";
        return;
      }

      box.innerHTML = "";

      list.forEach(item => {
        const div = document.createElement("div");
        div.className = "faq-item";
        div.style.marginBottom = "20px";

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
      document.getElementById("faqBox").innerHTML =
        "<p style='padding:20px; color:red;'>FAQ를 불러올 수 없습니다.</p>";
    });
});
