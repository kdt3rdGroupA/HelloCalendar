// 초기 입력값 당일 날짜 되게
const nowDate = new Date().toISOString().substring(0, 10);
document.getElementById('startline').value = nowDate;
document.getElementById('deadline').value = nowDate;

const tbody = document.querySelector('tbody');

function todoSubmit() { //제출한거 추가
	console.log('등록 클릭');

	const form = document.forms['todoForm'];
	// console.dir(form);
	console.log(form);
  console.log(form.business.checked); // boolean 으로 나옴
  // console.log(typeof(form.business.value)); // -> string -> boolean 변환?
  
	axios({
		method:'POST',
		url: '/todo/add', 
		data: { //form 에서 가는거 5갸
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

			if(!data.business) {outBusiness = '사적'; //business false 면 사적
				}else outBusiness = '공적';
			if(data.complete) {outComplete=true;
			}else outComplete=false;

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

			tbody.insertAdjacentHTML('beforeend', html);
			inputReset()
		});
}

// todoSubmit(); // 불러오기만(get?) 하는 함수 만들어서 실행하면 새로고침 안해도 될까?

function complete(id) { // 완료 버튼 누루면 css, db 수정
	console.log('완료 클릭');
	const trow = document.querySelector(`#tr_${id}`); // 선택된 가로 -->
	const test = document.querySelector(`#tr_${id}.complete`);  // 거기의 class(나란함? 형제 요소에 걸리나?)
	const chgBtn = document.querySelector(`#tr_${id} .btnComplete`);  //거기의 td 버튼자리(하위)
	console.log('선택된 id', id);
	console.log('선택된 trow', trow);
	console.log('tr class complete 전 ', test); // null이면 notcomplete -> 제일 위 값이 선택되어야 하는거 아닌가?
	console.log('axios 들가는 값 ', Boolean(test), parseFloat(Boolean(test))); // null이면 notcomplete -> 제일 위 값이 선택되어야 하는거 아닌가?

	console.log('tr 의 완료 버튼 ',chgBtn); // 자손 요소 공백하면 됨
	// console.log('tr 전',Boolean(test));
	
	
	trow.classList.toggle("complete");  //잘됨 -> 근데 왜 라인 무시하고 먼저 되는거?

	const comp = `
	<td><button type="button" class="btnComplete" onclick="complete('<%= data[i].id %>')">완료</button></td>
	`; // innerhtml <%= %> 넣으니까 새로고침 안하면  에러뜸 
	const cencel = `
	<td><button type="button" class="btnComplete" onclick="complete('<%= data[i].id %>')">취소</button></td>
	`;

	if(!Boolean(test)){ //미완료 -> 완료 ---->버튼은 완료 -> 취소
		// if(!(test)){ //미완료 -> 완료
		chgBtn.innerHTML = cencel;
		// trow.classList.add("complete");

	}else {
		chgBtn.innerHTML = comp;
		// trow.classList.remove("complete");

	}
	console.log('tr class complete 후 ', test); // null이면 notcomplete -> 제일 위 값이 선택되어야 하는거 아닌가?

	// const btndis = document.getElementsByClassName('.btnComplete');
	// btndis.disabled = true; // 버튼 잠그기 왜 안먹혀

	// console.log('후',Boolean(complete));
	
	axios({
    method: 'PATCH',
    url: '/todo/complete',
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
      console.log('변경되면 1 아님 0',data); // 변경되면 1 아님 0
    });

}

function todoDelete(obj, id) {
	console.log('click 삭제 버튼');
  console.log(obj);
  console.log(id);

	axios({
    method: 'DELETE',
    url: '/todo/del',
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

function inputReset() {
	document.getElementById('startline').value = nowDate;
	document.getElementById('deadline').value = nowDate;
	// document.getElementById('deadline').value = new Date();
	document.getElementById('task').value = '';
	console.log('입력 리셋됨')
}
