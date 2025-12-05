//[추가] 관리자 계정이 레시피 수정할 수 있게 하는 로직 js

document.addEventListener("DOMContentLoaded", () => {
  // 페이지가 로드되면 실행

  const id = new URLSearchParams(location.search).get("id");
  // URL에서 수정할 레시피의 id 값을 가져오기

  fetch("/TP/api/load_recipes.php")
    // 전체 레시피 목록 JSON 불러오기
    .then(res => res.json())
    .then(list => {
      const recipe = list.find(r => r.id === id);
      // 불러온 목록 중에서 해당 id의 레시피 객체 찾기

      // 기존 레시피 데이터를 화면 입력칸에 채워 넣기
      document.getElementById("recipeImg").src = recipe.image_url;
      document.getElementById("recipeName").value = recipe.title;
      document.getElementById("recipeDesc").value = recipe.summary;
      document.getElementById("recipeIngredients").value = recipe.ingredients.join(", ");
      // 배열 → 문자열 형태로 변환하여 입력란에 표시

      document.getElementById("recipeSteps").value = recipe.steps.join("\n");
      // 조리 단계 배열을 엔터 기준 문자열로 변환
    });
});


function updateRecipe() {
  // "수정하기" 버튼 클릭 시 실행

  const id = new URLSearchParams(location.search).get("id");
  // 수정할 레시피 id를 다시 읽어옴

  const updated = {
    id,
    // 제목, 설명, 재료, 조리순서 입력값 재수집
    title: document.getElementById("recipeName").value,
    summary: document.getElementById("recipeDesc").value,

    // 문자열을 , 기준으로 잘라 배열로 변환
    ingredients: document.getElementById("recipeIngredients").value
      .split(',')
      .map(i => i.trim()),

    // 단계는 줄바꿈 기준으로 배열화
    steps: document.getElementById("recipeSteps").value.split("\n"),

    // 이미지 URL 그대로 사용
    image_url: document.getElementById("recipeImg").src
  };

  fetch("/TP/api/update_recipe.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updated)
    // 수정된 레시피 데이터를 JSON 형태로 백엔드에 전송
  })
  .then(res => res.json())
  .then(data => {
    alert("수정 완료!");
    // 수정 완료 후 목록 페이지로 이동
    location.href = "recipe-list.php";
  });
}
