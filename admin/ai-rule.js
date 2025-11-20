document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn-submit");

  btn.addEventListener("click", async () => {
    const timeMin = document.getElementById("timeMin").value.trim();
    const timeMax = document.getElementById("timeMax").value.trim();
    const style = document.getElementById("style").value.trim();
    const format = document.getElementById("format").value.trim();
    const keyword = document.getElementById("keyword").value.trim();

    const body = new FormData();
    body.append("timeMin", timeMin);
    body.append("timeMax", timeMax);
    body.append("style", style);
    body.append("format", format);
    body.append("keyword", keyword);

    const res = await fetch("/TP/api/save_ai_rule.php", {
      method: "POST",
      body
    });

    const json = await res.json();
    alert(json.message);
  });
});
