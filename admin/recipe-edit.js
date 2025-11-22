//[추가] 관리자 계정이 레시피 수정할 수 있게 하는 로직 js
document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(location.search).get("id");

  fetch("/TP/api/load_recipes.php")
    .then(res => res.json())
    .then(list => {
      const recipe = list.find(r => r.id === id);

      document.getElementById("recipeImg").src = recipe.image_url;
      document.getElementById("recipeName").value = recipe.title;
      document.getElementById("recipeDesc").value = recipe.summary;
      document.getElementById("recipeIngredients").value = recipe.ingredients.join(", ");
      document.getElementById("recipeSteps").value = recipe.steps.join("\n");
    });
});

function updateRecipe() {
  const id = new URLSearchParams(location.search).get("id");

  const updated = {
    id,
    title: document.getElementById("recipeName").value,
    summary: document.getElementById("recipeDesc").value,
    ingredients: document.getElementById("recipeIngredients").value.split(',').map(i => i.trim()),
    steps: document.getElementById("recipeSteps").value.split("\n"),
    image_url: document.getElementById("recipeImg").src
  };

  fetch("/TP/api/update_recipe.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
  })
  .then(res => res.json())
  .then(data => {
    alert("수정 완료!");
    location.href = "recipe-list.php";
  });
}
