const express = require('express');
const bodyParser = require('body-parser');
const useRouter = require('locationofroute');

// let newTask = {
//     name: task,
//     complete: false,
// };
let tasksList = [
	{
		name: 'Take out the trash',
		complete: false,
	},
	{
		name: 'Take out the dog',
		complete: false,
	},
	{
		name: 'Do the dishes',
		complete: true,
	},
];

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', useRouter);

app.use('/route', useRouter);

app.listen(PORT, () => console.log('listening on port', PORT));
