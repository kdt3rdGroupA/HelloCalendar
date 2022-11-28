function handleMouseDown(event) {
  event.preventDefault();

  const memos = document.querySelectorAll(".todoTab");
  const el = event.target;
  const classList = el.classList;

  if (!classList.contains("hold")) {
    // 공을 클릭했을 때, 마우스 커서의 XY좌표
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 선택한 공의 XY좌표 (왼쪽 상단 모서리 기준)
    const memoPos = el.getBoundingClientRect();
    const memoX = memoPos.x;
    const memoY = memoPos.y;

    // 선택한 공 안에 있는 마우스 커서의 XY좌표
    const gapX = mouseX - memoX;
    const gapY = mouseY - memoY;

    el.setAttribute("gap-x", gapX);
    el.setAttribute("gap-y", gapY);

    // 선택한 공을 맨 앞으로 가지고 오기
    const maxPriority =
      (memos.length > 0
        ? Math.max.apply(
            null,
            Array.from(memos).map((todoTab) => todoTab.getAttribute("priority"))
          )
        : 9999) + 1;
    el.setAttribute("priority", maxPriority);
    el.style["z-index"] = maxPriority;

    // 선택한 공에 'hold' class를 추가
    classList.add("hold");
  }
}

// 공 움직임 이벤트 핸들러
function handleMouseMove(event) {
  event.preventDefault();

  const el = document.querySelector(".todoTab.hold");
  if (el) {
    // 움직이는 마우스 커서의 XY좌표
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // 선택한 공 안에 있는 마우스 커서의 XY좌표
    const gapX = el.getAttribute("gap-x");
    const gapY = el.getAttribute("gap-y");

    // 마우스 커서의 위치에 따른 공의 XY좌표
    const memoX = mouseX - gapX;
    const memoY = mouseY - gapY;

    // 공의 위치를 변경
    el.style.left = memoX + "px";
    el.style.top = memoY + "px";
  }
}

// 공 놓기 이벤트 핸들러
function handleMouseUp(event) {
  event.preventDefault();

  const el = document.querySelector(".todoTab.hold");
  if (el) {
    // 움직이면 적용된 속성 및 class를 삭제
    el.removeAttribute("gap-x");
    el.removeAttribute("gap-y");

    el.classList.remove("hold");
  }
}

const memos = document.querySelectorAll(".todoTab");

memos.forEach(function (todoTab, idx) {
  // 공의 우선순위 설정
  let priority = todoTab.getAttribute("priority");
  if (!priority) {
    priority = idx + 1;
    todoTab.setAttribute("priority", priority);
  }
  todoTab.style["z-index"] = priority;

  // 공 선택 이벤트 바인딩
  todoTab.addEventListener("mousedown", handleMouseDown);
});

// 마우스 이벤트 바인딩
// document.addEventListener("mousemove", handleMouseMove);
// document.addEventListener("mouseup", handleMouseUp);

// const businessImg = document.querySelector(".businessImg");
// const privateTodo = document.querySelector(".todoTabPrivate");
// businessImg.addEventListener("click", () => {
//   if (privateTodo.classList.contains("noshow")) {
//     privateTodo.classList.remove("noshow");
//   }
// });

// 초기 입력값 당일 날짜 되게
// const nowDate = new Date().toISOString().substring(0, 10);

// document.getElementById('startline').value = nowDate;
// document.getElementById('deadline').value = nowDate;


const tbody = document.querySelector("tbody");

