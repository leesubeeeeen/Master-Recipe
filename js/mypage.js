document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const userGreeting = document.getElementById("userGreeting");
  const recentContainer = document.getElementById("recentIngredients"); // 기존 재료 태그(회색 박스)
  const likedContainer = document.getElementById("likedRecipes");

  const recentBox = document.getElementById("recentIngredients"); // [수정] id 수정

  // --------------------------
  // 🔐 로그인 체크
  // --------------------------
  if (!currentUser) {
    alert("로그인이 필요합니다.");
    window.location.href = "login.html";
    return;
  }

  userGreeting.textContent = `${currentUser.name}님의 마이페이지`;


  // --------------------------
  // 🟣 1) 기존 재료(회색 박스 안 태그)
  // --------------------------
  const ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
  ingredients.forEach(item => {
    const tag = document.createElement("span");
    tag.classList.add("tag");
    tag.textContent = item;
    recentContainer.appendChild(tag);
  });


  // --------------------------
  // 🟡 2) 최근 검색 재료(8개) — 좌측 박스
  // --------------------------


  if (recentBox) {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const key = `recent_ingredients_${currentUser.id}`;

    let list = JSON.parse(localStorage.getItem(key)) || [];


    recentBox.innerHTML = "";

    if (list.length === 0) {
      recentBox.innerHTML = "<p class='empty'>최근 검색한 재료가 없습니다.</p>";
    } else {
      list.forEach(item => {
        const div = document.createElement("div");
        div.className = "recent-item";
        div.innerText = item;
        recentBox.appendChild(div);
      });
    }
  }



  // --------------------------
  // ❤️ 3) 좋아요 목록
  // --------------------------
  const likeKey = `likedRecipes_${currentUser.id}`;
  const liked = JSON.parse(localStorage.getItem(likeKey)) || [];



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


// ------------------------------------------------------
// ❤️ 좋아요 해제 처리
// ------------------------------------------------------
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("heart-btn")) return;

  const id = e.target.dataset.id;
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const likeKey = `likedRecipes_${currentUser.id}`;

  let liked = JSON.parse(localStorage.getItem(likeKey)) || [];
  liked = liked.filter(r => r.id !== id);

  localStorage.setItem(likeKey, JSON.stringify(liked));

  e.target.closest(".recipe-card-popular").remove();

  alert("좋아요가 해제되었습니다!");
});
