document.addEventListener("DOMContentLoaded", async () => {
  const recipeGrid = document.getElementById("recipeGrid");

  // 0) 로그인 상태 확인
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const isLoggedIn = !!(currentUser && currentUser.name);

  // 1) 좋아요 저장 데이터 불러오기 (id 기반)
  let likedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];

  // 2) recipes.json 불러오기
  const res = await fetch("/TP/data/recipes.json");
  const recipes = await res.json();

  /**
   * ------------------------------------------
   * 3) 제목(title) 기준으로 묶기 + 좋아요 합산
   * ------------------------------------------
   */
  const map = {};

  // (A) recipes.json 기반으로 초기값 만들기
  recipes.forEach(r => {
    if (!map[r.title]) {
      map[r.title] = {
        title: r.title,
        img: r.image_url ?? "assets/logo.png",
        likes: 0,
        id: r.id
      };
    }
  });

  // (B) likedRecipes 기반으로 좋아요 누적
  likedRecipes.forEach(l => {
    if (!map[l.title]) {
      map[l.title] = {
        title: l.title,
        img: l.image_url,
        likes: 1,
        id: l.id
      };
    } else {
      map[l.title].likes += 1;
    }
  });

  /**
   * ------------------------------------------
   * 4) 좋아요 많은 순 상위 4개
   * ------------------------------------------
   */
  const top4 = Object.values(map)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4);

  /**
   * ------------------------------------------
   * 5) 카드 렌더링
   * ------------------------------------------
   */
  recipeGrid.innerHTML = "";

  top4.forEach(r => {
    // 로그인 상태일 때만 active 적용
    const isLiked = isLoggedIn && likedRecipes.some(l => l.title === r.title);

    const card = document.createElement("div");
    card.classList.add("recipe-card-popular");

    card.innerHTML = `
      <img src="${r.img}" alt="${r.title}" class="popular-img" />
      <h3 class="popular-name">${r.title}</h3>
      <p class="popular-likes">♥ <span class="like-count">${r.likes}</span></p>

      <button class="heart-btn ${isLiked ? "active" : ""}"
              data-title="${r.title}"
              data-id="${r.id}"
              data-img="${r.img}">
        ❤
      </button>

      <a href="recipe_saved_detail.html?id=${encodeURIComponent(r.id)}"
         class="btn-view">레시피 보기</a>
    `;

    recipeGrid.appendChild(card);
  });

  /**
   * ------------------------------------------
   * 6) 좋아요 토글 기능
   *    로그인 상태일 때만 가능!
   * ------------------------------------------
   */
  recipeGrid.addEventListener("click", (e) => {
    if (!e.target.classList.contains("heart-btn")) return;

    // 로그인 여부 체크
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    const btn = e.target;
    const title = btn.dataset.title;
    const img = btn.dataset.img;
    const id = btn.dataset.id;

    const card = btn.closest(".recipe-card-popular");
    const countEl = card.querySelector(".like-count");
    let count = parseInt(countEl.textContent);

    const exists = likedRecipes.some(r => r.id === id);

    if (exists) {
      likedRecipes = likedRecipes.filter(r => r.id !== id);
      btn.classList.remove("active");
      count -= 1;
    } else {
      likedRecipes.push({ id, title, image_url: img });
      btn.classList.add("active");
      count += 1;
    }

    countEl.textContent = count;
    localStorage.setItem("likedRecipes", JSON.stringify(likedRecipes));
  });
});
