// like_recipe.js — 좋아요 저장

document.addEventListener("DOMContentLoaded", () => {

  // 로그인 확인
  const likeBtn = document.getElementById("likeBtn");
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) return;

  // 계정별로 좋아요 저장하도록 key 생성
  const likeKey = `likedRecipes_${currentUser.id}`;
  let likedRecipes = JSON.parse(localStorage.getItem(likeKey)) || [];

  // 좋아요 버튼 클릭 시
  likeBtn.addEventListener("click", () => {
    const id = window.currentRecipeId; // detail 페이지에서 세팅한 현재 레시피 ID

    if (!id) {
      alert("레시피 ID 정보가 없습니다.");
      return;
    }

    // 레시피 상세 정보 읽기
    const title = document.getElementById("recipeTitle").textContent.trim();
    const img = document.getElementById("recipeImg").src;
    const summary = document.getElementById("recipeDesc").textContent || "";
    const ingredients = document.getElementById("recipeIngredients").textContent.split(",");
    const steps = [...document.querySelectorAll("#recipeSteps li")].map(li => li.textContent);
    const tip = document.getElementById("recipeTip")?.textContent || "";

    // 이미 좋아요 목록에 있는지 확인
    let exists = likedRecipes.some(r => r.id === id);

    if (!exists) {
      // → 좋아요 추가
      likedRecipes.push({
        id,
        title,
        summary,
        image_url: img,
        ingredients,
        steps,
        tip
      });

      likeBtn.classList.add("active");
      alert(`❤️ '${title}'이(가) 좋아요 목록에 추가되었습니다!`);

    } else {
      // → 좋아요 해제
      likedRecipes = likedRecipes.filter(r => r.id !== id);
      likeBtn.classList.remove("active");
      alert(`💔 '${title}' 좋아요가 해제되었습니다.`);
    }

    // 계정별 LocalStorage에 저장
    localStorage.setItem(likeKey, JSON.stringify(likedRecipes));
  });
});
