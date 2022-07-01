$(onReady);

function onReady() {
	console.log('We are ready');
	getList();
	$(document).on('click', '.checkBox', handleCheckBox);
	$(document).on('click', '.fa-trash-can', getIdOnClick);
	$('.btn-danger').on('click', handleDelete);
	$('.addButton').on('click', createTodo);
}

let idHolder;

function createTodo() {
	let task = $('.todoInput').val();
	let newTask = {
		name: task,
		complete: false,
	};
	$.ajax({
		type: 'POST',
		url: '/todos',
		data: newTask,
	})
		.then(function (response) {
			console.log(response);
			getList();
		})
		.catch(function (error) {
			console.log(error);
		});
	$('.todoInput').val('');
}

function getList() {
	$.ajax({
		type: 'GET',
		url: '/todos',
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
			<li id="taskComplete"><input type="checkbox" class="checkBox" checked data-id=${i.id}><span id="strikeOut" class="moveRight">${i.name}</span>
				<i class="fa-solid fa-trash-can" data-id=${i.id} data-toggle="modal" data-target="#deleteConfirm"></i>
				</br>
				${i['date-completed']}
			</li>
		`);
		} else {
			$('.todoHome').append(`
			<li><input type="checkbox" class="checkBox" data-id=${i.id}><span class="moveRight">${i.name}</span>
				<i class="fa-solid fa-trash-can" data-id=${i.id} data-toggle="modal" data-target="#deleteConfirm"></i>
			</li>
		`);
		}
	}
}

function handleCheckBox() {
	let complete;
	const todoId = $(this).data('id');
	console.log(todoId);
	if ($(this).is(':checked')) {
		complete = true;
		// console.log('Clicked Check');
	} else if (!$(this).is(':checked')) {
		complete = false;
	}
	// console.log(complete);
	$.ajax({
		type: 'PUT',
		url: `/todos/${todoId}`,
		data: {
			complete: complete,
		},
	})
		.then(() => {
			getList();
		})
		.catch((error) => {
			console.log('Error updating to done', error);
		});
}

function getIdOnClick() {
	idHolder = $(this).data('id');
}

function handleDelete() {
	console.log('Clicked Delete');
	// const todoId = $(this).data('id');

	$.ajax({
		type: 'DELETE',
		url: `/todos/${idHolder}`,
	})
		.then(() => {
			console.log('It is gone!');
			getList();
		})
		.catch((error) => {
			console.log('Error updating to done', error);
		});
}
