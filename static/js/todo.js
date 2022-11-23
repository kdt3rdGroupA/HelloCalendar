$(document).ready( () => {
	let get_list = () => {
		$.ajax('/list', {
			'success': (list) => {
				var trs = '';

				list = JSON.parse(list).list;
				console.log('넘어감? >> JSON 파싱'); // 파싱이 안됌....

				for(var i = 0, len = list.length; i < len; i++) {	// JSON 파일 테이블 내용 만듬
					trs += '<tr>' + 
						'<td>' + (i + 1) + '</td>' + 
						'<td class="' + (list[i].complete ? 'complete' : 'notcomplete') + '">' + list[i].startdate + '</td>' +
						'<td class="' + (list[i].complete ? 'complete' : 'notcomplete') + '">' + list[i].enddate + '</td>' +
						'<td class="' + (list[i].complete ? 'complete' : 'notcomplete') + '">' + list[i].contents + '</td>' +
						'<td><button type="button" class="btn btn-success">완료</button></td>' + 
						'<td><button type="button" class="btn btn-danger">삭제</button></td>' + 
						'</tr>';
				}
				// console.log(list);
				$('tbody').html(trs);
				// console.log(trs);
				// console.log('넘어감? >> JSON 파싱');

			}
		});
	};
	
	get_list(); // 리스트 화면에 가져옴
	
	$('.todoForm button').click( () => {	// 새로운 할 일 추가하기
		$.ajax('/add', {
			'method': 'POST',
			'data': {
				'priority': $('input[name="priority"]:checked').val(),
				'startdate': $('#startdate').val(),
				'enddate': $('#enddate').val(),
				'contents': $('#task').val()
			},
			'success': get_list
		});
		
	});
	
	$('tbody').on('click', '.btn-success', function () {	// 선택한 할 일 완료하기
		$.ajax('/complete', {
			'method': 'POST',
			'data': {
				'index': parseInt($(this).parent().siblings(':first').text()) - 1	// 선택한 행의 인덱스
			},
			'success': get_list
		});
	});
	
	$('tbody').on('click', '.btn-danger', function () {	// 선택한 할 일 삭제하기
		$.ajax('/del', {
			'method': 'POST',
			'data': {
				'index': parseInt($(this).parent().siblings(':first').text()) - 1	// 선택한 행의 인덱스
			},
			'success': get_list
		});
	});
});

document.getElementById('startdate').value = new Date().toISOString().substring(0, 10);;
