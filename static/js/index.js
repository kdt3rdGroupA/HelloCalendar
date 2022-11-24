// const d = document;
// const print = (target, dir=false) => {
// dir ? console.dir(target) : console.log(target);
// }
// const selector = (target, from=d) => {
//   return from.querySelector(target);
// }
// const selectorAll = (target, from=d) => {
//   return from.querySelectorAll(target);
// }
// const addClass = function (element, classStr) {
//   element.classList.add(classStr);
// };
// const removeClass = function (element, classStr) {
//   element.classList.remove(classStr);
// };
// const toggleClass = function (element, classStr) {
//   element.classList.toggle(classStr);
// };
// const hasClass = function (element, className) {
//   return element.classList.contains(className);
// };
// const clearClass = function (element) {
//   while (element.classList.length > 0) {
//     removeClass(element, element.classList.item(0));
//   }
// };
// const create = function (tagStr) {
//   return d.createElement(tagStr);
// };
// 다른 js파일에서 정의됨

const URL = "http://localhost";
const PORT = 8001;
let logout = selector("#logout");
if (logout != null) {
  selector("#logout").addEventListener("click", () => {
    console.log(1);
    axios({
      method: "POST",
      url: "/login/logout",
    }).then(() => {
      location.replace(`${URL}:${PORT}`);
    });
  });
}

selector(".searchBar").addEventListener("keydown", (event) => {
  // print(event, true);
  if (event.code != "Enter") {
    return 0;
  }
  if (!selector("#search_text").value.length) {
    return 0;
  }
  if (event.isComposing == false) {
    let target = selector("#search_text").value;
    window.open(`https://www.google.com/search?q=${target}`, "_blank");
    document.querySelector("#search_text").value = "";
    return 1;
  }
});
selector("#search_btn").addEventListener("click", () => {
  if (!selector("#search_text").value.length) {
    return 0;
  }
  let target = selector("#search_text").value;
  window.open(`https://www.google.com/search?q=${target}`, "_blank");
  document.querySelector("#search_text").value = "";
  return 1;
});
