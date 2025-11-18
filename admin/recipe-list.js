const recipeGrid = document.getElementById("recipeGrid");

document.addEventListener("DOMContentLoaded", loadRecipes);

function loadRecipes() {
  fetch("/TP/api/load_recipes.php")
    .then(res => res.json())
    .then(list => {
      const recipeGrid = document.getElementById("recipeGrid");

      recipeGrid.innerHTML = list.map(item => `
        <div class="recipe-card">
          <img src="${item.image_url}" class="recipe-img">
          <div class="recipe-title">${item.title}</div>
          <button class="edit-btn" onclick="edit('${item.id}')">레시피 수정</button>
        </div>
      `).join("");
    });
}

function edit(id) {
  location.href = `recipe-edit.php?id=${id}`;
}