function todoSubmit() {
  //제출한거 추가
  console.log("등록 클릭");

  const form = document.forms["todoForm"];
	const inputTask = document.querySelector('#task').value;
	console.log(inputTask.length);
  // console.dir(form);
  console.log(form);
  console.log(form.business.checked); // boolean 으로 나옴
  // console.log(typeof(form.business.value)); // -> string -> boolean 변환?
if(inputTask=='' || inputTask.length > 100){
	alert('올바른 내용을 입력해 주세요.');
	inputReset();

}else{
  axios({
    method: "POST",
    url: "/todo/add",
    data: {
      //form 에서 가는거 5갸
      priority: form.priority.value,
      startline: form.startline.value,
      deadline: form.deadline.value,
      task: form.task.value,
      business: form.business.checked,
    },
  })
    .then((res) => {
      console.log(res);
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      console.log(data);
      let outBusiness;
      let outComplete;

      if (!data.business) {
        outBusiness = "사적"; //business false 면 사적
      } else outBusiness = "공적";
      if (data.complete) {
        outComplete = true;
      } else outComplete = false;

      console.log(outBusiness);
      console.log(data.complete);
      console.log(outComplete);
      const html = `
				<tr id="tr_${data.id}" class="">
					<td>${outBusiness}</td>
					<td>${data.priority}</td>
					<td>${data.startline}</td>
					<td>${data.deadline}</td>
					<td>${data.task}</td>
					<td><button type="button" class="btnComplete" onclick="complete()">완료</button></td> 
					<td><button type="button" class="btnDelete" onclick="todoDelete(this, ${data.id})">삭제</button></td>
				</tr>`;

      tbody.insertAdjacentHTML("beforeend", html);
      inputReset();
    });
	}
}

// todoSubmit(); // 불러오기만(get?) 하는 함수 만들어서 실행하면 새로고침 안해도 될까?

function complete(id) {
  // 완료 버튼 누루면 css, db 수정
  console.log("완료 클릭");
  const trow = document.querySelector(`#tr_${id}`); // 선택된 가로 -->
  const test = document.querySelector(`#tr_${id}.complete`); // 거기의 class(나란함? 형제 요소에 걸리나?)
  const chgBtn = document.querySelector(`#tr_${id} .btnComplete`); //거기의 td 버튼자리(하위)
  console.log("선택된 id", id);
  console.log("선택된 trow", trow);
  console.log("tr class complete 전 ", test); // null이면 notcomplete -> 제일 위 값이 선택되어야 하는거 아닌가?
  console.log("axios 들가는 값 ", Boolean(test), parseFloat(Boolean(test))); // null이면 notcomplete -> 제일 위 값이 선택되어야 하는거 아닌가?

  console.log("tr 의 완료 버튼 ", chgBtn); // 자손 요소 공백하면 됨
  // console.log('tr 전',Boolean(test));

  trow.classList.toggle("complete"); //잘됨 -> 근데 왜 라인 무시하고 먼저 되는거?

  const comp = `
	<td><button type="button" class="btnComplete" onclick="complete('<%= data[i].id %>')">완료</button></td>
	`; // innerhtml <%= %> 넣으니까 새로고침 안하면  에러뜸
  const cencel = `
	<td><button type="button" class="btnComplete" onclick="complete('<%= data[i].id %>')">취소</button></td>
	`;

  if (!Boolean(test)) {
    //미완료 -> 완료 ---->버튼은 완료 -> 취소
    // if(!(test)){ //미완료 -> 완료
    chgBtn.innerHTML = cencel;
    // trow.classList.add("complete");
  } else {
    chgBtn.innerHTML = comp;
    // trow.classList.remove("complete");
  }
  console.log("tr class complete 후 ", test); // null이면 notcomplete -> 제일 위 값이 선택되어야 하는거 아닌가?

  // const btndis = document.getElementsByClassName('.btnComplete');
  // btndis.disabled = true; // 버튼 잠그기 왜 안먹혀

  // console.log('후',Boolean(complete));

  axios({
    method: "PATCH",
    url: "/todo/complete",
    data: {
      id: id,
      complete: !Boolean(test),
    },
  })
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .then((data) => {
      console.log("변경되면 1 아님 0", data); //
    });
}

function todoDelete(obj, id) {
  console.log("click 삭제 버튼");
  console.log(obj);
  console.log(id);

  axios({
    method: "DELETE",
    url: "/todo/del",
    data: {
      id: id,
    },
  })
    .then((res) => {
      console.log(res.data); // 삭제할 id
      return res.data;
    })
    .then((data) => {
      alert(data); // alert('삭제 성공!!')

      // closest() 메서드 obj: 삭제버튼 자기자신의 조상 중 찾아감
      obj.closest(`#tr_${id}`).remove();
    });
}