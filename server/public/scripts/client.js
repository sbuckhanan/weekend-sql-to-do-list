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
