const URL = "http://localhost";
const PORT = 8001;

function login() {
  const form_login = document.forms["form_login"];
  const id = document.querySelector("#id");
  const pw = document.querySelector("#pw");
  const warningId = document.querySelector(".warningId");
  const warningPw = document.querySelector(".warningPw");

  // 유효성 검사
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

  // 로그인 요청
  axios({
    method: 'POST',
    url: '/login',
    params: {
      userid: id.value,
      pw: pw.value
    }
  })
  .then(result => {
    let data = result.data;
    if (data.result) {
      location.replace(`${URL}:${PORT}`);
    } else {
      id.value = "";
      pw.value = "";
      alert("아이디 또는 패스워드가 일치하지 않습니다.");
    }
  });
}

// enter 전송
let inputs = document.querySelectorAll(".input");
// console.log(inputs);
for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
      login();
      input.value = "";
    }
  });
}

//로그인 정보를 변환하기 위한 parseJWT 함수 생성
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};