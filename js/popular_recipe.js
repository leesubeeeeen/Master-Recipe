// popular_recipe.js — (최종 완성본)

document.addEventListener("DOMContentLoaded", async () => {
  const recipeGrid = document.getElementById("recipeGrid");

  // 로그인 정보
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const isLoggedIn = !!currentUser;
  const myKey = isLoggedIn ? `likedRecipes_${currentUser.id}` : null;


  /* ============================================================
     ⭐ 모든 계정의 좋아요 합산 — 인기레시피 좋아요 수 계산용
     ============================================================ */
  let allLikes = [];

  Object.keys(localStorage)
    .filter(k => k.startsWith("likedRecipes_")) // 전 계정 대상
    .forEach(k => {
      const arr = JSON.parse(localStorage.getItem(k)) || [];
      allLikes = allLikes.concat(arr);
    });


  /* ============================================================
     ⭐ 현재 로그인 계정의 좋아요 목록 — active 표시용
     ============================================================ */
  let myLikes = JSON.parse(localStorage.getItem(myKey)) || [];


  /* ============================================================
     1) recipes.json 불러오기
     ============================================================ */
  const res = await fetch("/TP/data/recipes.json");
  const recipes = await res.json();


  /* ============================================================
     2) title 기준 그룹핑 (ID가 다 달라도 같은 제목이면 한 카드)
     ============================================================ */
  const map = {};

  recipes.forEach(r => {
    if (!map[r.title]) {
      map[r.title] = {
        title: r.title,
        img: r.image_url ?? "assets/logo.png",
        id: r.id,     // 가장 최신 id 사용
        likes: 0
      };
    }
  });


  /* ============================================================
     3) 전체 계정 좋아요 합산 (전 계정 데이터 기반)
     ============================================================ */
  allLikes.forEach(l => {
    if (!map[l.title]) {
      map[l.title] = {
        title: l.title,
        img: l.image_url,
        likes: 1,
        id: l.id
      };
    } else {
      map[l.title].likes++;
    }
  });


  /* ============================================================
     4) 좋아요 순으로 상위 4개 선택
     ============================================================ */
  const top4 = Object.values(map)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 4);


  /* ============================================================
     5) 카드 렌더링
     ============================================================ */
  recipeGrid.innerHTML = "";

  top4.forEach(r => {
    const isMyLike = isLoggedIn && myLikes.some(l => l.title === r.title);

    const card = document.createElement("div");
    card.classList.add("recipe-card-popular");

    card.innerHTML = `
      <img src="${r.img}" alt="${r.title}" class="popular-img" />
      <h3 class="popular-name">${r.title}</h3>
      <p class="popular-likes">♥ <span class="like-count">${r.likes}</span></p>

      <button class="heart-btn ${isMyLike ? "active" : ""}"
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



  /* ============================================================
     6) 좋아요 토글 (각 계정별 저장 + 전체 좋아요 실시간 반영)
     ============================================================ */
  recipeGrid.addEventListener("click", (e) => {
    if (!e.target.classList.contains("heart-btn")) return;

    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    const btn = e.target;
    const id = btn.dataset.id;
    const title = btn.dataset.title;
    const img = btn.dataset.img;

    const card = btn.closest(".recipe-card-popular");
    const countEl = card.querySelector(".like-count");
    let count = parseInt(countEl.textContent);


    /* -------------------------------
       ① 내 계정 좋아요 업데이트
       ------------------------------- */
    let exists = myLikes.some(r => r.title === title);

    if (exists) {
      myLikes = myLikes.filter(r => r.title !== title);
      btn.classList.remove("active");
      count--;
      alert(`💔 '${title}' 좋아요 해제됨`);
    } else {
      myLikes.push({ id, title, image_url: img });
      btn.classList.add("active");
      count++;
      alert(`❤️ '${title}' 좋아요 추가됨`);
    }

    // 내 계정에 저장
    localStorage.setItem(myKey, JSON.stringify(myLikes));


    /* -------------------------------
       ② 전체 좋아요도 갱신 (카운트 표현용)
       ------------------------------- */
    countEl.textContent = count;
  });
});
