$(onReady);

function onReady() {
	console.log('We are ready');
	getList();
	$(document).on('click', '.checkBox', handleCheckBox);
	$(document).on('click', '.fa-trash-can', handleDelete);
	$('.addButton').on('click', createTodo);
}

function createTodo() {
	let task = $('.todoInput').val();
	let newTask = {
		name: task,
		complete: false,
	};
	$.ajax({
		type: 'POST',
		url: '/tasks',
		data: newTask,
	})
		.then(function (response) {
			console.log(response);
			getList();
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getList() {
	$.ajax({
		type: 'GET',
		url: '/tasks',
	})
		.then(function (response) {
			console.log(response);
			renderToDom(response);
		})
		.catch(function (error) {
			console.log(error);
		});
}

function renderToDom(serverInfo) {
	$('.todoHome').empty();
	for (let i of serverInfo) {
		if (i.complete) {
			$('.todoHome').append(`
			<li id="taskComplete"><input type="checkbox" class="checkBox" checked><span class="moveRight">${i.name}</span>
				<i class="fa-solid fa-trash-can"></i>
			</li>
		`);
		} else {
			$('.todoHome').append(`
			<li><input type="checkbox" class="checkBox"><span class="moveRight">${i.name}</span>
				<i class="fa-solid fa-trash-can"></i>
			</li>
		`);
		}
	}
}
