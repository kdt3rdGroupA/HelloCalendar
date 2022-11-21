function register() {
  const form_signup = document.forms["form_signup"];
  const id = document.querySelector("#id");
  const pw = document.querySelector("#pw");
  const name = document.querySelector("#name");

  const warningId = document.querySelector(".warningId");
  const warningPw = document.querySelector(".warningPw");
  const warningName = document.querySelector(".warningName");
  const warning = document.querySelector(".warning");

  const validityId = /^[a-z0-9](?=.*\d).{4,12}$/;
  const validityPw = /^(?=.*[a-zA-Z0-9])((?=.*\d)|(?=.*\W)).{6,20}$/;
  const validityName = /^[가-힣a-zA-Z]{3,10}$/;

  // id 유효성 검사
  if (!id.checkValidity()) {
    warningId.style.display = "block";
    warningId.textContent = "❗️아이디를 입력해주세요";
    id.style.borderColor = "red";
  } else if (!validityId.test(id.value)) {
    warningId.style.display = "block";
    warningId.textContent =
      "❗️영어 소문자와 숫자를 포함하여 4 ~ 12글자로 작성하세요";
    id.style.borderColor = "red";
    id.value = "";
  } else {
    warningId.style.display = "none";
    id.style.borderColor = "black";
  }

  // pw 유효성 검사
  if (!pw.checkValidity()) {
    warningPw.style.display = "block";
    warningPw.textContent = "❗️비밀번호를 입력해주세요";
    pw.style.borderColor = "red";
  } else if (!validityPw.test(pw.value)) {
    warningPw.style.display = "block";
    warningPw.textContent =
      "❗️최소 1개의 특수문자 혹은 숫자를 포함하여 6 ~ 20글자로 작성하세요";
    pw.style.borderColor = "red";
    pw.value = "";
  } else {
    warningPw.style.display = "none";
    pw.style.borderColor = "black";
  }

  // name 유효성 검사
  if (!name.checkValidity()) {
    warningName.style.display = "block";
    warningName.textContent = "❗️이름을 입력해주세요";
    name.style.borderColor = "red";
  } else if (!validityName.test(name.value)) {
    warningName.style.display = "block";
    warningName.textContent =
      "❗️영어 대소문자 혹은 한글 10자 이하로 작성하세요";
    name.style.borderColor = "red";
    name.value = "";
  } else {
    warningName.style.display = "none";
    name.style.borderColor = "black";
  }
}
