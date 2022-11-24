document.getElementById('startline').value = new Date().toISOString().substring(0, 10);;
const tbody = document.querySelector('tbody');
function todoSubmit() { //제출한거 추가
	console.log('등록 클릭');

	const form = document.forms['todoForm'];
	// console.dir(form);
	console.log(form);
  // console.log(form.priority.value); // 
  // console.log(form.startline.value); // 
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
			if(!data.business) {outBusiness = '사적'; //business false 면 사적
				}else outBusiness = '공적';
			
			console.log(outBusiness);
			const html = `
				<tr id="tr_${data.id}">
					<td>${outBusiness}</td>
					<td>${data.priority}</td>
					<td>${data.startline}</td>
					<td>${data.deadline}</td>
					<td>${data.task}</td>
					<td><button type="button" class="btnComplete" onclick="complete()">완료</button></td> 
					<td><button type="button" class="btnDelete" onclick="todoDelete(this, '<%= data[i].id %>')">삭제</button></td>
				</tr>`;

			tbody.insertAdjacentHTML('beforeend', html);


		});
}

function complete(id) { // 완료 버튼 누루면 css, db 수정
	console.log('완료 클릭');
	console.log(id);
	const form = document.forms['todoForm'];
	const complete = document.querySelector(`#tr_${id}`);
	
	complete.classList.toggle("complete");
	console.log('전',Boolean(form.complete));

	if(!form.complete){
		form.complete = true;
	}else {
		form.complete = false;
	}

	// const btndis = document.getElementsByClassName('.btnComplete');
	// btndis.disabled = true; // 버튼 잠그기 왜 안먹혀

	console.log('후',Boolean(form.complete))
	axios({
    method: 'PATCH',
    url: '/todo/complete',
    data: {
      id: id,
      complete: Boolean(form.complete),
    },
  })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .then((data) => {
      alert(data); // alert(''수정 성공!!!'')
    });
}

// 	$('tbody').on('click', '.btn-success', function () {	// 선택한 할 일 완료하기
// 		$.ajax('/complete', {
// 			'method': 'POST',
// 			'data': {
// 				'index': parseInt($(this).parent().siblings(':first').text()) - 1	// 선택한 행의 인덱스
// 			},
// 			'success': get_list
// 		});
// 	});

function todoDelete(obj, id) {
	console.log('click 삭제 버튼');
  console.log(obj); // 버튼 태그 전체
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


