require('dotenv').config();

let express = require('express');
let app = express();
let bcrypt = require('bcryptjs')
let bodyparser = require('body-parser')
var sequelize = require('./db');


sequelize.sync();

app.listen(3000, function(){
    console.log('heard on 3000')
})