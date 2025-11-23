document.addEventListener("DOMContentLoaded", () => {
  if (location.pathname.includes("master_recipe.html")) {
    localStorage.setItem("ingredients", JSON.stringify([]));
  }
  const openModalBtn = document.getElementById("openModal");
  const closeModalBtn = document.getElementById("closeModal");
  const modal = document.getElementById("ingredientModal");
  const finishBtn = document.getElementById("finishInput");
  const input = document.getElementById("ingredientInput");
  const tagContainer = document.getElementById("tagContainer");
  const ingredientBox = document.getElementById("ingredientBox");
  const editButtons = document.getElementById("editButtons");
  const editBtn = document.getElementById("editBtn");
  const clearBtn = document.getElementById("clearBtn");

  let ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
  renderMainTags();

  openModalBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));

  finishBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    renderMainTags();
    saveIngredients();
  });

  // ===============================
  // [추가] 최근 검색 재료 저장 함수. 이걸로 최근 검색어 반영 가능
  // ===============================
  function saveRecentIngredient(keyword) {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) return;

    const key = `recent_ingredients_${currentUser.id}`;

    let list = JSON.parse(localStorage.getItem(key)) || [];

    list = list.filter(x => x !== keyword);
    list.unshift(keyword);

    if (list.length > 8) list = list.slice(0, 8);

    localStorage.setItem(key, JSON.stringify(list));
  }


  // ===============================
  // 🔥 Enter로 재료 입력 → recent에도 저장!
  // ===============================
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
      e.preventDefault();
      const ingredient = input.value.trim();

      // 재료 입력 리스트 저장
      if (!ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
        renderTags();
      }

      // 🔥 이 순간 recent_ingredients에 저장
      saveRecentIngredient(ingredient);

      input.value = "";
      saveIngredients();
    }
  });

  function renderTags() {
    tagContainer.innerHTML = "";
    ingredients.forEach((item) => {
      const tag = document.createElement("div");
      tag.classList.add("tag");
      tag.innerHTML = `${item} <span class="remove">✖</span>`;
      tag.querySelector(".remove").addEventListener("click", () => {
        ingredients = ingredients.filter((ing) => ing !== item);
        renderTags();
        saveIngredients();
      });
      tagContainer.appendChild(tag);
    });
  }

  function renderMainTags() {
    ingredientBox.innerHTML = "";
    if (ingredients.length > 0) {
      ingredients.forEach((item) => {
        const mainTag = document.createElement("div");
        mainTag.classList.add("tag", "main-tag");
        mainTag.textContent = item;
        ingredientBox.appendChild(mainTag);
      });
      ingredientBox.appendChild(editButtons);
      editButtons.classList.remove("hidden");
    } else {
      editButtons.classList.add("hidden");
    }
  }

  editBtn.addEventListener("click", () => {
    renderTags();
    modal.classList.remove("hidden");
  });

  clearBtn.addEventListener("click", () => {
    if (confirm("모든 재료를 삭제하시겠습니까?")) {
      ingredients = [];
      ingredientBox.innerHTML = "";
      editButtons.classList.add("hidden");
      saveIngredients();
    }
  });

  function saveIngredients() {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }
});
