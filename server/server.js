const express = require('express');
const bodyParser = require('body-parser');
const useRouter = require('locationofroute');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', useRouter);

app.use('/route', useRouter);

app.listen(PORT, () => console.log('listening on port', PORT));
