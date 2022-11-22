const id = document.querySelector("#id");
const pw = document.querySelector("#pw");
const name = document.querySelector("#name");
const email = document.querySelector("#email");

const warningId = document.querySelector(".warningId");
const warningPw = document.querySelector(".warningPw");
const warningName = document.querySelector(".warningName");
const warningEmail = document.querySelector(".warningEmail");

const validityId = /^[a-z0-9](?=.*\d).{4,12}$/;
const validityPw = /^(?=.*[a-zA-Z0-9])((?=.*\d)|(?=.*\W)).{6,20}$/;
const validityName = /^[가-힣a-zA-Z]{3,10}$/;
const validityEmail =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

function register() {
  const form_signup = document.forms["form_signup"];

  // id 유효성 검사
  if (!id.checkValidity()) {
    warningId.style.display = "block";
    warningId.textContent = "❗️아이디를 입력해주세요";
    id.style.borderColor = "red";
  } else if (!validityId.test(id.value)) {
    warningId.style.display = "block";
    warningId.textContent = "❗️영어 소문자와 숫자를 포함하여 4 ~ 12글자";
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
      "❗️최소 1개의 특수문자 혹은 숫자를 포함하여 6 ~ 20글자";
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
    warningName.textContent = "❗️영어 대소문자 혹은 한글 10자 이하";
    name.style.borderColor = "red";
    name.value = "";
  } else {
    warningName.style.display = "none";
    name.style.borderColor = "black";
  }

  if (!email.checkValidity()) {
    warningEmail.style.display = "block";
    warningEmail.textContent = "❗️올바른 형식으로 입력해주세요";
    email.style.borderColor = "red";
  } else if (!validityEmail.test(email.value)) {
    warningEmail.style.display = "block";
    warningEmail.textContent = "❗️올바른 형식으로 입력해주세요";
    email.style.borderColor = "red";
    email.value = "";
  } else {
    warningEmail.style.display = "none";
    email.style.borderColor = "black";
  }
}

// 이메일 인증창 띄우기
function emailCode() {
  const emailcode = document.querySelector("#emailcode");
  if (!email.checkValidity() || !validityEmail.test(email.value)) {
    warningEmail.style.display = "block";
    warningEmail.textContent = "❗️올바른 형식으로 이메일을 입력해주세요";
    email.style.borderColor = "red";
    email.value = "";
  } else {
    if (emailcode.classList.contains("noshow")) {
      emailcode.classList.add("show");
      warningEmail.style.display = "none";
      email.style.borderColor = "black";
    } else {
      emailcode.classList.remove("show");
    }
  }
}

// 아이디 중복 검사
document.querySelector("#idSignup .idBtn").addEventListener('click', () => {
  if (!id.checkValidity()) {
    return 0;
  }
  axios({
    method : 'POST',
    url : '/login/idcheck',
    params : {userid : id.value}
  }).then(result => {
    let data = result.data;
    console.log("여기서 CSS, 회원가입 버튼 로직 설정하시면 됩니다");
    //  응답 -> result.data = {result:"", msg="", data={}}
    //    result:
    //      true: 로그인, 회원가입 성공
    //      false: 로그인, 회원가입 실패
    //    msg:
    //      result에관한 이유(ex : 아이디 겹침, 로그인성공, ...)
    //    data:
    //      요청성공(result : true) 이후 보내지는 정보(로그인정보)
    //      별다른 데이터 전송이 필요없으면 null
    //      응답이 필요한 data가 있으면 알려주세요
  });
});

// 인증 이메일 받기
document.querySelector("#idSignup .emailBtn").addEventListener('click', () => {
  if (!email.checkValidity()) {
    return 0;
  }
  axios({
    method : 'POST',
    url : '/login/emailAuth',
    params : {email : email.value}
  }).then(result => {
    //let data = result.data;
    console.log("여기서 CSS, 회원가입 버튼 로직 설정하시면 됩니다");
  });
});