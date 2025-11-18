// recipe_detail.js — GPT 상세 생성 + 서버 저장

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  if (!id) {
    alert("잘못된 접근입니다.");
    return history.back();
  }

  // localStorage에서 요약본 5개 가져오기
  const list = JSON.parse(localStorage.getItem("generatedRecipes")) || [];
  const base = list.find(r => r.id === id);

  if (!base) {
    alert("레시피 정보를 찾을 수 없습니다.");
    return history.back();
  }

  // 초기 렌더
  document.getElementById("recipeTitle").textContent = base.title;
  document.getElementById("recipeImg").src = base.image_url;
  document.getElementById("recipeDesc").textContent = "불러오는 중...";
  document.getElementById("recipeIngredients").textContent = "불러오는 중...";
  document.getElementById("recipeSteps").innerHTML = "<li>불러오는 중...</li>";
  document.getElementById("recipeTip").textContent = "불러오는 중...";

  // GPT 상세 요청
  let detail;
  try {
    const res = await fetch("/TP/api/ai_recipe_detail.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "title=" + encodeURIComponent(base.title)
    });

    const data = await res.json();
    detail = JSON.parse(data.choices[0].message.content);
  } catch (err) {
    console.error("GPT 상세 생성 실패:", err);
    alert("레시피 상세 정보를 불러오지 못했습니다.");
    return;
  }

  // 화면 출력
  document.getElementById("recipeDesc").textContent = detail.summary;
  document.getElementById("recipeIngredients").textContent =
    detail.ingredients.join(", ");
  document.getElementById("recipeSteps").innerHTML =
    detail.steps.map(s => `<li>${s}</li>`).join("");
  document.getElementById("recipeTip").textContent = detail.tip;

  // 좋아요용 ID 저장
  window.currentRecipeId = id;

  // 서버 저장용 완성 데이터
  const recipeObj = {
    id,
    title: base.title,
    summary: detail.summary,
    ingredients: detail.ingredients,
    steps: detail.steps,
    tip: detail.tip,
    image_url: base.image_url,
    createdAt: new Date().toISOString()
  };

  // 서버 저장
  fetch("/TP/api/save_recipe.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeObj)
  })
    .then(r => r.json())
    .then(r => console.log("서버 저장 완료:", r))
    .catch(err => console.error("저장 실패:", err));
});
