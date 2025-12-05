async function addRecipe() {

  // 업로드된 이미지 파일 가져오기
  const imageFile = document.getElementById("imageFile").files[0];

  // 입력된 레시피 기본 정보 가져오기
  const name = document.getElementById("recipeName").value.trim();
  const desc = document.getElementById("recipeDesc").value.trim();
  const ingredients = document.getElementById("recipeIngredients").value.trim();
  const steps = document.getElementById("recipeSteps").value.trim();

  // 필수 값 검증
  if (!name || !desc || !ingredients || !steps) {
    alert("모든 입력 항목을 채워주세요!");
    return;
  }

  // 서버로 전송할 FormData 생성
  const formData = new FormData();
  formData.append("name", name);
  formData.append("desc", desc);
  formData.append("ingredients", ingredients);
  formData.append("steps", steps);

  // 이미지 파일이 있는 경우에만 formData에 추가
  if (imageFile) formData.append("image", imageFile);

  // 레시피 저장 API로 전송 (POST)
  const res = await fetch("/TP/api/recipe_add_save.php", {
    method: "POST",
    body: formData
  });

  // 서버에서 반환하는 메시지 확인
  const result = await res.text();
  alert(result);

  // 새 레시피 등록 후 페이지 새로고침
  location.reload();
}
