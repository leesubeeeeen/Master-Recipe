// like_recipe.js — 좋아요 저장

document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.getElementById("likeBtn");
  let likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];

  likeBtn.addEventListener("click", () => {
    const id = window.currentRecipeId;

    if (!id) {
      alert("레시피 ID 정보가 없습니다.");
      return;
    }

    const title = document.getElementById("recipeTitle").textContent.trim();
    const img = document.getElementById("recipeImg").src;
    const summary = document.getElementById("recipeDesc").textContent;
    const ingredients = document.getElementById("recipeIngredients").textContent.split(",");
    const steps = [...document.querySelectorAll("#recipeSteps li")].map(li => li.textContent);
    const tip = document.getElementById("recipeTip").textContent;

    let exists = likedRecipes.some(r => r.id === id);

    if (!exists) {
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
      likedRecipes = likedRecipes.filter(r => r.id !== id);
      likeBtn.classList.remove("active");
      alert(`💔 '${title}' 좋아요가 해제되었습니다.`);
    }

    localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
  });
});
