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
// 달력 생성

// 변수 선언
var dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var leapYear = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var notLeapYear = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var pageYear;
let day, month, year, weekday, keyDay;
const makeCalendar = (date) => {
  // date: Date()
  year = date.getFullYear();
  year % 4 == 0 ? (pageYear = leapYear) : (pageYear = notLeapYear);
  month = date.getMonth() + 1;
  day = date.getDate();
  weekday = date.getDay();
  let dateTemp = new Date(year, month - 1, day);
  selector(".dateTitle").innerText = `${year}년 ${month}월`;

  // 켈린더 파트
  let monthFirstWeekday = (weekday - (day % 7) + 1) % 7;
  monthFirstWeekday < 0 ? (monthFirstWeekday += 7) : null;
  let dateBoard = selector(".dateBoard");
  dateBoard.innerHTML = "";
  for (let i = 0; i < monthFirstWeekday; i++) {
    let dayDiv = create("div");
    addClass(dayDiv, "noColor");
    dateBoard.append(dayDiv);
  }
  for (let i = 0; i < pageYear[month]; i++) {
    let dayDiv = create("div");
    addClass(dayDiv, "date");
    let key = String(year) + "-";
    if (month < 10) {
      key += "0" + String(month) + "-";
    } else {
      key += String(month) + "-";
    }
    if (i + 1 < 10) {
      key += "0" + String(i + 1);
    } else {
      key += String(i + 1);
    }
    dayDiv.id = key;
    dayDiv.innerText = i + 1;
    dayDiv.addEventListener("click", () => {
      dateTemp.setDate(i + 1);
      displaySchedule(dateTemp);
      day = Number(dayDiv.innerText);
      let days = selectorAll(".dateBoard div");
      days.forEach((element) => {
        removeClass(element, "active");
      });
      addClass(dayDiv, "active");
    });
    i + 1 == day ? addClass(dayDiv, "active") : null;
    dateBoard.append(dayDiv);
  }
  let leftSpace = 7 - ((monthFirstWeekday + pageYear[month]) % 7);
  for (let i = 0; i < leftSpace; i++) {
    let dayDiv = create("div");
    addClass(dayDiv, "noColor");
    dateBoard.append(dayDiv);
  }

  // 일정파트
  displaySchedule(date);
  displayScheduleOnCalendar();
};

// 일정파트 표시함수
const displaySchedule = (date) => {
  selector("#nowDay").innerText = dayList[date.getDay()];
  selector("#nowDate").innerText = date.getDate();

  keyDay = date2key(date);
  printSchedule(keyDay);
};
const date2key = (date) => {
  let month = String(date.getMonth() + 1);
  month.length == 1 ? (month = "0" + month) : null;
  let day = String(date.getDate());
  day.length == 1 ? (day = "0" + day) : null;
  return `${date.getFullYear()}-${month}-${day}`;
};

// 이전달 이동
document.querySelector(`.calPrevDay`).onclick = () => {
  month -= 1;
  if (!month) {
    month = 12;
    year -= 1;
  }
  if (day > pageYear[month]) {
    day = pageYear[month];
  }
  makeCalendar(new Date(year, month - 1, day));
};

// 다음달 이동
document.querySelector(`.nextDay`).onclick = () => {
  month += 1;
  if (month > 12) {
    month = 1;
    year += 1;
  }
  if (day > pageYear[month]) {
    day = pageYear[month];
  }
  makeCalendar(new Date(year, month - 1, day));
};

// 일정칸에 오늘날자에 해당하는 일정 출력
const printSchedule = (keyDay) => {
  let scheduleBox = selector("#listcontents");
  scheduleBox.innerHTML = "";
  events.forEach((element) => {
    if (element.startDate > keyDay || keyDay > element.endDate) {
      return 0;
    }
    let itemWrap = create("div");
    let item = create("details");
    let itemName = create("summary");
    addClass(itemName, "item_name");
    itemName.innerText = element.name;
    let itemDetail = create("div");
    addClass(itemDetail, "item_detail");
    itemDetail.innerText = element.detail;
    let calendarKey = create("div");
    addClass(calendarKey, "hide");
    calendarKey.innerText = element.id;
    let deleteBtn = create("div");
    addClass(deleteBtn, "delete_button");
    deleteBtn.innerHTML = '<span class="material-symbols-outlined">edit</span>';
    deleteBtn.addEventListener("click", () => {
      selector("#calendarTargetKey").innerText = element.id;
      selector("#forms .editCalendar .startDate").value = element.startDate;
      selector("#forms .editCalendar .endDate").value = element.endDate;
      selector("#forms .editCalendar .calendarName").value = element.name;
      selector("#forms .editCalendar .calendarDetail").value = element.detail;
      removeClass(selector("#forms .editCalendar"), "hide");
    });
    item.append(itemName);
    item.append(itemDetail);
    item.append(calendarKey);
    itemWrap.append(item);
    itemWrap.append(deleteBtn);
    scheduleBox.append(itemWrap);
  });
};

