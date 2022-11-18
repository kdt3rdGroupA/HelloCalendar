const d = document;
const print = (target, dir=false) => {
dir ? console.dir(target) : console.log(target);
}
const selector = (target, from=d) => {
  return from.querySelector(target);
}
const selectorAll = (target, from=d) => {
  return from.querySelectorAll(target);
}
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
const monthDays = {
  "01" : 31, 1 : 31, "Jan": 31,
  "02" : 28, 2 : 28, "Feb": 28,
  "03" : 31, 3 : 31, "Mar": 31,
  "04" : 30, 4 : 30, "Apr": 30,
  "05" : 31, 5 : 31, "May": 31,
  "06" : 30, 6 : 30, "Jun": 30,
  "07" : 31, 7 : 31, "Jul": 31,
  "08" : 31, 8 : 31, "Aug": 31,
  "09" : 30, 9 : 30, "Sep": 30,
  "10" : 31, 10: 31, "Oct": 31,
  "11" : 30, 11: 30, "Nov": 30,
  "12" : 31, 12: 31, "Dec": 31
}
const month2num = {
  "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, 
  "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12
}
const weekDay2num = {
  "Sun": 0, "Mon": 1, "Tue": 2, "Wed": 3, "Thu": 4, "Fri": 5, "Sat": 6  
}
let days = selectorAll(".calendarContents td");
let endDay;
let firstWeekDay;
let today;
const displayCalendar = (target=false) => {
  let now;
  target ? now=String(new Date(target)) : now=String(new Date());
  days.forEach(element => {
    element.innerText = "";
  });
  endDay = monthDays[now.slice(4,7)];
  if (now.slice(4,7) == "Feb" && !Number(now.slice(11,15))%4) {
    endDay += 1;
  }
  // firstWeekDay = weekDay2num[now.slice(0,3)];
  today = Number(now.slice(8,10));
  firstWeekDay = weekDay2num[now.slice(0,3)] - (today%7) + 1;
  firstWeekDay<0 ? firstWeekDay+=7 : null;
  for (let i=0; i<endDay; i++) {
    days[i+firstWeekDay].innerText = `${i+1}`;
  }
  print(now);
}
// let now = String(new Date());
// let month = month2num[now.slice(4,7)];
// let year = Number(now.slice(11,15));
// selector(".main h2").innerText = `${year}년 ${month}월`;
displayCalendar();
// selector("#next_month").addEventListener("click", () => {
//   month += 1
//   if (month == 13) {
//     month = 1;
//     year += 1;
//   }
//   selector(".main h2").innerText = `${year}년 ${month}월`;
//   displayCalendar(target=`${year}-${month}-01`);
// });
// selector("#prev_month").addEventListener("click", () => {
//   month -= 1;
//   if (!month) {
//     month = 12;
//     year -= 1;
//   }
//   selector(".main h2").innerText = `${year}년 ${month}월`;
//   displayCalendar(target=`${year}-${month}-01`);
// })