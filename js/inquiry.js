document.getElementById("inquiryForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const name = document.getElementById("inquiryName").value.trim();
  const email = document.getElementById("inquiryEmail").value.trim();
  const message = document.getElementById("inquiryMessage").value.trim();
  const file = document.getElementById("fileUpload").files[0];

  if (!name || !email || !message) {
    alert("이름, 이메일, 개선사항은 필수 입력입니다!");
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("message", message);
  if (file) formData.append("file", file);

  const res = await fetch("/TP/api/inquiry_save.php", {
    method: "POST",
    body: formData
  });

  const result = await res.text();
  alert(result);
  location.href = "support.html";
});
