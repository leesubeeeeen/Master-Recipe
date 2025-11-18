document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const userGreeting = document.getElementById("userGreeting");
  const recentContainer = document.getElementById("recentIngredients");
  const likedContainer = document.getElementById("likedRecipes");

  if (!currentUser) {
    alert("로그인이 필요합니다.");
    window.location.href = "login.html";
    return;
  }

  userGreeting.textContent = `${currentUser.name}님의 마이페이지`;

  // 최근 재료
  const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
  ingredients.forEach(item => {
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.textContent = item;
    recentContainer.appendChild(tag);
  });

  // ❤️ 좋아요 목록 표시
  const liked = JSON.parse(localStorage.getItem("likedRecipes")) || [];

  if (liked.length > 0) {
    liked.forEach(r => {
      const card = document.createElement("div");
      card.classList.add("recipe-card-popular");

      card.innerHTML = `
        <img src="${r.image_url}" class="popular-img" />
        <h3 class="popular-name">${r.title}</h3>

        <button class="heart-btn active" data-id="${r.id}">❤</button>

        <a href="recipe_saved_detail.html?id=${encodeURIComponent(r.id)}"
          class="btn-view">레시피 보기</a>
      `;

      likedContainer.appendChild(card);
    });
  } else {
    likedContainer.innerHTML = "<p class='empty'>좋아요한 레시피가 없습니다.</p>";
  }
});


// ❤️ 좋아요 해제 처리
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("heart-btn")) return;

  const id = e.target.dataset.id;

  let liked = JSON.parse(localStorage.getItem("likedRecipes")) || [];
  liked = liked.filter(r => r.id !== id);

  localStorage.setItem("likedRecipes", JSON.stringify(liked));

  e.target.closest(".recipe-card-popular").remove();

  alert("좋아요가 해제되었습니다!");
});
