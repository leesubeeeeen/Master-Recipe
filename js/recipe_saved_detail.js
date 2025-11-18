// recipe_saved_detail.js — 저장된 상세 레시피 불러오기

document.addEventListener("DOMContentLoaded", async () => {
  console.log("recipe_saved_detail.js 실행됨");

  const params = new URLSearchParams(location.search);
  let id = params.get("id");

  console.log("URL에서 받은 id =", id);

  if (!id) {
    console.warn("❌ URL에 id 없음");
    alert("잘못된 접근입니다.");
    return history.back();
  }

  id = id.trim();

  let recipes = [];

  // 서버 JSON 로드
  try {
    recipes = await fetch("/TP/data/recipes.json").then(r => r.json());
    console.log("📌 JSON 로드 완료 =>", recipes);
  } catch (err) {
    console.error("❌ JSON 로드 실패:", err);
    alert("서버 데이터 로드 실패");
    return;
  }

  // id로 매칭
  const found = recipes.find(r => r.id === id);

  console.log("1차 매칭 결과 =", found);

  if (!found) {
    alert("⚠ 저장된 레시피를 찾을 수 없습니다 (id 문제)");
    return;
  }

  // 화면 출력
  document.getElementById("recipeTitle").textContent = found.title;
  document.getElementById("recipeImg").src = found.image_url;
  document.getElementById("recipeDesc").textContent = found.summary;
  document.getElementById("recipeIngredients").textContent =
    found.ingredients.join(", ");
  document.getElementById("recipeSteps").innerHTML =
    found.steps.map(s => `<li>${s}</li>`).join("");
  document.getElementById("recipeTip").textContent = found.tip;
});
