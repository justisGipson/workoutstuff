require('dotenv').config();

let express = require('express');
let app = express();
let bodyParser = require('body-parser')
var sequelize = require('./db');
var user = require('./controller/usercontroller');

sequelize.sync();

app.use(bodyParser.json());

app.use(require('./middleware/headers'));

app.use(require('./middleware/validate-session'));

app.use('/user', user);

app.listen(3000, () => {
    console.log('heard on 3000')
})