const d = document;
const print = (target, dir = false) => {
  dir ? console.dir(target) : console.log(target);
};
const selector = (target, from = d) => {
  return from.querySelector(target);
};
const selectorAll = (target, from = d) => {
  return from.querySelectorAll(target);
};
const addClass = function (element, classStr) {
  element.classList.add(classStr);
};
const removeClass = function (element, classStr) {
  element.classList.remove(classStr);
};
const toggleClass = function (element, classStr) {
  element.classList.toggle(classStr);
};
const hasClass = function (element, className) {
  return element.classList.contains(className);
};
const clearClass = function (element) {
  while (element.classList.length > 0) {
    removeClass(element, element.classList.item(0));
  }
};
const create = function (tagStr) {
  return d.createElement(tagStr);
};

selector("#get_auth_num").addEventListener("click", () => {
  if (!selector("#email").checkValidity()) {
    document.querySelector("#email").style.borderColor = "red";
    document.querySelector(".warningEmail").style.display = "block";
    document.querySelector(".warningEmail").textContent =
      "❗️이메일을 바르게 입력해 주세요";
    return 0;
  }
  document.querySelector("#email").style.borderColor = "black";
  document.querySelector(".warningEmail").style.display = "none";
  axios({
    method: "POST",
    url: "/login/emailAuth",
    params: { email: selector("#email").value },
  }).then((result) => {
    let data = result.data;
    if (data.result) {
      selector("#email").disabled = true;
      selector("#authNum").disabled = false;
    }
  });
});
selector("#authNum").addEventListener("keydown", () => {
  if (selector("#authNum").value.length > 3) {
    selector("#pw").disabled = false;
  }
});

selector("#submit").addEventListener("click", () => {
  if (!selector("#pw").checkValidity()) {
    alert("비밀번호는 6자리 이상");
    return 0;
  }
  axios({
    method: "POST",
    url: "/login/pwreset",
    params: {
      emailAuthNum: selector("#authNum").value,
      pw: selector("#pw").value,
    },
  }).then((result) => {
    let data = result.data;
    if (!data.result) {
      alert("비밀번호 재설정 실패");
    } else {
      selector("#id").innerText = `ID: ${data.data.id}`;
      selector("#new_pw").innerText = `PW: ${selector("#pw").value}`;
      removeClass(selector("#result"), "hide");
    }
  });
});