// 일정을 켈린더에 표시
const displayScheduleOnCalendar = () => {
  let days = selectorAll(".dateBoard .date");
  days.forEach((element) => {
    if (hasClass(element, "noColor")) {
      return 0;
    }
    let time = element.id;
    for (let i = 0; i < events.length; i++) {
      let e2 = events[i];
      if (time == e2.startDate || time == e2.endDate) {
        addClass(element, "event");
        break;
      } else if (e2.startDate < time && time < e2.endDate) {
        addClass(element, "in_event");
      }
    }
  });
};

// 페이지 로드후 일정정보 가져오기
let events = [];

axios({
  method: "POST",
  url: "/calendar",
  params: null,
}).then((result) => {
  if (result.data.result == false) {
    makeCalendar(new Date());
    return 0;
  }
  events = result.data.data;
  makeCalendar(new Date());
  printSchedule(`${year}-${month}-${day}`);
});

// 연속일정추가 모달
selector(".scheduleTitle").addEventListener("click", () => {
  removeClass(selector("#forms .calendar_add"), "hide");
  selector(".startDate").value = keyDay;
  selector(".endDate").value = keyDay;

  // 일정 추가 클릭시 모달창 있는 부분으로 자동 스크롤
  var location = document.querySelector("nav").offsetTop;
  window.scrollTo({ top: location, behavior: "smooth" });
});
selector("#forms .calendar_add .close").addEventListener("click", () => {
  addClass(selector("#forms .calendar_add"), "hide");
  clearInput();
});
selector("#forms .calendar_add .submit").addEventListener("click", () => {
  addCalendar();
  clearInput();
});
let addInputs = selectorAll("#forms .calendar_add input");
addInputs.forEach((element) => {
  element.addEventListener("keypress", (event) => {
    if (event.code != "Enter") {
      return 0;
    }
    addCalendar();
    clearInput();
  });
});
const addCalendar = () => {
  let startDate = selector("#forms .calendar_add .startDate").value;
  let endDate = selector("#forms .calendar_add .endDate").value;
  let calendarName = selector("#forms .calendar_add .calendarName").value;
  let calendarDetail = selector("#forms .calendar_add .calendarDetail").value;
  if (startDate > endDate) {
    alert("날짜를 확인해 주세요");
    return 0;
  }
  if (!calendarName.length) {
    return 0;
  }
  let addData = {
    name: calendarName,
    detail: calendarDetail,
    startDate: startDate,
    endDate: endDate,
  };
  axios({
    method: "POST",
    url: "/calendar/add",
    params: addData,
  }).then((result) => {
    let data = result.data;
    if (!data.result) {
      return 0;
    }
    events.push(result.data.data);
    makeCalendar(new Date(year, month - 1, day));
    addClass(selector("#forms .calendar_add"), "hide");
  });
};

// 일정 삭제, 수정
selector("#forms .editCalendar .close").addEventListener("click", () => {
  addClass(selector("#forms .editCalendar"), "hide");
});
selector("#forms .editCalendar .edit").addEventListener("click", () => {
  editCalendar();
});
let edits = selectorAll("#forms .editCalendar input");
edits.forEach((element) => {
  element.addEventListener("keydown", (event) => {
    if (event.code != "Enter") {
      return 0;
    }
    editCalendar();
  });
});
selector("#forms .editCalendar .remove").addEventListener("click", () => {
  axios({
    method: "POST",
    url: "/calendar/remove",
    params: {
      calendarKey: selector("#forms .editCalendar #calendarTargetKey")
        .innerText,
    },
  }).then((result) => {
    let data = result.data;
    if (!data.result) {
      return 0;
    }
    // let eventIndex = 0;
    for (let i = 0; i < events.length; i++) {
      if (
        events[i].id ==
        selector("#forms .editCalendar #calendarTargetKey").innerText
      ) {
        events.splice(i, 1);
      }
    }
    makeCalendar(new Date(year, month - 1, day));
    addClass(selector("#forms .editCalendar"), "hide");
  });
});

const editCalendar = () => {
  let startDate = selector("#forms .editCalendar .startDate").value;
  let endDate = selector("#forms .editCalendar .endDate").value;
  let calendarName = selector("#forms .editCalendar .calendarName").value;
  let calendarDetail = selector("#forms .editCalendar .calendarDetail").value;
  if (startDate > endDate) {
    alert("날짜를 확인해 주세요");
    return 0;
  }
  if (!calendarName.length) {
    return 0;
  }
  let editData = {
    calendarKey: selector("#forms .editCalendar #calendarTargetKey").innerText,
    newData: {
      name: calendarName,
      detail: calendarDetail,
      startDate: startDate,
      endDate: endDate,
    },
  };
  axios({
    method: "POST",
    url: "/calendar/edit",
    params: editData,
  }).then((result) => {
    let data = result.data;
    if (!data.result) {
      return 0;
    }
    events.forEach((element) => {
      if (element.id == editData.calendarKey) {
        element.startDate = editData.newData.startDate;
        element.endDate = editData.newData.endDate;
        element.name = editData.newData.name;
        element.detail = editData.newData.detail;
      }
    });
    makeCalendar(new Date(year, month - 1, day));
    addClass(selector("#forms .editCalendar"), "hide");
  });
};

function clearInput() {
  let clearinput = document.querySelectorAll(".calendar_add input");
  for (let i = 0; i < clearinput.length; i++) {
    clearinput[i].value = "";
  }
}
