const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const moment = require('moment');

router.get('/', (req, res) => {
	const queryText = 'SELECT * FROM todos ORDER BY "complete";';
	pool
		.query(queryText)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.log('Error in GET query', error);
			res.sendStatus(500);
		});
});

router.post('/', (req, res) => {
	const newTodo = req.body;
	const queryText = `
        INSERT INTO todos (name, complete) VALUES ($1, $2);`;
	pool
		.query(queryText, [newTodo.name, newTodo.complete])
		.then((result) => {
			res.sendStatus(202);
			// console.log(result);
		})
		.catch((error) => {
			console.log('There was an error in POST /todos', error);
			res.sendStatus(500);
		});
});

router.put('/:id', (req, res) => {
	const todoId = req.params.id;
	const updateTodo = req.body;
	let dateComplete;
	let queryText;
	// console.log(updateTodo);
	// console.log(todoId);
	if (updateTodo.complete === 'true') {
		dateComplete = moment().format('LLL');
		queryText = `
        UPDATE "todos" SET "complete" = true, "date-completed" = $2 WHERE id = $1;`;
	} else {
		dateComplete = null;
		queryText = `UPDATE "todos" SET "complete" = false, "date-completed" = $2 WHERE id = $1;`;
	}
	// console.log(queryText);
	pool
		.query(queryText, [todoId, dateComplete])
		.then((result) => {
			res.send(result.rows);
			// console.log(result);
		})
		.catch((error) => {
			console.log('There was an error in POST /todos', error);
			res.sendStatus(500);
		});
});

router.delete('/:id', (req, res) => {
	const todoId = req.params.id;
	let queryText = `DELETE FROM "todos" WHERE id = $1;`;
	pool
		.query(queryText, [todoId])
		.then((result) => {
			res.send(result.rows);
			// console.log(result);
		})
		.catch((error) => {
			console.log('There was an error in POST /todos', error);
			res.sendStatus(500);
		});
});

module.exports = router;
