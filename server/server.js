const express = require('express');
const bodyParser = require('body-parser');
const useRouter = require('./routes/todo-router.js');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/todos', useRouter);

app.listen(PORT, () => console.log('listening on port', PORT));
