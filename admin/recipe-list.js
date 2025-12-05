//[추가] 레시피 리스트 보여주는 로직 js

// 레시피가 표시될 그리드 영역
const recipeGrid = document.getElementById("recipeGrid");

// 페이지 로딩 완료 시 레시피 목록 불러오기
document.addEventListener("DOMContentLoaded", loadRecipes);

function loadRecipes() {
  // 서버에서 레시피 JSON 데이터를 가져오기
  fetch("/TP/api/load_recipes.php")
    .then(res => res.json())
    .then(list => {
      const recipeGrid = document.getElementById("recipeGrid");

      // 불러온 레시피 목록을 HTML 카드 형태로 변환하여 출력
      recipeGrid.innerHTML = list.map(item => `
        <div class="recipe-card">
          <img src="${item.image_url}" class="recipe-img">
          <div class="recipe-title">${item.title}</div>

          <!-- 수정 버튼: 클릭 시 해당 id 기반으로 수정 페이지 이동 -->
          <button class="edit-btn" onclick="edit('${item.id}')">레시피 수정</button>
        </div>
      `).join("");
    });
}

function edit(id) {
  // 해당 레시피를 수정하는 페이지로 이동
  location.href = `recipe-edit.php?id=${id}`;
}
