// result.js — GPT 추천 5개 요약 레시피 저장

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("recommendContainer");
  const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];

  if (ingredients.length === 0) {
    container.innerHTML = "<p>재료가 없습니다. 다시 입력해주세요.</p>";
    return;
  }

  fetch("/TP/api/ai_recipe.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "ingredients=" + encodeURIComponent(ingredients.join(","))
  })
    .then(res => res.json())
    .then(async data => {

      const list = JSON.parse(data.choices[0].message.content);
      const finalList = [];

      for (let i = 0; i < list.length; i++) {
        const r = list[i];

        // 고유 ID 생성
        r.id = "recipe_" + Date.now();

        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
          <img id="img-${i}" class="recipe-thumb" src="/TP/assets/logo.png" />
          <h3 class="recipe-name">${r.title}</h3>
          <p class="recipe-desc">${r.summary}</p>

          <a href="recipe_detail.html?id=${encodeURIComponent(r.id)}"
             class="btn-view">레시피 보기</a>
        `;

        container.appendChild(card);

        // 이미지 검색
        const imgTag = document.getElementById(`img-${i}`);

        let englishTitle = await fetch("/TP/api/ai_translate.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "text=" + encodeURIComponent(r.title)
        }).then(res => res.json());

        const queryEN = encodeURIComponent(englishTitle.text.trim());

        let img = await fetch(`/TP/api/image_search.php?query=${queryEN}`)
          .then(res => res.json())
          .catch(() => ({ url: "" }));

        r.image_url = img.url ? img.url : "/TP/assets/logo.png";
        imgTag.src = r.image_url;

        finalList.push(r);
      }

      // ★ 추천된 5개 요약 레시피 저장
      localStorage.setItem("generatedRecipes", JSON.stringify(finalList));

    })
    .catch(err => {
      console.error("AI 추천 실패:", err);
      container.innerHTML = "<p>레시피 추천에 실패했습니다.</p>";
    });
});
