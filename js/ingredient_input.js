document.addEventListener("DOMContentLoaded", () => {

  // master_recipe 페이지에 진입하면 재료 리스트 초기화
  if (location.pathname.includes("master_recipe.html")) {
    localStorage.setItem("ingredients", JSON.stringify([]));
  }

  // 주요 DOM 요소 불러오기
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

  // 저장된 재료 불러오기
  let ingredients = JSON.parse(localStorage.getItem("ingredients")) || [];
  renderMainTags(); // 메인 화면에 재료 태그 표시

  // 모달 열기/닫기
  openModalBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));

  // 모달에서 입력 완료 → 메인 태그 렌더링 & 저장
  finishBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    renderMainTags();
    saveIngredients();
  });


  // [추가] 최근 검색 재료 저장 함수
  // 사용자별로 recent_ingredients 기록
  function saveRecentIngredient(keyword) {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!currentUser) return; // 로그인 안 되어 있으면 저장 안 함

    const key = `recent_ingredients_${currentUser.id}`; // 사용자별 키 생성

    let list = JSON.parse(localStorage.getItem(key)) || [];

    // 기존 중복 제거
    list = list.filter(x => x !== keyword);

    // 맨 앞에 추가 (최신순)
    list.unshift(keyword);

    // 최대 8개까지만 유지
    if (list.length > 8) list = list.slice(0, 8);

    localStorage.setItem(key, JSON.stringify(list));
  }


  // ===============================
  // 재료 입력란에서 Enter 입력 시 처리
  // - 재료 추가
  // - recent 저장
  // ===============================
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value.trim() !== "") {
      e.preventDefault();

      const ingredient = input.value.trim();

      // 중복 없이 재료 목록에 추가
      if (!ingredients.includes(ingredient)) {
        ingredients.push(ingredient);
        renderTags();
      }

      // 최근 검색 재료 저장
      saveRecentIngredient(ingredient);

      input.value = "";       // 입력창 비우기
      saveIngredients();       // 저장
    }
  });

  // ===============================
  // 모달 태그 목록 렌더링 (재료 편집 모드)
  // ===============================
  function renderTags() {
    tagContainer.innerHTML = "";

    ingredients.forEach((item) => {
      const tag = document.createElement("div");
      tag.classList.add("tag");
      tag.innerHTML = `${item} <span class="remove">✖</span>`;

      // 태그 삭제 버튼
      tag.querySelector(".remove").addEventListener("click", () => {
        ingredients = ingredients.filter((ing) => ing !== item);
        renderTags();
        saveIngredients();
      });

      tagContainer.appendChild(tag);
    });
  }

  // ===============================
  // 메인 화면 재료 태그 렌더링
  // ===============================
  function renderMainTags() {
    ingredientBox.innerHTML = "";

    if (ingredients.length > 0) {
      ingredients.forEach((item) => {
        const mainTag = document.createElement("div");
        mainTag.classList.add("tag", "main-tag");
        mainTag.textContent = item;
        ingredientBox.appendChild(mainTag);
      });

      // 편집 버튼 표시
      ingredientBox.appendChild(editButtons);
      editButtons.classList.remove("hidden");

    } else {
      // 재료가 없으면 편집 버튼 숨김
      editButtons.classList.add("hidden");
    }
  }

  // ===============================
  // '수정' 버튼 → 모달 열기
  // ===============================
  editBtn.addEventListener("click", () => {
    renderTags();             // 기존 태그 보여주기
    modal.classList.remove("hidden");
  });

  // ===============================
  // '초기화' 버튼 → 재료 전체 삭제
  // ===============================
  clearBtn.addEventListener("click", () => {
    if (confirm("모든 재료를 삭제하시겠습니까?")) {
      ingredients = [];
      ingredientBox.innerHTML = "";
      editButtons.classList.add("hidden");
      saveIngredients();
    }
  });

  // ===============================
  // 로컬스토리지에 현재 재료 저장
  // ===============================
  function saveIngredients() {
    localStorage.setItem("ingredients", JSON.stringify(ingredients));
  }
});
