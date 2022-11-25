const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.toggle("dark-theme");

  //해 이미지로 바꿈
  $img = document.querySelector(".btn-toggle > img");
  $img.src = `../static/img/sun.png`;

} else if (currentTheme == "light") {
  document.body.classList.toggle("light-theme");
  
  //달 이미지로 바꿈
  $img = document.querySelector(".btn-toggle > img");
  $img.src = `../static/img/moon.png`;
}

//문제: 해 이미지 클릭하여 라이트모드 전환시 달 이미지로 변경되어야 하나 바뀌지 않음.(라이트버전으로 바꾸고 ‘새로고침’하면 4~18줄 코드때문에 라이트모드로 인식하여 달 이미지로 바뀌긴 함)
btn.addEventListener("click", function () {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-theme");
    var theme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";

    //해 -> 달 이미지로 바꾸기
    $img = document.querySelector(".btn-toggle > img");
    $img.src = `../static/img/moon.png`;
      
  } else {
    document.body.classList.toggle("dark-theme");
    var theme = document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";

      //다크모드 적용 -> 해 이미지로 바꾸기
      $img = document.querySelector(".btn-toggle > img");
      $img.src = `../static/img/sun.png`;
  }
  localStorage.setItem("theme", theme);
});


    //해 -> 달 이미지로 바꾸기
    // $img = document.querySelector(".btn-toggle > img");
    // $img.src = `../static/img/moon.png`;

    //달 -> 해 이미지로 바꾸기
    // $img = document.querySelector(".btn-toggle > img");
    // $img.src = `../static/img/sun.png`;


