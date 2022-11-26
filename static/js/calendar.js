// 캘린더 js : 현승님 버전
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

// 다른 파일에서 사용되는 함수여서 const d ~ const create 까지는 주석처리 하지 말아주세요

// const monthDays = {
//   "01" : 31, 1 : 31, "Jan": 31,
//   "02" : 28, 2 : 28, "Feb": 28,
//   "03" : 31, 3 : 31, "Mar": 31,
//   "04" : 30, 4 : 30, "Apr": 30,
//   "05" : 31, 5 : 31, "May": 31,
//   "06" : 30, 6 : 30, "Jun": 30,
//   "07" : 31, 7 : 31, "Jul": 31,
//   "08" : 31, 8 : 31, "Aug": 31,
//   "09" : 30, 9 : 30, "Sep": 30,
//   "10" : 31, 10: 31, "Oct": 31,
//   "11" : 30, 11: 30, "Nov": 30,
//   "12" : 31, 12: 31, "Dec": 31
// }
// const month2num = {
//   "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6,
//   "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
// }
// const weekDay2num = {
//   "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6
// }
// let days = selectorAll(".calendarContents td");
// let endDay;
// let firstWeekDay;
// let today;
// const displayCalendar = (target=false) => {
//   let now;
//   target ? now=String(new Date(target)) : now=String(new Date());
//   days.forEach(element => {
//     element.innerText = "";
//   });
//   endDay = monthDays[now.slice(4,7)];
//   if (now.slice(4,7) == "Feb" && !Number(now.slice(11,15))%4) {
//     endDay += 1;
//   }
//   // firstWeekDay = weekDay2num[now.slice(0,3)];
//   today = Number(now.slice(8,10));
//   firstWeekDay = weekDay2num[now.slice(0,3)] - (today%7) + 1;
//   firstWeekDay<0 ? firstWeekDay+=7 : null;
//   for (let i=0; i<endDay; i++) {
//     days[i+firstWeekDay].innerText = `${i+1}`;
//   }
//   print(now);
// }
// // let now = String(new Date());
// // let month = month2num[now.slice(4,7)];
// // let year = Number(now.slice(11,15));
// // selector(".main h2").innerText = `${year}년 ${month}월`;

// displayCalendar();

// // selector("#next_month").addEventListener("click", () => {
// //   month += 1
// //   if (month == 13) {
// //     month = 1;
// //     year += 1;
// //   }
// //   selector(".main h2").innerText = `${year}년 ${month}월`;
// //   displayCalendar(target=`${year}-${month}-01`);
// // });
// // selector("#prev_month").addEventListener("click", () => {
// //   month -= 1;
// //   if (!month) {
// //     month = 12;
// //     year -= 1;
// //   }
// //   selector(".main h2").innerText = `${year}년 ${month}월`;
// //   displayCalendar(target=`${year}-${month}-01`);
// // })

////////////////////////////////////////////
//캘린더 js: 새 버전
// 달력 생성

// 변수 선언

var currentTitle = document.getElementById("current-year-month");
var calendarBody = document.getElementById("calendar-body");
var today = new Date();
var first = new Date(today.getFullYear(), today.getMonth(), 1);
var dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var pageFirst = first;
var pageYear;
if (first.getFullYear() % 4 === 0) {
  pageYear = leapYear;
} else {
  pageYear = notLeapYear;
}

var tdGroup = [];
let currentYear, currentMonth;
const makeCalendar = (date) => {
  // 현재 년도와 월 받아오기
  currentYear = new Date(date).getFullYear();
  currentMonth = new Date(date).getMonth() + 1;

  // 첫날의 요일 구하기 - 초기 시작위치를 위해서
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  // 마지막 날짜 구하기
  const lastDay = new Date(currentYear, currentMonth, 0).getDate();

  // 남은 박스만큼 다음달 날짜 표시
  const limitDay = firstDay + lastDay;
  const nextDay = Math.ceil(limitDay / 7) * 7;

  let htmlDummy = "";

  // 한달전 날짜 표시하기
  for (let i = 0; i < firstDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }

  // 이번달 날짜 표시하기
  for (let i = 1; i <= lastDay; i++) {
    htmlDummy += `<div class-"date" id="${i}">${i}</div>`;
  }

  // 다음달 날짜 표시하기
  for (let i = limitDay; i < nextDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }

  document.querySelector(".dateBoard").innerHTML = htmlDummy;
  document.querySelector(
    ".dateTitle"
  ).innerText = `${currentYear}년 ${currentMonth}월`;
  showDay(); // 일정등록 부분에 날짜 띄우기
  var clickedDate1 = document.getElementById(today.getDate()); // 날짜 클릭시 클래스 추가
  clickedDate1.classList.add("active");
  clickStart(); // 날짜 클릭
};

const date = new Date();

makeCalendar(date);

