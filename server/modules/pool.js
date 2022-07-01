const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
	database: 'weekend-to-do-app', //? name of the database
	host: 'localhost', //? ip of the server for database or localhost for your PC
	port: 5432, //? postgres always uses 5432 for a port
	max: 10, //? how many connections (queries) at one time
	idleTimeoutMillis: 30000, //? how long to try connection before query cancels
});

pool.on('connect', () => {
	console.log('Postgres connected!! WOOOOO!');
});

pool.on('error', (error) => {
	console.log('Error connecting to Postgres', error);
});

module.exports = pool;
