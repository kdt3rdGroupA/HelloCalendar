
$(document).ready( () => {
	let get_list = () => {
		$.ajax('/list', {
			'success': (list) => {
				var trs = '';

				list = JSON.parse(list).list;

				for(var i = 0, len = list.length; i < len; i++) {	// 테이블 내용 만듬
					trs += '<tr>' + 
						'<td>' + (i + 1) + '</td>' + 
						'<td class="' + (list[i].complete ? 'complete' : 'notcomplete') + '">' + list[i].date + '</td>' +
						'<td class="' + (list[i].complete ? 'complete' : 'notcomplete') + '">' + list[i].contents + '</td>' +
						'<td><button type="button" class="btn btn-success">완료</button></td>' + 
						'<td><button type="button" class="btn btn-danger">삭제</button></td>' + 
						'</tr>';
				}
				$('tbody').html(trs);
				console.log(trs);
			}
		});
	};
	
	get_list();
	
	$('.todoForm button').click( () => {	// 새로운 할 일 추가하기
		$.ajax('/add', {
			'method': 'POST',
			'data': {
				'date': $('#date').val(),
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