// 이전달 이동
document.querySelector(`.calPrevDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate()); // 이번 달이 이전달에 영향을 주지 않도록 month - 1
  showDay();
  reshow();
};

// 다음달 이동
document.querySelector(`.nextDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()); // 이번달이 다음달에 영향을 주지 않도록 month + 1
  showDay();
  reshow();
};

// 일정 등록 부분에 오늘 요일, 날짜 띄우기
function showDay() {
  var mainTodayDay = document.querySelector(".nowDay");
  var mainTodayDate = document.querySelector(".nowDate");
  mainTodayDay.innerHTML = dayList[today.getDay()];
  // console.log(today.getDay());
  mainTodayDate.innerHTML = today.getDate();
}

function clickStart() {
  for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
    tdGroup[i] = document.getElementById(i);
    print(i);
    tdGroup[i].addEventListener("click", changeToday);
    // console.log(keyValue);
  }
}

// 날짜 클릭시 css 변경하기 위한 함수
function changeToday(e) {
  for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
    if (tdGroup[i].classList.contains("active")) {
      tdGroup[i].classList.remove("active");
    }
  }
  clickedDate1 = e.currentTarget;
  clickedDate1.classList.add("active");
  today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
  showDay();
  let nowMonth = today.getMonth() + 1;
  keyValue = today.getFullYear() + "" + nowMonth + "" + today.getDate();
  reshow();
}

// 일정 등록

// 날짜 클릭해서 변경시 새로운 일정 등록 화면 띄워주기
function reshow() {
  let nowMonth = today.getMonth() + 1;
  keyValue = today.getFullYear() + "" + nowMonth + "" + today.getDate();
  // console.log(scheduleList[keyValue]);
  const list = document.querySelectorAll("#listcontents > div");
  if (scheduleList[keyValue] === undefined) {
    inputlists.textContent = "";
    scheduleList[keyValue] = [];
    list.forEach((i) => {
      i.remove();
    });
  } else if (scheduleList[keyValue].length === 0) {
    inputlists.textContent = "";
    list.forEach((i) => {
      i.remove();
    });
  } else {
    inputlists.textContent = "";
    list.forEach((i) => {
      i.remove();
    });
  }

  for (var i = 0; i < scheduleList[keyValue].length; i++) {
    var listdiv = document.createElement("div");
    var removeBtn = document.createElement("button");
    var hide = document.createElement("div");

    listdiv.textContent = "-" + scheduleList[keyValue][i];
    removeBtn.textContent = removeText;
    // 요소 추가
    inputlists.appendChild(listdiv);
    listdiv.append(removeBtn);
    removeBtn.append(hide);
    // 만들어진 요소들에 클래스 추가
    listdiv.classList.add("list");
    removeBtn.classList.add("removeBtn");
    hide.classList.add("hide");

    del();
  }
}

let input = document.querySelector("#input");
let inputBtn = document.querySelector("#inputBtn");
let inputlists = document.querySelector("#listcontents");
const removeText = "삭제";
let nowMonth = today.getMonth() + 1;
let keyValue = today.getFullYear() + "" + nowMonth + "" + today.getDate();
let scheduleList = [];
scheduleList[keyValue] = []; // 리스트를 배열에 저장

inputBtn.addEventListener("click", addSchedule);

// 일정 등록 함수
function addSchedule() {
  var listdiv = document.createElement("div");
  var removeBtn = document.createElement("button");
  var hide = document.createElement("div");
  
  // axios({
  //   method: 'POST',
  //   url: '/calendar',
  //   params: null
  // }).then(result => {
  //   if (result.data.data == null) {
  //     return 0;
  //   }
  //   let data = Array.from(result.data.data);

  //   data.forEach
  // });

  listdiv.textContent = " - " + input.value;
  removeBtn.textContent = removeText;
  // 요소 추가
  inputlists.appendChild(listdiv);
  listdiv.append(removeBtn);
  removeBtn.append(hide);
  // 만들어진 요소들에 클래스 추가
  listdiv.classList.add("list");
  removeBtn.classList.add("removeBtn");
  hide.classList.add("hide");
  // 일정 배열에 값 넣어주기
  scheduleList[keyValue].push(input.value);

  console.log(scheduleList[keyValue]);
  input.value = "";
  del();
}

// 리스트 삭제 함수
function del() {
  const listdiv = document.querySelectorAll(".list");
  const removeBtn = document.querySelectorAll(".removeBtn");
  // const delBtn = removeBtn.lastChild;
  removeBtn[removeBtn.length - 1].addEventListener("click", function () {
    listdiv[listdiv.length - 1].remove();
    removeBtn[removeBtn.length - 1].remove();
    // 배열에서 값 뽑아내기
    scheduleList[keyValue].pop(input.value);
    console.log(scheduleList[keyValue]);
  });
}

// 리스트 수정 함수

