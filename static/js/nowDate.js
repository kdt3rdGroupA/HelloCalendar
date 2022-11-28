const nowDate = new Date().toISOString().substring(0, 10);

document.getElementById('startline').value = nowDate;
document.getElementById('deadline').value = nowDate;

function inputReset() {
	document.getElementById('startline').value = nowDate;
	document.getElementById('deadline').value = nowDate;
	// document.getElementById('deadline').value = new Date();
	document.getElementById('task').value = '';
	console.log('입력 리셋됨')
}