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


//Google Login API
function handleCredentialResponse(response) {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  const responsePayload = parseJwt(response.credential);

  console.log("ID: " + responsePayload.sub);
  console.log('Full Name: ' + responsePayload.name);
  console.log('Given Name: ' + responsePayload.given_name);
  console.log('Family Name: ' + responsePayload.family_name);
  console.log("Image URL: " + responsePayload.picture);
  console.log("Email: " + responsePayload.email); 
};
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};