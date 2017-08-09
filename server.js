const express = require('express');
const app = express();
const port = 4000;
const engine = require('ejs-locals');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('ejs', engine);
connection.connect();

const router = require('./router/index')(app,bodyParser,connection);

let server = app.use(express.static('public')).listen(port, () => {
    console.log(`Express server has started on port:${port}`);
});
