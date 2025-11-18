// ingredient_input.js
document.addEventListener("DOMContentLoaded", () => {
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

  // ✅ 저장된 재료 복원
  let ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
  renderMainTags();

  // 모달 열기/닫기
  openModalBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
  finishBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    renderMainTags();
    saveIngredients();
  });

  // 재료 입력
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
      e.preventDefault();
      const ingredient = input.value.trim();
      if (!ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
        renderTags();
      }
      input.value = "";
      saveIngredients();
    }
  });

  // 태그 렌더링 (모달 내부)
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

  // 메인 태그 렌더링 (화면에 표시)
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

  // 재료 수정/삭제
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

  // ✅ localStorage 저장 함수
  function saveIngredients() {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }
});
