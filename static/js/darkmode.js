const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");

} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
}

btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";
      
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});


//만약 다크모드/라이트모드일때 버튼 이미지 바꾸고싶다면
    //해 -> 달 이미지로 바꾸기
    // $img = document.querySelector(".btn-toggle > img");
    // $img.src = `../static/img/moon.png`;

    //달 -> 해 이미지로 바꾸기
    // $img = document.querySelector(".btn-toggle > img");
    // $img.src = `../static/img/sun.png`;