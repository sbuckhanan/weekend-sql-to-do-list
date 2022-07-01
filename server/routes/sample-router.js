const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
	const queryText = 'SELECT * FROM NAMEOFDB;';
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
	const newSong = req.body;
	const queryText = `
        INSERT INTO NAMEOFDB (TABLE COLUMNS HERE) VALUES ($1, $2, $3, $4);`;
	pool
		.query(queryText, [obj.prop1, obj.prop2, obj.prop3])
		.then((result) => {
			res.sendStatus(202);
			console.log(result);
		})
		.catch((error) => {
			console.log('There was an error in POST /NAMEOFROUTE', error);
			res.sendStatus(500);
		});
});

module.exports = router;
