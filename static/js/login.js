function login() {
  const form_login = document.forms["form_login"];
  const id = document.querySelector("#id");
  const pw = document.querySelector("#pw");
  const warningId = document.querySelector(".warningId");
  const warningPw = document.querySelector(".warningPw");
  if (!id.checkValidity()) {
    warningId.style.display = "block";
    warningId.textContent = "❗️아이디를 입력해주세요";
    id.style.borderColor = "red";
  } else {
    warningId.style.display = "none";
    id.style.borderColor = "black";
  }

  if (!pw.checkValidity()) {
    warningPw.style.display = "block";
    warningPw.textContent = "❗️비밀번호를 입력해주세요";
    pw.style.borderColor = "red";
  } else {
    warningPw.style.display = "none";
    pw.style.borderColor = "black";
  }
}
